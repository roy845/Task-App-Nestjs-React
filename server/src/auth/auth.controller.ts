import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserReponseDto } from './dto/user-response.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { UserRoles } from 'src/roles/user-roles.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Create new user',
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto): Promise<string> {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOkResponse({
    description: 'User logged in successfully and a JWT token is generated',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<UserReponseDto> {
    return this.authService.signIn(signInDto, res);
  }

  @Get('refresh-token')
  @ApiOkResponse({
    description: 'access token refreshed successfully',
  })
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }

  @Post('checkToken')
  @ApiOkResponse({
    description: 'User logged out successfully',
  })
  @HttpCode(HttpStatus.OK)
  checkToken(
    @Body() allowedRoles: UserRoles[],
    @Req() req: Request,
  ): Promise<{ isExpired: boolean; rolesValid: boolean }> {
    return this.authService.checkToken(allowedRoles, req);
  }

  @Get('logout')
  @ApiOkResponse({
    description: 'User logged out successfully',
  })
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Post('forgot-password')
  @ApiOkResponse({
    description: 'Mail with the reset password link',
  })
  @ApiBadRequestResponse({
    description: 'email must be an email',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @HttpCode(HttpStatus.OK)
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<string> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOkResponse({
    description: 'Mail with the reset password link',
  })
  @ApiBadRequestResponse({
    description: 'email must be an email',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid or expired reset token.',
  })
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<string> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
