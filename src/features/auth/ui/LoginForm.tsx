import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button, ErrorBanner, Input } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'
import { ApiError } from '@/shared/types/api'
import { loginSchema, type LoginValues } from '../model/authSchema'
import { useLogin } from '../api/useLogin'

export function LoginForm() {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        navigate(data.user.onboardingCompleted ? ROUTES.app : ROUTES.onboarding)
      },
    })
  })

  const errorMessage =
    loginMutation.error instanceof ApiError
      ? loginMutation.error.message
      : loginMutation.isError
        ? strings.auth.genericError
        : null

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <Input
        label={strings.auth.emailLabel}
        placeholder={strings.auth.emailPlaceholder}
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label={strings.auth.passwordLabel}
        placeholder={strings.auth.passwordPlaceholder}
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" fullWidth loading={loginMutation.isPending} className="mt-2">
        {loginMutation.isPending ? strings.auth.submitLoginLoading : strings.auth.submitLogin}
      </Button>
    </form>
  )
}
