'use client'
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from 'next-themes'
import { DialogProvider } from '@/contexts/DialogContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class">
        <DialogProvider>{children}</DialogProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

