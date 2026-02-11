import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { Note } from 'src/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: string): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id });
  }

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create({ ...createNoteDto });
    return this.noteRepository.save(note);
  }

  update(note: Note): Promise<Note> {
    return this.noteRepository.save(note);
  }

  async delete(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
