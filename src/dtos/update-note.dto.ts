import { createZodDto } from 'nestjs-zod';
import { UpdateNoteSchema } from 'src/schemas/update-note.schema';

export class UpdateNoteDto extends createZodDto(UpdateNoteSchema) {}
