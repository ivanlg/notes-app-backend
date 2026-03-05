import z from 'zod';
import { NoteEntity } from '../entities/note.entity';

export const SORTABLE_NOTE_FIELDS = [
  'createdAt',
  'updatedAt',
] as const satisfies readonly (keyof NoteEntity)[];

export const GetNotesQuerySchema = z.object({
  sortBy: z.enum(SORTABLE_NOTE_FIELDS).default('updatedAt'),
  order: z.enum(['ASC', 'DESC']).default('DESC'),
  keywords: z
    .preprocess((value) => {
      if (typeof value === 'string') {
        return value.split(',').map((k) => k.trim());
      }
      return value;
    }, z.array(z.string()))
    .optional(),
});
