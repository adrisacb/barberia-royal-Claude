import BeforeAfter from './components/BeforeAfter'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Hours from './components/Hours'
import Location from './components/Location'
import MobileBar from './components/MobileBar'
import Nav from './components/Nav'
import Services from './components/Services'
import StatsBar from './components/StatsBar'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import WhatsAppFab from './components/WhatsAppFab'
import WhyUs from './components/WhyUs'
import { useScrollPosition } from './lib/hooks'

export default function App() {
  const { y } = useScrollPosition()
  // La barra inferior del móvil entra una vez pasado el hero.
  const showMobileBar = y > 520

  return (
    <>
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Saltar al contenido
      </a>

      <Nav />

      <main>
        <Hero />
        <StatsBar />
        <BeforeAfter />
        <Services />
        <WhyUs />
        <Team />
        <Gallery />
        <Testimonials />
        <Faq />
        <Hours />
        <Location />
        <FinalCta />
      </main>

      <Footer />

      <WhatsAppFab barVisible={showMobileBar} />
      <MobileBar visible={showMobileBar} />
    </>
  )
}
