"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface BethelLogoProps {
  className?: string
  variant?: "header" | "footer"
}

export function BethelLogo({
  className,
  variant = "header",
}: BethelLogoProps) {
  const sizes =
    variant === "header"
      ? "h-7 md:h-9"      // 👈 smaller for navbar
      : "h-10 md:h-12"    // 👈 slightly bigger for footer

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="https://svxrsjrkghluzxwtmjvt.supabase.co/storage/v1/object/sign/church%20images/logobethel1-removebg-preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NmQ0Y2QzZS1hZjU3LTQwOWQtYjBmNy1kYTM1MDQwMTZlNzIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjaHVyY2ggaW1hZ2VzL2xvZ29iZXRoZWwxLXJlbW92ZWJnLXByZXZpZXcucG5nIiwiaWF0IjoxNzY5OTY4MjcxLCJleHAiOjE5NDYxMzc4NzF9.OrOAMBeQdl7kOgK3pFX__KMwR7vEfnDAGxsd3_PZCEc"
        alt="Bethel Evangelical Church Logo"
        width={160}
        height={50}
        priority={variant === "header"}
        className={cn("w-auto object-contain", sizes)}
        unoptimized
      />
    </div>
  )
}
