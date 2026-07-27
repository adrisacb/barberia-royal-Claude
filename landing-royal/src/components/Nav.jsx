import { useEffect, useState } from 'react'
import { BOOKING_URL, NAV_LINKS } from '../data/site'
import { useScrollPosition } from '../lib/hooks'
import Logo from './Logo'
import { GoldButton } from './ui'
import { CrossIcon, MenuIcon } from './icons'

export default function Nav() {
  const { y } = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)
  const solid = y > 24

  // El menú móvil se cierra solo al pasar a escritorio o al pulsar Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mq.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid || menuOpen
          ? 'border-b border-gold/12 bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[var(--nav-h)] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <a
          href="#inicio"
          className="text-lg sm:text-xl"
          onClick={() => setMenuOpen(false)}
        >
          <Logo />
          <span className="sr-only">Barbería Royal — ir al inicio</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm text-muted transition-colors duration-300 hover:text-bone"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* El wrapper controla la visibilidad: aplicar `hidden` al propio
              botón chocaría con su `inline-flex` de base. */}
          <div className="hidden sm:block">
            <GoldButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-[0.82rem]"
            >
              Reservar cita
            </GoldButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-colors hover:bg-gold/10 lg:hidden"
          >
            {menuOpen ? <CrossIcon /> : <MenuIcon />}
            <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        hidden={!menuOpen}
        className="border-t border-gold/10 bg-ink-2/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-white/5 last:border-0">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[0.95rem] text-bone/85 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-5 pb-5 sm:hidden sm:px-8">
          <GoldButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full"
          >
            Reservar cita
          </GoldButton>
        </div>
      </div>
    </header>
  )
}
