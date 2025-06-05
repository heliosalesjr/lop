'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getRandomQuote, Quote } from '@/utils/quoteUtils'
import { ExternalLink } from 'lucide-react'

export default function QuoteDisplay() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)

  useEffect(() => {
    setCurrentQuote(getRandomQuote())
  }, [])

  const handleNewQuote = () => {
    setCurrentQuote(getRandomQuote())
  }

  if (!currentQuote) return null

  return (
    <div className="flex flex-col justify-center items-center text-center p-4 w-full">
      <div className="flex flex-col items-center justify-center max-w-4xl w-full mx-auto space-y-6">
        <div className="flex items-center justify-center">
          <p className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin leading-tight font-roboto px-4">
            "{currentQuote.quote}"
          </p>
        </div>
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="flex items-center">
                  <p className="text-2xl md:text-3xl font-playfair bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
                    {currentQuote.name}
                  </p>
                  {currentQuote.link && (
                    <a
                      href={currentQuote.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {currentQuote.role}
                </p>
              </div>
              {currentQuote.photo && (
                <div className="flex-shrink-0 ml-6">
                  <Image
                    src={currentQuote.photo}
                    alt={currentQuote.name}
                    width={70}
                    height={70}
                    className="rounded-full ring-2 ring-purple-400 dark:ring-purple-300"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Button 
          onClick={handleNewQuote}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-sm"
        >
          New Quote
        </Button>
      </div>
    </div>
  )
}