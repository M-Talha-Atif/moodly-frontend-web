import { ChipSelector } from '@/shared/ui'
import type { OnboardingQuestion } from '../model/onboardingQuestions'

interface QuestionInputProps {
  question: OnboardingQuestion
  value: string[]
  onChange: (value: string[]) => void
}

export function QuestionInput({ question, value, onChange }: QuestionInputProps) {
  return (
    <div className="mt-4">
      <ChipSelector options={question.options} value={value} onChange={onChange} />
    </div>
  )
}
