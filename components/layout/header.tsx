"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BethelLogo } from "@/components/branding/BethelLogo"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Ministries",
    href: "/ministries",
    children: [
      { name: "All Ministries", href: "/ministries" },
      { name: "Children's Ministry", href: "/ministries/children" },
      { name: "Youth Ministry", href: "/ministries/youth" },
      { name: "Women's Ministry", href: "/ministries/women" },
      { name: "Men's Fellowship", href: "/ministries/men" },
    ],
  },
  { name: "Events", href: "/events" },
  { name: "Sermons", href: "/sermons" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="relative sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md shadow-md transition-colors duration-300 overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bg-primary/10 rounded-full w-64 h-64 top-[-50px] left-[-50px] blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute bg-secondary/10 rounded-full w-96 h-96 bottom-[-100px] right-[-80px] blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8 relative z-10">
        {/* Logo */}
        <Link href="/" aria-label="Bethel Evangelical Church Home">
          <BethelLogo variant="header" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 text-foreground hover:text-primary transition-colors",
                      pathname.startsWith(item.href) && "text-primary"
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="mt-2 bg-background border border-border rounded-md shadow-lg"
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild>
                      <Link href={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium text-foreground relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary/80 after:to-secondary/80 after:transition-all hover:after:w-full",
                  pathname === item.href && "after:w-full after:opacity-100"
                )}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
            <Link href="/donate">Give Online</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden rounded-md p-2 text-foreground hover:bg-primary/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-border bg-background/95"
          >
            <div className="flex flex-col space-y-1 px-4 py-4">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name} className="space-y-1">
                    <p className="px-3 py-2 text-sm font-semibold">{item.name}</p>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block rounded-md px-6 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <div className="pt-4">
                <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                  <Link href="/donate">Give Online</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
