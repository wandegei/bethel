import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Calendar, User, ArrowRight } from "lucide-react"

// --- Hard-coded Supabase client ---
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  "https://svxrsjrkghluzxwtmjvt.supabase.co", // Supabase URL
  "sb_publishable_3YYKpXLOX0qq77ugJZ0_Mw_s2nU4rXH" // Public anon key
)

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
}

export async function SermonsPreview() {
  const { data: sermons } = await supabase
    .from("sermons")
    .select("*")
    .order("sermon_date", { ascending: false })
    .limit(3)

  const recentSermons: Sermon[] = sermons || []

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Listen & Learn
            </p>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              Recent Sermons
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Missed a service? Catch up on our latest messages and grow in your faith.
            </p>
          </div>

          <Button variant="outline" asChild className="mt-6 md:mt-0 bg-transparent">
            <Link href="/sermons" className="flex items-center gap-2">
              View All Sermons
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {recentSermons.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentSermons.map((sermon) => (
              <Link
                key={sermon.id}
                href={`/sermons/${sermon.id}`}
                className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div
                  className="relative aspect-video bg-cover bg-center"
                  style={{
                    backgroundImage: sermon.thumbnail_url
                      ? `url(${sermon.thumbnail_url})`
                      : undefined,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-7 w-7 ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(sermon.sermon_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {sermon.speaker}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {sermon.title}
                  </h3>

                  <p className="text-sm text-primary font-medium">
                    {sermon.scripture_reference}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <Play className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">
              Sermons Coming Soon
            </h3>
            <p className="text-muted-foreground mb-6">
              We're working on uploading our sermon archive. Check back soon!
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
