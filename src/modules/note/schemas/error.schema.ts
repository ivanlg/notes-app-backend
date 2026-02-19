import z from 'zod';

export const errorSchema = z.object({
  message: z.string(),
  error: z.string(),
  statusCode: z.number(),
});
