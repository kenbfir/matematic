'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '100+', label: 'תלמידים מרוצים' },
  { value: '25', label: 'נקודות שיפור ממוצע בבגרות' },
  { value: '90%', label: 'מהתלמידים שיפרו ציון' },
  { value: '4+', label: 'שנות ניסיון' },
]

export default function LandingStats() {
  return (
    <section className="py-8 px-4 bg-primary">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-accent">{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
