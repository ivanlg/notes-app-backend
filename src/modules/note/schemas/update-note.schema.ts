import { NoteSchema } from './note.schema';

export const UpdateNoteSchema = NoteSchema.pick({
  content: true,
});
