import type { Metadata } from 'next'
import { Roboto, Playfair_Display } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Legacy of Pride',
  description: 'Get inspired with quotes from people that made a difference in the LGBTQ+ community.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${roboto.variable} ${playfair.variable} font-sans antialiased bg-gradient-to-br from-purple-400 to-pink-500 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}

