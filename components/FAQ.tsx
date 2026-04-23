'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/constants'

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-right gap-4 group"
      >
        <span className="text-lg font-medium text-primary group-hover:text-accent transition-colors">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-light shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-text-light leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-background-secondary relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231e3a5f'%3E%3Crect x='10' y='10' width='60' height='60' rx='4'/%3E%3Cline x1='40' y1='10' x2='40' y2='70'/%3E%3Cline x1='10' y1='40' x2='70' y2='40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-max relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-primary mb-4">שאלות נפוצות</h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            תשובות לשאלות שאנחנו מקבלים הכי הרבה
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {/* CTA below FAQ */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-text-light mb-4">יש עוד שאלות? נשמח לענות</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            דברו איתנו
            <ArrowLeft className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
