import { IsOptional, IsString, Length, IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    description: 'Title of the task',
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 300)
  @ApiProperty({
    description: 'Description of the task',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    required: false,
  })
  status?: TaskStatus;
}
