import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Programs from '@/components/Programs'
import HowItWorks from '@/components/HowItWorks'
import CtaBanner from '@/components/CtaBanner'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SocialProofToast from '@/components/SocialProofToast'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Programs />
        <HowItWorks />
        <CtaBanner />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <SocialProofToast />
      <StickyMobileCTA />
    </>
  )
}
