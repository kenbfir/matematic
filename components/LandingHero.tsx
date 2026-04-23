'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, Star, CheckCircle } from 'lucide-react'

interface LandingHeroProps {
  badge: string
  headline: string
  highlightedWord: string
  subheadline: string
  bullets: string[]
  ctaText?: string
}

export default function LandingHero({
  badge,
  headline,
  highlightedWord,
  subheadline,
  bullets,
  ctaText = 'שיעור ניסיון במחיר מוזל',
}: LandingHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-bl from-primary via-primary-light to-primary">
      {/* Math grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Floating math symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['∑', '∫', 'π', '√', '∞', 'Δ'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.05] font-bold select-none"
            style={{
              fontSize: `${35 + (i % 3) * 20}px`,
              top: `${10 + (i * 15) % 80}%`,
              right: `${5 + (i * 16) % 90}%`,
            }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container-max px-4 relative z-10 pt-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-right">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-sm font-medium">{badge}</span>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl text-white font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {headline}{' '}
              <span className="text-accent">{highlightedWord}</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {subheadline}
            </motion.p>

            {/* Key benefits */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-white text-sm font-medium">{bullet}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-colors flex items-center gap-2"
              >
                {ctaText}
                <ArrowLeft className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/images/ben.jpg"
                alt="בן כפיר - מורה פרטי למתמטיקה"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L60 37C120 34 240 28 360 30C480 32 600 42 720 46C840 50 960 48 1080 42C1200 36 1320 26 1380 21L1440 16V80H0V40Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  )
}
