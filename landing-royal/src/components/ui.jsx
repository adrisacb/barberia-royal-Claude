import Reveal from './Reveal'

/* ------------------------------------------------------------------
   Primitivas compartidas: encabezados de sección y botones
   ------------------------------------------------------------------ */

/** Etiqueta pequeña en versalitas sobre un filete dorado. */
export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.28em] text-gold uppercase ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const centered = align === 'center'

  return (
    <Reveal
      className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-4xl leading-[1.08] font-normal text-bone sm:text-5xl lg:text-[3.4rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

/** Botón principal: oro macizo sobre tinta. */
export function GoldButton({ as: Tag = 'a', className = '', children, ...rest }) {
  return (
    <Tag
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-hi via-gold to-gold-lo px-7 py-3.5 text-sm font-semibold tracking-wide text-ink shadow-[0_14px_34px_-16px_rgba(212,175,55,0.9)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-16px_rgba(212,175,55,1)] hover:brightness-108 active:translate-y-0 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Botón secundario de WhatsApp: contorno verde, el único verde de la página. */
export function WhatsAppButton({ as: Tag = 'a', className = '', children, ...rest }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-wa/55 bg-wa/8 px-7 py-3.5 text-sm font-semibold tracking-wide text-wa transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-wa hover:bg-wa/16 active:translate-y-0 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Separador fino entre secciones. */
export function GoldRule({ className = '' }) {
  return <div aria-hidden="true" className={`rule-gold h-px w-full ${className}`} />
}
