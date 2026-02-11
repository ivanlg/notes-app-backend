import { z } from 'zod';
import { ContentSchema } from './note-content.schema';

export const NoteSchema = z.object({
  id: z.number(),
  content: ContentSchema,
});
