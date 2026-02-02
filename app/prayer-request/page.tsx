"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Heart,
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function PrayerRequestPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [request, setRequest] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!request) {
      setStatus("error")
      setErrorMessage("Please enter your prayer request")
      return
    }

    setStatus("loading")
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('prayer_requests')
        .insert({
          name: name || 'Anonymous',
          email: email || null,
          request,
          is_private: isPrivate,
        })

      if (error) throw error

      setStatus("success")
      setName("")
      setEmail("")
      setRequest("")
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again later.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Prayer Request
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                "Do not be anxious about anything, but in every situation, by prayer and petition, 
                with thanksgiving, present your requests to God."
                <span className="block mt-2 text-primary font-medium">— Philippians 4:6</span>
              </p>
            </div>
          </div>
        </section>

        {/* Prayer Request Form */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-2xl px-4 lg:px-8">
            {status === "success" ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Prayer Request Submitted
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for sharing your prayer request with us. Our prayer team 
                  will be lifting you up in prayer. God hears you and He cares.
                </p>
                <p className="text-sm text-muted-foreground mb-8 p-4 bg-secondary/50 rounded-lg italic">
                  "The prayer of a righteous person is powerful and effective." — James 5:16
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setStatus("idle")}>
                    Submit Another Request
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Return Home</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                    Share Your Prayer Request
                  </h2>
                  <p className="text-muted-foreground">
                    Our prayer team is honored to pray for you. Fill out the form below 
                    and we will bring your request before the Lord.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Your Name (Optional)</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll only use this to follow up if needed
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="request">Prayer Request *</Label>
                    <Textarea
                      id="request"
                      placeholder="Share what you would like us to pray for..."
                      value={request}
                      onChange={(e) => setRequest(e.target.value)}
                      required
                      rows={6}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="private"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-input"
                    />
                    <div>
                      <Label htmlFor="private" className="font-medium">
                        Keep this request private
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Private requests will only be shared with our pastoral team. 
                        Uncheck to share with our prayer group.
                      </p>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Submit Prayer Request"
                    )}
                  </Button>
                </form>

                <div className="mt-12 rounded-lg bg-secondary/50 p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Need Immediate Support?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you're facing an urgent situation or need immediate pastoral care, 
                    please don't hesitate to contact us directly.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Contact the Church</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
