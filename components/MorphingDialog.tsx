'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useDialog } from '../contexts/DialogContext'

export function MorphingDialog() {
  const { isDialogOpen, closeDialog } = useDialog()

  return (
    <AnimatePresence>
      {isDialogOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeDialog}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="About Image"
                width={200}
                height={200}
                className="rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About Legacy of Pride</h1>
                <p className="text-gray-700 dark:text-gray-300">
                  Legacy of Pride is a project that showcases inspiring quotes from LGBTQ+ icons and allies. 
                  It uses Next.js for server-side rendering, Tailwind CSS for styling, 
                  and Framer Motion for smooth animations. Our goal is to inspire and educate 
                  by highlighting the wisdom and experiences of those who have made significant 
                  contributions to the LGBTQ+ community. Stay tuned for more features and updates!
                </p>
              </div>
            </div>
            <Button
              onClick={closeDialog}
              className="mt-6 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-sm"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

