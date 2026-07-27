import { useEffect, useRef, useState } from 'react'
import {
  BRAND,
  CHAT_FALLBACK,
  CHAT_INTENTS,
  CHAT_SCRIPT,
  CHAT_SUGGESTIONS,
} from '../data/site'
import { useInView, usePrefersReducedMotion, useTimeouts } from '../lib/hooks'
import { SendIcon, SparkIcon } from './icons'

function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 py-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-dot h-1.5 w-1.5 rounded-full bg-gold"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  )
}

function Bubble({ from, children }) {
  const isClient = from === 'client'

  return (
    <li className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`animate-bubble max-w-[85%] px-4 py-2.5 text-[0.875rem] leading-relaxed ${
          isClient
            ? 'rounded-[16px_16px_4px_16px] bg-ink-4 text-bone/90'
            : 'rounded-[16px_16px_16px_4px] border border-gold/25 bg-gold/10 text-bone'
        }`}
      >
        {children}
      </div>
    </li>
  )
}

export default function ChatDemo() {
  const [ref, inView] = useInView({ threshold: 0.35 })
  const reduced = usePrefersReducedMotion()
  const { after } = useTimeouts()

  const [step, setStep] = useState(0)
  const [scriptTyping, setScriptTyping] = useState(false)
  const [done, setDone] = useState(false)

  const [interactive, setInteractive] = useState(false)
  const [extra, setExtra] = useState([])
  const [botTyping, setBotTyping] = useState(false)
  const [input, setInput] = useState('')

  const listRef = useRef(null)
  const inputRef = useRef(null)

  // Reproduce la conversación de ejemplo paso a paso.
  useEffect(() => {
    if (!inView || done) return

    if (reduced) {
      setStep(CHAT_SCRIPT.length)
      setDone(true)
      return
    }

    if (step >= CHAT_SCRIPT.length) {
      setScriptTyping(false)
      setDone(true)
      return
    }

    const message = CHAT_SCRIPT[step]

    if (message.from === 'ai') {
      setScriptTyping(true)
      const timer = setTimeout(() => {
        setScriptTyping(false)
        setStep((s) => s + 1)
      }, message.typing ?? 1400)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => setStep((s) => s + 1), message.delay ?? 800)
    return () => clearTimeout(timer)
  }, [inView, step, done, reduced])

  const messages = [...CHAT_SCRIPT.slice(0, step), ...extra]
  const typing = scriptTyping || botTyping

  // Mantiene la conversación abajo del todo, sin mover la página.
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [messages.length, typing, reduced])

  function handleSubmit(event) {
    event.preventDefault()
    const text = input.trim()
    if (!text || botTyping) return

    setExtra((prev) => [...prev, { from: 'client', text }])
    setInput('')
    setBotTyping(true)

    after(reduced ? 0 : 1050, () => {
      const intent = CHAT_INTENTS.find((candidate) => candidate.test.test(text))
      setExtra((prev) => [...prev, { from: 'ai', text: intent ? intent.reply : CHAT_FALLBACK }])
      setBotTyping(false)
    })
  }

  function startInteractive() {
    setInteractive(true)
    after(60, () => inputRef.current?.focus())
  }

  return (
    <div ref={ref} className="relative">
      {/* Halo dorado detrás del widget */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.16),transparent_68%)] blur-xl"
      />

      <div className="relative overflow-hidden rounded-[26px] border border-gold/20 bg-ink-2/95 shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
        {/* Cabecera */}
        <div className="flex items-center gap-3 border-b border-gold/12 bg-ink-3/80 px-4 py-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/12 font-display text-lg text-gold">
            {BRAND.mark}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.9rem] font-semibold text-bone">{BRAND.name}</p>
            <p className="flex items-center gap-1.5 text-[0.72rem] whitespace-nowrap text-muted">
              <span className="animate-blink h-1.5 w-1.5 shrink-0 rounded-full bg-wa" />
              en línea
              <span className="hidden sm:inline">· responde al instante</span>
            </p>
          </div>
          {/* En pantallas estrechas la etiqueta se abrevia para no comerse el nombre. */}
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-gold uppercase">
            <SparkIcon className="h-3 w-3" />
            <span className="sm:hidden">IA</span>
            <span className="hidden sm:inline">Gestionado por IA</span>
          </span>
        </div>

        {/* Conversación */}
        <ul
          ref={listRef}
          aria-live="polite"
          aria-label="Conversación de ejemplo con el asistente"
          className="flex h-[19rem] flex-col gap-2.5 overflow-y-auto px-4 py-5 sm:h-[21rem]"
        >
          {messages.map((message, index) => (
            <Bubble key={`${index}-${message.from}`} from={message.from}>
              {message.text}
            </Bubble>
          ))}

          {typing && (
            <li className="flex justify-start">
              <div className="rounded-[16px_16px_16px_4px] border border-gold/20 bg-gold/8 px-4 py-2.5">
                <TypingDots />
                <span className="sr-only">El asistente está escribiendo</span>
              </div>
            </li>
          )}
        </ul>

        {/* Pie: invitación a probar o campo de escritura */}
        <div className="border-t border-gold/12 bg-ink-3/60 px-4 py-3.5">
          {!interactive ? (
            <button
              type="button"
              onClick={startInteractive}
              disabled={!done}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/35 bg-gold/8 px-5 py-2.5 text-[0.82rem] font-semibold text-gold transition-[background-color,border-color,opacity] duration-300 hover:border-gold hover:bg-gold/16 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <SparkIcon className="h-3.5 w-3.5" />
              Pruébalo tú mismo
            </button>
          ) : (
            <div className="flex flex-col gap-2.5">
              {extra.length === 0 && (
                <div className="flex flex-wrap gap-2">
                  {CHAT_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setInput(suggestion)}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[0.72rem] text-muted transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Escribe tu mensaje al asistente
                </label>
                <input
                  id="chat-input"
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Escribe «precio» o «cita»…"
                  autoComplete="off"
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-ink px-4 py-2.5 text-[0.85rem] text-bone placeholder:text-muted-2 focus:border-gold/50 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || botTyping}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-gold-hi via-gold to-gold-lo text-ink transition-opacity disabled:opacity-35"
                >
                  <SendIcon />
                  <span className="sr-only">Enviar mensaje</span>
                </button>
              </form>

              <p className="text-center text-[0.68rem] text-muted-2">
                Demostración local — ninguna respuesta sale de tu navegador.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
