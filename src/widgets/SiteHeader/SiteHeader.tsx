import { Link } from 'react-router-dom'
import { Button, Container, Logo, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link to={ROUTES.landing} className="flex items-center gap-2.5">
          <Logo size={36} />
          <Text variant="header" as="span">
            {strings.brand.name}
          </Text>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.login}
            className="hidden text-sm font-semibold text-body hover:text-ink sm:block"
          >
            {strings.auth.hasAccountLink}
          </Link>
          <Link to={ROUTES.signup}>
            <Button className="px-5 py-2.5 text-sm">{strings.landing.ctaPrimary}</Button>
          </Link>
        </div>
      </Container>
    </header>
  )
}
