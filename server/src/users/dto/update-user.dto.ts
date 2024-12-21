import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SignUpDto } from 'src/auth/dto/auth-credentials.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {
  @ApiPropertyOptional({
    example: 'username',
    description: 'Username of the user',
  })
  username?: string;

  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Password123!',
    description:
      'Password of the user, which must include upper and lower case letters, and a number or special character.',
  })
  password?: string | null;
}
