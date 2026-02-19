import { createZodDto } from 'nestjs-zod';
import { errorSchema } from 'src/modules/note/schemas/error.schema';

export class ErrorDto extends createZodDto(errorSchema) {}
