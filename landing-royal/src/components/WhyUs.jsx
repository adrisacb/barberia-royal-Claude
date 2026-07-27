import { REASONS } from '../data/site'
import Reveal from './Reveal'
import { SectionHeading } from './ui'

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading
        eyebrow="¿Por qué nosotros?"
        title="Por qué nuestros clientes nos eligen"
        subtitle="No es solo el corte. Es todo lo que pasa antes de sentarte en el sillón."
      />

      <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {REASONS.map((reason, index) => (
          <Reveal
            key={reason.title}
            delay={index * 90}
            className="group flex gap-6 border-t border-white/8 pt-7 transition-colors duration-400 hover:border-gold/35"
          >
            <span className="font-display text-2xl text-gold/35 tabular-nums transition-colors duration-400 group-hover:text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-2.5">
              <h3 className="font-display text-xl text-bone sm:text-2xl">{reason.title}</h3>
              <p className="max-w-[46ch] text-[0.92rem] leading-relaxed text-muted">
                {reason.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
