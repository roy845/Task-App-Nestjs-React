import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/roles/user-roles.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @ApiProperty({
    example: '1',
    description: 'Id of the role',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'admin',
    description: 'Name of the role',
    enum: UserRoles,
  })
  @Column({ unique: true, enum: UserRoles })
  name: UserRoles;
}
