"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Calendar } from "lucide-react"

interface Particle {
  size: number
  x: number
  y: number
  duration: number
  delay: number
  color: string
}

export function HeroSection() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 600], ["0%", "6%"])

  const [particles, setParticles] = useState<Particle[]>([])

  // Generate particles only on the client
  useEffect(() => {
    const random = (min: number, max: number) => Math.random() * (max - min) + min

    const generated: Particle[] = Array.from({ length: 35 }).map(() => ({
      size: random(4, 10),
      x: random(0, 100),
      y: random(0, 100),
      duration: random(8, 18),
      delay: random(0, 8),
      color: `hsl(${random(200, 280)}, 80%, 70%)`,
    }))

    setParticles(generated)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <motion.div
        aria-hidden
        style={{
          y: backgroundY,
          backgroundImage:
            "url('https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/WhatsApp%20Image%202026-01-29%20at%203.07.48%20PM%20(2).jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL1doYXRzQXBwIEltYWdlIDIwMjYtMDEtMjkgYXQgMy4wNy40OCBQTSAoMikuanBlZyIsImlhdCI6MTc3MDI4OTc1MywiZXhwIjoxOTQ2MjAwMTUzfQ.AQZ4NmqHLl7ZT2lUc7P8jki54kzyqbuSSwkpFiFAzbM')",
        }}
        className="absolute inset-0 z-0 bg-cover bg-no-repeat pointer-events-none bg-[position:50%_20%]"
      />

      {/* COLOR OVERLAYS */}
      <div className="absolute inset-0 z-0 bg-primary/60 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none" />

      {/* GLOWING PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: `${p.x}%`, y: `${p.y}%` }}
            animate={{
              y: [
                `${p.y}%`,
                `${p.y + (Math.random() * 20 - 10)}%`,
                `${p.y}%`
              ],
              x: [
                `${p.x}%`,
                `${p.x + (Math.random() * 20 - 10)}%`,
                `${p.x}%`
              ],
              opacity: [0, 1, 0.3, 0.8, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
              filter: "blur(3px)",
            }}
          />
        ))}
      </div>

      {/* ANIMATED BACKGROUND TEXT */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="
            absolute top-12 sm:top-16 md:top-20 lg:top-24 left-0 whitespace-nowrap
            text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem]
            font-serif font-bold tracking-widest select-none
            text-white/20
            [text-shadow:0_0_10px_rgba(0,0,0,0.3)]
          "
        >
          JESUS IS LORD • FAITH • HOPE • LOVE • WORSHIP • GRACE •
        </motion.div>
      </div>

      {/* FLOATING LIGHT ORBS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute top-12 left-8 sm:top-16 sm:left-16 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-secondary/20 blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-12 right-8 sm:bottom-16 sm:right-16 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:pt-20 pb-12 sm:pb-14 flex items-start">
        <div className="grid w-full items-start gap-10 sm:gap-12 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center sm:text-left"
          >
            <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-secondary">
              Welcome to Bethel Evangelical Church
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-balance">
              Experience the Love of Christ in Community
            </h1>

            <p className="mt-3 sm:mt-5 text-sm sm:text-base sm:leading-relaxed text-white max-w-full sm:max-w-xl mx-auto sm:mx-0">
              Join us for worship, fellowship, and spiritual growth. At Bethel,
              we believe in building a community where everyone belongs and
              experiences the transforming power of God’s love.
            </p>

            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-4 sm:mt-6 border-l-4 border-secondary pl-3 sm:pl-4 italic text-xs sm:text-sm text-white/90 max-w-full sm:max-w-xl mx-auto sm:mx-0"
            >
              “For where two or three gather in my name, there am I with them.”
              <span className="block mt-1 text-xs sm:text-sm font-semibold text-secondary">
                — Matthew 18:20
              </span>
            </motion.blockquote>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
              <Button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base" asChild>
                <Link href="/about">Plan Your Visit</Link>
              </Button>

              <Button
                className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base"
                variant="outline"
                asChild
              >
                <Link href="/sermons" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Online
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto w-full max-w-md mt-8 sm:mt-0"
          >
            <div className="rounded-2xl bg-card p-4 sm:p-6 sm:shadow-xl border border-border">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-semibold">
                    Service Times
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Join us this week
                  </p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {[
                  "Daily Lunch Hour: Mon–Fri (1:00–2:00 PM)",
                  "Wednesday Intercessions: 2:00–4:00 PM",
                  "Wednesday Bible Study: 6:00–8:00 PM",
                  "Thursday Choir Practice: 5:00–7:00 PM",
                  "Saturday Choir Practice: 5:00–7:00 PM",
                  "Sunday Worship: 9:00 AM",
                  "Monthly Overnight Service (1st Friday)",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-secondary/50 p-2 sm:p-4 text-xs sm:text-sm font-semibold"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Location: Kawooko, Wakiso District, Uganda
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
