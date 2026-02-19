import { createZodDto } from 'nestjs-zod';
import { CreateNoteSchema } from 'src/modules/note/schemas/create-note.schema';

export class CreateNoteDto extends createZodDto(CreateNoteSchema) {}
