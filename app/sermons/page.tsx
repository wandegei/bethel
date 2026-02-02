import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { Play, Calendar, User, BookOpen, Headphones } from "lucide-react"

export const metadata: Metadata = {
  title: "Sermons",
  description: "Listen to sermons from Bethel Evangelical Church. Find biblical teaching and spiritual encouragement.",
}

interface Sermon {
  id: string
  title: string
  speaker: string
  sermon_date: string
  description: string
  video_url: string | null
  audio_url: string | null
  thumbnail_url: string | null
  scripture_reference: string
  series: string | null
}

export default async function SermonsPage() {
  const supabase = await createSupabaseServerClient()

  const { data: sermons } = await supabase
    .from("sermons")
    .select("*")
    .order("sermon_date", { ascending: false })

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

  const series = sermons
    ? [...new Set(sermons.filter((s) => s.series).map((s) => s.series))]
    : []

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Listen & Learn
            </p>
            <h1 className="font-serif text-4xl font-bold sm:text-5xl lg:text-6xl">
              Sermon Archive
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Missed a service? Catch up on our sermons and grow in your faith.
            </p>
          </div>
        </section>

        {/* Latest Sermon */}
        {sermons && sermons.length > 0 && (
          <section className="py-16 border-b border-border">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold mb-8">
                Latest Message
              </h2>

              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  <div
                    className="relative aspect-video lg:aspect-auto bg-cover bg-center"
                    style={{
                      backgroundImage: sermons[0].thumbnail_url
                        ? `url(${sermons[0].thumbnail_url})`
                        : undefined,
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    <Link
                      href={`/sermons/${sermons[0].id}`}
                      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform mx-auto my-auto"
                    >
                      <Play className="h-9 w-9 ml-1" />
                    </Link>
                  </div>

                  <div className="p-8 lg:p-10">
                    <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(sermons[0].sermon_date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {sermons[0].speaker}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-2">
                      {sermons[0].title}
                    </h3>

                    <p className="text-primary font-medium mb-4">
                      {sermons[0].scripture_reference}
                    </p>

                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {sermons[0].description}
                    </p>

                    <div className="flex gap-3">
                      <Button asChild>
                        <Link href={`/sermons/${sermons[0].id}`}>
                          <Play className="h-4 w-4 mr-2" />
                          Watch Now
                        </Link>
                      </Button>

                      {sermons[0].audio_url && (
                        <Button variant="outline" asChild>
                          <Link href={sermons[0].audio_url}>
                            <Headphones className="h-4 w-4 mr-2" />
                            Listen
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Sermons */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {sermons && sermons.length > 1 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sermons.slice(1).map((sermon) => (
                  <Link
                    key={sermon.id}
                    href={`/sermons/${sermon.id}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg"
                  >
                    <div
                      className="relative aspect-video bg-cover bg-center"
                      style={{
                        backgroundImage: sermon.thumbnail_url
                          ? `url(${sermon.thumbnail_url})`
                          : undefined,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
                      <div className="relative z-10 flex h-full items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition">
                          <Play className="h-6 w-6 ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex gap-4 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(sermon.sermon_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {sermon.speaker}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2">
                        {sermon.title}
                      </h3>

                      <p className="text-sm text-primary mb-2">
                        {sermon.scripture_reference}
                      </p>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {sermon.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">
                  Sermons Coming Soon
                </h3>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
