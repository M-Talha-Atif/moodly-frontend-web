import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { strings } from '@/shared/config/strings/en'
import { experienceDetailPath } from '@/shared/config/constants'
import type { ExperienceListItem } from '@/entities/experience'

interface ExperienceCardProps {
  experience: ExperienceListItem
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const subtitle = experience.targetEmotions?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link
        to={experienceDetailPath(experience.id)}
        className="block overflow-hidden rounded-feature border border-border bg-surface"
      >
        <div className="h-[140px] w-full bg-border">
          {experience.image && (
            <img
              src={experience.image}
              alt={experience.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="px-4 py-3.5">
          <p className="mb-1.5 line-clamp-2 text-base leading-snug text-ink">
            {experience.title}
          </p>
          {subtitle && (
            <p className="mb-4 text-[13px] leading-tight text-muted">
              Crafted to lift you when you feel {subtitle}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="rounded-md border border-ink px-2.5 py-1 text-[13px] font-semibold text-ink">
              {experience.price === 0 ? strings.explore.free : `$${experience.price}`}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
