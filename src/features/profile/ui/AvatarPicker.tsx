import { useRef, useState } from 'react'
import { strings } from '@/shared/config/strings/en'

interface AvatarPickerProps {
  currentUrl: string | null
  onSelect: (file: File) => void
}

export function AvatarPicker({ currentUrl, onSelect }: AvatarPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setPreviewUrl(URL.createObjectURL(file))
    onSelect(file)
  }

  const displayUrl = previewUrl ?? currentUrl

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="flex flex-col items-center gap-2"
    >
      <span className="flex size-28 items-center justify-center overflow-hidden rounded-full border border-border bg-border">
        {displayUrl ? (
          <img src={displayUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-muted">?</span>
        )}
      </span>
      <span className="text-xs font-semibold text-muted">{strings.profile.changePhoto}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </button>
  )
}
