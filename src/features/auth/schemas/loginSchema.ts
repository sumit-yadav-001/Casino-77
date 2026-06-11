import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(3, { message: 'Username or Email is required (min 3 chars)' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional(),
});

export type LoginFields = z.infer<typeof loginSchema>;
