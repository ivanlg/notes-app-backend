import { z } from 'zod';

const AttributesSchema = z
  .object({
    bold: z.boolean().optional(),
    list: z.enum(['bullet', 'ordered']).optional(),
  })
  .loose(); // allow future attributes (italic, underline, etc.)

const OpSchema = z.object({
  insert: z.string(),
  attributes: AttributesSchema.optional(),
});

export const NoteContentSchema = z.object({
  ops: z.array(OpSchema),
});
