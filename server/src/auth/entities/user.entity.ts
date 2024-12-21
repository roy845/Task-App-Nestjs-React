import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserRoles } from '../../roles/user-roles.enum';
import { Role } from 'src/roles/role.entity';
import { Task } from 'src/tasks/task.entity';
import { ResetPassword } from './reset-password.entity';

@Entity()
@Unique('UQ_EMAIL', ['email'])
export class User extends BaseEntity {
  @ApiProperty({
    example: '123',
    description: 'Id of the user',
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    example: 'john',
    description: 'username of the user',
  })
  @Column()
  username: string;
  @ApiProperty({
    example: 'email@email.com',
    description: 'email of the user',
  })
  @Column()
  email: string;
  @ApiProperty({
    example: '123456',
    description: 'password of the user',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'user',
    description: 'User role',
    enum: UserRoles,
    type: () => Role,
  })
  @ApiProperty({
    description: 'Roles of the user',
    type: () => Role,
  })
  @ManyToMany(() => Role, { eager: true, cascade: true })
  @JoinTable()
  roles: Role[];

  @ApiProperty({
    description: 'Tasks associated with the user',
    type: () => Task,
  })
  @OneToMany(() => Task, (task) => task.user, {
    eager: false,
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];

  @ApiProperty({
    description: 'Reset password request associated with the user',
    type: () => ResetPassword,
  })
  @OneToOne(() => ResetPassword, (resetPassword) => resetPassword.user, {
    cascade: true,
  })
  resetPassword: ResetPassword;
  @ApiProperty({
    description: 'Refresh token of the user',
  })
  @Column({ nullable: true })
  refreshToken: string;
}
