import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Heart, 
  Users, 
  Baby, 
  UserCheck, 
  Music, 
  Globe,
  HandHeart,
  Church,
  BookOpen
} from "lucide-react"

// --- Hard-coded Supabase client ---
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://svxrsjrkghluzxwtmjvt.supabase.co', // Supabase URL
  'sb_publishable_3YYKpXLOX0qq77ugJZ0_Mw_s2nU4rXH' // Public anon key
)

// --- Icons ---
const ministryIcons: Record<string, typeof Baby> = {
  "children": Baby,
  "youth": Users,
  "women": Heart,
  "men": UserCheck,
  "worship": Music,
  "missions": Globe,
  "prayer": HandHeart,
  "family": Church,
}

// --- Ministry details (same as before) ---
const ministryDetails: Record<string, {
  mission: string
  activities: string[]
  scripture: { verse: string; reference: string }
  gallery: string[]
  testimonial?: { quote: string; author: string }
}> = {
  // ... (keep all your ministry details here unchanged)
}

// --- Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params

  const { data: ministry } = await supabase
    .from('ministries')
    .select('name, description')
    .eq('slug', slug)
    .single()

  return {
    title: ministry?.name || 'Ministry',
    description: ministry?.description || 'Learn more about our ministries at Bethel Evangelical Church.',
  }
}

// --- Page Component ---
export default async function MinistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetch ministry
  const { data: ministry } = await supabase
    .from('ministries')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!ministry) notFound()

  // Fetch upcoming events
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .eq('ministry_id', ministry.id)
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3)

  const details = ministryDetails[slug] || {
    mission: ministry.description || "To serve God and our community through dedicated ministry.",
    activities: ["Weekly meetings", "Fellowship events", "Community service"],
    scripture: { verse: "Serve one another humbly in love.", reference: "Galatians 5:13" },
    gallery: []
  }

  const Icon = ministryIcons[slug] || Users

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
  })

  const formatTime = (dateStr: string) => new Date(dateStr).toLocaleTimeString('en-US', { 
    hour: 'numeric', minute: '2-digit', hour12: true 
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link 
              href="/ministries" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Ministries
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                  {ministry.name}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {ministry.description}
                </p>
                
                {/* Meeting Info */}
                <div className="mt-8 flex flex-wrap gap-6">
                  {ministry.meeting_day && (
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{ministry.meeting_day}s</span>
                    </div>
                  )}
                  {ministry.meeting_time && (
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{ministry.meeting_time}</span>
                    </div>
                  )}
                  {ministry.leader_name && (
                    <div className="flex items-center gap-2 text-foreground">
                      <User className="h-5 w-5 text-primary" />
                      <span>Led by {ministry.leader_name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <Button size="lg" asChild>
                  <Link href="/contact">Join This Ministry</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Ministry Leader</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {details.mission}
              </p>
            </div>
          </div>
        </section>

        {/* Scripture */}
        <section className="py-16 lg:py-20 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <BookOpen className="mx-auto h-10 w-10 text-primary mb-6" />
              <blockquote className="font-serif text-2xl italic text-foreground leading-relaxed">
                "{details.scripture.verse}"
              </blockquote>
              <p className="mt-4 text-primary font-semibold">
                {details.scripture.reference}
              </p>
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
                What We Do
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {details.activities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-foreground pt-1">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {details.testimonial && (
          <section className="py-16 lg:py-20 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                  What People Say
                </h2>
                <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
                  <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">
                    "{details.testimonial.quote}"
                  </p>
                  <p className="text-primary font-semibold">
                    - {details.testimonial.author}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {upcomingEvents && upcomingEvents.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
                Upcoming Events
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.start_date)}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(event.start_date)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-10">
                <Button variant="outline" asChild>
                  <Link href="/events">View All Events</Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold sm:text-4xl text-balance">
                Ready to Join {ministry.name}?
              </h2>
              <p className="mt-4 text-lg opacity-90 leading-relaxed">
                We'd love to welcome you! Contact us to learn more about how you can 
                get involved and make a difference.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                  <Link href="/ministries">Explore Other Ministries</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
