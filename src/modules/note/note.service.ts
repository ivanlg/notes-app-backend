import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/modules/note/dtos/create-note.dto';
import { NoteEntity } from 'src/modules/note/entities/note.entity';
import { Repository } from 'typeorm';
import { GetNotesQueryDto } from './dtos/get-notes-query-dto';
import { trace, SpanStatusCode } from '@opentelemetry/api';
import { PinoLoggerService } from '../observability/pino-logger.service';

@Injectable()
export class NoteService {
  private readonly tracer = trace.getTracer('notes-service');

  constructor(
    private readonly logger: PinoLoggerService,
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
    return this.tracer.startActiveSpan(
      'NotesService.createNote',
      async (span) => {
        try {
          span.setAttribute('note.testAttr', 'Test');

          const note = this.noteRepository.create({ ...createNoteDto, userId });

          // Log the note creation with the note ID
          this.logger.log({ noteId: note.id }, 'note created');

          return this.noteRepository.save(note);
        } catch (error) {
          span.recordException(error as Error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error instanceof Error ? error.message : 'Unknown error',
          });

          throw error;
        } finally {
          span.end();
        }
      },
    );
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
