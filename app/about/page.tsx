import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BookOpen, 
  Users, 
  Heart, 
  Globe, 
  MapPin, 
  Clock, 
  Mail, 
  Phone,
  Cross,
  Sparkles
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Bethel Evangelical Church - our history, mission, beliefs, and pastoral team.",
}

const beliefs = [
  {
    title: "The Bible",
    description: "We believe the Bible is the inspired, infallible Word of God and the final authority for faith and practice.",
  },
  {
    title: "The Trinity",
    description: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
  },
  {
    title: "Salvation",
    description: "We believe salvation is by grace alone, through faith alone, in Christ alone.",
  },
  {
    title: "The Church",
    description: "We believe in the universal Church, the body of Christ, and the importance of local church fellowship.",
  },
]

const values = [
  {
    icon: BookOpen,
    title: "Biblical Authority",
    description: "Scripture is our foundation for all teaching and practice.",
  },
  {
    icon: Heart,
    title: "Authentic Worship",
    description: "We worship God in spirit and truth with all our hearts.",
  },
  {
    icon: Users,
    title: "Genuine Community",
    description: "We build meaningful relationships that reflect Christ's love.",
  },
  {
    icon: Globe,
    title: "Global Mission",
    description: "We are committed to sharing the Gospel locally and globally.",
  },
]

const team = [
  {
    name: "Pastor John Mukasa",
    role: "Senior Pastor",
    bio: "Pastor John has been serving at Bethel for over 15 years. He is passionate about expository preaching and discipleship.",
  },
  {
    name: "Pastor Sarah Nakato",
    role: "Associate Pastor",
    bio: "Pastor Sarah oversees our women's ministry and counseling services. She has a heart for equipping believers.",
  },
  {
    name: "Deacon David Ssemakula",
    role: "Worship Leader",
    bio: "David leads our music ministry and has been serving in worship leadership for over a decade.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                About Bethel Evangelical Church
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Our Story, Our Mission
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                For over two decades, Bethel Evangelical Church has been a beacon of hope and 
                faith in Kawooko, Wakiso District. We are a community committed to knowing 
                Christ and making Him known.
              </p>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  Our History
                </p>
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                  A Journey of Faith
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Bethel Evangelical Church was founded in 2001 by a small group of believers 
                    who gathered in a home to worship and study God's Word. What began as a 
                    handful of faithful servants has grown into a vibrant community of hundreds 
                    of members.
                  </p>
                  <p>
                    Over the years, we have seen God's faithfulness in providing for our needs, 
                    guiding our steps, and transforming lives through the power of the Gospel. 
                    Our church building was completed in 2008, and we have continued to expand 
                    our facilities and ministries to serve our growing congregation.
                  </p>
                  <p>
                    Today, Bethel is known throughout Wakiso District for its commitment to 
                    biblical teaching, warm fellowship, and community outreach. We remain 
                    dedicated to our founding vision: to glorify God by making disciples who 
                    make disciples.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-secondary/50 p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                    <Cross className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">Our Mission</h3>
                  </div>
                </div>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  "To glorify God by proclaiming the Gospel, making disciples, and serving 
                  our community with the love of Christ."
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                    <Sparkles className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-foreground">Our Vision</h3>
                  </div>
                </div>
                <p className="mt-4 text-lg text-foreground leading-relaxed">
                  "To be a Christ-centered community that transforms lives and impacts 
                  generations for the Kingdom of God."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beliefs Section */}
        <section className="py-20 lg:py-28 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                What We Believe
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Our Core Beliefs
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                We are an evangelical church that holds to the historic Christian faith as 
                revealed in Scripture.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {beliefs.map((belief) => (
                <div 
                  key={belief.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {belief.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {belief.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                What Guides Us
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div 
                  key={value.title}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 lg:py-28 bg-primary/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Meet Our Team
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Church Leadership
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Our pastoral team is dedicated to shepherding the flock and equipping 
                believers for ministry.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <div 
                  key={member.name}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-serif text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visit Us Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-2xl bg-secondary/50 p-8 lg:p-12">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl mb-6 text-balance">
                    Plan Your Visit
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We would love to welcome you to Bethel! Whether you're new to the area, 
                    looking for a church home, or just curious about what we're all about, 
                    we invite you to join us for worship.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Location</p>
                        <p className="text-muted-foreground">Kawooko, Wakiso District, Uganda</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Service Times</p>
                      
                        <p className="text-muted-foreground">Saturday Choir Practice: 5:00 PM – 7:00 PM</p>

                          <p className="text-muted-foreground">Thursday Choir Practice: 5:00 PM – 7:00 PM</p>

                          <p className="text-muted-foreground">Wednesday Bible Study: 6:00 PM – 8:00 PM</p>

                          <p className="text-muted-foreground">Wednesday Intercessions: 2:00 PM – 4:00 PM</p>

                          <p className="text-muted-foreground">Monthly Overnight Service: Held on the first Friday of every month</p>

                          <p className="text-muted-foreground"> Daily Lunch Hour: Monday through Friday, 1:00 PM – 2:00 PM</p>
                          <p className="text-muted-foreground">Sunday Worship: 9:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Phone</p>
                        <p className="text-muted-foreground">+256776167706</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <p className="text-muted-foreground">info@bethelchurch.ug</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="rounded-xl bg-card border border-border p-8 text-center">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                      What to Expect
                    </h3>
                    <ul className="text-left space-y-3 text-muted-foreground mb-6">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        A warm, welcoming atmosphere
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Meaningful worship through music and prayer
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Bible-based teaching and preaching
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Programs for children and youth
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        Opportunities to connect with others
                      </li>
                    </ul>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
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
