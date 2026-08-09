import { Container, Logo, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <Container className="flex flex-col items-center gap-3 text-center">
        <Logo size={32} />
        <Text variant="caption">{strings.landing.footerTagline}</Text>
        <Text variant="micro">
          {new Date().getFullYear()} {strings.brand.name}
        </Text>
      </Container>
    </footer>
  )
}
