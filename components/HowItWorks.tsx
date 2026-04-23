'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Video, Rocket } from 'lucide-react'
import { STEPS } from '@/lib/constants'

const icons = [MessageCircle, Video, Rocket]
const colors = ['bg-blue-50 text-blue-500', 'bg-green-50 text-green-500', 'bg-accent/10 text-accent']

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Decorative math elements */}
      <div className="absolute top-10 right-10 text-primary/[0.04] text-6xl font-bold select-none pointer-events-none">
        f(x)
      </div>
      <div className="absolute bottom-10 left-10 text-primary/[0.04] text-5xl font-bold select-none pointer-events-none">
        y = mx + b
      </div>

      <div className="container-max relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-primary mb-4">איך זה עובד?</h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            שלושה צעדים פשוטים להתחיל ללמוד
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Animated connection line (desktop) */}
          <motion.div
            className="hidden md:block absolute top-24 right-[16.67%] left-[16.67%] h-0.5 bg-gradient-to-l from-accent/40 via-accent/20 to-accent/40"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {STEPS.map((step, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={step.number}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-accent/20 relative z-10">
                  <Icon className="w-8 h-8 text-accent" />
                </div>

                {/* Step number */}
                <motion.div
                  className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2, type: 'spring' }}
                >
                  {step.number}
                </motion.div>

                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-text-light">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
