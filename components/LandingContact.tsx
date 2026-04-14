'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, Shield, Clock, MessageCircle, ArrowLeft } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

interface FormData {
  name: string
  phone: string
  level: string
}

export default function LandingContact({
  defaultLevel,
  headline = 'השאירו פרטים ונחזור אליכם תוך שעות',
  levelOptions,
}: {
  defaultLevel?: string
  headline?: string
  levelOptions?: { value: string; label: string }[]
}) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { level: defaultLevel || '' },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setIsSubmitted(true)
        reset()
      }
    } catch {
      alert('שגיאה בשליחת הטופס. אנא נסו שוב או צרו קשר בוואטסאפ.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-background-secondary to-white" />

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">השאירו פרטים</h2>
          <p className="text-text-light">{headline}</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isSubmitted ? (
            <motion.div className="text-center py-8" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">הטופס נשלח בהצלחה!</h3>
              <p className="text-text-light mb-6">נחזור אליך בהקדם. בינתיים, אפשר גם לשלוח הודעה ישירה:</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                המשיכו בוואטסאפ
                <ArrowLeft className="w-4 h-4" />
              </a>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-1">שם מלא *</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'שדה חובה' })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                  placeholder="הכנס את שמך"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">טלפון *</label>
                <input
                  id="phone"
                  type="tel"
                  dir="ltr"
                  {...register('phone', {
                    required: 'שדה חובה',
                    pattern: { value: /^[0-9+\-() ]{9,15}$/, message: 'מספר לא תקין' },
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-left"
                  placeholder="050-000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {levelOptions ? (
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-text mb-1">רמת לימוד</label>
                  <select
                    id="level"
                    {...register('level')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors bg-white"
                  >
                    {levelOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <input type="hidden" {...register('level')} value={defaultLevel || ''} />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'שולח...' : (
                  <><Send className="w-5 h-5" />שליחה - שיעור ניסיון ב-₪99</>
                )}
              </button>

              <div className="flex items-center justify-center gap-5 pt-1">
                <div className="flex items-center gap-1.5 text-text-lighter text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>ללא התחייבות</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-lighter text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>מענה תוך שעות</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-text-lighter text-sm">או</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            שלחו הודעה בוואטסאפ - מענה מיידי
          </a>
        </motion.div>
      </div>
    </section>
  )
}
