'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users } from 'lucide-react'

const MESSAGES = [
  '3 תלמידים נרשמו השבוע',
  'תלמיד חדש מאזור המרכז הצטרף היום',
  '5 תלמידים שיפרו ציונים החודש',
]

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    // Show first toast after 8 seconds
    const showTimer = setTimeout(() => {
      setVisible(true)
    }, 8000)

    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!visible) return

    // Hide after 5 seconds, then show next message after 30 seconds
    const hideTimer = setTimeout(() => setVisible(false), 5000)
    const nextTimer = setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
      setVisible(true)
    }, 35000)

    return () => {
      clearTimeout(hideTimer)
      clearTimeout(nextTimer)
    }
  }, [visible, messageIndex])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="hidden md:flex fixed bottom-24 right-6 z-40 bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 items-center gap-3 max-w-[280px]"
        >
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-text">{MESSAGES[messageIndex]}</p>
            <p className="text-xs text-text-lighter">Math+</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
