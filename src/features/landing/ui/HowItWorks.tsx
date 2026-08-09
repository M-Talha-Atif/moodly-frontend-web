import { Container, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'

export function HowItWorks() {
  const steps = [
    { title: strings.landing.step1Title, description: strings.landing.step1Description },
    { title: strings.landing.step2Title, description: strings.landing.step2Description },
    { title: strings.landing.step3Title, description: strings.landing.step3Description },
  ]

  return (
    <section className="border-y border-border bg-surface py-16 sm:py-20">
      <Container>
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {strings.landing.howItWorksEyebrow}
          </span>
          <Text variant="header" className="mt-2 text-2xl">
            {strings.landing.howItWorksTitle}
          </Text>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-button-text">
                {index + 1}
              </span>
              <Text variant="subheader">{step.title}</Text>
              <Text variant="caption">{step.description}</Text>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
