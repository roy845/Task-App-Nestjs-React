import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { User } from 'src/auth/entities/user.entity';
import { Roles } from 'src/roles/roles.decorator';
import { UserRoles } from 'src/roles/user-roles.enum';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserJWTResponse } from 'src/auth/types/jwt.types';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({
    description: 'Get all users as response',
  })
  @Get('getAllUsers')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('count')
  @ApiOkResponse({
    description: 'Get number of users as response',
  })
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth()
  getUsersCount(): Promise<number> {
    return this.userService.getUsersCount();
  }

  @ApiOkResponse({
    description: 'Get user as response',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get('/:userId')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth()
  getUserById(@Param('userId', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @ApiOkResponse({
    description: 'Delete user as response',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete('/:userId')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth()
  deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
    @GetUser() user: UserJWTResponse,
  ): Promise<void> {
    return this.userService.deleteUser(userId, user);
  }

  @ApiOkResponse({
    description: 'Update user as response',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Put('/:userId')
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @ApiBearerAuth()
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @GetUser()
    user: UserJWTResponse,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(userId, updateUserDto, user);
  }
}
