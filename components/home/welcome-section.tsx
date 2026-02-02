"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Users, BookOpen, HandHeart } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Faith in Christ",
    description:
      "We are rooted in the teachings of Jesus Christ and the authority of Scripture.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We build meaningful relationships and support one another as a spiritual family.",
  },
  {
    icon: BookOpen,
    title:
      "Biblical Teaching",
    description:
      "We are committed to teaching and living out God's Word in our daily lives.",
  },
  {
    icon: HandHeart,
    title: "Service",
    description:
      "We serve our community and the world with compassion and generosity.",
  },
]

export function WelcomeSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      {/* Animated Light Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[140px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full bg-secondary/20 blur-[160px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Who We Are
          </p>

          <h2 className="font-serif text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
            Welcome to Our Church Family
          </h2>

          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Bethel Evangelical Church has been serving the Kawooko community for
            over two decades. We are a diverse congregation united by our love
            for God and each other.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 text-center transition-all hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <value.icon className="h-8 w-8" />
              </div>

              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="px-8" asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
