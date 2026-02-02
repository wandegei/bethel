import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// --- Supabase client setup ---
const supabase = createClient(
  'https://svxrsjrkghluzxwtmjvt.supabase.co', // replace with your Supabase URL
  'sb_publishable_3YYKpXLOX0qq77ugJZ0_Mw_s2nU4rXH' // replace with your anon/public key
)

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and activities at Bethel Evangelical Church.",
}

interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string | null
  location: string
}

export default async function EventsPage() {
  const today = new Date().toISOString()

  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', today)
    .order('start_date', { ascending: true })

  const { data: pastEvents } = await supabase
    .from('events')
    .select('*')
    .lt('start_date', today)
    .order('start_date', { ascending: false })
    .limit(6)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
      full: date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => {
    const date = formatDate(event.start_date)
    return (
      <Link
        href={`/events/${event.id}`}
        className={`group flex rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg ${isPast ? 'opacity-75' : ''}`}
      >
        <div
          className={`flex flex-col items-center justify-center px-5 py-6 ${
            isPast ? 'bg-muted' : 'bg-primary'
          } text-${isPast ? 'foreground' : 'primary-foreground'}`}
        >
          <span className="text-3xl font-bold">{date.day}</span>
          <span className="text-sm uppercase">{date.month}</span>
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-muted-foreground">{date.weekday}</p>
          </div>
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {formatTime(event.start_date)}
                {event.end_date ? ` - ${formatTime(event.end_date)}` : ''}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                What's Happening
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Church Events
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Join us for worship services, community gatherings, special programs, 
                and fellowship opportunities throughout the year.
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Services */}
        <section className="py-16 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
              Weekly Services
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Sunday Worship</h3>
                <p className="text-primary font-medium">9:00 AM</p>
                <p className="text-sm text-muted-foreground mt-2">Main sanctuary</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Sunday School</h3>
                <p className="text-primary font-medium">11:00 AM</p>
                <p className="text-sm text-muted-foreground mt-2">All ages welcome</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">Wednesday Bible Study</h3>
                <p className="text-primary font-medium">6:00 PM</p>
                <p className="text-sm text-muted-foreground mt-2">Prayer & Word</p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Upcoming Events</h2>
                <p className="mt-2 text-muted-foreground">Special events and activities coming up</p>
              </div>
            </div>

            {upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="grid gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground mb-6">
                  Check back soon for new events and activities. Join us for our regular weekly services!
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Past Events */}
        {pastEvents && pastEvents.length > 0 && (
          <section className="py-20 lg:py-28 bg-secondary/30">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground">Past Events</h2>
                  <p className="mt-2 text-muted-foreground">Recent events you may have missed</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Want to Stay Updated?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Subscribe to our newsletter to receive updates about upcoming events, 
                special services, and community activities.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/#newsletter">Subscribe to Newsletter</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
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
