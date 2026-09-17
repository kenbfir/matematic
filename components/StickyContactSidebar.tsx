'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, MessageCircle, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'
import { trackLead } from '@/components/Analytics'

interface SidebarFormData {
  name: string
  phone: string
}

function SidebarFormBody({ variant, onClose }: { variant?: string; onClose?: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SidebarFormData>()

  const onSubmit = async (data: SidebarFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setIsSubmitted(true)
        trackLead('sidebar_persistent', variant)
        reset()
      }
    } catch {
      alert('שגיאה בשליחת הטופס. אנא נסו שוב או צרו קשר בוואטסאפ.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="w-10 h-10 text-accent mx-auto mb-2" />
        <p className="font-bold text-primary">הפרטים נשלחו!</p>
        <p className="text-sm text-text-light mt-1">נחזור אליך בקרוב</p>
      </div>
    )
  }

  return (
    <>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-400 hover:text-gray-600"
          aria-label="סגירה"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h3 className="text-base font-bold text-primary">קביעת שיעור</h3>
        <p className="text-xs text-text-light -mt-2">השאירו פרטים ונחזור תוך שעות</p>

        <div>
          <input
            type="text"
            {...register('name', { required: true })}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            placeholder="שם מלא"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">שדה חובה</p>}
        </div>

        <div>
          <input
            type="tel"
            dir="ltr"
            {...register('phone', {
              required: true,
              pattern: /^[0-9+\-() ]{9,15}$/,
            })}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-left"
            placeholder="050-000-0000"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">מספר טלפון לא תקין</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="cta-glow w-full bg-accent hover:bg-accent-dark text-gray-900 py-2.5 rounded-lg font-bold text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            'שולח...'
          ) : (
            <>
              <Send className="w-4 h-4" />
              שליחה
            </>
          )}
        </button>
      </form>

      <div className="flex items-center gap-2 my-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-text-lighter">או</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <a
        href={WHATSAPP_URL}
        onClick={() => trackLead('sidebar_whatsapp', variant)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        וואטסאפ
      </a>
    </>
  )
}

export default function StickyContactSidebar({ variant }: { variant?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop: permanently open, docked to the side */}
      <div className="hidden xl:block fixed bottom-6 left-6 z-40 w-72">
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
          <SidebarFormBody variant={variant} />
        </div>
      </div>

      {/* Mobile/tablet: floating launcher that expands into the same form */}
      <div className="xl:hidden fixed bottom-24 left-6 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-5 mb-3 w-72 max-w-[85vw]"
            >
              <SidebarFormBody variant={variant} onClose={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="float-animation bg-accent hover:bg-accent-dark text-gray-900 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-accent/30 transition-colors"
          aria-label="קביעת שיעור ויצירת קשר"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Send className="w-6 h-6" />}
        </button>
      </div>
    </>
  )
}
