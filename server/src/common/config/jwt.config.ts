import { JWTConfig } from './configTypes.types';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

export const jwtConfigProvider = {
  provide: 'JWT_SERVICE',
  useFactory: async (configService: ConfigService): Promise<JwtService> => {
    const jwtService = new JwtService({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN'), 10),
      },
    });
    return jwtService;
  },
  inject: [ConfigService],
};

export const jwtRefreshConfigProvider = {
  provide: 'JWT_REFRESH_SERVICE',
  useFactory: async (configService: ConfigService): Promise<JwtService> => {
    const jwtService = new JwtService({
      secret: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      signOptions: {
        expiresIn: parseInt(
          configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
          10,
        ),
      },
    });
    return jwtService;
  },
  inject: [ConfigService],
};
