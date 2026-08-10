export type UserRole = 'user' | 'host' | 'admin'
export type AccountStatus = 'active' | 'suspended' | 'deactivated'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  onboardingCompleted: boolean
}

/*
 * GET /profile's actual response shape. Deliberately not the same as User:
 * the backend hand-builds this from a plain object literal with no formal
 * response DTO, and it is a different, narrower field set (no id/role/
 * onboardingCompleted). GET /auth/me looked like the obvious place to get
 * the current user's display name, but it returns the raw JWT payload
 * ({sub, email, role, iat, exp}), which has no name, so profile data reads
 * always go through this endpoint instead.
 */
export interface UserProfile {
  name: string
  email: string
  avatarUrl: string | null
  accountStatus: AccountStatus
}
