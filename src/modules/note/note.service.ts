import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/modules/note/dtos/create-note.dto';
import { NoteEntity } from 'src/modules/note/entities/note.entity';
import { Repository } from 'typeorm';
import { GetNotesQueryDto } from './dtos/get-notes-query-dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
  ) {}

  async findAll(
    userId: string,
    query: GetNotesQueryDto,
  ): Promise<NoteEntity[]> {
    const { sortBy, order, keywords } = query;

    const qb = this.noteRepository
      .createQueryBuilder('note')
      .where('note.userId = :userId', { userId });

    if (keywords?.length) {
      const searchQuery = keywords
        .map((k) => `${k.replace(/[^a-zA-Z0-9]/g, '')}:*`)
        .join(' & ');
      qb.andWhere(`search_vector @@ to_tsquery('simple', :searchQuery)`, {
        searchQuery,
      });
    }

    qb.orderBy(`note.${sortBy}`, order);

    return qb.getMany();
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
    await this.noteRepository.softDelete(id);
  }

  async deleteAll(userId: string): Promise<void> {
    await this.noteRepository.softDelete({
      userId,
    });
  }
}
