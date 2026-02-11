import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './config/orm.config';
import { NoteModule } from './modules/note/note.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
