import z from 'zod';
import { NoteContentSchema } from './note-content.schema';

export const CreateNoteSchema = z.object({
  content: NoteContentSchema,
});
