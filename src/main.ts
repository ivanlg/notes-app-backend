import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<{ PORT: number }, true>);
  const port = configService.get<number>('PORT');

  const config = new DocumentBuilder()
    .setTitle('Notes API')
    .setDescription('CRUD API for managing notes')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: '*',
  });

  await app.listen(port);
}
bootstrap();
