import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: '123',
    description: 'Id of the task',
  })
  id: number;
  @Column()
  @ApiProperty({
    example: 'title',
    description: 'Title of the task',
  })
  title: string;
  @Column()
  @ApiProperty({
    example: 'description',
    description: 'Description of the task',
  })
  description: string;
  @Column()
  @ApiProperty({
    example: 'OPEN',
    description: 'Status of the task',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: number;
}
