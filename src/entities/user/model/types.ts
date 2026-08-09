export type UserRole = 'user' | 'host' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  onboardingCompleted: boolean
}
