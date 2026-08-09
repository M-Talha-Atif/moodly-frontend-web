import { Link } from 'react-router-dom'
import { AuthShell } from '@/widgets/AuthShell'
import { SignupForm } from '@/features/auth'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'

export function SignupPage() {
  return (
    <AuthShell
      title={strings.auth.signupTitle}
      subtitle={strings.auth.signupSubtitle}
      footer={
        <>
          {strings.auth.hasAccount}{' '}
          <Link to={ROUTES.login} className="font-bold text-ink">
            {strings.auth.hasAccountLink}
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  )
}
