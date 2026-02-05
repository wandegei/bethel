import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Baby, Users, Heart, UserCheck, Music, Globe } from "lucide-react"

const ministries = [
  {
    icon: Baby,
    name: "Children's Ministry",
    description: "Nurturing young hearts with age-appropriate Bible teaching and fun activities.",
    href: "/ministries/children",
    color: "bg-blue-500/10 text-blue-600",
    images: [
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.50%20PM%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41MCBQTSAoMikuanBlZyIsImlhdCI6MTc2OTk1MTU1OCwiZXhwIjoxOTQ1ODYxOTU4fQ.1A26gXeTv4mh9f2IJihvK8fFFnTKRKS725q6bxvdIGI",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.51%20PM%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41MSBQTSAoMSkuanBlZyIsImlhdCI6MTc2OTk1NDE0MSwiZXhwIjoxOTQ1ODY0NTQxfQ.UF-byDJAltwkrHwTdXes_UH2K2NiTGANkPOOhghTigo",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.56%20PM%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41NiBQTSAoMSkuanBlZyIsImlhdCI6MTc2OTk1NTM2MiwiZXhwIjoxOTQ1ODY1NzYyfQ.1AcotQlO0xagF1d15BjFpmSdyLSFDTU81uhEfs53dKg",
    ],
  },
  {
    icon: Users,
    name: "Youth Ministry",
    description: "Empowering teenagers to grow in faith, leadership, and community.",
    href: "/ministries/youth",
    color: "bg-green-500/10 text-green-600",
    images: [
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.56%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41NiBQTS5qcGVnIiwiaWF0IjoxNzY5OTU2NjYwLCJleHAiOjE5NDYwMzk4NjB9.JfU_sXriLyqH4aytO5QTd-1eeLbOyPerBWWr5HdOR8Y",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.55%20PM%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41NSBQTSAoMSkuanBlZyIsImlhdCI6MTc2OTk1NjEzNCwiZXhwIjoxOTQ1ODY2NTM0fQ.8TKsJhw9lifpp9nsGma4OaA_maJDm6RuYT8l65BId30",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.56%20PM%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41NiBQTSAoMikuanBlZyIsImlhdCI6MTc2OTk1NTQzMCwiZXhwIjoxOTQ1ODY1ODMwfQ.l2rVGmMEyYuVaJPLZjGumvVHP3MF5i7JMdg21oxGdcM",
    ],
  },
  {
    icon: Heart,
    name: "Women's Ministry",
    description: "Building sisterhood through Bible study, prayer, and fellowship.",
    href: "/ministries/women",
    color: "bg-pink-500/10 text-pink-600",
    images: [
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.17%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy4xNyBQTS5qcGVnIiwiaWF0IjoxNzY5OTU2ODIzLCJleHAiOjE5NDYxMjY0MjN9._iF9tIQpahLN5Vactvkz1AdgPmiSzoHUDCYzSQr_czA",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.18%20PM%20(1).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy4xOCBQTSAoMSkuanBlZyIsImlhdCI6MTc2OTk1Njg3NCwiZXhwIjoxOTQ2MTI2NDc0fQ.a707PAr8DQcgdU17B2P5qkdcMXAdACvTyju3w2jHGFA",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.56%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy41NiBQTS5qcGVnIiwiaWF0IjoxNzY5OTU3MDA0LCJleHAiOjE5NDU4Njc0MDR9.8jq4A4BthH4r6585O3KMD3OqoQN6AbOtIjKglD1MC2o",
    ],
  },
  {
    icon: UserCheck,
    name: "Men's Fellowship",
    description: "Equipping men to be spiritual leaders in their homes and community.",
    href: "/ministries/men",
    color: "bg-amber-500/10 text-amber-600",
    images: [
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
    ],
  },
  {
    icon: Music,
    name: "Music Ministry",
    description: "Leading the congregation in worship through music and song.",
    href: "/ministries/worship",
    color: "bg-purple-500/10 text-purple-600",
    images: [
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
    ],
  },
  {
    icon: Globe,
    name: "Outreach Ministry",
    description: "Sharing God's love through community service and missions.",
    href: "/ministries/missions",
    color: "bg-teal-500/10 text-teal-600",
    images: [
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
      "https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.49%20PM.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OSBQTS5qcGVnIiwiaWF0IjoxNzY5OTU5NjY1LCJleHAiOjE5NDU4NzAwNjV9.EAhw7iKkjNJoIxSP6Tl5TFEO8hzS0XwxqSNxsaWlPY8",
    ],
  },
]

export function MinistriesPreview() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Get Involved
          </p>
          <h2 className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
            Our Ministries
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            There's a place for everyone at Bethel. Discover how you can grow in
            faith and serve others through our various ministries.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <Link
              key={ministry.name}
              href={ministry.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
            >
              {/* Images */}
              <div className="grid grid-cols-3 gap-1 h-32">
                {ministry.images.map((image, index) => (
                  <div key={index} className="relative h-full w-full overflow-hidden">
                    <Image
                      src={image}
                      alt={`${ministry.name} image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${ministry.color}`}>
                  <ministry.icon className="h-6 w-6" />
                </div>

                <h3 className="font-serif text-xl font-semibold mb-2">
                  {ministry.name}
                </h3>

                <p className="text-sm text-muted-foreground flex-grow">
                  {ministry.description}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/ministries">View All Ministries</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
