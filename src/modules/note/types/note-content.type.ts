import { NoteContentSchema } from 'src/modules/note/schemas/note-content.schema';
import z from 'zod';

export type NoteContent = z.infer<typeof NoteContentSchema>;
