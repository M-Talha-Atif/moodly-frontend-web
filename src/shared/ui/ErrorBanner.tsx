interface ErrorBannerProps {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="rounded-card border border-error-border bg-error-bg px-3 py-2.5 text-center">
      <p className="text-sm font-semibold text-error-text">{message}</p>
    </div>
  )
}
