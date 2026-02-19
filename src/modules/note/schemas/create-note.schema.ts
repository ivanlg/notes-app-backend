import { NoteSchema } from './note.schema';

export const CreateNoteSchema = NoteSchema.pick({
  content: true,
});
