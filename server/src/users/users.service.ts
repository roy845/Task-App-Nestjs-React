import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ValidationsUtil } from 'src/common/utils/validations-util';
import { Repository } from 'typeorm';
import { USER } from './constants/user-constants';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUtils } from 'src/auth/utils/auth-utils';
import { UserRoles } from 'src/roles/user-roles.enum';
import { UserJWTResponse } from 'src/auth/types/jwt.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    ValidationsUtil.checkIfExists<User>(user, USER, userId);

    return user;
  }

  async getUsersCount(): Promise<number> {
    return await this.userRepository.count();
  }

  async deleteUser(userId: number, user: UserJWTResponse): Promise<void> {
    await this.getUserById(userId);
    if (user.id === userId || user.roles.includes(UserRoles.ADMIN)) {
      await this.userRepository.delete({ id: userId });
    } else {
      throw new ForbiddenException('You can only delete yourself');
    }
  }

  async updateUser(
    userId: number,
    userToUpdate: UpdateUserDto,
    user: UserJWTResponse,
  ): Promise<User> {
    const exisitingUser = await this.getUserById(userId);
    if (user.id === userId || user.roles.includes(UserRoles.ADMIN)) {
      const { email, password, username } = userToUpdate;

      exisitingUser.email = email ?? user.email;
      exisitingUser.password = password
        ? await AuthUtils.hashPassword(password)
        : exisitingUser.password;
      exisitingUser.username = username ?? exisitingUser.username;

      await exisitingUser.save();
      return exisitingUser;
    } else {
      throw new ForbiddenException('You can only update yourself');
    }
  }
}
