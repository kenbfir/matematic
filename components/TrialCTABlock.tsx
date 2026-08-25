'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Shield, Clock, CheckCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'
import { trackLead } from '@/components/Analytics'

interface TrialCTABlockProps {
  headline?: string
}

export default function TrialCTABlock({
  headline = 'מוכן להתחיל? שיעור ניסיון ב-₪99 בלבד',
}: TrialCTABlockProps) {
  return (
    <section className="py-16 px-4 bg-primary text-white text-center">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">{headline}</h2>
          <p className="text-white/70 mb-8 text-lg">ללא התחייבות - אם לא מרוצים, לא משלמים</p>

          <div className="flex justify-center gap-8 mb-10 flex-wrap">
            <div className="flex items-center gap-2 text-white/80">
              <CheckCircle className="w-5 h-5 text-accent" />
              <span>ללא התחייבות</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5 text-accent" />
              <span>100% שביעות רצון</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="w-5 h-5 text-accent" />
              <span>מענה תוך שעות</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              שיעור ניסיון - ₪99 בלבד
              <ArrowLeft className="w-5 h-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              onClick={trackLead}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp - מענה מיידי
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
