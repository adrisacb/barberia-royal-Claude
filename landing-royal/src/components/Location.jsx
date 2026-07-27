import { LOCATION } from '../data/site'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

export default function Location() {
  return (
    <section id="ubicacion" className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Ubicación"
        title="Dónde encontrarnos"
        subtitle={LOCATION.text}
      />

      <Reveal delay={120} className="mt-12 flex flex-wrap justify-center gap-3">
        {LOCATION.badges.map((badge) => (
          <span
            key={badge.label}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-2/70 px-5 py-2.5 text-[0.85rem] text-bone/85 transition-colors duration-300 hover:border-gold/40"
          >
            <span aria-hidden="true">{badge.icon}</span>
            {badge.label}
          </span>
        ))}
      </Reveal>
    </section>
  )
}
