import { Link } from 'react-router-dom'
import { AuthShell } from '@/widgets/AuthShell'
import { LoginForm } from '@/features/auth'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'

export function LoginPage() {
  return (
    <AuthShell
      title={strings.auth.loginTitle}
      subtitle={strings.auth.loginSubtitle}
      footer={
        <>
          {strings.auth.noAccount}{' '}
          <Link to={ROUTES.signup} className="font-bold text-ink">
            {strings.auth.noAccountLink}
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
