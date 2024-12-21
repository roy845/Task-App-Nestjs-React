import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { RoleService } from './role.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleNamesDto } from './dto/roleNames.dto';
import { RolesGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from './roles.decorator';
import { UserRoles } from './user-roles.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Role } from './role.entity';

@ApiTags('Roles')
@Controller('roles')
@Roles(UserRoles.ADMIN)
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
export class RolesController {
  constructor(private roleService: RoleService) {}
  @ApiOkResponse({
    description: 'Get all roles as response',
  })
  @Get('')
  getAllRoles(): Promise<UserRoles[]> {
    return this.roleService.getAllRoles();
  }

  @ApiOkResponse({
    description: 'Updated user with the added roles as response',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiBadRequestResponse({
    description: 'User already has the following role(s)',
  })
  @Post('assign/:userId')
  assignRolesToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() { roleNames }: RoleNamesDto,
  ): Promise<User> {
    return this.roleService.assignRolesToUser(userId, roleNames);
  }

  @ApiOkResponse({
    description: 'Updated user with the removed roles as response',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiBadRequestResponse({
    description: 'One or more roles to remove not found',
  })
  @Delete('remove/:userId')
  removeRolesFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() { roleNames }: RoleNamesDto,
  ): Promise<User> {
    return this.roleService.removeRolesFromUser(userId, roleNames);
  }
}
