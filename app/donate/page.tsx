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
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle,
  Loader2,
  AlertCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const amounts = [10000, 25000, 50000, 100000, 250000, 500000]

const givingOptions = [
  {
    id: "tithe",
    label: "Tithe",
    description: "Regular giving to support church operations",
  },
  {
    id: "offering",
    label: "Offering",
    description: "General contribution to the church",
  },
  {
    id: "missions",
    label: "Missions",
    description: "Support our outreach and mission work",
  },
  {
    id: "building",
    label: "Building Fund",
    description: "Help maintain and expand our facilities",
  },
  {
    id: "benevolence",
    label: "Benevolence",
    description: "Help those in need in our community",
  },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [givingType, setGivingType] = useState("offering")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const amount = customAmount ? parseInt(customAmount) : selectedAmount

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || amount <= 0) {
      setStatus("error")
      setErrorMessage("Please select or enter a valid amount")
      return
    }

    setStatus("loading")
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('donations')
        .insert({
          amount,
          donation_type: givingType,
          donor_name: name || null,
          donor_email: email || null,
          message: message || null,
          payment_method: 'pending',
          status: 'pending',
        })

      if (error) throw error

      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again later.")
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="mx-auto max-w-md px-4 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Thank You for Your Gift!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your generosity helps us continue our mission of spreading the Gospel 
              and serving our community. May God bless you abundantly.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Amount: <span className="font-semibold text-foreground">{formatCurrency(amount!)}</span>
              <br />
              Type: <span className="font-semibold text-foreground">{givingOptions.find(g => g.id === givingType)?.label}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8 p-4 bg-secondary/50 rounded-lg">
              <strong>Note:</strong> To complete your donation, please send your gift via 
              Mobile Money or bank transfer. Our finance team will confirm your donation.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
              <Button variant="outline" onClick={() => setStatus("idle")}>
                Make Another Donation
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
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
                Give Online
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                "Each of you should give what you have decided in your heart to give, 
                not reluctantly or under compulsion, for God loves a cheerful giver."
                <span className="block mt-2 text-primary font-medium">— 2 Corinthians 9:7</span>
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Make a Donation
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Giving Type */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      What would you like to give towards?
                    </Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {givingOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setGivingType(option.id)}
                          className={`text-left p-4 rounded-lg border transition-all ${
                            givingType === option.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-medium text-foreground">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Select Amount (UGX)
                    </Label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {amounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amt)
                            setCustomAmount("")
                          }}
                          className={`py-3 px-4 rounded-lg border text-center font-medium transition-all ${
                            selectedAmount === amt && !customAmount
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/50 text-foreground"
                          }`}
                        >
                          {formatCurrency(amt)}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        UGX
                      </span>
                      <Input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        className="pl-14"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold block">
                      Your Information (Optional)
                    </Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name" className="sr-only">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="sr-only">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="sr-only">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="sr-only">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Add a note (optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                      />
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
                    disabled={status === "loading" || !amount}
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Submit Donation Intent
                        {amount && ` - ${formatCurrency(amount)}`}
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Other Ways to Give */}
              <div id="other-ways">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Other Ways to Give
                </h2>
                
                <div className="space-y-6">
                  {/* Mobile Money */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Smartphone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Mobile Money</h3>
                        <p className="text-sm text-muted-foreground">MTN & Airtel Money</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">MTN MoMo:</span> 0770 000 000
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Airtel Money:</span> 0750 000 000
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Name:</span> Bethel Evangelical Church
                      </p>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Bank Transfer</h3>
                        <p className="text-sm text-muted-foreground">Direct deposit</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Bank:</span> Stanbic Bank Uganda
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Account Name:</span> Bethel Evangelical Church
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Account Number:</span> 9030000000000
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Branch:</span> Kampala Main
                      </p>
                    </div>
                  </div>

                  {/* In-Person */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">In-Person Giving</h3>
                        <p className="text-sm text-muted-foreground">During services</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You can also give during our Sunday services. Offering baskets are 
                      passed during worship, or you can drop your gift at the welcome desk.
                    </p>
                  </div>
                </div>

                {/* Note */}
                <div className="mt-8 rounded-lg bg-secondary/50 p-6">
                  <h3 className="font-semibold text-foreground mb-2">Your Gift Matters</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every donation, no matter the size, helps us continue our mission of 
                    spreading the Gospel, caring for our community, and maintaining our 
                    church facilities. Thank you for your faithful giving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
