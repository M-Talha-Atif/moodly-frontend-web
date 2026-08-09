import { cn } from '@/shared/lib/cn'

interface LogoProps {
  size?: number
  className?: string
}

/*
 * Lightweight recreation of the mobile app's mark. The source
 * (Mobile App/moodler/assets/images/logo.svg) embeds a large raster image
 * and is too heavy to ship on the web, so this is a vector-only equivalent
 * using the same brand colors (#030303 / #7bf163).
 */
export function Logo({ size = 64, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn(className)}
      role="img"
      aria-label="Moodly"
    >
      <rect width="64" height="64" rx="18" fill="var(--color-ink)" />
      <circle cx="32" cy="27" r="13" fill="var(--color-accent)" />
      <path
        d="M19 43c3-4 8-6 13-6s10 2 13 6"
        stroke="var(--color-button-text)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
