import z from 'zod';
import { NoteContentSchema } from './note-content.schema';

export const UpdateNoteSchema = z.object({
  content: NoteContentSchema,
});
