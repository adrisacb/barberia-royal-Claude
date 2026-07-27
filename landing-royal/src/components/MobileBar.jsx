import { BOOKING_URL, WHATSAPP_URL } from '../data/site'
import { ArrowRight, WhatsAppIcon } from './icons'

/** Barra de acciones fija en la parte inferior, sólo en móvil. */
export default function MobileBar({ visible }) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-gold/15 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-400 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-2.5 px-4 py-3">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-gold-hi via-gold to-gold-lo py-3 text-[0.85rem] font-semibold text-ink"
        >
          Reservar
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-wa/50 bg-wa/10 py-3 text-[0.85rem] font-semibold text-wa"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
