import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  BookOpen, 
  Play,
  Headphones,
  Share2,
  Download,
  Clock,
  Eye
} from "lucide-react"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  const { data: sermon } = await supabase
    .from('sermons')
    .select('title, description, preacher')
    .eq('id', id)
    .single()
  
  return {
    title: sermon?.title || 'Sermon',
    description: sermon?.description || 'Watch or listen to this sermon from Bethel Evangelical Church.',
  }
}

export default async function SermonPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()
  
  const { data: sermon } = await supabase
    .from('sermons')
    .select('*')
    .eq('id', id)
    .single()

  if (!sermon) {
    notFound()
  }

  // Get related sermons from the same series or by same preacher
  const { data: relatedSermons } = await supabase
    .from('sermons')
    .select('*')
    .neq('id', id)
    .or(`series_name.eq.${sermon.series_name},preacher.eq.${sermon.preacher}`)
    .order('sermon_date', { ascending: false })
    .limit(3)

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Link */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <Link 
              href="/sermons" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sermons
            </Link>
          </div>
        </div>

        {/* Video/Audio Section */}
        <section className="bg-foreground">
          <div className="mx-auto max-w-5xl">
            <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
              {sermon.video_url ? (
                <iframe
                  src={sermon.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={sermon.title}
                />
              ) : (
                <div className="text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                    <Play className="h-12 w-12 ml-1" />
                  </div>
                  <p className="text-background/70">Video coming soon</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sermon Info */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Title & Meta */}
                <div className="mb-8">
                  {sermon.series_name && (
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                      {sermon.series_name}
                    </span>
                  )}
                  <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                    {sermon.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {sermon.preacher}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(sermon.sermon_date)}
                    </span>
                    {sermon.duration && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {sermon.duration}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4" />
                      {sermon.view_count} views
                    </span>
                  </div>
                </div>

                {/* Scripture Reference */}
                {sermon.scripture_reference && (
                  <div className="rounded-xl border border-border bg-primary/5 p-6 mb-8">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <BookOpen className="h-5 w-5" />
                      <span className="font-semibold">Scripture Reference</span>
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      {sermon.scripture_reference}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-serif text-xl font-bold text-foreground mb-4">About This Message</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {sermon.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-border">
                  {sermon.audio_url && (
                    <Button variant="outline" asChild>
                      <a href={sermon.audio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        Listen to Audio
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  {(sermon.video_url || sermon.audio_url) && (
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Speaker Card */}
                <div className="rounded-xl border border-border bg-card p-6 mb-6">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                    About the Speaker
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <User className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{sermon.preacher}</p>
                      <p className="text-sm text-muted-foreground">Bethel Evangelical Church</p>
                    </div>
                  </div>
                </div>

                {/* Related Sermons */}
                {relatedSermons && relatedSermons.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      Related Sermons
                    </h3>
                    <div className="space-y-4">
                      {relatedSermons.map((related) => (
                        <Link
                          key={related.id}
                          href={`/sermons/${related.id}`}
                          className="block group"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            {formatDate(related.sermon_date)}
                          </p>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </p>
                          <p className="text-sm text-primary mt-1">
                            {related.scripture_reference}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                      <Link href="/sermons">View All Sermons</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Join Us for Worship
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Experience the power of God's Word in person. We'd love to welcome 
                you to our services.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/about">Plan Your Visit</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sermons">Browse More Sermons</Link>
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
