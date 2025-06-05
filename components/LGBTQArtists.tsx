'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Music, RefreshCw, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Artist {
  name: string
  song: string
  genre: string
  description: string
  spotifyArtist: string // Link para o perfil do artista
  spotifyTrack: string  // Link para a música específica
  image: string
  flag?: string // Emoji da bandeira/identificação
}

// Lista curada de artistas LGBTQ+ incríveis
const lgbtqArtists: Artist[] = [
  {
    name: "Lil Nas X",
    song: "MONTERO (Call Me By Your Name)",
    genre: "Hip-Hop/Pop",
    description: "Rapper and singer who broke barriers in hip-hop with unapologetic queer representation.",
    spotifyArtist: "https://open.spotify.com/artist/7jVv8c5Fj3E9VhNjxT4snq",
    spotifyTrack: "https://open.spotify.com/track/67BtfxlNbhBmCDR2L2l8qd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "Frank Ocean",
    song: "Thinkin Bout You",
    genre: "R&B/Alternative",
    description: "Influential R&B artist known for introspective lyrics and genre-bending sound.",
    spotifyArtist: "https://open.spotify.com/artist/2h93pZq0e7k5yf4HldF29K",
    spotifyTrack: "https://open.spotify.com/track/6JV2JOEocMgcZxYSZelKcc",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "King Princess",
    song: "1950",
    genre: "Indie Pop",
    description: "Singer-songwriter creating dreamy pop with queer themes and vintage aesthetics.",
    spotifyArtist: "https://open.spotify.com/artist/0vgO0Ws4B1LguGtE515gHg",
    spotifyTrack: "https://open.spotify.com/track/1O2Jq2GQw7Xt6uXPqfNFGD",
    image: "https://images.unsplash.com/photo-1515552726023-7125c8d07fb3?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "Troye Sivan",
    song: "Youth",
    genre: "Electropop",
    description: "Australian singer-songwriter blending electronic pop with personal storytelling.",
    spotifyArtist: "https://open.spotify.com/artist/3WGpXCJ9YQfak1KXzuYJ1J",
    spotifyTrack: "https://open.spotify.com/track/4L0VgHdOoE4LXPg2OVXLJ3",
    image: "https://images.unsplash.com/photo-1520635360821-1ad2e8d8b2ca?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "Hayley Kiyoko",
    song: "Girls Like Girls",
    genre: "Pop",
    description: "Pop artist celebrating lesbian love and visibility in mainstream music.",
    spotifyArtist: "https://open.spotify.com/artist/5JsFuKLk81qT7tRaDg5B5k",
    spotifyTrack: "https://open.spotify.com/track/75K7TqEL7hZpsDgGKzFwXA",
    image: "https://images.unsplash.com/photo-1499824873264-9b318fd0d4e4?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "MUNA",
    song: "I Know A Place",
    genre: "Synth-pop",
    description: "Queer trio creating anthemic synth-pop about love, identity, and belonging.",
    spotifyArtist: "https://open.spotify.com/artist/6xdvs3EaNjlLbGzUZYQq1E",
    spotifyTrack: "https://open.spotify.com/track/0XzMlbCMJRQqjWdVNPJP2J",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "Perfume Genius",
    song: "On The Floor",
    genre: "Art Pop",
    description: "Experimental artist creating haunting, beautiful music about spirituality and identity.",
    spotifyArtist: "https://open.spotify.com/artist/25lqNhIBOmCwm1IpkyyGrO",
    spotifyTrack: "https://open.spotify.com/track/6UQey6VGQPGQQ3mT4YTa5E",
    image: "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  },
  {
    name: "Years & Years",
    song: "King",
    genre: "Electropop",
    description: "British electropop act with infectious beats and unapologetic queer energy.",
    spotifyArtist: "https://open.spotify.com/artist/5vBSrE1xujD2FXYRarbAXc",
    spotifyTrack: "https://open.spotify.com/track/2yvtrF7xXFpbGJDvf0wSTh",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    flag: "🏳️‍🌈"
  }
]

export default function LGBTQArtists() {
  const [displayedArtists, setDisplayedArtists] = useState<Artist[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getRandomArtists = () => {
    const shuffled = [...lgbtqArtists].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3) // Mostra 3 artistas por vez
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Pequena animação de loading
    await new Promise(resolve => setTimeout(resolve, 500))
    setDisplayedArtists(getRandomArtists())
    setIsRefreshing(false)
  }

  useEffect(() => {
    setDisplayedArtists(getRandomArtists())
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Music className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          LGBTQ+ Artists
        </h2>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Discover More
        </Button>
      </div>

      <div className="space-y-4">
        {displayedArtists.map((artist, index) => (
          <Card key={`${artist.name}-${index}`} className="overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 group border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50">
            <CardContent className="p-0">
              <div className="flex gap-4 p-4">
                {/* Imagem do Artista */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg ring-2 ring-purple-400 dark:ring-purple-500"
                    />
                    <div className="absolute -top-1 -right-1 text-lg">
                      {artist.flag}
                    </div>
                  </div>
                </div>

                {/* Informações do Artista */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {artist.genre}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {artist.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Play className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Featured: "{artist.song}"
                      </span>
                    </div>
                  </div>

                  {/* Links do Spotify */}
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={artist.spotifyArtist}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-full transition-colors"
                    >
                      <span>Artist Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={artist.spotifyTrack}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white text-xs rounded-full transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      <span>Play Song</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          🎵 Celebrating LGBTQ+ voices in music • Links open in Spotify
        </p>
      </div>
    </div>
  )
}