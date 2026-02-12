import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteModule } from './modules/note/note.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { moduleconfig } from './config/module';
import { createOrmConfig } from './config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot(moduleconfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createOrmConfig(configService),
    }),
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
