'use client'

import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, University, Compass, Check, ArrowLeft } from 'lucide-react'
import { PROGRAMS } from '@/lib/constants'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  blue: BookOpen,
  green: GraduationCap,
  purple: University,
  orange: Compass,
}

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string; gradient: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', gradient: 'from-blue-500/10 to-blue-600/5' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', badge: 'bg-green-100 text-green-700', gradient: 'from-green-500/10 to-green-600/5' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', gradient: 'from-purple-500/10 to-purple-600/5' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', gradient: 'from-orange-500/10 to-orange-600/5' },
}

// Subtle math formulas per card
const mathDecor: Record<string, string[]> = {
  blue: ['x²+y²', 'a·b'],
  green: ['∫f(x)dx', 'lim'],
  purple: ['Ax=λx', '∇f'],
  orange: ['∑aₙ', 'ε>0'],
}

export default function Programs() {
  return (
    <section id="programs" className="section-padding relative overflow-hidden">
      {/* Subtle background math grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none' stroke='%231e3a5f' stroke-width='0.3'/%3E%3Cpath d='M50 0v100M0 50h100' stroke='%231e3a5f' stroke-width='0.15'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max relative">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-primary mb-4">מסלולי לימוד</h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            מסלול לימודים מותאם לכל גיל ורמה — מחטיבת ביניים ועד האקדמיה
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {PROGRAMS.map((program, index) => {
            const Icon = iconMap[program.color]
            const colors = colorMap[program.color]
            const formulas = mathDecor[program.color]
            return (
              <motion.div
                key={program.title}
                className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.gradient} p-8 hover:shadow-xl transition-all duration-300 group overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Decorative math formulas */}
                <div className="absolute top-4 left-4 text-xs font-mono opacity-0 group-hover:opacity-10 transition-opacity duration-500 text-primary">
                  {formulas[0]}
                </div>
                <div className="absolute bottom-4 left-8 text-sm font-mono opacity-0 group-hover:opacity-10 transition-opacity duration-500 text-primary">
                  {formulas[1]}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shrink-0`}
                    whileHover={{ rotate: 10 }}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{program.title}</h3>
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${colors.badge}`}>
                      {program.grades}
                    </span>
                  </div>
                </div>

                <p className="text-text-light mb-4">{program.description}</p>

                <ul className="space-y-2 mb-6">
                  {program.bullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      className="flex items-center gap-2 text-text"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Check className={`w-4 h-4 ${colors.text} shrink-0`} />
                      <span className="text-sm">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1 ${colors.text} font-medium text-sm hover:gap-2 transition-all`}
                >
                  לפרטים נוספים
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
