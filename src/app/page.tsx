import { CallToAction } from '@/components/salient/components/CallToAction'
import { Faqs } from '@/components/salient/components/Faqs'
import { Footer } from '@/components/salient/components/Footer'
import { Header } from '@/components/salient/components/Header'
import { Hero } from '@/components/salient/components/Hero'
import { Pricing } from '@/components/salient/components/Pricing'
import { PrimaryFeatures } from '@/components/salient/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/salient/components/SecondaryFeatures'
import { Testimonials } from '@/components/salient/components/Testimonials'

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </div>
  )
}
