import { createZodDto } from 'nestjs-zod';
import { NoteSchema } from 'src/modules/note/schemas/note.schema';

export class NoteDto extends createZodDto(NoteSchema) {}
