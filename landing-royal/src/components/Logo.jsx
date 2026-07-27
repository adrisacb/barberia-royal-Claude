import { BRAND } from '../data/site'

export default function Logo({ full = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-baseline gap-2 font-display tracking-[0.16em] ${className}`}
    >
      <span aria-hidden="true" className="text-gold">
        {BRAND.mark}
      </span>
      <span className="text-metal animate-sheen">
        {full ? BRAND.name : BRAND.short}
      </span>
    </span>
  )
}
