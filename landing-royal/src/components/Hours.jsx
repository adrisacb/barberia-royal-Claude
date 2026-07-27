import { HOURS } from '../data/site'
import Reveal from './Reveal'
import { CalendarIcon } from './icons'
import { SectionHeading } from './ui'

export default function Hours() {
  return (
    <section id="horarios" className="border-t border-white/6 bg-ink-2/40">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Horarios"
          title="Cuándo visitarnos"
          subtitle="Pero recuerda: puedes reservar online en cualquier momento, 24/7."
        />

        <Reveal
          delay={120}
          className="mt-14 overflow-hidden rounded-2xl border border-gold/20 bg-ink-2/80 shadow-[var(--shadow-lift)]"
        >
          <div className="flex items-center gap-3 border-b border-gold/12 bg-ink-3/60 px-6 py-4 sm:px-8">
            <CalendarIcon className="h-5 w-5 text-gold" />
            <span className="text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase">
              Horario del local
            </span>
          </div>

          <dl className="divide-y divide-white/8">
            {HOURS.map((entry) => (
              <div
                key={entry.day}
                className="flex items-center justify-between gap-6 px-6 py-5 sm:px-8"
              >
                <dt className="text-[0.95rem] text-bone/90">{entry.day}</dt>
                <dd
                  className={`text-[0.95rem] tabular-nums ${
                    entry.closed ? 'text-muted-2' : 'font-semibold text-gold'
                  }`}
                >
                  {entry.time}
                </dd>
              </div>
            ))}
          </dl>

          <p className="border-t border-white/8 bg-ink-3/40 px-6 py-4 text-center text-[0.8rem] text-muted sm:px-8">
            La agenda online no cierra nunca. Reserva a la hora que quieras.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
