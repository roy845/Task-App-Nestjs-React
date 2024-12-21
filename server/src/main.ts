import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { config } from './common/config/swagger-ui.config';
import { RoleService } from './roles/role.service';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { CredentialsMiddleware } from './middlewares/CredentialsMiddleware';
import { allowedOrigins } from './common/config/allowedOrigins';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );
  app.use(new CredentialsMiddleware().use);

  app.enableCors({
    origin: allowedOrigins,
  });
  app.setGlobalPrefix('/api');
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');
  const roleService: RoleService = app.get(RoleService);
  await roleService.seedRoles();

  await app.listen(port);
}
bootstrap();
