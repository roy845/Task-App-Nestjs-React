import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    example: 'username',
    description: 'Username of the user',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;

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
  password: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
  })
  email: string;

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
  password: string;
}
