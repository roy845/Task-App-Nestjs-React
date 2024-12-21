import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ResetPassword } from 'src/auth/entities/reset-password.entity';
import { User } from 'src/auth/entities/user.entity';
import { Role } from 'src/roles/role.entity';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: configService.get<'postgres'>('DB_TYPE'),
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT'), 10),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [Task, User, Role, ResetPassword],
    synchronize: configService.get<boolean>('DB_SYNCHRONIZATION'),
  }),
};

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { User } from 'src/auth/user.entity';
// import { Role } from 'src/roles/role.entity';
// import { Task } from 'src/tasks/task.entity';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [Task, User, Role],
//   synchronize: true,
// };
