import { BOOKING_URL, FINAL_CTA, WHATSAPP_URL } from '../data/site'
import Reveal from './Reveal'
import { ArrowRight, WhatsAppIcon } from './icons'
import { GoldButton, WhatsAppButton } from './ui'

export default function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden border-t border-gold/15 bg-ink-2">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-40%] -z-10 mx-auto h-[34rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_66%)] blur-2xl"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 py-28 text-center sm:px-8 lg:py-36">
        <Reveal>
          <span className="text-[0.68rem] font-semibold tracking-[0.28em] text-gold uppercase">
            {FINAL_CTA.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="font-display text-4xl leading-[1.06] text-bone sm:text-5xl lg:text-6xl">
            {FINAL_CTA.title}
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">
            {FINAL_CTA.subtitle}
          </p>
        </Reveal>

        <Reveal
          delay={230}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <GoldButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Reservar cita ahora
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </GoldButton>
          <WhatsAppButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-4.5 w-4.5" />
            Hablar por WhatsApp
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  )
}
