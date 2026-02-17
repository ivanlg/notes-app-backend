import { createZodDto } from 'nestjs-zod';
import { errorSchema } from 'src/schemas/error.schema';

export class ErrorDto extends createZodDto(errorSchema) {}
