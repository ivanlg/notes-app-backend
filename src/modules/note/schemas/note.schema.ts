import { z } from 'zod';
import { NoteContentSchema } from './note-content.schema';

const stringToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});

export const NoteSchema = z.object({
  id: z.uuidv4(),
  content: NoteContentSchema,
  createdAt: stringToDate,
  updatedAt: stringToDate,
  deletedAt: stringToDate.optional(),
});
