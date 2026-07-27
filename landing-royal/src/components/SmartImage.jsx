import { useState } from 'react'
import { useParallax } from '../lib/hooks'

/**
 * Imagen con marcador de marca detrás.
 *
 * El marcador (tinta cálida + veta diagonal tipo poste de barbero + monograma
 * dorado) se dibuja siempre. La foto aparece encima al cargar. Si la URL falla,
 * el marcador se queda: nunca se ve un icono de imagen rota.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  parallax = 0,
  loading = 'lazy',
  sizes,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const parallaxRef = useParallax(parallax)

  return (
    <div
      ref={parallax ? parallaxRef : undefined}
      className={`relative isolate overflow-hidden bg-ink-3 ${className}`}
    >
      {/* Marcador */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(150deg,#211a11_0%,#0e0b08_55%,#17120c_100%)]"
      >
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, #d4af37 0 2px, transparent 2px 16px)',
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-4xl text-gold/25 select-none">✦</span>
        </div>
      </div>

      {/* Foto */}
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${parallax ? 'parallax-layer' : ''} ${imgClassName}`}
        />
      )}
    </div>
  )
}
