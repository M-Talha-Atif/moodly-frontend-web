import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button, Card, ErrorBanner, Input, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { useUpdatePassword } from '@/entities/user'
import { ApiError } from '@/shared/types/api'
import { changePasswordSchema, type ChangePasswordValues } from '../model/passwordSchema'

export function ChangePasswordForm() {
  const updatePassword = useUpdatePassword()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordValues>({ resolver: zodResolver(changePasswordSchema) })

  const onSubmit = handleSubmit((values) => {
    updatePassword.mutate(
      { oldPassword: values.oldPassword, newPassword: values.newPassword },
      {
        onSuccess: () => {
          toast.success(strings.profile.passwordSuccess)
          reset()
        },
        onError: (error) => {
          if (error instanceof ApiError && error.errorType === 'INVALID_OLD_PASSWORD') {
            setError('oldPassword', { message: strings.profile.invalidOldPassword })
          }
        },
      },
    )
  })

  const errorMessage =
    updatePassword.error instanceof ApiError && updatePassword.error.errorType !== 'INVALID_OLD_PASSWORD'
      ? updatePassword.error.errorType === 'NO_PASSWORD_ACCOUNT'
        ? strings.profile.noPasswordAccount
        : strings.profile.genericPasswordError
      : null

  return (
    <Card>
      <Text variant="header" className="mb-4 text-lg">
        {strings.profile.passwordSectionTitle}
      </Text>

      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        {errorMessage && <ErrorBanner message={errorMessage} />}

        <Input
          label={strings.profile.oldPasswordLabel}
          placeholder={strings.profile.oldPasswordPlaceholder}
          type="password"
          autoComplete="current-password"
          error={errors.oldPassword?.message}
          {...register('oldPassword')}
        />

        <Input
          label={strings.profile.newPasswordLabel}
          placeholder={strings.profile.newPasswordPlaceholder}
          type="password"
          autoComplete="new-password"
          hint={strings.profile.newPasswordHint}
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />

        <Input
          label={strings.profile.confirmPasswordLabel}
          placeholder={strings.profile.confirmPasswordPlaceholder}
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" loading={updatePassword.isPending} fullWidth>
          {updatePassword.isPending
            ? strings.profile.changingPassword
            : strings.profile.changePassword}
        </Button>
      </form>
    </Card>
  )
}
