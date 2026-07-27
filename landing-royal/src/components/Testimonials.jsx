import { TESTIMONIALS } from '../data/site'
import Reveal from './Reveal'
import { StarIcon } from './icons'
import { SectionHeading } from './ui'

export default function Testimonials() {
  return (
    <section className="border-y border-white/6 bg-ink-2/40">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen los de siempre"
          subtitle="Clientes que llevan años sentándose en el mismo sillón."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              delay={index * 110}
              as="figure"
              className="flex h-full flex-col gap-5 rounded-2xl border border-white/8 bg-ink-2/70 p-7 transition-[border-color,transform] duration-400 hover:-translate-y-1 hover:border-gold/30"
            >
              <div className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="h-3.5 w-3.5" />
                ))}
              </div>

              <blockquote className="flex-1 font-display text-lg leading-snug text-bone/90">
                «{testimonial.quote}»
              </blockquote>

              <figcaption className="flex flex-col gap-0.5 border-t border-white/8 pt-4">
                <span className="text-[0.9rem] font-semibold text-bone">
                  {testimonial.name}
                </span>
                <span className="text-[0.76rem] text-muted-2">
                  Cliente habitual desde {testimonial.since}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
