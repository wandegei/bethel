import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram } from "lucide-react"
import { BethelLogo } from "@/components/branding/BethelLogo"

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Ministries", href: "/ministries" },
  { name: "Upcoming Events", href: "/events" },
  { name: "Sermons", href: "/sermons" },
  { name: "Contact Us", href: "/contact" },
  { name: "Give Online", href: "/donate" },
]

const ministryLinks = [
  { name: "Children's Ministry", href: "/ministries/children" },
  { name: "Youth Ministry", href: "/ministries/youth" },
  { name: "Women's Ministry", href: "/ministries/women" },
  { name: "Men's Fellowship", href: "/ministries/men" },
  { name: "Music Ministry", href: "/ministries/music" },
  { name: "Outreach", href: "/ministries/outreach" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Church Info */}
          <div>
            <div className="mb-4">
              <Link href="/" aria-label="Bethel Evangelical Church Home">
                <BethelLogo variant="footer" />
              </Link>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A welcoming community of faith dedicated to spreading the love of Christ
              in Kawooko, Wakiso District, and beyond.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Our Ministries
            </h3>
            <ul className="space-y-2">
              {ministryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Kawooko, Wakiso District, Uganda</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+256776167706</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@bethelchurch.ug</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>Sunday Service: 9:00 AM</p>
                  <p>Wednesday Bible Study: 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bethel Evangelical Church. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
