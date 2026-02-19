import { createZodDto } from 'nestjs-zod';
import { UpdateNoteSchema } from 'src/modules/note/schemas/update-note.schema';

export class UpdateNoteDto extends createZodDto(UpdateNoteSchema) {}
