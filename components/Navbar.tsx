"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Github } from 'lucide-react'
import { useDialog } from '@/contexts/DialogContext'
import { signIn } from '@/app/auth'
import { login } from '@/lib/actions/auth'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { openDialog } = useDialog()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              <span className="text-blue-600">Legacy</span>
              <span className="text-pink-500">of</span>
              <span className="text-orange-500">Pride</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={openDialog}>
              About
            </Button>
            <Button variant="ghost" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button
              onClick={() => login()}
            >
              Sign In
            
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

