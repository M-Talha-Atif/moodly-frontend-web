import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-feature border border-border bg-surface p-5 shadow-card',
        className,
      )}
      {...props}
    />
  )
}
