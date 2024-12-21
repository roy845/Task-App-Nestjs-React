import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConfig } from 'src/common/config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from 'src/roles/roles.module';
import { JwtStrategy } from './jwt.strategy';
import { ResetPassword } from './entities/reset-password.entity';
import { MailModule } from 'src/mail/mail.module';
import {
  jwtConfigProvider,
  jwtRefreshConfigProvider,
} from 'src/common/config/jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([User, ResetPassword]),
    RolesModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    jwtConfigProvider,
    jwtRefreshConfigProvider,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
