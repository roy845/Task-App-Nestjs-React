export interface JWTConfig {
  secret: string;
  signOptions: {
    expiresIn: number;
  };
}
