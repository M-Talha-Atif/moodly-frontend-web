import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, Card, Container, ErrorBanner, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { useExperience } from '@/entities/experience'
import { useCreateBooking } from '@/features/booking'
import { ApiError } from '@/shared/types/api'
import { AppHeader } from '@/widgets/AppHeader'

function ChipRow({
  items,
  bg,
  text,
}: {
  items: string[]
  bg: string
  text: string
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: bg, color: text }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function ExperienceDetailFlow() {
  const { id } = useParams<{ id: string }>()
  const { data: experience, isLoading, isError } = useExperience(id)
  const createBooking = useCreateBooking()

  const handleBook = () => {
    if (!id) return
    createBooking.mutate(id, {
      onSuccess: () => toast.success(strings.experienceDetail.bookingSuccess),
      onError: () => toast.error(strings.experienceDetail.bookingError),
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Text variant="caption">{strings.experienceDetail.loading}</Text>
      </div>
    )
  }

  if (isError || !experience) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <ErrorBanner message={strings.experienceDetail.notFound} />
      </div>
    )
  }

  const spotsLeft = experience.totalSpots - experience.spotsFilled
  const isBooked = experience.isBooked

  return (
    <div className="min-h-svh bg-background">
      <AppHeader />

      <Container className="max-w-3xl py-10">
        <div className="h-[280px] w-full overflow-hidden rounded-feature bg-border">
          {experience.image && (
            <img
              src={experience.image}
              alt={experience.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <Text variant="display" className="text-2xl">
            {experience.title}
          </Text>
          <span className="shrink-0 rounded-md border border-ink px-3 py-1.5 text-sm font-semibold text-ink">
            {experience.price === 0 ? strings.explore.free : `$${experience.price}`}
          </span>
        </div>

        <span className="mt-2 inline-block rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted">
          {experience.isVirtual ? strings.experienceDetail.virtual : strings.experienceDetail.inPerson}
        </span>

        <Card className="mt-6 flex flex-col gap-2">
          <Text variant="body">
            {spotsLeft} {strings.experienceDetail.spotsLeft}
          </Text>
          <Text variant="caption">
            {new Date(experience.date).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
          <Text variant="caption">{experience.location}</Text>
          {experience.experienceOutcomeSummary && (
            <Text variant="body" className="mt-2">
              {experience.experienceOutcomeSummary}
            </Text>
          )}
        </Card>

        {!!experience.emotions?.length && (
          <div className="mt-6">
            <Text variant="header" className="mb-3 text-lg">
              {strings.experienceDetail.emotionsTitle}
            </Text>
            <ChipRow items={experience.emotions} bg="#FEF3C7" text="#92400E" />
          </div>
        )}

        {!!experience.outcomes?.length && (
          <div className="mt-6">
            <Text variant="header" className="mb-3 text-lg">
              {strings.experienceDetail.outcomesTitle}
            </Text>
            <ChipRow items={experience.outcomes} bg="#DBEAFE" text="#1E40AF" />
          </div>
        )}

        <div className="mt-6">
          <Text variant="header" className="mb-3 text-lg">
            {strings.experienceDetail.aboutTitle}
          </Text>
          <Text variant="body">{experience.description}</Text>
        </div>

        {!!experience.culturalTags?.length && (
          <div className="mt-6">
            <Text variant="header" className="mb-3 text-lg">
              {strings.experienceDetail.culturalTitle}
            </Text>
            <ChipRow items={experience.culturalTags} bg="#E9D5FF" text="#6B21A8" />
          </div>
        )}

        <Card className="mt-6 flex items-center gap-3">
          {experience.host.avatarUrl && (
            <img
              src={experience.host.avatarUrl}
              alt={experience.host.name}
              className="size-12 rounded-full object-cover"
            />
          )}
          <div>
            <Text variant="caption">{strings.experienceDetail.hostLabel}</Text>
            <Text variant="subheader">{experience.host.name}</Text>
            <Text variant="micro">{strings.experienceDetail.hostRole}</Text>
          </div>
        </Card>

        <Button
          onClick={handleBook}
          disabled={isBooked}
          loading={createBooking.isPending}
          fullWidth
          className="mt-8"
        >
          {isBooked ? strings.experienceDetail.alreadyBooked : strings.experienceDetail.bookCta}
        </Button>

        {createBooking.error instanceof ApiError && (
          <div className="mt-4">
            <ErrorBanner message={createBooking.error.message} />
          </div>
        )}
      </Container>
    </div>
  )
}
