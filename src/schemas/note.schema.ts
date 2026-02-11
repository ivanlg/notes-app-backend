import { z } from 'zod';
import { NoteContentSchema } from './note-content.schema';

export const NoteSchema = z.object({
  id: z.number(),
  content: NoteContentSchema,
});
