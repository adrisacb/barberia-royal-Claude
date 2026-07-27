import { BOOKING_URL, HERO, IMAGES, WHATSAPP_URL } from '../data/site'
import ChatDemo from './ChatDemo'
import SmartImage from './SmartImage'
import { ArrowRight, CheckIcon, WhatsAppIcon } from './icons'
import { GoldButton, WhatsAppButton } from './ui'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="grain relative isolate overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] pb-20 sm:pb-24 lg:pt-[calc(var(--nav-h)+4rem)] lg:pb-20"
    >
      {/* Fondo: foto del local, muy atenuada, con parallax */}
      <SmartImage
        src={IMAGES.hero}
        alt=""
        parallax={44}
        loading="eager"
        className="absolute inset-0 -z-20 h-full w-full"
        imgClassName="opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,6,5,0.94)_0%,rgba(7,6,5,0.82)_38%,rgba(7,6,5,0.97)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-[-18%] left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_65%)] blur-2xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Columna de texto */}
        <div className="flex flex-col items-start gap-7">
          <span className="reveal is-visible inline-flex items-center gap-2.5 rounded-full border border-wa/30 bg-wa/8 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.18em] text-wa uppercase">
            <span className="animate-blink h-2 w-2 rounded-full bg-wa" />
            {HERO.badge}
          </span>

          <h1 className="font-display text-[3.4rem] leading-[0.94] font-normal sm:text-7xl lg:text-[5.5rem]">
            <span className="block text-bone">{HERO.titleTop}</span>
            <span className="text-metal animate-sheen block">{HERO.titleBottom}</span>
          </h1>

          <div className="flex flex-col gap-2">
            <p className="max-w-[34ch] text-lg leading-snug text-bone/85 sm:text-xl">
              {HERO.subtitle}
            </p>
            <p className="text-sm text-muted sm:text-base">{HERO.secondary}</p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <GoldButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Reservar cita ahora
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </GoldButton>
            <WhatsAppButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="h-4.5 w-4.5" />
              Hablar por WhatsApp
            </WhatsAppButton>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-1">
            {HERO.checks.map((check) => (
              <li key={check} className="flex items-center gap-2 text-[0.82rem] text-muted">
                <CheckIcon className="h-3.5 w-3.5 text-gold" />
                {check}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna de demostración */}
        <div className="w-full lg:pl-4">
          <ChatDemo />
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="mt-14 hidden justify-center lg:flex">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.62rem] tracking-[0.3em] text-muted-2 uppercase">
            Desliza
          </span>
          <span
            aria-hidden="true"
            className="relative h-12 w-px overflow-hidden bg-white/10"
          >
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-transparent via-gold to-transparent" />
          </span>
        </div>
      </div>
    </section>
  )
}
