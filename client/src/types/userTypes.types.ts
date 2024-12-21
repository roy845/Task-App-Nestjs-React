export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export type User = {
  id: string;
  username: string;
  email: string;
  roles: UserRoles[];
};
