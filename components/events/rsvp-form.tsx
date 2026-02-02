'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, Users } from 'lucide-react'

interface RSVPFormProps {
  eventId: string
  eventTitle: string
}

export function RSVPForm({ eventId, eventTitle }: RSVPFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: rsvpError } = await supabase
        .from('event_rsvps')
        .insert({
          event_id: eventId,
          name,
          email,
          phone: phone || null,
          guests
        })

      if (rsvpError) {
        if (rsvpError.code === '23505') {
          throw new Error('You have already registered for this event with this email.')
        }
        throw rsvpError
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-4">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          You're Registered!
        </h3>
        <p className="text-muted-foreground mb-4">
          Thank you for registering for {eventTitle}. We look forward to seeing you!
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation has been sent to your email.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">Register Now</h3>
          <p className="text-sm text-muted-foreground">Save your spot</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+256 7XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            max={10}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          />
          <p className="text-xs text-muted-foreground">Including yourself</p>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register for Event'}
        </Button>
      </form>
    </div>
  )
}
