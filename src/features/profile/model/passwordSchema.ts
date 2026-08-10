import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'New password must be different from the current one',
    path: ['newPassword'],
  })

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>
