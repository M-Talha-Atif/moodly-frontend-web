import { SiteHeader } from '@/widgets/SiteHeader'
import { SiteFooter } from '@/widgets/SiteFooter'
import { Hero, ForWhoSection, HowItWorks, CTASection } from '@/features/landing'

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ForWhoSection />
        <HowItWorks />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  )
}
