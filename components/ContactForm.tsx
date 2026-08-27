'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, Phone, MessageCircle, CheckCircle, Shield, Clock, Star, ArrowLeft } from 'lucide-react'
import { LEVEL_OPTIONS, WHATSAPP_URL, PHONE_NUMBER } from '@/lib/constants'
import { trackLead } from '@/components/Analytics'

interface FormData {
  name: string
  phone: string
  level: string
  message: string
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

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
        trackLead()
        reset()
      }
    } catch {
      alert('שגיאה בשליחת הטופס. אנא נסו שוב או צרו קשר בוואטסאפ.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Geometric math background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-background-secondary to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231e3a5f' stroke-width='0.5'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3Cline x1='0' y1='30' x2='60' y2='30'/%3E%3Cline x1='30' y1='0' x2='30' y2='60'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-max relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-primary mb-4">צור קשר</h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            השאירו פרטים ונחזור אליכם תוך שעות עם הצעה מותאמת
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <motion.div
                className="bg-green-50 rounded-2xl p-8 text-center border border-green-100"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
              >
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-2">הטופס נשלח בהצלחה!</h3>
                <p className="text-text-light mb-6">נחזור אליך בהקדם. בינתיים, אפשר גם לשלוח הודעה ישירה:</p>
                <a
                  href={WHATSAPP_URL}
                  onClick={trackLead}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  המשיכו בוואטסאפ
                  <ArrowLeft className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 block mx-auto text-text-lighter hover:text-text text-sm"
                >
                  שליחת טופס נוסף
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                      שם מלא *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: 'שדה חובה' })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                      placeholder="הכנס את שמך"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
                      טלפון *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      dir="ltr"
                      {...register('phone', {
                        required: 'שדה חובה',
                        pattern: {
                          value: /^[0-9+\-() ]{9,15}$/,
                          message: 'מספר טלפון לא תקין',
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-left"
                      placeholder="050-000-0000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="level" className="block text-sm font-medium text-text mb-1">
                      רמת לימוד
                    </label>
                    <select
                      id="level"
                      {...register('level')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors bg-white"
                    >
                      {LEVEL_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                      הודעה
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      {...register('message')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
                      placeholder="ספרו לנו קצת על מה שאתם מחפשים..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-glow w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'שולח...'
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        שליחה
                      </>
                    )}
                  </button>

                  {/* Trust signals */}
                  <div className="flex items-center justify-center gap-6 pt-2">
                    <div className="flex items-center gap-1.5 text-text-lighter text-xs">
                      <Shield className="w-3.5 h-3.5" />
                      <span>ללא התחייבות</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-lighter text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>מענה תוך שעות</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-lighter text-xs">
                      <Star className="w-3.5 h-3.5" />
                      <span>100+ תלמידים</span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            className="md:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-primary mb-4">דרכים נוספות ליצור קשר</h3>

              <a
                href={WHATSAPP_URL}
                onClick={trackLead}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors mb-3 group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-green-700">WhatsApp</div>
                  <div className="text-sm text-green-600">מענה מיידי</div>
                </div>
              </a>

              <a
                href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
                className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-blue-700">טלפון</div>
                  <div className="text-sm text-blue-600 ltr-nums">{PHONE_NUMBER}</div>
                </div>
              </a>
            </div>

            <div className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden">
              {/* Subtle math pattern */}
              <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%23fff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
              }} />
              <div className="relative">
                <h3 className="text-lg font-bold mb-2">קביעת שיעור</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  בשיעור ההיכרות נאבחן את הרמה, נבין את הצרכים ונבנה תוכנית לימודים
                  מותאמת - בלי שום התחייבות.
                </p>
                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>שעה מלאה</span>
                </div>
              </div>
            </div>

            {/* Social proof mini */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400'].map((color, i) => (
                    <div key={i} className={`w-8 h-8 ${color} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {['י', 'מ', 'א', 'נ'][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-primary">100+ תלמידים</span>
                  <span className="text-text-light"> כבר לומדים איתנו</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
