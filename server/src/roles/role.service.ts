import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { UserRoles } from 'src/roles/user-roles.enum';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seedRoles() {
    const roles = await this.roleRepository.find();
    if (roles.length === 0) {
      const initialRoles = [UserRoles.ADMIN, UserRoles.USER, UserRoles.GUEST];
      initialRoles.forEach(async (roleName) => {
        const role: Role = this.roleRepository.create({ name: roleName });
        await role.save();
      });
      console.log('Roles seeded');
    } else {
      console.log('Roles already initialized');
    }
  }

  async findRolesByNames(names: UserRoles[]): Promise<Role[]> {
    return this.roleRepository.find({
      where: names.map((name) => ({ name })),
    });
  }

  async getAllRoles(): Promise<UserRoles[]> {
    return (await this.roleRepository.find()).map((role) => role.name);
  }

  async assignRolesToUser(
    userId: number,
    roleNames: UserRoles[],
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const roles: Role[] = await this.findRolesByNames(roleNames);
    if (roles.length !== roleNames.length) {
      throw new NotFoundException('One or more roles not found');
    }

    const existingRolesSet: Set<UserRoles> = new Set(
      user.roles.map((role) => role.name),
    );
    const duplicateRoles: Role[] = roles.filter((role) =>
      existingRolesSet.has(role.name),
    );

    if (duplicateRoles.length > 0) {
      throw new BadRequestException(
        `User already has the following role(s): ${duplicateRoles.map((role) => role.name).join(', ')}`,
      );
    }

    user.roles = [...user.roles, ...roles];
    await this.userRepository.save(user);
    return user;
  }

  async removeRolesFromUser(
    userId: number,
    roleNames: UserRoles[],
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Filter out the roles that need to be removed
    const rolesToRemove = user.roles.filter((role) =>
      roleNames.includes(role.name),
    );
    if (rolesToRemove.length !== roleNames.length) {
      throw new NotFoundException('One or more roles to remove not found');
    }

    // Remove the specified roles
    user.roles = user.roles.filter((role) => !roleNames.includes(role.name));

    // Save the updated user
    await this.userRepository.save(user);
    return user;
  }
}
