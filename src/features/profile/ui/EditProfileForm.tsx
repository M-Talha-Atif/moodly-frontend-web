import { useState } from 'react'
import { toast } from 'sonner'
import { Button, Card, ErrorBanner, Input } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { useUpdateProfile, type UserProfile } from '@/entities/user'
import { ApiError } from '@/shared/types/api'
import { AvatarPicker } from './AvatarPicker'

interface EditProfileFormProps {
  profile: UserProfile
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const [name, setName] = useState(profile.name)
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined)
  const updateProfile = useUpdateProfile()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    updateProfile.mutate(
      { name, avatarFile },
      {
        onSuccess: () => {
          toast.success(strings.profile.saveSuccess)
          setAvatarFile(undefined)
        },
      },
    )
  }

  const errorMessage =
    updateProfile.error instanceof ApiError
      ? updateProfile.error.message
      : updateProfile.isError
        ? strings.profile.saveError
        : null

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <AvatarPicker currentUrl={profile.avatarUrl} onSelect={setAvatarFile} />

        {errorMessage && <ErrorBanner message={errorMessage} />}

        <div className="w-full">
          <Input
            label={strings.profile.nameLabel}
            placeholder={strings.profile.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <Button type="submit" loading={updateProfile.isPending} fullWidth>
          {updateProfile.isPending ? strings.profile.saving : strings.profile.save}
        </Button>
      </form>
    </Card>
  )
}
