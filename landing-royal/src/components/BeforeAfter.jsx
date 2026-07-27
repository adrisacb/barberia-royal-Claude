import { COMPARISON } from '../data/site'
import Reveal from './Reveal'
import { CheckIcon, CrossIcon } from './icons'
import { SectionHeading } from './ui'

function Column({ data, tone }) {
  const isAfter = tone === 'after'
  const Icon = isAfter ? CheckIcon : CrossIcon

  return (
    <Reveal
      delay={isAfter ? 120 : 0}
      className={`relative flex h-full flex-col gap-6 rounded-2xl border p-7 sm:p-9 ${
        isAfter
          ? 'border-gold/35 bg-[linear-gradient(160deg,rgba(212,175,55,0.12),rgba(23,18,12,0.6))] shadow-[var(--shadow-gold)]'
          : 'border-white/8 bg-ink-2/60'
      }`}
    >
      {isAfter && (
        <div
          aria-hidden="true"
          className="absolute -inset-px -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.22),transparent_70%)] blur-md"
        />
      )}

      <div className="flex flex-col gap-1.5">
        <span
          className={`text-[0.66rem] font-semibold tracking-[0.22em] uppercase ${
            isAfter ? 'text-gold' : 'text-muted-2'
          }`}
        >
          {data.kicker}
        </span>
        <h3
          className={`font-display text-2xl sm:text-[1.75rem] ${
            isAfter ? 'text-bone' : 'text-muted'
          }`}
        >
          {data.title}
        </h3>
      </div>

      <ul className="flex flex-col gap-4">
        {data.points.map((point) => (
          <li key={point} className="flex items-start gap-3.5">
            <span
              className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                isAfter
                  ? 'border border-gold/40 bg-gold/12 text-gold'
                  : 'border border-white/10 bg-white/4 text-muted-2'
              }`}
            >
              <Icon className="h-3 w-3" />
            </span>
            <span
              className={`text-[0.92rem] leading-relaxed ${
                isAfter ? 'text-bone/85' : 'text-muted/80'
              }`}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading
        eyebrow="El cambio"
        title="La diferencia no está en la web. Está en quién contesta."
        subtitle="El mismo local, el mismo barbero, los mismos precios. Lo único que cambia es qué pasa cuando alguien pregunta por una cita."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Column data={COMPARISON.before} tone="before" />
        <Column data={COMPARISON.after} tone="after" />
      </div>
    </section>
  )
}
