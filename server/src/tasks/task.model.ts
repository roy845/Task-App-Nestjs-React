import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './task-status.enum';

export class Task {
  @ApiProperty({
    example: '123',
    description: 'Id of the task',
  })
  id: string;
  @ApiProperty({
    example: 'title',
    description: 'Title of the task',
  })
  title: string;
  @ApiProperty({
    example: 'description',
    description: 'Description of the task',
  })
  description: string;
  @ApiProperty({
    example: 'OPEN',
    description: 'Status of the task',
    enum: TaskStatus,
  })
  status: TaskStatus;
}
