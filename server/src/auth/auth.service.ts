import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignInDto, SignUpDto } from './dto/auth-credentials.dto';
import { AuthUtils } from './utils/auth-utils';
import { AuthEnum } from './constants/auth-constants';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/role.entity';
import { RoleService } from 'src/roles/role.service';
import { UserRoles } from '../roles/user-roles.enum';
import { UserReponseDto } from './dto/user-response.dto';
import { DecodedToken, JWTPayload } from './types/jwt.types';
// import { UserInfoDto } from './dto/user-info.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPassword } from './entities/reset-password.entity';
import { MailService } from 'src/mail/mail.service';
import ResetPasswordTemplate from '../templates/resetPassword';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {
  private scheduledTasks: Map<number, CronJob> = new Map<number, CronJob>();
  private readonly EXPIRES_AT: number = 15 * 60 * 1000;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ResetPassword)
    private resetPasswordRepository: Repository<ResetPassword>,
    private schedulerRegistry: SchedulerRegistry,
    private rolesService: RoleService,
    private mailService: MailService,
    @Inject('JWT_SERVICE') private readonly jwtService: JwtService,
    @Inject('JWT_REFRESH_SERVICE')
    private readonly jwtRefreshService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const { email, username, password } = signUpDto;

    const defaultRoles: Role[] = await this.rolesService.findRolesByNames([
      UserRoles.USER,
    ]);

    const user: User = this.userRepository.create({
      email,
      username,
      password: await AuthUtils.hashPassword(password),
      roles: defaultRoles,
    });

    try {
      await user.save();
    } catch (error: any) {
      if (error.code === AuthEnum.DUPLICATE_USER_CODE) {
        throw new ConflictException(AuthEnum.USER_ALREADY_EXISTS);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return `User ${user.username} created`;
  }

  generateTokens(payload: JWTPayload): [string, string] {
    // Generate the access token
    const accessToken: string = this.jwtService.sign(payload);

    // Generate the refresh token
    const refreshToken: string = this.jwtRefreshService.sign(payload);

    return [accessToken, refreshToken];
  }

  async signIn(signInDto: SignInDto, res: Response): Promise<UserReponseDto> {
    const { email, password } = signInDto;

    const user: User = await this.userRepository.findOne({
      where: { email: email },
    });

    if (user && (await AuthUtils.comparePassword(password, user.password))) {
      const payload: JWTPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role: Role) => role.name),
      };

      const [accessToken, refreshToken] = this.generateTokens(payload);

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        accessToken,
        refreshToken,
        message: `User ${user.username} logged in successfully`,
      });

      return {
        // user: new UserInfoDto(user),
        accessToken,
        refreshToken,
        message: `User ${user.username} logged in successfully`,
      };
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async refreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) return res.sendStatus(HttpStatus.UNAUTHORIZED);
    const refreshToken = cookies.refreshToken;

    const foundUser: User = await User.findOne({ where: { refreshToken } });
    if (!foundUser) return res.sendStatus(HttpStatus.FORBIDDEN);

    const payload: JWTPayload = {
      id: foundUser?.id,
      username: foundUser?.username,
      email: foundUser?.email,
      roles: foundUser?.roles.map((role: Role) => role.name),
    };

    try {
      const decoded: JWTPayload = this.jwtRefreshService.verify(refreshToken);
      if (foundUser.username !== decoded.username) {
        res.sendStatus(HttpStatus.FORBIDDEN);
      }

      const accessToken: string = this.jwtService.sign(payload);

      res.json({ accessToken, message: `access token refreshed successfully` });
      return {
        accessToken,
        message: `access token refreshed successfully`,
      };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Refresh token expired');
      }
      return res.sendStatus(HttpStatus.FORBIDDEN);
    }
  }

  async logout(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(HttpStatus.NO_CONTENT); //No content
    const refreshToken = cookies.refreshToken;

    // Is refreshToken in db?
    const foundUser: User = await User.findOne({ where: { refreshToken } });

    if (!foundUser) {
      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
      });
      return res.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      // Delete refreshToken in db
      foundUser.refreshToken = null;
      await foundUser.save();

      res.cookie('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: new Date(0),
      });
      return res.sendStatus(HttpStatus.NO_CONTENT);
    }
  }

  async checkToken(allowedRoles: UserRoles[], req: Request) {
    const { cookies } = req;
    const jwt = cookies.jwt;

    if (!jwt) {
      throw new UnauthorizedException('JWT token is missing');
    }

    try {
      const decodedToken: DecodedToken | null = jwt
        ? jwtDecode<DecodedToken>(jwt)
        : null;

      if (!decodedToken) {
        throw new UnauthorizedException('Invalid JWT token');
      }

      const currentTime: number = Math.floor(Date.now() / 1000);
      const isExpired: boolean = (decodedToken.exp as number) < currentTime;

      if (isExpired) {
        throw new UnauthorizedException('JWT token has expired');
      }

      const rolesValid: boolean =
        decodedToken.roles?.some((role) => allowedRoles.includes(role)) ??
        false;

      if (!rolesValid) {
        throw new ForbiddenException('User does not have the required roles');
      }

      return { isExpired, rolesValid };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new BadRequestException('Failed to decode token');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    const { email } = forgotPasswordDto;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const token: string = AuthUtils.generateResetPasswordToken();
      const expiresAt: Date = new Date(Date.now() + this.EXPIRES_AT);
      const resetLink: string = `http://localhost:3000/reset-password/${token}`;

      let resetPassword: ResetPassword =
        await this.resetPasswordRepository.findOne({ where: { user } });
      if (!resetPassword) {
        resetPassword = new ResetPassword();
        resetPassword.user = user;
      }

      resetPassword.token = token;
      resetPassword.expiresAt = expiresAt;

      await this.resetPasswordRepository.save(resetPassword);
      await this.mailService.sendMail(
        email,
        'Reset Password Link',
        ResetPasswordTemplate(
          AuthUtils.extractUsernameFromEmail(email),
          resetLink,
        ),
      );
      this.schedulePasswordResetDeletion(resetPassword);
      return 'Reset email sent successfully';
    }
  }

  private schedulePasswordResetDeletion(resetPassword: ResetPassword) {
    const jobName = `delete-reset-token-${resetPassword.userId}`;

    // Cancel any existing job for this user
    if (this.schedulerRegistry.doesExist('cron', jobName)) {
      this.schedulerRegistry.deleteCronJob(jobName);
    }

    const job = new CronJob(
      new Date(Date.now() + this.EXPIRES_AT),
      async () => {
        await this.resetPasswordRepository.delete(resetPassword.id);
        console.log('Expired reset token deleted.');
      },
    );

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { token, newPassword } = resetPasswordDto;

    const now: Date = new Date();
    const resetPasswordEntry: ResetPassword =
      await this.resetPasswordRepository.findOne({
        where: {
          token,
          expiresAt: MoreThan(now),
        },
      });

    if (!resetPasswordEntry) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    const user: User = await this.userRepository.findOne({
      where: { id: resetPasswordEntry.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = await AuthUtils.hashPassword(newPassword);

    await user.save();
    await this.resetPasswordRepository.remove(resetPasswordEntry);

    if (this.scheduledTasks.has(user.id)) {
      const job: CronJob<null, null> = this.scheduledTasks.get(user.id);
      job.stop();
      this.schedulerRegistry.deleteCronJob(`delete-reset-token-${user.id}`);
      this.scheduledTasks.delete(user.id);
    }

    return 'Reset password successfully';
  }
}
