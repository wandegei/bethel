import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { WelcomeSection } from "@/components/home/welcome-section"
import { MinistriesPreview } from "@/components/home/ministries-preview"
import { EventsPreview } from "@/components/home/events-preview"
import { SermonsPreview } from "@/components/home/sermons-preview"
import { DonationCTA } from "@/components/home/donation-cta"
import { NewsletterSection } from "@/components/home/newsletter-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WelcomeSection />
        <MinistriesPreview />
        <EventsPreview />
        <SermonsPreview />
        <DonationCTA />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
