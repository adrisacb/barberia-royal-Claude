/* ==================================================================
   BARBERÍA ROYAL — CONTENIDO EDITABLE
   ------------------------------------------------------------------
   Todo el texto, los precios y las imágenes de la landing viven aquí.
   Para personalizar el sitio no hace falta tocar ningún componente.

   ⚠️  ANTES DE PUBLICAR, SUSTITUIR LOS 3 PLACEHOLDERS DE ABAJO:
       1. BOOKING_URL       → tu enlace real de Fresha
       2. WHATSAPP_NUMBER   → tu número real con prefijo, sin "+"
       3. IMAGES            → tus fotos reales (ver nota en IMAGES)
   ================================================================== */

/* --- 1. Enlace de reservas -------------------------------------- */
// SUSTITUIR por la URL real de Fresha, p. ej.:
// 'https://www.fresha.com/es/book-now/barberia-royal-abc123/all-offer'
export const BOOKING_URL = 'https://URL_FRESHA_PLACEHOLDER';

/* --- 2. WhatsApp ------------------------------------------------- */
// SUSTITUIR por el número real: prefijo de país + número, sin "+" ni espacios.
// Ejemplo España: '34611223344'
export const WHATSAPP_NUMBER = 'NUMERO_PLACEHOLDER';

const WHATSAPP_GREETING = 'Hola, me gustaría reservar una cita en Barbería Royal.';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_GREETING,
)}`;

/* --- 3. Imágenes -------------------------------------------------- */
// Fotos de stock por defecto. Sustitúyelas por las fotos reales del local:
// súbelas a /public/fotos/ y cambia la ruta por '/fotos/mi-foto.jpg'.
// Si una imagen no carga, la web muestra automáticamente un marcador
// dorado con la marca — nunca se ve un icono de imagen rota.
const U = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: U('photo-1503951914875-452162b0f3f1', 1400),
  team: [
    U('photo-1622286342621-4bd786c2447c', 800),
    U('photo-1500648767791-00dcc994a43e', 800),
    U('photo-1519085360753-af0119f7cbe7', 800),
  ],
  gallery: [
    U('photo-1585747860715-2ba37e788b70', 1200),
    U('photo-1521590832167-7bcbfaa6381f', 1200),
    U('photo-1599351431202-1e0f0137899a', 1200),
    U('photo-1596728325488-58c87691e9af', 1200),
    U('photo-1503951914875-452162b0f3f1', 1200),
    U('photo-1567894340315-735d7c361db0', 1200),
  ],
};

/* ==================================================================
   CONTENIDO
   ================================================================== */

export const BRAND = {
  name: 'Barbería Royal',
  short: 'ROYAL',
  mark: '✦',
  tagline: 'Estilo, precisión y confianza',
};

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Horarios', href: '#horarios' },
  { label: 'Ubicación', href: '#ubicacion' },
];

export const HERO = {
  badge: 'RESERVAS ABIERTAS — DISPONIBLE AHORA',
  titleTop: 'Barbería',
  titleBottom: 'Royal',
  subtitle: 'Reserva tu cita en menos de 30 segundos sin llamadas',
  secondary: 'Disponible 24/7 con reservas online instantáneas',
  checks: ['Sin esperas', 'Reserva en 30s', '24/7 online'],
};

/* --- Demo de chat del hero -------------------------------------- */
// Conversación que se reproduce sola al entrar en pantalla.
export const CHAT_SCRIPT = [
  {
    from: 'client',
    text: 'Hola, ¿tenéis hueco para un corte + barba mañana por la tarde?',
    delay: 900,
  },
  {
    from: 'ai',
    text: '¡Claro! Tengo hueco mañana a las 17:00 o a las 18:30. ¿Cuál prefieres?',
    typing: 1500,
  },
  { from: 'client', text: 'A las 18:30', delay: 1300 },
  {
    from: 'ai',
    text: 'Perfecto, cita confirmada: Corte + Barba, mañana 18:30. Te esperamos ✂️',
    typing: 1700,
  },
];

// Respuestas del modo interactivo. Se evalúan en orden: gana la primera
// regla cuyo patrón aparezca en el mensaje del visitante.
export const CHAT_INTENTS = [
  {
    id: 'precios',
    test: /precio|cuest|cuánt|cuant|tarifa|coste|vale|euro|€/i,
    reply:
      'Nuestros precios: Corte 20€ · Degradado 25€ · Barba 15€ · Corte + Barba 35€ (el más pedido). ¿Te reservo alguno?',
  },
  {
    id: 'citas',
    test: /hora|cita|reserv|hueco|disponib|agenda|mañana|tarde|apunt/i,
    reply:
      'Para mañana me quedan las 11:30, las 17:00 y las 18:30. Dime cuál te viene bien y te la confirmo al momento.',
  },
  {
    id: 'horario',
    test: /horario|abr|cierr|abiert|cerrad|domingo|sábado|sabado|festivo/i,
    reply:
      'Abrimos de lunes a viernes de 10:00 a 20:00 y los sábados de 10:00 a 14:00. Los domingos cerramos, pero puedes reservar aquí a cualquier hora.',
  },
  {
    id: 'ubicacion',
    test: /dónde|donde|direcc|ubicac|sitio|local|llegar|parking|aparcar/i,
    reply:
      'Estamos en pleno centro, con parking a menos de dos minutos andando y acceso sin escaleras. ¿Te paso la ubicación por WhatsApp?',
  },
  {
    id: 'servicios',
    test: /corte|barba|degradad|fade|afeit|navaja|pelo|servicio/i,
    reply:
      'Hacemos corte clásico o moderno, degradados, arreglo de barba con navaja y el pack completo Corte + Barba. ¿Cuál te interesa?',
  },
  {
    id: 'saludo',
    test: /^\s*(hola|buenas|hey|holi|qué tal|que tal|buenos días|buenas tardes)/i,
    reply:
      '¡Hola! Soy el asistente de Barbería Royal. Puedo darte precios, horarios o buscarte hueco. ¿Qué necesitas?',
  },
];

export const CHAT_FALLBACK =
  'Eso se lo paso al equipo y te responden enseguida. Mientras tanto, prueba a escribirme «precio» para ver las tarifas o «cita» para ver los huecos libres.';

export const CHAT_SUGGESTIONS = ['¿Cuánto cuesta el corte?', '¿Tenéis cita mañana?'];

/* --- Barra de estadísticas -------------------------------------- */
export const STATS = [
  { from: 24, to: 0, prefix: '', suffix: '', label: 'llamadas perdidas' },
  { from: 0, to: 24, prefix: '', suffix: '/7', label: 'disponibilidad' },
  { from: 30, to: 10, prefix: '<', suffix: 's', label: 'tiempo de respuesta' },
  { from: 0, to: 100, prefix: '', suffix: '%', label: 'citas confirmadas automáticamente' },
];

/* --- Antes / Después -------------------------------------------- */
export const COMPARISON = {
  before: {
    title: 'Sin automatización',
    kicker: 'Cómo funciona hoy en la mayoría de barberías',
    points: [
      'El teléfono suena en mitad de un corte y nadie lo coge.',
      'La agenda vive en un cuaderno: se tacha, se pierde, se duplica.',
      'El cliente que no recibe respuesta llama a la barbería de al lado.',
      'Fuera de horario no existe nadie que atienda.',
    ],
  },
  after: {
    title: 'Con IA de AIB',
    kicker: 'Cómo funciona desde el primer día',
    points: [
      'Cada mensaje recibe respuesta al instante, a cualquier hora.',
      'La agenda se actualiza sola y siempre está al día.',
      'Cero llamadas perdidas: ninguna reserva se escapa.',
      'Tú te dedicas al sillón; la IA se ocupa del resto.',
    ],
  },
};

/* --- Servicios --------------------------------------------------- */
export const SERVICES = [
  {
    name: 'Corte de pelo',
    price: '20€',
    description: 'Corte clásico o moderno, adaptado a tu estilo y tipo de cabello.',
  },
  {
    name: 'Degradado',
    price: '25€',
    description: 'Fade perfecto con transiciones limpias y acabado impecable.',
  },
  {
    name: 'Barba',
    price: '15€',
    description: 'Perfilado y arreglo de barba con navaja para un acabado preciso.',
  },
  {
    name: 'Corte + Barba',
    price: '35€',
    unit: '/combo',
    badge: 'MÁS POPULAR',
    featured: true,
    description: 'El pack completo: corte personalizado más arreglo de barba profesional.',
  },
];

/* --- Por qué nos eligen ------------------------------------------ */
export const REASONS = [
  {
    title: 'Sin esperas ni llamadas',
    description:
      'Nada de llamar para pedir hora. Reserva desde el móvil y entra directo al sillón cuando llegues.',
  },
  {
    title: 'Reserva online en segundos',
    description:
      'Elige servicio, día y hora en menos de 30 segundos. Disponible las 24 horas, los 7 días.',
  },
  {
    title: 'Atención profesional y rápida',
    description:
      'Barberos con formación continua. Resultados impecables, ambiente premium y trato personalizado.',
  },
  {
    title: 'Atendido por IA, no por un formulario',
    description:
      'Un asistente conversacional entiende lo que necesitas y gestiona la cita de principio a fin, sin formularios ni esperas.',
  },
];

/* --- Equipo ------------------------------------------------------ */
export const TEAM = [
  { name: 'Marcos', role: 'Especialista en degradados', image: IMAGES.team[0] },
  { name: 'David', role: 'Barba y navaja clásica', image: IMAGES.team[1] },
  { name: 'Iker', role: 'Cortes modernos', image: IMAGES.team[2] },
];

/* --- Galería ----------------------------------------------------- */
export const GALLERY = [
  { src: IMAGES.gallery[0], alt: 'Interior de Barbería Royal con sillones de barbero' },
  { src: IMAGES.gallery[1], alt: 'Barbero perfilando un degradado con máquina' },
  { src: IMAGES.gallery[2], alt: 'Cliente con degradado recién terminado' },
  { src: IMAGES.gallery[3], alt: 'Navaja, tijeras y utensilios de barbería sobre el mármol' },
  { src: IMAGES.gallery[4], alt: 'Ambiente del local con luz cálida' },
  { src: IMAGES.gallery[5], alt: 'Arreglo de barba con navaja, detalle del acabado' },
];

/* --- Testimonios -------------------------------------------------- */
export const TESTIMONIALS = [
  {
    quote:
      'Escribí un domingo por la noche pensando que me contestarían el lunes. Tenía la cita confirmada en menos de un minuto.',
    name: 'Álvaro G.',
    since: '2022',
  },
  {
    quote:
      'El degradado es el mejor que me han hecho en la ciudad. Y no he vuelto a esperar ni un minuto de pie.',
    name: 'Rubén M.',
    since: '2021',
  },
  {
    quote:
      'Reservo desde el móvil en 20 segundos mientras salgo del trabajo. Llego, me siento y listo.',
    name: 'Javi T.',
    since: '2023',
  },
];

/* --- FAQ ---------------------------------------------------------- */
export const FAQ = [
  {
    question: '¿Cuesta algo reservar online?',
    answer:
      'No, reservar es totalmente gratis. Solo pagas el servicio en el local, como siempre.',
  },
  {
    question: '¿Puedo cambiar o cancelar mi cita?',
    answer:
      'Sí, cuando quieras. Escríbenos por WhatsApp y te la cambiamos al momento. Te pedimos avisar con un par de horas para poder ofrecer el hueco a otra persona.',
  },
  {
    question: '¿Qué pasa si escribo fuera de horario?',
    answer:
      'Te responde el asistente igualmente, a las 3 de la madrugada o un domingo. Tu cita queda reservada en el momento, sin esperar a que abramos.',
  },
  {
    question: '¿Necesito descargar alguna app?',
    answer:
      'Ninguna. Se reserva desde el navegador o directamente por WhatsApp, con lo que ya tienes en el móvil.',
  },
];

/* --- Horarios ----------------------------------------------------- */
export const HOURS = [
  { day: 'Lunes — Viernes', time: '10:00 — 20:00' },
  { day: 'Sábado', time: '10:00 — 14:00' },
  { day: 'Domingo', time: 'Cerrado', closed: true },
];

/* --- Ubicación ---------------------------------------------------- */
export const LOCATION = {
  text: 'Estamos en pleno centro, a un paso de las principales líneas de transporte. Un local pensado para que entres, te sientes y salgas con el mejor acabado de la ciudad.',
  badges: [
    { icon: '📍', label: 'Centro de la ciudad' },
    { icon: '🅿️', label: 'Parking cercano' },
    { icon: '⬆️', label: 'Fácil acceso' },
  ],
};

/* --- CTA final ---------------------------------------------------- */
export const FINAL_CTA = {
  eyebrow: '✦ NO TE QUEDES SIN TU HORA',
  title: 'Tu próximo corte está a un clic',
  subtitle:
    'Elige servicio, día y hora en menos de 30 segundos. Sin llamadas, sin esperas, sin descargar nada.',
};

export const FOOTER_YEAR = 2026;
