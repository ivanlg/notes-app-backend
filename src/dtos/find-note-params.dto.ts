import { createZodDto } from 'nestjs-zod';
import { FindNoteParamsSchema } from 'src/schemas/find-note-params.schema';

export class FindNoteParamsDto extends createZodDto(FindNoteParamsSchema) {}
