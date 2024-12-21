import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'title',
    description: 'Title of the task',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  @ApiProperty({
    example: 'description',
    description: 'Description of the task',
  })
  description: string;
}
