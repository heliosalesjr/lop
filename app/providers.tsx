'use client'

import { ThemeProvider } from 'next-themes'
import { DialogProvider } from '@/contexts/DialogContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <DialogProvider>{children}</DialogProvider>
    </ThemeProvider>
  )
}

