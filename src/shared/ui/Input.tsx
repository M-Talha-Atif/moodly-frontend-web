import { type InputHTMLAttributes, forwardRef, useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, type, id, className, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const [visible, setVisible] = useState(false)
    const isPassword = type === 'password'

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-semibold text-body">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (visible ? 'text' : 'password') : type}
            className={cn(
              'w-full rounded-card border border-border bg-surface px-3.5 py-3.5 text-base text-input-text placeholder:text-placeholder',
              'focus:outline-none focus:ring-2 focus:ring-ink/10',
              isPassword && 'pr-11',
              error && 'border-error-border',
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
              aria-label={visible ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          )}
        </div>
        {hint && !error && <p className="text-xs text-muted">{hint}</p>}
        {error && <p className="text-xs font-semibold text-error-text">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'
