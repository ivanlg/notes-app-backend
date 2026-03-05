import { createZodDto } from 'nestjs-zod';
import { GetNotesQuerySchema } from '../schemas/get-notes-query.schema';

export class GetNotesQueryDto extends createZodDto(GetNotesQuerySchema) {}
