/*
 * Same question set as the mobile app's onboarding flow
 * (Mobile App/moodler/modules/onboarding/utils/onboardingQuestions.ts),
 * kept in its own module so future questions/i18n only touch this file.
 */
export interface OnboardingQuestion {
  id: 'goals' | 'activities' | 'daily_challenges'
  text: string
  type: 'chips'
  options: string[]
}

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 'goals',
    text: 'What personal goals matter most to you right now?',
    type: 'chips',
    options: [
      'Reduce Stress',
      'Improve Focus',
      'Sleep Better',
      'Build Healthy Habits',
      'Feel More Confident',
      'Better Work-Life Balance',
    ],
  },
  {
    id: 'activities',
    text: 'What activities interest you?',
    type: 'chips',
    options: ['Meditation', 'Exercise', 'Reading', 'Social Events', 'Creative Arts'],
  },
  {
    id: 'daily_challenges',
    text: 'What challenges do you face in daily life?',
    type: 'chips',
    options: [
      'Work Pressure',
      'Studies Stress',
      'Family Responsibilities',
      'Lack of Motivation',
      'Health Issues',
      'Money and Financial Stress',
    ],
  },
]
