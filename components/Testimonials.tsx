'use client'

import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/constants'

function WhatsAppScreenshot({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
}) {
  const time = `${9 + index}:${index % 2 === 0 ? '14' : '37'}`
  const batteryPercent = 85 - index * 12

  return (
    <motion.div
      className="w-full max-w-[340px] mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {/* Phone frame */}
      <div className="rounded-[24px] overflow-hidden shadow-2xl border border-gray-200 bg-black">
        {/* Status bar */}
        <div className="bg-[#075e54] px-4 py-1.5 flex items-center justify-between" dir="ltr">
          <span className="text-white text-[11px] font-medium ltr-nums">{time}</span>
          <div className="flex items-center gap-1.5">
            {/* Signal bars */}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="white" className="opacity-90">
              <rect x="0" y="7" width="2.5" height="3" rx="0.5"/>
              <rect x="3.5" y="5" width="2.5" height="5" rx="0.5"/>
              <rect x="7" y="2.5" width="2.5" height="7.5" rx="0.5"/>
              <rect x="10.5" y="0" width="2.5" height="10" rx="0.5"/>
            </svg>
            {/* Battery */}
            <div className="flex items-center gap-0.5">
              <span className="text-white text-[10px] ltr-nums">{batteryPercent}%</span>
              <svg width="18" height="9" viewBox="0 0 18 9" fill="none" className="opacity-90">
                <rect x="0.5" y="0.5" width="15" height="8" rx="1.5" stroke="white" strokeWidth="1"/>
                <rect x="16" y="2.5" width="1.5" height="4" rx="0.5" fill="white"/>
                <rect x="1.5" y="1.5" width={`${batteryPercent / 100 * 13}`} height="6" rx="0.5" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* WhatsApp header */}
        <div className="bg-[#075e54] px-3 pb-2.5 pt-1 flex items-center gap-3" dir="rtl">
          {/* Back arrow */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="white" className="opacity-80 shrink-0">
            <path d="M8 4l6 6-6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#dfe5e7] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#aab8c2">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          {/* Name */}
          <div className="flex-1 min-w-0">
            <div className="text-white font-medium text-[15px] truncate">{testimonial.name}</div>
            <div className="text-white/60 text-[12px]">online</div>
          </div>
          {/* Icons */}
          <div className="flex items-center gap-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        </div>

        {/* Chat area */}
        <div
          className="px-3 py-4 min-h-[180px] flex flex-col justify-end"
          style={{
            backgroundColor: '#efeae2',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4cfc6' fill-opacity='0.15'%3E%3Ccircle cx='50' cy='50' r='1.5'/%3E%3Ccircle cx='150' cy='80' r='1'/%3E%3Ccircle cx='250' cy='40' r='1.5'/%3E%3Ccircle cx='350' cy='90' r='1'/%3E%3Ccircle cx='100' cy='150' r='1'/%3E%3Ccircle cx='200' cy='200' r='1.5'/%3E%3Ccircle cx='300' cy='160' r='1'/%3E%3Ccircle cx='50' cy='250' r='1'/%3E%3Ccircle cx='150' cy='300' r='1.5'/%3E%3Ccircle cx='250' cy='250' r='1'/%3E%3Ccircle cx='350' cy='350' r='1.5'/%3E%3Ccircle cx='100' cy='350' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
          dir="rtl"
        >
          {/* Date chip */}
          <div className="flex justify-center mb-3">
            <span className="bg-white/80 text-[11px] text-gray-600 px-3 py-1 rounded-lg shadow-sm">
              היום
            </span>
          </div>

          {/* Incoming message bubble */}
          <div className="flex justify-start mb-1">
            <div className="relative bg-white rounded-lg rounded-tr-none shadow-sm max-w-[85%] px-3 pt-2 pb-1">
              {/* Bubble tail */}
              <div className="absolute top-0 right-[-8px] w-0 h-0 border-l-[8px] border-l-white border-b-[8px] border-b-transparent" />

              <p className="text-[14.5px] text-gray-900 leading-[20px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {testimonial.quote}
              </p>

              {/* Time + improvement badge inline */}
              <div className="flex items-center justify-end gap-2 mt-1 -mb-0.5">
                <span className="text-[11px] text-gray-500 ltr-nums">{time}</span>
              </div>
            </div>
          </div>

          {/* Reply from Ben */}
          <div className="flex justify-end mt-2">
            <div className="relative bg-[#d9fdd3] rounded-lg rounded-tl-none shadow-sm max-w-[75%] px-3 pt-2 pb-1">
              {/* Bubble tail */}
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-r-[8px] border-r-[#d9fdd3] border-b-[8px] border-b-transparent" />

              <p className="text-[14.5px] text-gray-900 leading-[20px]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                תודה רבה! שמח לשמוע 🙏
              </p>

              <div className="flex items-center justify-end gap-1 mt-0.5 -mb-0.5">
                <span className="text-[11px] text-gray-500 ltr-nums">{time}</span>
                {/* Double blue check */}
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
          <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
            <span className="text-gray-400 text-[14px]">הקלד הודעה</span>
          </div>
          <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Info below screenshot */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-sm text-text-light">{testimonial.detail}</span>
        <span className="bg-accent/10 text-accent font-bold text-xs px-2.5 py-1 rounded-full">
          {testimonial.improvement}
        </span>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
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
            הודעות אמיתיות מתלמידים והורים
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <WhatsAppScreenshot
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
