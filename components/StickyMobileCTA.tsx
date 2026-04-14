'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export default function StickyMobileCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 100vh)
      setShow(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 safe-bottom"
        >
          <div className="flex gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-base transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              וואטסאפ
            </a>
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-accent text-accent bg-transparent hover:bg-accent/10 py-3 rounded-xl font-bold text-base transition-colors"
            >
              שיעור ניסיון
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
