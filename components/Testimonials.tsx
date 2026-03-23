'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

function WhatsAppMessage({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
}) {
  const time = `${9 + index}:${index % 2 === 0 ? '14' : '37'}`

  return (
    <motion.div
      className="max-w-lg"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* WhatsApp chat bubble */}
      <div className="wa-bubble">
        {/* Sender name */}
        <div className="font-bold text-sm text-emerald-700 mb-1">
          {testimonial.name}
        </div>

        {/* Message */}
        <p className="text-[15px] text-gray-800 leading-relaxed">
          {testimonial.quote}
        </p>

        {/* Timestamp + read receipts */}
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-[11px] text-gray-500 ltr-nums">{time}</span>
          <div className="flex">
            <Check className="w-3.5 h-3.5 text-blue-500 -mr-2" />
            <Check className="w-3.5 h-3.5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Info below bubble */}
      <div className="flex items-center gap-3 mt-3 pr-2">
        <span className="text-sm text-text-light">{testimonial.detail}</span>
        <span className="bg-accent/10 text-accent font-bold text-xs px-2.5 py-1 rounded-full">
          {testimonial.improvement}
        </span>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container-max">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-primary mb-4">מה אומרים התלמידים</h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            הודעות אמיתיות מתלמידים והורים
          </p>
        </motion.div>

        {/* WhatsApp-style chat background */}
        <div
          className="max-w-2xl mx-auto rounded-2xl p-6 md:p-8 space-y-6"
          style={{
            backgroundColor: '#e5ddd5',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cec8ba' fill-opacity='0.15'%3E%3Ccircle cx='25' cy='25' r='2'/%3E%3Ccircle cx='75' cy='75' r='1.5'/%3E%3Ccircle cx='125' cy='125' r='2'/%3E%3Ccircle cx='175' cy='25' r='1'/%3E%3Ccircle cx='25' cy='175' r='1.5'/%3E%3Ccircle cx='175' cy='175' r='1'/%3E%3Ccircle cx='100' cy='50' r='1'/%3E%3Ccircle cx='50' cy='150' r='1.5'/%3E%3Ccircle cx='150' cy='100' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          {/* Chat header */}
          <div className="bg-emerald-700 text-white rounded-xl px-4 py-3 flex items-center gap-3 -mt-2 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
              B
            </div>
            <div>
              <div className="font-bold text-sm">LevelUp — בן כפיר</div>
              <div className="text-xs text-white/70">המלצות מתלמידים</div>
            </div>
          </div>

          {TESTIMONIALS.map((testimonial, index) => (
            <WhatsAppMessage
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
