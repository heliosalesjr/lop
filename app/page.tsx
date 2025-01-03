import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-4">
      <main className="flex-grow flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center justify-between h-full max-w-6xl w-full mx-auto">
          <div className="mb-8 flex-grow flex items-center justify-center">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin leading-tight font-roboto px-4">
              "If you can't love yourself, how in the hell are you gonna love somebody else?"
            </p>
          </div>
          <Card className="w-xl max-w-2xl mb-4">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-grow">
                  <p className="text-3xl md:text-4xl font-playfair bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
                    RuPaul
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Drag Queen, TV Host, Actor, Singer
                  </p>
                </div>
                <div className="flex-shrink-0 ml-6">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c3/RuPaul_by_David_Shankbone_cropped.jpg"
                    alt="RuPaul"
                    width={80}
                    height={80}
                    className="rounded-full ring-2 ring-purple-400 dark:ring-purple-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-sm">
            New Quote
          </Button>
        </div>
      </main>
      <footer className="h-[10vh] flex items-center justify-center">
        <p className="text-lg text-center">
          This project showcases inspiring quotes with a modern, vibrant design.
          Stay tuned for more features!
        </p>
      </footer>
    </div>
  )
}




