import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBooking } from './bookingApi'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (_data, experienceId) => {
      queryClient.invalidateQueries({ queryKey: ['experience', experienceId] })
      queryClient.invalidateQueries({ queryKey: ['experiences'] })
    },
  })
}
