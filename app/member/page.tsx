// import { redirect } from "next/navigation"
// import Link from "next/link"
// import { Header } from "@/components/layout/header"
// import { Footer } from "@/components/layout/footer"
// import { Button } from "@/components/ui/button"
// import { createClient } from "@/lib/supabase/server"
// import { 
//   User, 
//   Calendar, 
//   Heart, 
//   BookOpen, 
//   Gift,
//   LogOut,
//   Bell,
//   Settings
// } from "lucide-react"

// export default async function MemberPage() {
//   const supabase = await createClient()
  
//   const { data: { user }, error } = await supabase.auth.getUser()
  
//   if (error || !user) {
//     redirect('/auth/login')
//   }

//   const firstName = user.user_metadata?.first_name || 'Member'
//   const lastName = user.user_metadata?.last_name || ''

//   // Fetch user's event RSVPs
//   const { data: rsvps } = await supabase
//     .from('event_rsvps')
//     .select(`
//       *,
//       events (*)
//     `)
//     .eq('user_id', user.id)
//     .order('created_at', { ascending: false })
//     .limit(3)

//   // Fetch user's donation history
//   const { data: donations } = await supabase
//     .from('donations')
//     .select('*')
//     .eq('donor_email', user.email)
//     .order('created_at', { ascending: false })
//     .limit(3)

//   const formatCurrency = (value: number) => {
//     return new Intl.NumberFormat('en-UG', {
//       style: 'currency',
//       currency: 'UGX',
//       minimumFractionDigits: 0,
//     }).format(value)
//   }

//   const formatDate = (dateStr: string) => {
//     return new Date(dateStr).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     })
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="flex-1 bg-secondary/30">
//         {/* Welcome Section */}
//         <section className="bg-primary text-primary-foreground py-12">
//           <div className="mx-auto max-w-7xl px-4 lg:px-8">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
//                   <User className="h-8 w-8" />
//                 </div>
//                 <div>
//                   <p className="text-primary-foreground/70">Welcome back,</p>
//                   <h1 className="font-serif text-2xl font-bold">
//                     {firstName} {lastName}
//                   </h1>
//                 </div>
//               </div>
//               <form action="/api/auth/signout" method="post">
//                 <Button variant="outline" type="submit" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent">
//                   <LogOut className="h-4 w-4 mr-2" />
//                   Sign Out
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </section>

//         {/* Dashboard Content */}
//         <section className="py-12">
//           <div className="mx-auto max-w-7xl px-4 lg:px-8">
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {/* Quick Actions */}
//               <div className="lg:col-span-2">
//                 <h2 className="font-serif text-xl font-bold text-foreground mb-4">
//                   Quick Actions
//                 </h2>
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                   <Link
//                     href="/events"
//                     className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
//                   >
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
//                       <Calendar className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <span className="font-medium text-foreground">Events</span>
//                   </Link>
//                   <Link
//                     href="/sermons"
//                     className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
//                   >
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
//                       <BookOpen className="h-6 w-6 text-green-600" />
//                     </div>
//                     <span className="font-medium text-foreground">Sermons</span>
//                   </Link>
//                   <Link
//                     href="/donate"
//                     className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
//                   >
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
//                       <Gift className="h-6 w-6 text-amber-600" />
//                     </div>
//                     <span className="font-medium text-foreground">Give</span>
//                   </Link>
//                   <Link
//                     href="/prayer-request"
//                     className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-md"
//                   >
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/10">
//                       <Heart className="h-6 w-6 text-pink-600" />
//                     </div>
//                     <span className="font-medium text-foreground">Prayer</span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Account Settings */}
//               <div>
//                 <h2 className="font-serif text-xl font-bold text-foreground mb-4">
//                   Account
//                 </h2>
//                 <div className="rounded-xl border border-border bg-card p-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <Bell className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium text-foreground">Notifications</p>
//                         <p className="text-sm text-muted-foreground">Manage your preferences</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Settings className="h-5 w-5 text-muted-foreground" />
//                       <div>
//                         <p className="font-medium text-foreground">Settings</p>
//                         <p className="text-sm text-muted-foreground">Update your profile</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* My Events */}
//               <div className="lg:col-span-2">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="font-serif text-xl font-bold text-foreground">
//                     My Registered Events
//                   </h2>
//                   <Link href="/events" className="text-sm text-primary hover:underline">
//                     View All
//                   </Link>
//                 </div>
//                 <div className="rounded-xl border border-border bg-card overflow-hidden">
//                   {rsvps && rsvps.length > 0 ? (
//                     <div className="divide-y divide-border">
//                       {rsvps.map((rsvp: { id: string; events: { title: string; event_date: string; location: string } }) => (
//                         <div key={rsvp.id} className="p-4 flex items-center justify-between">
//                           <div>
//                             <p className="font-medium text-foreground">{rsvp.events?.title}</p>
//                             <p className="text-sm text-muted-foreground">
//                               {rsvp.events?.event_date && formatDate(rsvp.events.event_date)} • {rsvp.events?.location}
//                             </p>
//                           </div>
//                           <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
//                             Registered
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-8 text-center">
//                       <Calendar className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
//                       <p className="text-muted-foreground">No event registrations yet</p>
//                       <Button variant="outline" size="sm" asChild className="mt-4 bg-transparent">
//                         <Link href="/events">Browse Events</Link>
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Giving History */}
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="font-serif text-xl font-bold text-foreground">
//                     Recent Giving
//                   </h2>
//                   <Link href="/donate" className="text-sm text-primary hover:underline">
//                     Give Now
//                   </Link>
//                 </div>
//                 <div className="rounded-xl border border-border bg-card overflow-hidden">
//                   {donations && donations.length > 0 ? (
//                     <div className="divide-y divide-border">
//                       {donations.map((donation: { id: string; amount: number; donation_type: string; created_at: string }) => (
//                         <div key={donation.id} className="p-4">
//                           <div className="flex items-center justify-between mb-1">
//                             <p className="font-medium text-foreground">
//                               {formatCurrency(donation.amount)}
//                             </p>
//                             <span className="text-xs text-muted-foreground">
//                               {formatDate(donation.created_at)}
//                             </span>
//                           </div>
//                           <p className="text-sm text-muted-foreground capitalize">
//                             {donation.donation_type}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-8 text-center">
//                       <Gift className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
//                       <p className="text-muted-foreground">No giving history</p>
//                       <Button variant="outline" size="sm" asChild className="mt-4 bg-transparent">
//                         <Link href="/donate">Make a Gift</Link>
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }
