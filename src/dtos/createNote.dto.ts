import { CreateNoteSchema } from 'src/schemas/create-note.schema';
import { z } from 'zod';

export type CreateNoteDto = z.infer<typeof CreateNoteSchema>;
