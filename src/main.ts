import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<{ PORT: number }, true>);
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
