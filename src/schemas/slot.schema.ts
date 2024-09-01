import { z } from 'zod'
import dayjs from 'dayjs'

export const createSlotSchema = z.object({
  service: z.string().length(24, 'Invalid service ID. Please try again.'),
  date: z
    .any()
    .refine((val) => dayjs(val).isValid(), {
      message: 'Please provide a valid date.'
    })
    .transform((val) => dayjs(val).toISOString()),
  time: z
    .array(
      z
        .any()
        .refine((val) => dayjs(val).isValid(), {
          message: 'Invalid time format. Please select a valid time.'
        })
        .transform((val) => dayjs(val).toISOString())
    )
    .length(2, 'Start and end times are required.')
})
