import { useState } from 'react'
import { toast } from 'sonner'
import { Container, ErrorBanner, Text } from '@/shared/ui'
import { cn } from '@/shared/lib/cn'
import { strings } from '@/shared/config/strings/en'
import { useBookings, useCancelBooking, type BookingStatus } from '@/features/booking'
import { AppHeader } from '@/widgets/AppHeader'
import { BookingCard } from './BookingCard'

const filters: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'all', label: strings.myBookings.filterAll },
  { value: 'confirmed', label: strings.myBookings.filterConfirmed },
  { value: 'waitlisted', label: strings.myBookings.filterWaitlisted },
  { value: 'cancelled', label: strings.myBookings.filterCancelled },
]

export function MyBookingsFlow() {
  const [status, setStatus] = useState<BookingStatus | 'all'>('all')
  const { data, isLoading, isError } = useBookings({
    status: status === 'all' ? undefined : status,
    limit: 50,
  })
  const cancelBooking = useCancelBooking()

  const handleCancel = (id: string) => {
    cancelBooking.mutate(id, {
      onSuccess: () => toast.success(strings.myBookings.cancelSuccess),
      onError: () => toast.error(strings.myBookings.cancelError),
    })
  }

  return (
    <div className="min-h-svh bg-background">
      <AppHeader />

      <Container className="flex flex-col gap-6 py-10">
        <div>
          <Text variant="display" className="text-3xl">
            {strings.myBookings.title}
          </Text>
          <Text variant="caption" className="mt-1">
            {strings.myBookings.subtitle}
          </Text>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatus(filter.value)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                status === filter.value
                  ? 'border-ink bg-ink text-button-text'
                  : 'border-border bg-surface text-body hover:bg-background',
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {isError && <ErrorBanner message={strings.myBookings.error} />}

        {!isLoading && data?.data.length === 0 && (
          <Text variant="caption">{strings.myBookings.empty}</Text>
        )}

        <div className="flex flex-col gap-4">
          {data?.data.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={() => handleCancel(booking.id)}
              isCancelling={cancelBooking.isPending && cancelBooking.variables === booking.id}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
