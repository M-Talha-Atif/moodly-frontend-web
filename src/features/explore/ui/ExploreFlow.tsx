import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button, Container, ErrorBanner, Text } from '@/shared/ui'
import { strings } from '@/shared/config/strings/en'
import { useInfiniteExperiences } from '@/entities/experience'
import { AppHeader } from '@/widgets/AppHeader'
import { ExperienceCard } from './ExperienceCard'

const PAGE_SIZE = 12

export function ExploreFlow() {
  const [search, setSearch] = useState('')

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteExperiences({ limit: PAGE_SIZE, search: search || undefined })

  const experiences = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <div className="min-h-svh bg-background">
      <AppHeader />

      <Container className="flex flex-col gap-6 py-10">
        <div>
          <Text variant="display" className="text-3xl">
            {strings.explore.title}
          </Text>
          <Text variant="caption" className="mt-1">
            {strings.explore.subtitle}
          </Text>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={strings.explore.searchPlaceholder}
            className="w-full rounded-card border border-border bg-surface py-3 pl-10 pr-3.5 text-base text-input-text placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-ink/10"
          />
        </div>

        {isError && <ErrorBanner message={strings.explore.error} />}

        {!isLoading && experiences.length === 0 && (
          <Text variant="caption">{strings.explore.empty}</Text>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        {hasNextPage && (
          <Button
            variant="secondary"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            className="mx-auto"
          >
            {strings.explore.loadMore}
          </Button>
        )}
      </Container>
    </div>
  )
}
