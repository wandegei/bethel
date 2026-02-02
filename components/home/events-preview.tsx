import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"

// --- Hard-coded Supabase client ---
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://svxrsjrkghluzxwtmjvt.supabase.co', // Supabase URL
  'sb_publishable_3YYKpXLOX0qq77ugJZ0_Mw_s2nU4rXH' // Public anon key
)

interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string | null
  location: string
}

export async function EventsPreview() {
  // Fetch upcoming events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3)

  const upcomingEvents: Event[] = events || []

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              What's Happening
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
              Upcoming Events
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Join us for worship, fellowship, and community activities.
            </p>
          </div>
          <Button variant="outline" asChild className="mt-6 md:mt-0 bg-transparent">
            <Link href="/events" className="flex items-center gap-2">
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => {
              const date = formatDate(event.start_date)
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group flex rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center justify-center bg-primary px-5 py-6 text-primary-foreground">
                    <span className="text-3xl font-bold">{date.day}</span>
                    <span className="text-sm uppercase">{date.month}</span>
                  </div>
                  <div className="flex-1 p-5">
                    <p className="text-xs text-muted-foreground mb-1">{date.weekday}</p>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(event.start_date)}{event.end_date ? ` - ${formatTime(event.end_date)}` : ''}</span>
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
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              No Upcoming Events
            </h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new events and activities.
            </p>
            <Button asChild>
              <Link href="/events">View Past Events</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
