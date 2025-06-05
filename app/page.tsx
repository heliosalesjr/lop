'use client'

import QuoteDisplay from '@/components/QuoteDisplay'
import LGBTQNews from '@/components/LGBTQNews'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content area */}
      <main className="flex-grow pt-20 p-4">
        <div className="max-w-7xl mx-auto h-full">
          {/* Layout responsivo: lado a lado em telas grandes, empilhado em telas pequenas */}
          <div className="flex flex-col lg:flex-row h-full gap-6">
            {/* QuoteDisplay - metade da largura em telas grandes */}
            <div className="flex-1 min-h-[70vh] lg:min-h-full">
              <QuoteDisplay />
            </div>
            
            {/* LGBTQNews - metade da largura em telas grandes */}
            <div className="flex-1 min-h-[70vh] lg:min-h-full">
              <LGBTQNews />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer sempre no final */}
      <Footer />
    </div>
  )
}