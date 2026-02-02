import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { ArrowRight, Baby, Users, Heart, UserCheck, Music, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Ministries",
  description: "Explore the various ministries at Bethel Evangelical Church. Find your place to serve and grow.",
}

const ministryIcons: Record<string, typeof Baby> = {
  "children": Baby,
  "youth": Users,
  "women": Heart,
  "men": UserCheck,
  "music": Music,
  "outreach": Globe,
}

const ministryColors: Record<string, string> = {
  "children": "bg-blue-500/10 text-blue-600",
  "youth": "bg-green-500/10 text-green-600",
  "women": "bg-pink-500/10 text-pink-600",
  "men": "bg-amber-500/10 text-amber-600",
  "music": "bg-purple-500/10 text-purple-600",
  "outreach": "bg-teal-500/10 text-teal-600",
}

export default async function MinistriesPage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: ministries } = await supabase
    .from('ministries')
    .select('*')
    .eq('is_active', true)
    .order('name')

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Get Involved
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Our Ministries
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                At Bethel, we believe everyone has a place to belong and a purpose to fulfill. 
                Explore our ministries and find where you can grow, serve, and connect.
              </p>
            </div>
          </div>
        </section>

        {/* Ministries Grid */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {ministries && ministries.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {ministries.map((ministry) => {
                  const slug = ministry.slug || ministry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  const Icon = ministryIcons[slug] || Users
                  const colorClass = ministryColors[slug] || "bg-primary/10 text-primary"
                  
                  return (
                    <div
                      key={ministry.id}
                      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                    >
                      <div className="p-6 flex-1">
                        <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${colorClass}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
                          {ministry.name}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {ministry.description}
                        </p>
                        {ministry.meeting_time && (
                          <p className="text-sm text-primary font-medium">
                            {ministry.meeting_time}
                          </p>
                        )}
                      </div>
                      <div className="px-6 pb-6">
                        <Button asChild variant="outline" className="w-full bg-transparent">
                          <Link href={`/ministries/${slug}`} className="flex items-center justify-center gap-2">
                            Learn More
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Ministries Coming Soon
                </h2>
                <p className="text-muted-foreground mb-6">
                  We're working on adding our ministry information. Check back soon!
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Ready to Get Involved?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We'd love to help you find the right ministry for you. Contact us to learn 
                more about serving opportunities or to connect with a ministry leader.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn About Bethel</Link>
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
