import { Link } from 'react-router-dom'
import { Button, Container, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'

export function CTASection() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Text variant="display" className="max-w-xl text-3xl sm:text-4xl">
          {strings.landing.heroTitle}
        </Text>
        <Link to={ROUTES.signup}>
          <Button className="px-10">{strings.landing.ctaPrimary}</Button>
        </Link>
      </Container>
    </section>
  )
}
