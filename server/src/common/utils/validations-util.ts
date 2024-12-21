import { NotFoundException } from '@nestjs/common';

export class ValidationsUtil {
  static isObjectEmpty<T>(obj: T): boolean {
    return Object.keys(obj).length === 0;
  }

  static checkIfExists<T>(obj: T, objName: string, objId?: number): void {
    if (!obj) {
      throw new NotFoundException(`${objName} with id:${objId} not found`);
    }
  }
}
