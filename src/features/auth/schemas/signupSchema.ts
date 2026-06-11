import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required (min 2 chars)' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  username: z.string().min(4, { message: 'Username must be at least 4 characters' }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: 'Phone must be a valid 10-digit number' }),
  phoneOtp: z.string().min(4, { message: 'OTP is required' }),
  email: z.string().email({ message: 'Email must be a valid email address' }),
  emailOtp: z.string().min(4, { message: 'OTP is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  referralCode: z.string().optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export type SignupFields = z.infer<typeof signupSchema>;
