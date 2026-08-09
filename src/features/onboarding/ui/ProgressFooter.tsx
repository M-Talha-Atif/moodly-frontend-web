import { Button, ProgressBar } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'

interface ProgressFooterProps {
  step: number
  total: number
  onNext: () => void
  disabled?: boolean
  loading?: boolean
}

export function ProgressFooter({ step, total, onNext, disabled, loading }: ProgressFooterProps) {
  const isLast = step === total - 1

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-border pt-4">
      <div className="flex flex-col gap-2">
        <ProgressBar value={step + 1} max={total} />
        <p className="text-right text-sm font-semibold text-muted">
          Step {step + 1} of {total}
        </p>
      </div>
      <Button onClick={onNext} disabled={disabled} loading={loading} fullWidth>
        {isLast ? strings.onboarding.finish : strings.onboarding.next}
      </Button>
    </div>
  )
}
