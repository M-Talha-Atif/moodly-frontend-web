export interface ExperienceHost {
  id: string
  name: string
  avatar?: string
  avatarUrl?: string
}

/*
 * GET /user/experiences currently only populates id/title/price/image per
 * item on the backend (see ExperienceService.findAllForUser), even though
 * the response DTO declares more fields. The rest are typed optional here
 * so the UI degrades gracefully rather than assuming data that isn't there
 * yet; it will pick the extra fields up for free if the backend is fixed.
 */
export interface ExperienceListItem {
  id: string
  title: string
  price: number
  image: string
  date?: string
  location?: string
  isVirtual?: boolean
  spotsFilled?: number
  totalSpots?: number
  culturalTags?: string[]
  targetEmotions?: string[]
  desiredOutcomes?: string[]
  isBooked?: boolean
  bookingId?: string
  bookingStatus?: string
  host?: ExperienceHost
}

export interface ExperienceDetail {
  id: string
  title: string
  description: string
  date: string
  location: string
  image: string
  isVirtual: boolean
  sessionStartTime: string
  sessionEndTime: string
  isBooked: boolean
  bookingId?: string | null
  bookingStatus?: string | null
  price: number
  timezone: string
  totalSpots: number
  spotsFilled: number
  meetingLink?: string
  cancellationPolicy?: string
  // The detail endpoint's actual runtime response uses `emotions`/`outcomes`,
  // not the `targetEmotions`/`desiredOutcomes` names the backend's
  // ExperienceResponseDto class declares (ExperienceService.findOneWithBooking
  // builds this object by hand and doesn't match its own DTO's field names).
  emotions?: string[]
  outcomes?: string[]
  culturalTags?: string[]
  experienceOutcomeSummary?: string
  host: ExperienceHost
}

export interface ExperienceListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ExperienceFilters {
  page?: number
  limit?: number
  search?: string
  cultureTags?: string[]
  desiredOutcomes?: string[]
  targetEmotions?: string[]
  timeFilter?: string
}
