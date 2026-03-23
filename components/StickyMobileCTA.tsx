'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

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
          <a
            href="#contact"
            className="cta-glow flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3 rounded-xl font-bold text-base transition-colors w-full"
          >
            שיעור ניסיון במחיר מוזל
            <ArrowLeft className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
