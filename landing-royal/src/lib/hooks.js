import { useCallback, useEffect, useRef, useState } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/** true cuando el sistema pide menos movimiento. Reactivo al cambio en caliente. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_QUERY)
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Observa un elemento y avisa cuando entra en pantalla.
 * @returns [ref, inView]
 */
export function useInView({
  threshold = 0.2,
  rootMargin = '0px 0px -12% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin IntersectionObserver el contenido se muestra sin animar.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

/**
 * Cuenta de `from` a `to` cuando `start` se pone a true.
 * Con movimiento reducido salta directamente al valor final.
 */
export function useCountUp(to, { from = 0, duration = 1700, start = false } = {}) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!start) return
    if (reduced) {
      setValue(to)
      return
    }

    let frame = null
    const t0 = performance.now()
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(Math.round(from + (to - from) * easeOut(p)))
      if (p < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      if (frame) cancelAnimationFrame(frame)
    }
  }, [to, from, duration, start, reduced])

  return value
}

/**
 * Parallax vertical suave. Escribe `--parallax` en el elemento; el hijo
 * con la clase `.parallax-layer` lo consume. Inactivo con movimiento reducido.
 * @param {number} amplitude desplazamiento máximo en px
 */
export function useParallax(amplitude = 34) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || amplitude === 0) return

    let frame = null

    const update = () => {
      frame = null
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      // -1 (por encima) .. 0 (centrado) .. 1 (por debajo)
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport
      const clamped = Math.max(-1.2, Math.min(1.2, progress))
      el.style.setProperty('--parallax', `${(clamped * amplitude).toFixed(1)}px`)
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [amplitude, reduced])

  return ref
}

/** Posición de scroll de la página, actualizada por rAF. */
export function useScrollPosition() {
  const [state, setState] = useState({ y: 0, direction: 'down' })

  useEffect(() => {
    let frame = null
    let last = window.scrollY

    const update = () => {
      frame = null
      const y = window.scrollY
      const direction = y > last ? 'down' : 'up'
      last = y
      setState((prev) =>
        prev.y === y && prev.direction === direction ? prev : { y, direction },
      )
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return state
}

/** Bloquea el scroll del body mientras `locked` sea true (p. ej. lightbox). */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

/** Temporizadores que se limpian solos al desmontar. */
export function useTimeouts() {
  const timers = useRef(new Set())

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current.clear()
  }, [])

  const after = useCallback((ms, fn) => {
    const id = setTimeout(() => {
      timers.current.delete(id)
      fn()
    }, ms)
    timers.current.add(id)
    return id
  }, [])

  useEffect(() => clearAll, [clearAll])

  return { after, clearAll }
}
