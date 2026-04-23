'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  detail: string
  improvement: string
}

export default function LandingTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-primary text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          מה אומרים התלמידים
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-text leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-primary text-sm">{t.name}</div>
                  <div className="text-text-light text-xs">{t.detail}</div>
                </div>
                <div className="flex items-center gap-1 bg-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full">
                  <Check className="w-3 h-3" />
                  {t.improvement}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
