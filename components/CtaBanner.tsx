'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      {/* Math blueprint background */}
      <div className="absolute inset-0 bg-primary">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
        {/* Subtle math formulas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {['y=ax²+bx+c', 'sin²θ+cos²θ=1', 'e^(iπ)+1=0', 'a²+b²=c²', 'dy/dx', '∫₀^∞'].map((formula, i) => (
            <div
              key={i}
              className="absolute text-white/[0.04] font-mono whitespace-nowrap"
              style={{
                fontSize: `${16 + (i % 3) * 8}px`,
                top: `${15 + (i * 14) % 75}%`,
                right: `${5 + (i * 17) % 85}%`,
                transform: `rotate(${-5 + (i * 3) % 10}deg)`,
              }}
            >
              {formula}
            </div>
          ))}
        </div>
      </div>

      <div className="container-max relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-orange-light/20 text-orange-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            מקומות מוגבלים לסמסטר הקרוב
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            מוכנים לשנות את הציונים?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            תלמידים שמתחילים עכשיו מגיעים מוכנים לבחינות הקרובות
          </p>

          <a
            href="#contact"
            className="cta-glow inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-lg font-bold transition-colors"
          >
            בואו נתחיל
            <ArrowLeft className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
