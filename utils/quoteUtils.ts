import data from '@/data.json'

export interface Quote {
  name: string
  role: string
  quote: string
  link: string
  photo: string
}

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * data.length)
  return data[randomIndex]
}

