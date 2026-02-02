import React from "react"
import type { Metadata, Viewport } from 'next'
import { Source_Sans_3, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: '--font-source-sans'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: {
    default: 'Bethel Evangelical Church | Kawooko, Wakiso District',
    template: '%s | Bethel Evangelical Church'
  },
  description: 'Welcome to Bethel Evangelical Church in Kawooko, Wakiso District, Uganda. Join us for worship, community, and spiritual growth. Experience the love of Christ with us.',
  keywords: ['church', 'evangelical', 'Uganda', 'Wakiso', 'Kawooko', 'worship', 'community', 'Christian'],
  authors: [{ name: 'Bethel Evangelical Church' }],
  openGraph: {
    title: 'Bethel Evangelical Church',
    description: 'A welcoming community of faith in Kawooko, Wakiso District, Uganda',
    type: 'website',
    locale: 'en_US',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8B6914' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1408' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
