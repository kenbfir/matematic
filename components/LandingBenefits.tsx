'use client'

import { motion } from 'framer-motion'
import { Heart, Target, Monitor, TrendingUp, BookOpen, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Heart, Target, Monitor, TrendingUp, BookOpen, Award,
}

interface Benefit {
  icon: string
  title: string
  description: string
}

export default function LandingBenefits({
  title,
  benefits,
}: {
  title: string
  benefits: Benefit[]
}) {
  return (
    <section className="py-16 px-4 bg-background-secondary relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%231e3a5f' stroke-width='0.3'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-primary text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = iconMap[b.icon] || Target
            return (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{b.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
