import { HttpException, HttpStatus } from '@nestjs/common';

export class UserValidationsUtil {
  static checkIfUserExists<T>(obj: T, objName: string): void {
    if (obj) {
      throw new HttpException(`${objName} already exists`, HttpStatus.CONFLICT);
    }
  }
}
