import { Link } from 'react-router-dom'
import { Button, Card, Container, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'
import { useProfile } from '@/entities/user'
import { useTodayMoodLog, useMoodStreak } from '@/features/dailyCheckIn'
import { AppHeader } from '@/widgets/AppHeader'

export function AppHomePage() {
  const { data: profile } = useProfile()
  const { data: todayLog, isLoading: isTodayLoading } = useTodayMoodLog()
  const { data: streak } = useMoodStreak()

  return (
    <div className="min-h-svh bg-background">
      <AppHeader />

      <Container className="flex flex-col gap-6 py-10">
        <Text variant="display" className="text-3xl">
          {strings.home.greeting}
          {profile?.name ? `, ${profile.name}` : ''}
        </Text>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <Text variant="caption">{strings.home.streakLabel}</Text>
            <Text variant="display" className="mt-2 text-4xl">
              {streak?.streak ?? 0}
            </Text>
          </Card>

          {!isTodayLoading && (
            <Card className="flex flex-col justify-between gap-4">
              {todayLog ? (
                <Text variant="subheader">{strings.home.checkedInTitle}</Text>
              ) : (
                <>
                  <div>
                    <Text variant="subheader">{strings.home.checkInPromptTitle}</Text>
                    <Text variant="caption" className="mt-1">
                      {strings.home.checkInPromptDescription}
                    </Text>
                  </div>
                  <Link to={ROUTES.dailyCheckIn}>
                    <Button fullWidth>{strings.home.checkInCta}</Button>
                  </Link>
                </>
              )}
            </Card>
          )}
        </div>
      </Container>
    </div>
  )
}
