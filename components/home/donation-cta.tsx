import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Gift, Building, Users } from "lucide-react"

const impactAreas = [
  {
    icon: Building,
    label: "Church Building",
    description: "Maintaining our place of worship",
  },
  {
    icon: Users,
    label: "Community Outreach",
    description: "Serving those in need",
  },
  {
    icon: Gift,
    label: "Missions",
    description: "Spreading the Gospel",
  },
]

export function DonationCTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl bg-primary overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10 mb-6">
                <Heart className="h-7 w-7 text-primary-foreground" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
                Partner With Us in Ministry
              </h2>
              <p className="mt-4 text-primary-foreground/80 text-lg leading-relaxed">
                Your generous giving helps us fulfill our mission of spreading the Gospel, 
                caring for our community, and building God's kingdom. Every gift makes a difference.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/donate">
                    Give Online
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent">
                  <Link href="/donate#other-ways">
                    Other Ways to Give
                  </Link>
                </Button>
              </div>
            </div>

            {/* Impact Areas */}
            <div className="bg-primary-foreground/5 p-8 lg:p-12">
              <h3 className="text-xl font-semibold text-primary-foreground mb-6">
                Your Giving Supports
              </h3>
              <div className="space-y-4">
                {impactAreas.map((area) => (
                  <div
                    key={area.label}
                    className="flex items-center gap-4 rounded-xl bg-primary-foreground/10 p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/10">
                      <area.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary-foreground">{area.label}</p>
                      <p className="text-sm text-primary-foreground/70">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-primary-foreground/60">
                "Each of you should give what you have decided in your heart to give, 
                not reluctantly or under compulsion, for God loves a cheerful giver." 
                — 2 Corinthians 9:7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
