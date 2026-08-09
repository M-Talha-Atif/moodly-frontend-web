import type { ElementType, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type TextVariant =
  | 'display'
  | 'header'
  | 'subheader'
  | 'body'
  | 'micro'
  | 'label'
  | 'caption'

const variantClasses: Record<TextVariant, string> = {
  display: 'text-[32px] font-extrabold tracking-tight text-ink',
  header: 'text-[20px] font-semibold text-ink',
  subheader: 'text-lg font-medium text-ink',
  body: 'text-base font-normal text-body',
  micro: 'text-xs font-normal tracking-wide text-muted',
  label: 'text-base font-medium uppercase tracking-wide text-body',
  caption: 'text-sm font-normal text-muted',
}

const defaultElement: Record<TextVariant, ElementType> = {
  display: 'h1',
  header: 'h2',
  subheader: 'h3',
  body: 'p',
  micro: 'span',
  label: 'span',
  caption: 'p',
}

interface TextProps {
  variant?: TextVariant
  as?: ElementType
  className?: string
  children: ReactNode
}

export function Text({ variant = 'body', as, className, children }: TextProps) {
  const Component = as ?? defaultElement[variant]
  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  )
}
