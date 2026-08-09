import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/shared/config/constants'
import { ProtectedRoute } from './ProtectedRoute'

const LandingPage = lazy(() =>
  import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
)
const LoginPage = lazy(() => import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
const SignupPage = lazy(() =>
  import('@/pages/SignupPage').then((m) => ({ default: m.SignupPage })),
)
const OnboardingPage = lazy(() =>
  import('@/pages/OnboardingPage').then((m) => ({ default: m.OnboardingPage })),
)
const AppHomePage = lazy(() =>
  import('@/pages/AppHomePage').then((m) => ({ default: m.AppHomePage })),
)
const DailyCheckInPage = lazy(() =>
  import('@/pages/DailyCheckInPage').then((m) => ({ default: m.DailyCheckInPage })),
)

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-svh bg-background" />}>
        <Routes>
          <Route path={ROUTES.landing} element={<LandingPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.signup} element={<SignupPage />} />
          <Route
            path={ROUTES.onboarding}
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.app}
            element={
              <ProtectedRoute>
                <AppHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.dailyCheckIn}
            element={
              <ProtectedRoute>
                <DailyCheckInPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
