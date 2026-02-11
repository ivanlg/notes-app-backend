import { UpdateNoteSchema } from 'src/schemas/update-note.schema';
import { z } from 'zod';

export type UpdateNoteDto = z.infer<typeof UpdateNoteSchema>;
