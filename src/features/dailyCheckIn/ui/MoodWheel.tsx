import { cn } from '@/shared/lib/cn'
import { strings } from '@/shared/config/strings/en'
import { moods } from '../model/moods'

interface MoodWheelProps {
  value: string | null
  onChange: (moodId: string) => void
}

export function MoodWheel({ value, onChange }: MoodWheelProps) {
  return (
    <div className="rounded-feature border border-border bg-[#F9FAFB] p-4">
      <p className="mb-4 text-center text-base font-bold text-ink">
        {strings.dailyCheckIn.moodWheelHeading}
      </p>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
        {moods.map((mood) => {
          const Icon = mood.icon
          const active = value === mood.id
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => onChange(mood.id)}
              aria-pressed={active}
              className={cn(
                'flex flex-col items-center justify-center gap-1.5 rounded-feature border px-2 py-3 transition-transform',
                active
                  ? 'scale-105 border-ink bg-ink text-button-text'
                  : 'border-border bg-surface text-ink hover:bg-background',
              )}
            >
              <Icon className="size-6" />
              <span className="text-xs font-semibold">{mood.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
