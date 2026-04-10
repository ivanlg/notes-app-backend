import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './modules/note/note.module';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { moduleconfig } from './config/module';
import { createOrmConfig } from './config/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/observability/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './modules/observability/logging.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(moduleconfig),
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createOrmConfig(configService),
    }),
    AuthModule,
    NoteModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
