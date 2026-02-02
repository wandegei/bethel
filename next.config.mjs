/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'svxrsjrkghluzxwtmjvt.supabase.co', // Add your Supabase domain
      'images.unsplash.com',               // Keep Unsplash images working
    ],
    // optional: if you want, you can remove unoptimized so Next.js can optimize images
    // unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

export default nextConfig
