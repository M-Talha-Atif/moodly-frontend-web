import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMoodLog, getMoodStreak, getTodayMoodLog } from './moodLogApi'
import { useSessionStore } from '@/entities/session'

export function useTodayMoodLog() {
  const accessToken = useSessionStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['moodLog', 'today'],
    queryFn: getTodayMoodLog,
    enabled: Boolean(accessToken),
  })
}

export function useMoodStreak() {
  const accessToken = useSessionStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['moodLog', 'streak'],
    queryFn: getMoodStreak,
    enabled: Boolean(accessToken),
  })
}

export function useCreateMoodLog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMoodLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodLog'] })
    },
  })
}
