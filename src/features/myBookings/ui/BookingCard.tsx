import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Text } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { strings } from '@/shared/config/strings/en'
import { experienceDetailPath } from '@/shared/config/constants'
import type { BookingStatus, BookingSummary } from '@/features/booking'

const statusLabel: Record<BookingStatus, string> = {
  confirmed: strings.myBookings.statusConfirmed,
  cancelled: strings.myBookings.statusCancelled,
  waitlisted: strings.myBookings.statusWaitlisted,
}

const statusClasses: Record<BookingStatus, string> = {
  confirmed: 'bg-role-user-bg text-role-user',
  cancelled: 'bg-error-bg text-error-text',
  waitlisted: 'bg-icon-amber-bg text-ink',
}

interface BookingCardProps {
  booking: BookingSummary
  onCancel: () => void
  isCancelling: boolean
}

export function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
  const [confirming, setConfirming] = useState(false)
  const canCancel = booking.status !== 'cancelled'

  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <Link
          to={experienceDetailPath(booking.experience.id)}
          className="text-base font-semibold text-ink hover:underline"
        >
          {booking.experience.title}
        </Link>
        <Text variant="caption" className="mt-1">
          {new Date(booking.experience.date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <span
          className={cn(
            'mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold',
            statusClasses[booking.status],
          )}
        >
          {statusLabel[booking.status]}
        </span>
      </div>

      {canCancel && !confirming && (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="shrink-0 text-sm font-semibold text-error-text hover:underline"
        >
          {strings.myBookings.cancelCta}
        </button>
      )}

      {canCancel && confirming && (
        <div className="flex shrink-0 items-center gap-3">
          <Text variant="caption">{strings.myBookings.cancelConfirm}</Text>
          <button
            type="button"
            onClick={onCancel}
            disabled={isCancelling}
            className="text-sm font-semibold text-error-text hover:underline disabled:opacity-60"
          >
            {strings.myBookings.cancelConfirmYes}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={isCancelling}
            className="text-sm font-semibold text-muted hover:text-ink disabled:opacity-60"
          >
            {strings.myBookings.cancelConfirmNo}
          </button>
        </div>
      )}
    </Card>
  )
}
