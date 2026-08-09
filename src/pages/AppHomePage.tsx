import { Link } from 'react-router-dom'
import { Button, Card, Container, Logo, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'
import { useCurrentUser } from '@/entities/user'
import { useTodayMoodLog, useMoodStreak } from '@/features/dailyCheckIn'
import { useLogout } from '@/features/auth/api/useLogout'

export function AppHomePage() {
  const { data: user } = useCurrentUser()
  const { data: todayLog, isLoading: isTodayLoading } = useTodayMoodLog()
  const { data: streak } = useMoodStreak()
  const logout = useLogout()

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border">
        <Container className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <Text variant="header" as="span">
              {strings.brand.name}
            </Text>
          </div>
          <button
            type="button"
            onClick={() => logout()}
            className="text-sm font-semibold text-muted hover:text-ink"
          >
            {strings.home.signOut}
          </button>
        </Container>
      </header>

      <Container className="flex flex-col gap-6 py-10">
        <Text variant="display" className="text-3xl">
          {strings.home.greeting}
          {user?.name ? `, ${user.name}` : ''}
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
