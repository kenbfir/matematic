'use client'

import { motion } from 'framer-motion'

interface UrgencyStripProps {
  spotsLeft: number
  month: string
}

export default function UrgencyStrip({ spotsLeft, month }: UrgencyStripProps) {
  return (
    <motion.div
      className="w-full bg-accent text-gray-900 text-center py-2.5 px-4 text-sm font-bold sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      🔥 נשארו {spotsLeft} מקומות בלבד לחודש {month} -{' '}
      <a href="#contact" className="underline hover:no-underline">
        הבטח את המקום שלך עכשיו
      </a>
    </motion.div>
  )
}
