import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/role.entity';
import { RoleService } from './roles/role.service';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { User } from './auth/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './common/config/typeorm.config';
import { validate } from './common/config/env.validation';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ResetPassword } from './auth/entities/reset-password.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([Role, User, ResetPassword]),
    ScheduleModule.forRoot(),
    TasksModule,
    AuthModule,
    RolesModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleService, MailService],
})
export class AppModule {}
