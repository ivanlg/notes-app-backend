import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { NoteEntity } from 'src/entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  findAll(): Promise<NoteEntity[]> {
    return this.noteRepository.find();
  }

  findOne(id: string): Promise<NoteEntity | null> {
    return this.noteRepository.findOneBy({ id });
  }

  create(createNoteDto: CreateNoteDto): Promise<NoteEntity> {
    const note = this.noteRepository.create({ ...createNoteDto });
    return this.noteRepository.save(note);
  }

  update(note: NoteEntity): Promise<NoteEntity> {
    return this.noteRepository.save(note);
  }

  async delete(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
