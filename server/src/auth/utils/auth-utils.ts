import * as bcrypt from 'bcrypt';
import { AuthEnum } from '../constants/auth-constants';
import * as crypto from 'crypto';

export class AuthUtils {
  /**
   * Hashes a password using bcrypt.
   * @param password The plain text password to hash.
   * @returns A promise that resolves to the hashed password.
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, AuthEnum.SALT_ROUNDS);
  }

  /**
   * Compares a plain text password with a hashed password.
   * @param password The plain text password.
   * @param hashedPassword The hashed password to compare against.
   * @returns A promise that resolves to a boolean, indicating if the passwords match.
   */
  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateResetPasswordToken(): string {
    return crypto.randomBytes(20).toString('hex');
  }

  static extractUsernameFromEmail(email: string): string {
    const parts: string[] = email.split('@');

    const username: string = parts[0];

    return username;
  }
}
