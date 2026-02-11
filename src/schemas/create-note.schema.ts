import z from 'zod';
import { ContentSchema } from './note-content.schema';

export const CreateNoteSchema = z.object({
  content: ContentSchema,
});
