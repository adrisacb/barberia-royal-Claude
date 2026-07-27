import { useCallback, useEffect, useRef, useState } from 'react'
import { GALLERY } from '../data/site'
import { useBodyScrollLock } from '../lib/hooks'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { ArrowRight, CrossIcon } from './icons'
import { SectionHeading } from './ui'

function Lightbox({ index, onClose, onStep }) {
  const closeRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const photo = GALLERY[index]

  useBodyScrollLock(true)

  // Cada imagen vuelve a intentarse al navegar.
  useEffect(() => setFailed(false), [index])

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onStep(1)
      if (event.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería, imagen ${index + 1} de ${GALLERY.length}`}
      className="fixed inset-0 z-100 flex flex-col bg-ink/96 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <span className="text-[0.75rem] tracking-[0.2em] text-muted tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-bone transition-colors hover:border-gold/50 hover:text-gold"
        >
          <CrossIcon className="h-4.5 w-4.5" />
          <span className="sr-only">Cerrar galería</span>
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-6 sm:gap-6 sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 text-bone transition-colors hover:border-gold/50 hover:text-gold"
        >
          <ArrowRight className="h-4.5 w-4.5 rotate-180" />
          <span className="sr-only">Imagen anterior</span>
        </button>

        <figure className="flex min-h-0 flex-1 flex-col items-center gap-4">
          {failed ? (
            <div className="grid h-[52vh] w-full max-w-2xl place-items-center rounded-xl border border-gold/20 bg-[linear-gradient(150deg,#211a11,#0e0b08_55%,#17120c)]">
              <span aria-hidden="true" className="font-display text-6xl text-gold/25">
                ✦
              </span>
            </div>
          ) : (
            <img
              src={photo.src}
              alt={photo.alt}
              onError={() => setFailed(true)}
              className="max-h-[70vh] w-auto max-w-full rounded-xl border border-gold/20 object-contain"
            />
          )}
          <figcaption className="max-w-[46ch] text-center text-[0.8rem] text-muted">
            {photo.alt}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => onStep(1)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 text-bone transition-colors hover:border-gold/50 hover:text-gold"
        >
          <ArrowRight className="h-4.5 w-4.5" />
          <span className="sr-only">Imagen siguiente</span>
        </button>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null)
  const thumbRefs = useRef([])

  const step = useCallback((direction) => {
    setOpenIndex((current) =>
      current === null ? current : (current + direction + GALLERY.length) % GALLERY.length,
    )
  }, [])

  const close = useCallback(() => {
    setOpenIndex((current) => {
      // Devuelve el foco a la miniatura desde la que se abrió.
      if (current !== null) thumbRefs.current[current]?.focus()
      return null
    })
  }, [])

  return (
    <section id="galeria" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Galería"
        title="Nuestro trabajo"
        subtitle="Acabados reales, hechos en este local. Toca cualquier foto para verla en grande."
      />

      <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {GALLERY.map((photo, index) => (
          <Reveal key={photo.src + index} delay={(index % 3) * 90}>
            <button
              type="button"
              ref={(node) => {
                thumbRefs.current[index] = node
              }}
              onClick={() => setOpenIndex(index)}
              className="group relative block h-full w-full overflow-hidden rounded-xl border border-white/8 transition-[border-color] duration-400 hover:border-gold/45"
            >
              <SmartImage
                src={photo.src}
                alt={photo.alt}
                parallax={index % 2 === 0 ? 26 : -20}
                className="aspect-square w-full"
                sizes="(min-width: 1024px) 20rem, 45vw"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-ink/35 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              />
              <span className="absolute right-3 bottom-3 translate-y-2 rounded-full border border-gold/40 bg-ink/80 px-3 py-1 text-[0.65rem] tracking-[0.14em] text-gold uppercase opacity-0 transition-[opacity,transform] duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                Ampliar
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onStep={step} />
      )}
    </section>
  )
}
