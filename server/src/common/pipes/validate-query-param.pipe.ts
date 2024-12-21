import {
  Injectable,
  PipeTransform,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ValidateQueryParamPipe implements PipeTransform {
  constructor(private paramName: string) {}
  transform(value: number, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      if (value <= 0) {
        throw new BadRequestException(
          `'${this.paramName}' must be a non-negative integer and greater than 0, but received '${value}'.`,
        );
      }

      return value;
    }
  }
}
