import { cn } from '@/shared/lib/cn'

interface ChipSelectorProps {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  multiple?: boolean
}

export function ChipSelector({
  options,
  value,
  onChange,
  multiple = true,
}: ChipSelectorProps) {
  const toggle = (option: string) => {
    if (!multiple) {
      onChange([option])
      return
    }
    onChange(
      value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option],
    )
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const selected = value.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            aria-pressed={selected}
            className={cn(
              'rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors',
              selected
                ? 'border-ink bg-ink text-button-text'
                : 'border-border bg-surface text-body hover:bg-background',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
