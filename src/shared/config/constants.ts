export const ROUTES = {
  landing: '/',
  login: '/login',
  signup: '/signup',
  onboarding: '/onboarding',
  app: '/app',
  dailyCheckIn: '/daily-check-in',
  explore: '/explore',
  experienceDetail: '/experience/:id',
  bookings: '/bookings',
  profile: '/profile',
} as const

export function experienceDetailPath(id: string) {
  return `/experience/${id}`
}

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3002/v1'

export const AUTH_STORAGE_KEY = 'moodly-auth'
