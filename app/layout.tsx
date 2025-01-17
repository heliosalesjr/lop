import type { Metadata } from 'next'
import { Roboto, Playfair_Display } from 'next/font/google'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import '../styles/background.css'
import { Providers } from './providers'

import { MorphingDialog } from '@/components/MorphingDialog'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  variable: '--font-roboto',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Legacy of Pride',
  description: 'Get inspired with quotes from LGBTQ+ icons.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${playfair.variable} font-sans antialiased animated-background`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
              <MorphingDialog />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

