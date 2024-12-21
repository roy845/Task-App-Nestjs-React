import { Role } from 'src/roles/role.entity';
import { User } from '../entities/user.entity';
import { UserRoles } from '../../roles/user-roles.enum';

export class UserInfoDto {
  id: number;
  username: string;
  email: string;
  roles: UserRoles[];

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.roles = user.roles.map((role: Role) => role.name);
  }
}
