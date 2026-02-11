import { z } from 'zod';
import { FindNoteParamsSchema } from 'src/schemas/find-note-params.schema';

export type FindNoteParams = z.infer<typeof FindNoteParamsSchema>;
