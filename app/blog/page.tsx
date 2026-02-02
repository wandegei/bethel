import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest news, stories, and updates from Bethel Evangelical Church.",
}

export default async function BlogPage() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const featuredPost = posts?.[0]
  const otherPosts = posts?.slice(1)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                News & Stories
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Church Blog
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Stay connected with the latest news, stories of faith, and updates 
                from our church community.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 border-b border-border">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                Featured Story
              </h2>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-20 w-20 text-primary/30" />
                  </div>
                  <div className="p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.published_at)}
                      </span>
                      {featuredPost.author_name && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          {featuredPost.author_name}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-12">
              Recent Posts
            </h2>

            {otherPosts && otherPosts.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    <div className="aspect-video bg-primary/5 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary/30" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_at)}
                        </span>
                        {post.author_name && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author_name}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : !featuredPost ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  No Posts Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  We're working on some great content. Check back soon!
                </p>
                <Button asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                More posts coming soon!
              </p>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Stay Updated
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Subscribe to our newsletter to receive the latest blog posts and 
                church updates directly in your inbox.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/#newsletter">Subscribe to Newsletter</Link>
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
