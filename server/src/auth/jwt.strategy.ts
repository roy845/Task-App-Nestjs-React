import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWTPayload } from './types/jwt.types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoles } from 'src/roles/user-roles.enum';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),

      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // private static extractJWTFromCookie(req: Request): string | null {
  //   if (req.cookies && req.cookies.accessToken) {
  //     return req.cookies.accessToken;
  //   }
  //   return null;
  // }

  async validate(payload: JWTPayload): Promise<{
    id: number;
    username: string;
    email: string;
    roles: UserRoles[];
  }> {
    const { id } = payload;

    const user: User = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }
    const roles: UserRoles[] = user.roles.map((role) => role.name);

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles,
    };

    return userResponse;
  }
}
