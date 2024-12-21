import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user requesting password reset',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
