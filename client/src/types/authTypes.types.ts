// import { User } from "./userTypes.types";

import { AllowedRoles } from "./roles.types";

export type Auth = {
  // user: User;
  accessToken: string;
  refreshToken?: string;
  message: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  message: string;
};

export interface DecodedToken {
  id: number;
  exp: number;
  username: string;
  email: string;
  roles: AllowedRoles[];
}
