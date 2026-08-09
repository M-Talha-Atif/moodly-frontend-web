import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, ErrorBanner, Logo, Text } from '@/shared/ui'
import { ROUTES } from '@/shared/config/constants'
import { strings } from '@/shared/config/strings/en'
import { ApiError } from '@/shared/types/api'
import { MoodWheel } from './MoodWheel'
import { useCreateMoodLog, useTodayMoodLog } from '../api/useMoodLog'

export function DailyCheckInFlow() {
  const navigate = useNavigate()
  const { data: todayLog, isLoading } = useTodayMoodLog()
  const createMoodLog = useCreateMoodLog()

  const [moodId, setMoodId] = useState<string | null>(null)
  const [note, setNote] = useState('')

  const handleSubmit = () => {
    if (!moodId) return
    createMoodLog.mutate(
      { moodLabel: moodId, note: note.trim() || undefined },
      { onSuccess: () => navigate(ROUTES.app) },
    )
  }

  const errorMessage =
    createMoodLog.error instanceof ApiError
      ? createMoodLog.error.message
      : createMoodLog.isError
        ? strings.dailyCheckIn.error
        : null

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Text variant="caption">{strings.dailyCheckIn.loading}</Text>
      </div>
    )
  }

  if (todayLog) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background px-4">
        <Container className="max-w-md text-center">
          <Logo size={56} className="mx-auto mb-4" />
          <Text variant="header">{strings.dailyCheckIn.alreadyLoggedTitle}</Text>
          <Text variant="caption" className="mt-2">
            {strings.dailyCheckIn.alreadyLoggedMood}: {todayLog.moodLabel}
          </Text>
          <Button onClick={() => navigate(ROUTES.app)} className="mt-6">
            {strings.dailyCheckIn.goToHome}
          </Button>
        </Container>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh justify-center bg-background px-4 py-12">
      <Container className="max-w-lg">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Logo size={56} />
          <Text variant="header">{strings.dailyCheckIn.title}</Text>
          <Text variant="caption">{strings.dailyCheckIn.subtitle}</Text>
        </div>

        {errorMessage && (
          <div className="mb-4">
            <ErrorBanner message={errorMessage} />
          </div>
        )}

        <MoodWheel value={moodId} onChange={setMoodId} />

        <div className="mt-6 flex flex-col gap-1.5">
          <label htmlFor="mood-note" className="text-sm font-semibold text-body">
            {strings.dailyCheckIn.noteLabel}
          </label>
          <textarea
            id="mood-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={strings.dailyCheckIn.notePlaceholder}
            rows={3}
            className="w-full rounded-card border border-border bg-surface px-3.5 py-3 text-base text-input-text placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-ink/10"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!moodId}
          loading={createMoodLog.isPending}
          fullWidth
          className="mt-6"
        >
          {strings.dailyCheckIn.submit}
        </Button>
      </Container>
    </div>
  )
}
