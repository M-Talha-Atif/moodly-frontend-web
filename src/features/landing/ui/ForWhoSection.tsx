import { Sparkles, Smile } from 'lucide-react'
import { Card, Container, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'

export function ForWhoSection() {
  const cards = [
    {
      icon: Smile,
      iconBg: 'bg-icon-indigo-bg',
      title: strings.landing.forYouTitle,
      description: strings.landing.forYouDescription,
    },
    {
      icon: Sparkles,
      iconBg: 'bg-icon-amber-bg',
      title: strings.landing.forHostsTitle,
      description: strings.landing.forHostsDescription,
    },
  ]

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map(({ icon: Icon, iconBg, title, description }) => (
            <Card key={title} className="flex flex-col gap-4">
              <span className={`flex size-11 items-center justify-center rounded-card ${iconBg}`}>
                <Icon className="size-5 text-ink" />
              </span>
              <Text variant="header">{title}</Text>
              <Text variant="body" className="text-body">
                {description}
              </Text>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
