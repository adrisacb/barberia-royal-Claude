import { BOOKING_URL, SERVICES } from '../data/site'
import Reveal from './Reveal'
import { ArrowRight } from './icons'
import { SectionHeading } from './ui'

function ServiceCard({ service, delay }) {
  return (
    <Reveal
      delay={delay}
      className={`group relative flex flex-col gap-5 rounded-2xl border p-7 transition-[transform,border-color,box-shadow] duration-400 hover:-translate-y-1.5 ${
        service.featured
          ? 'border-gold/40 bg-[linear-gradient(165deg,rgba(212,175,55,0.1),rgba(14,11,8,0.9))] hover:border-gold/70 hover:shadow-[var(--shadow-gold)]'
          : 'border-white/8 bg-ink-2/70 hover:border-gold/35 hover:shadow-[var(--shadow-lift)]'
      }`}
    >
      {service.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-b from-gold-hi via-gold to-gold-lo px-3 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-ink uppercase">
          {service.badge}
        </span>
      )}

      <h3 className="font-display text-2xl text-bone">{service.name}</h3>

      <p className="flex items-baseline gap-1">
        <span className="font-display text-4xl text-bone/90 tabular-nums transition-[color,text-shadow] duration-400 group-hover:text-gold group-hover:[text-shadow:0_0_28px_rgba(212,175,55,0.55)]">
          {service.price}
        </span>
        {service.unit && (
          <span className="text-sm text-muted-2">{service.unit}</span>
        )}
      </p>

      <p className="flex-1 text-[0.9rem] leading-relaxed text-muted">
        {service.description}
      </p>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 self-start border-b border-transparent pb-0.5 text-[0.82rem] font-semibold text-gold transition-colors duration-300 hover:border-gold"
      >
        Reservar
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="servicios" className="border-t border-white/6 bg-ink-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Nuestros servicios"
          title="Lo que hacemos mejor"
          subtitle="Cuatro servicios, ejecutados con el mismo nivel de detalle. Elige el tuyo y reserva en segundos."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.name} service={service} delay={index * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
