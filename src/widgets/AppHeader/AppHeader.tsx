import { Link, useLocation } from 'react-router-dom'
import { Container, Logo, Text } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'
import { useLogout } from '@/features/auth/api/useLogout'

const navItems = [
  { to: ROUTES.app, label: strings.nav.home },
  { to: ROUTES.explore, label: strings.nav.explore },
]

export function AppHeader() {
  const location = useLocation()
  const logout = useLogout()

  return (
    <header className="border-b border-border">
      <Container className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={ROUTES.app} className="flex items-center gap-2.5">
            <Logo size={32} />
            <Text variant="header" as="span">
              {strings.brand.name}
            </Text>
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'text-sm font-semibold text-muted hover:text-ink',
                  location.pathname === item.to && 'text-ink',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
  )
}
