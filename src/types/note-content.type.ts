import { NoteContentSchema } from 'src/schemas/note-content.schema';
import z from 'zod';

export type NoteContent = z.infer<typeof NoteContentSchema>;
