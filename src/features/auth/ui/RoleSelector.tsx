import { Star, User as UserIcon } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { strings } from '@/shared/config/strings/en'
import type { UserRole } from '@/entities/user'

interface RoleSelectorProps {
  value: Extract<UserRole, 'user' | 'host'>
  onChange: (role: Extract<UserRole, 'user' | 'host'>) => void
  disabled?: boolean
}

export function RoleSelector({ value, onChange, disabled }: RoleSelectorProps) {
  const options: {
    role: Extract<UserRole, 'user' | 'host'>
    title: string
    description: string
    icon: typeof UserIcon
    activeBorder: string
    activeBg: string
    iconBg: string
  }[] = [
    {
      role: 'user',
      title: strings.auth.roleUserTitle,
      description: strings.auth.roleUserDescription,
      icon: UserIcon,
      activeBorder: 'border-role-user',
      activeBg: 'bg-role-user-bg',
      iconBg: 'bg-role-user',
    },
    {
      role: 'host',
      title: strings.auth.roleHostTitle,
      description: strings.auth.roleHostDescription,
      icon: Star,
      activeBorder: 'border-role-host',
      activeBg: 'bg-role-host-bg',
      iconBg: 'bg-role-host',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map(({ role, title, description, icon: Icon, activeBorder, activeBg, iconBg }) => {
        const selected = value === role
        return (
          <button
            key={role}
            type="button"
            disabled={disabled}
            onClick={() => onChange(role)}
            aria-pressed={selected}
            className={cn(
              'flex flex-col items-center gap-2 rounded-card border px-4 py-4 text-center transition-colors',
              selected ? cn(activeBorder, activeBg) : 'border-border bg-background',
            )}
          >
            <span
              className={cn(
                'flex size-10 items-center justify-center rounded-full text-white',
                selected ? iconBg : 'bg-disabled',
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-bold text-ink">{title}</span>
            <span className="text-xs text-muted">{description}</span>
          </button>
        )
      })}
    </div>
  )
}
