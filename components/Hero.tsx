'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Star } from 'lucide-react'
import { STATS } from '@/lib/constants'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 1500
          const steps = 40
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-accent ltr-nums">
      {count}{suffix}
    </div>
  )
}

const PARSED_STATS = STATS.map((s) => {
  const match = s.value.match(/^(\d+)(.*)$/)
  return { num: match ? parseInt(match[1]) : 0, suffix: match ? match[2] : '', label: s.label }
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-bl from-primary via-primary-light to-primary">
      {/* Animated math symbols floating in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['∑', '∫', 'π', '√', 'Δ', '∞', 'θ', 'λ'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-white/[0.06] font-bold select-none"
            style={{
              fontSize: `${30 + (i % 4) * 20}px`,
              top: `${10 + (i * 12) % 80}%`,
              right: `${5 + (i * 13) % 90}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max text-center px-4 relative z-10 pt-24">
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white/90 text-sm font-medium">דירוג 5 כוכבים מ-100+ תלמידים</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2">
            <span className="text-white text-sm font-bold">⚡ מועד א׳ 2026 - עוד יש זמן להיכנס לפסים</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-hero text-white font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          כל תלמיד יכול להצטיין במתמטיקה -{' '}
          <span className="text-accent">עם המורה הנכון.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          שיעורים פרטיים אונליין עם מורה שעלה מ-3 יחידות ל-100 בבגרות -
          ויודע בדיוק כיצד להוציא את הטוב ביותר מכל תלמיד.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-colors flex items-center gap-2"
          >
            שיעור ניסיון במחיר מוזל
            <ArrowLeft className="w-5 h-5" />
          </a>
          <a
            href="#programs"
            className="text-white/70 hover:text-white text-base font-medium underline underline-offset-4 transition-colors"
          >
            מסלולי לימוד
          </a>
        </motion.div>

        {/* Animated trust bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-16 bg-white/5 backdrop-blur-sm rounded-2xl py-8 px-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {PARSED_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter value={stat.num} suffix={stat.suffix} />
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H0V50Z" fill="#f0fdfa"/>
        </svg>
      </div>
    </section>
  )
}
