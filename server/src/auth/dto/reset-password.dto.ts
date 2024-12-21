import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'randomTokenString123',
    description: 'Token received by the user for password reset.',
  })
  token: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password too weak. It must contain at least one uppercase letter (A-Z), ' +
      'at least one lowercase letter (a-z), and at least one digit (0-9) or ' +
      'special character (any non-word character).',
  })
  @ApiProperty({
    example: 'Password123!',
    description:
      'Password of the user, which must include upper and lower case letters, and a number or special character.',
  })
  newPassword: string;
}
