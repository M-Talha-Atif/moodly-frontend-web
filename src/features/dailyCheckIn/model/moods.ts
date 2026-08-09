import {
  Angry,
  Annoyed,
  Frown,
  Laugh,
  Meh,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

/*
 * Same seven moods as the mobile app's MoodWheel
 * (Mobile App/moodler/modules/dailyCheckIn/components/MoodWheel.tsx).
 * Icons are lucide-react equivalents since the mobile icon set
 * (FontAwesome5/MaterialCommunityIcons/Ionicons) isn't available on web.
 */
export interface Mood {
  id: string
  label: string
  icon: LucideIcon
}

export const moods: Mood[] = [
  { id: '3', label: 'Happy', icon: Laugh },
  { id: '1', label: 'Disgusted', icon: Annoyed },
  { id: '4', label: 'Neutral', icon: Meh },
  { id: '5', label: 'Sad', icon: Frown },
  { id: '0', label: 'Angry', icon: Angry },
  { id: '2', label: 'Fearful', icon: Sparkles },
  { id: '6', label: 'Surprised', icon: Sparkles },
]
