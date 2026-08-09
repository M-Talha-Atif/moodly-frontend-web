import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Settings } from 'lucide-react'
import { Logo, Text, ErrorBanner } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { ROUTES } from '@/shared/config/constants'
import { useSessionStore } from '@/entities/session'
import { onboardingQuestions } from '../model/onboardingQuestions'
import {
  answerQuestion,
  completeOnboarding,
  getOnboardingStatus,
  setActivities,
  setGoals,
  startOnboarding,
} from '../api/onboardingApi'
import { ChatBubble } from './ChatBubble'
import { QuestionInput } from './QuestionInput'
import { ProgressFooter } from './ProgressFooter'

export function OnboardingFlow() {
  const navigate = useNavigate()
  const { user, accessToken, updateUser } = useSessionStore()

  const [step, setStep] = useState(0)
  const [input, setInput] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBuildingProfile, setIsBuildingProfile] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = onboardingQuestions[step]

  useEffect(() => {
    let cancelled = false

    async function init() {
      if (!accessToken) {
        setError(strings.onboarding.sessionExpired)
        setIsLoading(false)
        setTimeout(() => navigate(ROUTES.login), 1500)
        return
      }

      if (user?.onboardingCompleted) {
        navigate(ROUTES.app)
        return
      }

      try {
        const status = await getOnboardingStatus()
        if (cancelled) return

        if (status.completed) {
          updateUser({ onboardingCompleted: true })
          navigate(ROUTES.app)
          return
        }

        if (!status.started) {
          await startOnboarding()
          setStep(0)
        } else {
          setStep(Math.min(status.currentStep ?? 0, onboardingQuestions.length - 1))
        }
      } catch {
        if (!cancelled) setError(strings.onboarding.error)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    init()
    return () => {
      cancelled = true
    }
    // Intentionally runs once on mount only; re-running on every session/user
    // change would restart the onboarding init flow mid-step.
  }, [])

  const runCompletionAnimation = () => {
    setIsBuildingProfile(true)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setProgressValue(Math.min(progress, 100))
      if (progress >= 100) {
        clearInterval(interval)
        completeOnboarding()
          .then(() => {
            updateUser({ onboardingCompleted: true })
            setTimeout(() => navigate(ROUTES.app), 400)
          })
          .catch(() => {
            setError(strings.onboarding.error)
            setIsBuildingProfile(false)
          })
      }
    }, 200)
  }

  const handleNext = async () => {
    if (!currentQuestion) return

    setError(null)
    setIsSubmitting(true)
    try {
      if (currentQuestion.id === 'goals') {
        await setGoals(input)
      } else if (currentQuestion.id === 'activities') {
        await setActivities(input)
      } else {
        // The backend's generic /onboarding/answer endpoint takes a single
        // string, so a multi-select chips question is normalized down to its
        // first pick here, same as the mobile app's OnboardingScreen does.
        const normalized = input.length > 0 ? input[0] : input
        await answerQuestion(currentQuestion.id, normalized)
      }

      setInput([])

      if (step < onboardingQuestions.length - 1) {
        setStep((s) => s + 1)
      } else {
        runCompletionAnimation()
      }
    } catch {
      setError(strings.onboarding.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Text variant="caption">{strings.onboarding.loading}</Text>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col bg-background px-4 py-10">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        {error && (
          <div className="mb-4">
            <ErrorBanner message={error} />
          </div>
        )}

        <div className="flex flex-1 flex-col justify-center">
          <AnimatePresence mode="wait">
            {isBuildingProfile ? (
              <motion.div
                key="building"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                >
                  <Settings className="size-10 text-ink" />
                </motion.div>
                <Text variant="header">{strings.onboarding.buildingTitle}</Text>
                <Text variant="caption" className="max-w-xs">
                  {strings.onboarding.buildingSubtitle}
                </Text>
                <Text variant="subheader">{progressValue}%</Text>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-8"
              >
                <div className="flex justify-center">
                  <Logo size={72} />
                </div>
                <ChatBubble text={currentQuestion.text} />
                <QuestionInput question={currentQuestion} value={input} onChange={setInput} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isBuildingProfile && (
          <ProgressFooter
            step={step}
            total={onboardingQuestions.length}
            onNext={handleNext}
            disabled={input.length === 0}
            loading={isSubmitting}
          />
        )}
      </div>
    </div>
  )
}
