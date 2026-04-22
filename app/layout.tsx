import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Motif - Connect Your Finances with Your Emotions',
  description: 'Discover the patterns between your spending and emotions. Motif helps you understand your financial behaviors through emotional awareness.',
  keywords: ['finance', 'emotions', 'spending', 'patterns', 'mindful spending', 'financial wellness'],
  openGraph: {
    title: 'Motif - Connect Your Finances with Your Emotions',
    description: 'Discover the patterns between your spending and emotions.',
    url: 'https://joinmotif.com',
    siteName: 'Motif',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motif - Connect Your Finances with Your Emotions',
    description: 'Discover the patterns between your spending and emotions.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
