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
    .min(5, 'Password must be at least 8 characters long'),
  phone: z.string({ required_error: 'Please provide your phone number' }),
  address: z
    .string({ required_error: 'Please provide your address' })
    .min(1, 'Address is required')
})

export const updateUserSchema = z.object({
  image: z.string().optional(),
  name: z
    .string({ required_error: 'Please provide your name' })
    .min(1, 'Name is required'),
  email: z
    .string({ required_error: 'Please provide your email' })
    .email('Invalid email address'),
  phone: z.string({ required_error: 'Please provide your phone number' }),
  address: z
    .string({ required_error: 'Please provide your address' })
    .min(1, 'Address is required')
})
