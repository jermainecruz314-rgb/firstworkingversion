import { ICONS, CHIP_CATEGORY } from './DashIcon.jsx'

export default function CardWatermark({ id }) {
  const icon = ICONS[id]
  if (!icon) return null
  const category = CHIP_CATEGORY[id] ?? 'teal'
  return (
    <span className={`card-watermark card-watermark--${category}`} aria-hidden="true">
      {icon}
    </span>
  )
}
