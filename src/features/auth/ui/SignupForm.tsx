import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, ErrorBanner, Input } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'
import { ApiError } from '@/shared/types/api'
import { signupSchema, type SignupValues } from '../model/authSchema'
import { useSignup } from '../api/useSignup'
import { RoleSelector } from './RoleSelector'

export function SignupForm() {
  const navigate = useNavigate()
  const signupMutation = useSignup()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { role: 'user' },
  })

  const role = watch('role')

  const onSubmit = handleSubmit((values) => {
    signupMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Account created. Please sign in.')
        navigate(ROUTES.login)
      },
    })
  })

  const errorMessage =
    signupMutation.error instanceof ApiError
      ? signupMutation.error.message
      : signupMutation.isError
        ? strings.auth.genericError
        : null

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <div className="flex flex-col gap-3">
        <p className="text-center text-sm font-semibold text-body">
          {strings.auth.roleLabel}
        </p>
        <RoleSelector
          value={role}
          onChange={(value) => setValue('role', value)}
          disabled={signupMutation.isPending}
        />
      </div>

      <Input
        label={strings.auth.fullNameLabel}
        placeholder={strings.auth.fullNamePlaceholder}
        autoComplete="name"
        error={errors.name?.message}
        {...register('name')}
      />

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
        autoComplete="new-password"
        hint={strings.auth.passwordHint}
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        label={strings.auth.confirmPasswordLabel}
        placeholder={strings.auth.confirmPasswordPlaceholder}
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" fullWidth loading={signupMutation.isPending} className="mt-2">
        {signupMutation.isPending
          ? strings.auth.submitSignupLoading
          : role === 'host'
            ? strings.auth.submitSignupHost
            : strings.auth.submitSignupUser}
      </Button>
    </form>
  )
}
