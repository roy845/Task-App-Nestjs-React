import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RolesController } from './roles.controller';
import { User } from 'src/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RolesController],
})
export class RolesModule {}
