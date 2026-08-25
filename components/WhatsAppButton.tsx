'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'
import { trackLead } from '@/components/Analytics'

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  // Show tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 left-0 bg-white rounded-xl shadow-xl px-4 py-3 min-w-[180px] border border-gray-100"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-text font-medium">צריכים עזרה? 👋</p>
            <p className="text-xs text-text-light mt-1">שלחו הודעה בוואטסאפ</p>
            {/* Arrow pointing down */}
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        onClick={trackLead}
        target="_blank"
        rel="noopener noreferrer"
        className="float-animation block bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors"
        aria-label="צור קשר בוואטסאפ"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  )
}
