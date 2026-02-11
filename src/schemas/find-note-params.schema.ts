import { z } from 'zod';

export const FindNoteParamsSchema = z.object({
  id: z.uuidv4(),
});
