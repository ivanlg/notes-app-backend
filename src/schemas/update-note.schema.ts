import z from 'zod';
import { ContentSchema } from './note-content.schema';

export const UpdateNoteSchema = z.object({
  content: ContentSchema,
});
