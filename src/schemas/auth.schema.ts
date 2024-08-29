import { z } from 'zod'

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Please provide your name' })
    .min(1, 'Name is required'),
  email: z
    .string({ required_error: 'Please provide your email' })
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Please provide a password' })
    .min(8, 'Password must be at least 8 characters long'),
  phoneNumber: z
    .string({ required_error: 'Please provide your phone number' })
    .regex(/^01[3-9]\d{8}$/, 'Invalid phone number format'),
  address: z
    .string({ required_error: 'Please provide your address' })
    .min(1, 'Address is required'),
  image: z
    .any({ required_error: 'Please provide an image' })
    .refine((file) => file instanceof File, {
      message: 'Invalid file type'
    })
})
