import { Container, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { useProfile } from '@/entities/user'
import { AppHeader } from '@/widgets/AppHeader'
import { EditProfileForm } from './EditProfileForm'
import { ChangePasswordForm } from './ChangePasswordForm'

export function ProfileFlow() {
  const { data: profile, isLoading } = useProfile()

  return (
    <div className="min-h-svh bg-background">
      <AppHeader />

      <Container className="max-w-xl py-10">
        <Text variant="display" className="mb-6 text-3xl">
          {strings.profile.title}
        </Text>

        {isLoading || !profile ? (
          <Text variant="caption">{strings.profile.loading}</Text>
        ) : (
          <div className="flex flex-col gap-6">
            <EditProfileForm profile={profile} />
            <ChangePasswordForm />
          </div>
        )}
      </Container>
    </div>
  )
}
