import {
  IsOptional,
  IsString,
  Length,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { FilterTaskDto } from './filter-tasks.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends FilterTaskDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Length(3, 100)
  @ApiProperty({
    example: 'title',
    description: 'Title of the task',
  })
  override title?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @Length(3, 300)
  @ApiProperty({
    example: 'description',
    description: 'Description of the task',
  })
  override description?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiProperty({
    example: 'OPEN',
    description: 'Status of the task',
    enum: TaskStatus,
  })
  override status?: TaskStatus;
}
