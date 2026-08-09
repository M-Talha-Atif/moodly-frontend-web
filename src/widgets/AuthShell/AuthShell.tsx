import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, Text } from '@/shared/ui'

interface AuthShellProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <Container className="max-w-md">
        <div className="rounded-feature border border-border bg-surface p-8 shadow-card">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <Link to="/" aria-label="Moodly home">
              <Logo size={56} />
            </Link>
            <Text variant="display" className="text-2xl">
              {title}
            </Text>
            <Text variant="caption">{subtitle}</Text>
          </div>

          {children}

          <div className="mt-6 text-center text-sm text-body">{footer}</div>
        </div>
      </Container>
    </div>
  )
}
