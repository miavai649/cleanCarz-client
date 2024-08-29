import { z } from 'zod'

const addServiceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string({ invalid_type_error: 'Price is number' }),
  duration: z.string().min(1, 'Duration is required'),
  image: z.any().refine((file) => file instanceof File, 'Invalid file type')
})

export default addServiceSchema
