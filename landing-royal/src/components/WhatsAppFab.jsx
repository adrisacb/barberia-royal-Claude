import { WHATSAPP_URL } from '../data/site'
import { WhatsAppIcon } from './icons'

/**
 * Botón flotante de WhatsApp.
 *
 * `barVisible` indica que la barra inferior del móvil está en pantalla: ahí ya
 * hay un botón de WhatsApp, así que el flotante se retira en móvil (evita
 * duplicarlo y que tape el texto) y se mantiene en escritorio.
 *
 * La visibilidad va en el contenedor: aplicar `hidden` al propio enlace
 * chocaría con su `grid` de base.
 */
export default function WhatsAppFab({ barVisible = false }) {
  return (
    <div
      className={`fixed right-5 bottom-6 z-40 sm:right-7 md:bottom-8 ${
        barVisible ? 'max-md:hidden' : ''
      }`}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribirnos por WhatsApp"
        className="animate-pulse-wa grid h-14 w-14 place-items-center rounded-full bg-wa text-white shadow-[0_16px_36px_-12px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-15 sm:w-15"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
