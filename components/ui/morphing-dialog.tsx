'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useMorphingDialog } from '@/contexts/MorphingDialogContext'
import { X } from 'lucide-react'

export function MorphingDialog() {
  const { isOpen, setIsOpen, triggerRef } = useMorphingDialog();

  const closeDialog = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeDialog}
        >
          <motion.div
            ref={triggerRef}
            className="bg-white dark:bg-gray-800 rounded-lg p-12 max-w-2xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={closeDialog}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <Image
                src="/me.png"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

