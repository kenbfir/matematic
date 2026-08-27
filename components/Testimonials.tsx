'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'

const TIMES = [
  { msg: '10:42', reply: '10:44', status: '10:47' },
  { msg: '14:18', reply: '14:21', status: '14:23' },
  { msg: '19:05', reply: '19:08', status: '19:11' },
  { msg: '11:33', reply: '11:35', status: '11:38' },
  { msg: '16:51', reply: '16:54', status: '16:57' },
  { msg: '20:27', reply: '20:29', status: '20:32' },
  { msg: '09:14', reply: '09:17', status: '09:19' },
  { msg: '17:39', reply: '17:42', status: '17:45' },
]
const REPLY_TEXTS = [
  'תודה רבה! שמח לשמוע 🙏',
  'איזה כיף!! מגיע לך 💪',
  'וואו תודה רבה על המילים 🙏',
  'שמח שעזרתי! בהצלחה 💪',
  'תודה!! זה מחמם את הלב ❤️',
  'כל הכבוד, עבדת קשה! 🙌',
  'ממש שמח, מגיע לך 💪',
  'תודה רבה! גאה בך 🙏',
]
const DATES = [
  '15 בינואר 2026',
  '3 בפברואר 2026',
  '22 בנובמבר 2025',
  '8 במרץ 2026',
  '11 בדצמבר 2025',
  '27 בינואר 2026',
  '5 באוקטובר 2025',
  '19 בפברואר 2026',
]
const BATTERY = [87, 62, 94, 78, 53, 71, 91, 45]

const AVATAR_PHOTOS = [
  '/images/avatars/person-0.jpg',
  '/images/avatars/person-1.jpg',
  '/images/avatars/person-2.jpg',
  '/images/avatars/person-3.jpg',
  '/images/avatars/person-4.jpg',
  '/images/avatars/person-5.jpg',
  '/images/avatars/person-6.jpg',
  '/images/avatars/person-7.jpg',
]

function WhatsAppScreenshot({
  testimonial,
  index,
  compact = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
  compact?: boolean
}) {
  const times = TIMES[index % TIMES.length]
  const replyText = REPLY_TEXTS[index % REPLY_TEXTS.length]
  const dateLabel = DATES[index % DATES.length]
  const batteryPercent = BATTERY[index % BATTERY.length]

  return (
    <div className={`w-full ${compact ? 'max-w-full' : 'max-w-[360px]'} mx-auto select-none pointer-events-none`}>
      {/* Phone frame - looks like a screenshot image */}
      <div className="rounded-[24px] overflow-hidden shadow-2xl border border-gray-200 bg-white">
        {/* Status bar */}
        <div className="bg-[#075e54] px-4 py-1.5 flex items-center justify-between" dir="ltr">
          <span className="text-white text-[11px] font-medium">{times.status}</span>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="white" className="opacity-90">
              <rect x="0" y="7" width="2.5" height="3" rx="0.5"/>
              <rect x="3.5" y="5" width="2.5" height="5" rx="0.5"/>
              <rect x="7" y="2.5" width="2.5" height="7.5" rx="0.5"/>
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <span className="text-white text-[10px]">{batteryPercent}%</span>
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none" className="opacity-90">
                <rect x="0.5" y="0.5" width="15" height="8" rx="1.5" stroke="white" strokeWidth="1"/>
                <rect x="16" y="2.5" width="1.5" height="4" rx="0.5" fill="white"/>
                <rect x="1.5" y="1.5" width={`${batteryPercent / 100 * 13}`} height="6" rx="0.5" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="bg-[#075e54] px-3 pb-2.5 pt-1 flex items-center gap-2" dir="rtl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-80 shrink-0">
            <path d="M8 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div
            className="w-9 h-9 rounded-full overflow-hidden shrink-0"
            style={{ filter: 'blur(22px) brightness(0.9) saturate(1.2)', transform: 'scale(1.4)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR_PHOTOS[index % AVATAR_PHOTOS.length]}
              alt=""
              width={36}
              height={36}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium text-[15px] truncate">{testimonial.name}</div>
          </div>
          <div className="flex items-center gap-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        </div>

        {/* Chat area with real WhatsApp wallpaper */}
        <div
          className={`px-3 py-4 flex flex-col justify-end ${compact ? 'min-h-[180px]' : 'min-h-[220px]'}`}
          style={{
            backgroundImage: 'url("/images/whatsapp-bg.jpg")',
            backgroundSize: '320px auto',
            backgroundRepeat: 'repeat',
          }}
        >
          {/* Date chip */}
          <div className="flex justify-center mb-3">
            <span className="bg-[#e1f3fb] text-[11px] text-[#5f7e8e] px-3 py-1 rounded-lg shadow-sm">
              {dateLabel}
            </span>
          </div>

          {/* Incoming message (student/parent) - LEFT side */}
          <div className="flex justify-start mb-1" dir="rtl">
            <div className="relative bg-white rounded-lg rounded-tl-none shadow-sm max-w-[85%] px-3 pt-2 pb-1">
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-r-[8px] border-r-white border-b-[8px] border-b-transparent" />
              <p className="text-[14px] text-gray-900 leading-[20px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {testimonial.quote}
              </p>
              <div className="flex items-center justify-end gap-2 mt-1 -mb-0.5">
                <span className="text-[11px] text-gray-500">{times.msg}</span>
              </div>
            </div>
          </div>

          {/* Ben's reply (outgoing) - RIGHT side */}
          <div className="flex justify-end mt-2" dir="rtl">
            <div className="relative bg-[#d9fdd3] rounded-lg rounded-tr-none shadow-sm max-w-[75%] px-3 pt-2 pb-1">
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-l-[8px] border-l-[#d9fdd3] border-b-[8px] border-b-transparent" />
              <p className="text-[14px] text-gray-900 leading-[20px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {replyText}
              </p>
              <div className="flex items-center justify-end gap-1 mt-0.5 -mb-0.5">
                <span className="text-[11px] text-gray-500">{times.reply}</span>
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className="inline-block">
                  <path d="M11 1L4.5 8.5L2 6" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5 1L8 8.5L6.5 7" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="bg-[#f0f0f0] px-2 py-2 flex items-center gap-2" dir="rtl">
          <div className="flex-1 bg-white rounded-full px-3 py-2 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-50">
              <circle cx="12" cy="12" r="10" stroke="#8696a0" strokeWidth="1.5"/>
              <circle cx="9" cy="10" r="1.2" fill="#8696a0"/>
              <circle cx="15" cy="10" r="1.2" fill="#8696a0"/>
              <path d="M8.5 14.5c1 1.5 5.5 1.5 7 0" stroke="#8696a0" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span className="text-gray-400 text-[14px] flex-1">הודעה</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-50">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#8696a0" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-50">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="#8696a0" strokeWidth="1.5"/>
              <circle cx="12" cy="13" r="4" stroke="#8696a0" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Info below screenshot */}
      <div className="flex items-center justify-center gap-3 mt-4 pointer-events-auto">
        <span className="text-sm text-text-light">{testimonial.detail}</span>
        <span className="bg-accent/10 text-accent font-bold text-xs px-2.5 py-1 rounded-full">
          {testimonial.improvement}
        </span>
      </div>
    </div>
  )
}

const PAGES = 4 // 12 testimonials / 3 per page

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStart = useRef<number | null>(null)

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setPage(((idx % PAGES) + PAGES) % PAGES)
  }, [])

  const prev = useCallback(() => goTo(page - 1, -1), [page, goTo])
  const next = useCallback(() => goTo(page + 1, 1), [page, goTo])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(page + 1, 1)
    }, 6000)
    return () => clearInterval(timer)
  }, [page, goTo])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  const pageStart = page * 3

  return (
    <section id="testimonials" className="section-padding">
      <div className="container-max">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-section text-primary mb-4">מה אומרים התלמידים</h2>
          <p className="text-text-light max-w-2xl mx-auto text-lg">
            הודעות מהורים ותלמידים
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="הקודם"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="הבא"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>

          <div
            className="overflow-hidden px-6 md:px-0"
            onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return
              const diff = touchStart.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 50) {
                if (diff > 0) next()
                else prev()
              }
              touchStart.current = null
            }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Desktop: 3 cards side by side */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                  {[0, 1, 2].map((offset) => (
                    <WhatsAppScreenshot
                      key={pageStart + offset}
                      testimonial={TESTIMONIALS[pageStart + offset]}
                      index={pageStart + offset}
                      compact
                    />
                  ))}
                </div>

                {/* Mobile: single card */}
                <div className="block md:hidden max-w-[360px] mx-auto">
                  <WhatsAppScreenshot
                    testimonial={TESTIMONIALS[pageStart]}
                    index={pageStart}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Page dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: PAGES }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > page ? 1 : -1)}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? 'w-6 h-2.5 bg-accent'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`עמוד ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
