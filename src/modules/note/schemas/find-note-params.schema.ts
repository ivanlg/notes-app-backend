import { NoteSchema } from './note.schema';

export const FindNoteParamsSchema = NoteSchema.pick({
  id: true,
});
