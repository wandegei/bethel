// import type { Metadata } from "next"
// import Link from "next/link"
// import { notFound } from "next/navigation"
// import { Header } from "@/components/layout/header"
// import { Footer } from "@/components/layout/footer"
// import { Button } from "@/components/ui/button"
// import { createClient } from "@/lib/supabase/server"
// import { 
//   ArrowLeft, 
//   Calendar, 
//   Clock,
//   MapPin,
//   Share2,
//   Users,
//   CalendarPlus
// } from "lucide-react"
// import { RSVPForm } from "@/components/events/rsvp-form"

// export async function generateMetadata({ 
//   params 
// }: { 
//   params: Promise<{ slug: string }> 
// }): Promise<Metadata> {
//   const { slug } = await params
//   const supabase = await createClient()
//   const { data: event } = await supabase
//     .from('events')
//     .select('title, description')
//     .eq('slug', slug)
//     .single()
  
//   return {
//     title: event?.title || 'Event',
//     description: event?.description || 'Join us for this special event at Bethel Evangelical Church.',
//   }
// }

// export default async function EventPage({ 
//   params 
// }: { 
//   params: Promise<{ slug: string }> 
// }) {
//   const { slug } = await params
//   const supabase = await createClient()
  
//   const { data: event } = await supabase
//     .from('events')
//     .select(`
//       *,
//       ministry:ministries(name, slug)
//     `)
//     .eq('slug', slug)
//     .single()

//   if (!event) {
//     notFound()
//   }

//   // Get other upcoming events
//   const { data: otherEvents } = await supabase
//     .from('events')
//     .select('*')
//     .neq('id', event.id)
//     .gte('start_date', new Date().toISOString())
//     .order('start_date', { ascending: true })
//     .limit(3)

//   const formatDate = (dateStr: string) => {
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric'
//     })
//   }

//   const formatTime = (dateStr: string) => {
//     return new Date(dateStr).toLocaleTimeString('en-US', { 
//       hour: 'numeric', 
//       minute: '2-digit', 
//       hour12: true 
//     })
//   }

//   const isPastEvent = new Date(event.start_date) < new Date()

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-primary/5 py-16 lg:py-24">
//           <div className="mx-auto max-w-7xl px-4 lg:px-8">
//             <Link 
//               href="/events" 
//               className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Events
//             </Link>

//             <div className="grid lg:grid-cols-3 gap-10">
//               {/* Main Content */}
//               <div className="lg:col-span-2">
//                 {/* Event Badge */}
//                 <div className="flex flex-wrap gap-3 mb-4">
//                   {event.is_featured && (
//                     <span className="inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
//                       Featured Event
//                     </span>
//                   )}
//                   {event.ministry && (
//                     <Link 
//                       href={`/ministries/${event.ministry.slug}`}
//                       className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
//                     >
//                       {event.ministry.name}
//                     </Link>
//                   )}
//                   {isPastEvent && (
//                     <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
//                       Past Event
//                     </span>
//                   )}
//                 </div>

//                 <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
//                   {event.title}
//                 </h1>

//                 {/* Event Details */}
//                 <div className="mt-8 space-y-4">
//                   <div className="flex items-start gap-4">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                       <Calendar className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-foreground">Date</p>
//                       <p className="text-muted-foreground">{formatDate(event.start_date)}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                       <Clock className="h-6 w-6" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-foreground">Time</p>
//                       <p className="text-muted-foreground">
//                         {formatTime(event.start_date)}
//                         {event.end_date && ` - ${formatTime(event.end_date)}`}
//                       </p>
//                     </div>
//                   </div>

//                   {event.location && (
//                     <div className="flex items-start gap-4">
//                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                         <MapPin className="h-6 w-6" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-foreground">Location</p>
//                         <p className="text-muted-foreground">{event.location}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Description */}
//                 <div className="mt-10">
//                   <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About This Event</h2>
//                   <div className="prose prose-lg max-w-none text-muted-foreground">
//                     <p className="leading-relaxed whitespace-pre-line">
//                       {event.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-border">
//                   <Button variant="outline" className="flex items-center gap-2 bg-transparent">
//                     <CalendarPlus className="h-4 w-4" />
//                     Add to Calendar
//                   </Button>
//                   <Button variant="outline" className="flex items-center gap-2 bg-transparent">
//                     <Share2 className="h-4 w-4" />
//                     Share Event
//                   </Button>
//                 </div>
//               </div>

//               {/* Sidebar - RSVP Form */}
//               <div className="lg:col-span-1">
//                 {!isPastEvent && (
//                   <div className="sticky top-24">
//                     <RSVPForm eventId={event.id} eventTitle={event.title} />
//                   </div>
//                 )}
//                 {isPastEvent && (
//                   <div className="rounded-xl border border-border bg-card p-6 text-center">
//                     <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
//                     <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
//                       This Event Has Passed
//                     </h3>
//                     <p className="text-muted-foreground mb-4">
//                       Check out our upcoming events for more opportunities to connect.
//                     </p>
//                     <Button asChild>
//                       <Link href="/events">View Upcoming Events</Link>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Other Events */}
//         {otherEvents && otherEvents.length > 0 && (
//           <section className="py-16 lg:py-24">
//             <div className="mx-auto max-w-7xl px-4 lg:px-8">
//               <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">
//                 More Upcoming Events
//               </h2>
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {otherEvents.map((otherEvent) => (
//                   <Link
//                     key={otherEvent.id}
//                     href={`/events/${otherEvent.slug}`}
//                     className="group flex rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
//                   >
//                     <div className="flex flex-col items-center justify-center bg-primary px-5 py-6 text-primary-foreground">
//                       <span className="text-3xl font-bold">{new Date(otherEvent.start_date).getDate()}</span>
//                       <span className="text-sm uppercase">{new Date(otherEvent.start_date).toLocaleDateString('en-US', { month: 'short' })}</span>
//                     </div>
//                     <div className="flex-1 p-5">
//                       <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
//                         {otherEvent.title}
//                       </h3>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Clock className="h-4 w-4" />
//                         <span>{formatTime(otherEvent.start_date)}</span>
//                       </div>
//                       {otherEvent.location && (
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
//                           <MapPin className="h-4 w-4" />
//                           <span>{otherEvent.location}</span>
//                         </div>
//                       )}
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//               <div className="text-center mt-10">
//                 <Button variant="outline" asChild>
//                   <Link href="/events">View All Events</Link>
//                 </Button>
//               </div>
//             </div>
//           </section>
//         )}
//       </main>
//       <Footer />
//     </div>
//   )
// }
