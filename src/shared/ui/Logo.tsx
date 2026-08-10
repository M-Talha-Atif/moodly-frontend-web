import { cn } from '@/shared/lib/cn'

interface LogoProps {
  size?: number
  className?: string
}

/*
 * The mobile app's actual mark (Mobile App/moodler/assets/images/
 * ic_launcher_foreground.png, its configured app icon), not a recreation.
 * The source logo.svg embeds a large raster and is too heavy to ship on the
 * web, but this launcher-icon export of the same mark is only ~10KB.
 */
export function Logo({ size = 64, className }: LogoProps) {
  return (
    <img
      src="/logo-mark.png"
      alt="Moodly"
      width={size}
      height={size}
      className={cn('object-contain', className)}
      style={{ width: size, height: size }}
    />
  )
}
