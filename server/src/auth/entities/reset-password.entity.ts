import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ResetPassword {
  @ApiProperty({
    example: '1',
    description: 'Id of the reset password request',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'randomTokenString',
    description: 'Token for resetting password',
  })
  @Column({ default: '' })
  token: string;

  @ApiProperty({
    example: '2023-12-31T23:59:59Z',
    description: 'Expiration date and time of the token',
  })
  @Column({ default: new Date() })
  expiresAt: Date;

  @OneToOne(() => User, (user) => user.resetPassword, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
