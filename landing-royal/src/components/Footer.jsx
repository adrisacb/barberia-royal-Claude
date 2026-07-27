import { BRAND, FOOTER_YEAR, NAV_LINKS } from '../data/site'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-2.5">
          <Logo full className="text-xl" />
          <p className="text-[0.85rem] text-muted">{BRAND.tagline}</p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.88rem] text-muted transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/6">
        <p className="mx-auto max-w-6xl px-5 py-6 text-center text-[0.76rem] text-muted-2 sm:px-8">
          © {FOOTER_YEAR} {BRAND.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
