import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationError,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_TYPE: string;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_DATABASE: string;

  @IsNotEmpty()
  @IsBoolean()
  DB_SYNCHRONIZATION: boolean;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsNumber()
  JWT_EXPIRES_IN: number;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig: EnvironmentVariables = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );

  const errors: ValidationError[] = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
