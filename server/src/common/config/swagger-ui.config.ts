import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('Tasks API')
  .setDescription('This is a simple tasks API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
