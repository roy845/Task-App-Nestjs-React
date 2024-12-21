import { ArrayNotEmpty, IsArray, IsEnum } from 'class-validator';
import { UserRoles } from '../user-roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RoleNamesDto {
  @ApiProperty({
    description: 'List of user roles',
    isArray: true,
    enum: UserRoles,
    example: [UserRoles.ADMIN, UserRoles.USER, UserRoles.GUEST],
  })
  @IsArray({ message: 'roleNames must be an array' })
  @ArrayNotEmpty({ message: 'roleNames should not be empty' })
  @IsEnum(UserRoles, {
    each: true,
    message: 'Each role must be a valid UserRoles enum value. user,admin,guest',
  })
  roleNames: UserRoles[];
}
