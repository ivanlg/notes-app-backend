import { createZodDto } from 'nestjs-zod';
import { NoteSchema } from 'src/schemas/note.schema';

export class NoteDto extends createZodDto(NoteSchema) {}
