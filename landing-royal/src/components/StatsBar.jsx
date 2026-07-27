import { STATS } from '../data/site'
import { useCountUp, useInView } from '../lib/hooks'

function Stat({ stat, start }) {
  const value = useCountUp(stat.to, { from: stat.from, start, duration: 1800 })

  return (
    <div className="flex flex-col items-center gap-2 px-4 text-center">
      <span className="font-display text-metal text-4xl leading-none tabular-nums sm:text-5xl">
        {stat.prefix}
        {value}
        {stat.suffix}
      </span>
      <span className="max-w-[16ch] text-[0.78rem] leading-snug text-muted">
        {stat.label}
      </span>
    </div>
  )
}

export default function StatsBar() {
  // Se dispara al primer píxel visible: si esperásemos, el visitante leería
  // los valores de partida ("24 llamadas perdidas") y entendería lo contrario.
  const [ref, inView] = useInView({ threshold: 0, rootMargin: '0px' })

  return (
    <section
      ref={ref}
      aria-label="Resultados con reservas automatizadas"
      className="border-y border-gold/12 bg-ink-2"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-12 sm:px-8 lg:grid-cols-4 lg:py-14">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={
              index % 2 === 1
                ? 'border-l border-white/8 lg:border-l'
                : 'lg:border-l lg:border-white/8 lg:first:border-l-0'
            }
          >
            <Stat stat={stat} start={inView} />
          </div>
        ))}
      </div>
    </section>
  )
}
