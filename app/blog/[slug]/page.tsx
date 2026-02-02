import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Calendar, User, Share2, BookOpen } from "lucide-react"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()
  
  return {
    title: post?.title || 'Blog Post',
    description: post?.excerpt || 'Read this article from Bethel Evangelical Church.',
  }
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) {
    notFound()
  }

  // Get recent posts for sidebar
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published_at')
    .eq('is_published', true)
    .neq('id', post.id)
    .order('published_at', { ascending: false })
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
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Header */}
                <header className="mb-10">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(post.published_at)}
                    </span>
                    {post.author_name && (
                      <span className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        {post.author_name}
                      </span>
                    )}
                  </div>
                  <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                </header>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {post.content?.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Author & Share */}
                <footer className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    {/* Author */}
                    {post.author_name && (
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Written by</p>
                          <p className="font-semibold text-foreground">{post.author_name}</p>
                        </div>
                      </div>
                    )}

                    {/* Share */}
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Share2 className="h-4 w-4" />
                      Share Article
                    </Button>
                  </div>
                </footer>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                {/* Recent Posts */}
                {recentPosts && recentPosts.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
                      Recent Posts
                    </h3>
                    <div className="space-y-6">
                      {recentPosts.map((recentPost) => (
                        <Link
                          key={recentPost.id}
                          href={`/blog/${recentPost.slug}`}
                          className="block group"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            {formatDate(recentPost.published_at)}
                          </p>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {recentPost.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-6 bg-transparent" asChild>
                      <Link href="/blog">View All Posts</Link>
                    </Button>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Join Our Community
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Experience the warmth of our church family. Visit us this Sunday!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/about">Plan Your Visit</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/blog">Read More Stories</Link>
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
