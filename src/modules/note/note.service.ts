import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/modules/note/dtos/create-note.dto';
import { NoteEntity } from 'src/modules/note/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  findAll(userId: string): Promise<NoteEntity[]> {
    return this.noteRepository.find({
      where: { userId },
    });
  }

  findOne(id: string): Promise<NoteEntity | null> {
    return this.noteRepository.findOneBy({ id });
  }

  create(userId: string, createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    const note = this.noteRepository.create({ ...createNoteDto, userId });
    return this.noteRepository.save(note);
  }

  update(note: NoteEntity): Promise<NoteEntity> {
    return this.noteRepository.save(note);
  }

  async delete(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.noteRepository.deleteAll();
  }
}
