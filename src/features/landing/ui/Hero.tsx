import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button, Container, Logo, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'

export function Hero() {
  return (
    <section className="overflow-hidden bg-background py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Logo size={64} className="mb-6" />

          <span className="mb-4 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
            {strings.landing.heroEyebrow}
          </span>

          <Text variant="display" className="max-w-2xl text-4xl sm:text-5xl">
            {strings.landing.heroTitle}
          </Text>

          <Text variant="body" className="mt-5 max-w-xl text-lg text-body">
            {strings.landing.heroSubtitle}
          </Text>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to={ROUTES.signup}>
              <Button fullWidth className="px-8">
                {strings.landing.ctaPrimary}
              </Button>
            </Link>
            <Link to={ROUTES.login}>
              <Button variant="secondary" fullWidth className="px-8">
                {strings.landing.ctaSecondary}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
