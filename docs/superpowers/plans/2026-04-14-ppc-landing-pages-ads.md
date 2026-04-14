# PPC Landing Pages + Ad Creatives Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild 3 landing pages for max PPC conversion and produce copy + visual mockups for 6 ad platforms targeting Israeli students.

**Architecture:** New shared components (UrgencyStrip, TrialCTABlock, LandingFAQ, LandingStats) added to `/components`. Each landing page rebuilt to use the full 8-section structure. Ad copy saved as markdown docs, visual mockups as standalone HTML files.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Lucide React.

---

## File Map

**Create:**
- `components/UrgencyStrip.tsx`
- `components/TrialCTABlock.tsx`
- `components/LandingFAQ.tsx`
- `components/LandingStats.tsx`
- `docs/ads/google.md`
- `docs/ads/facebook.md`
- `docs/ads/instagram.md`
- `docs/ads/tiktok.md`
- `docs/ads/yad2.md`
- `docs/ads/whatsapp.md`
- `docs/ads/mockups/google.html`
- `docs/ads/mockups/facebook.html`
- `docs/ads/mockups/instagram.html`
- `docs/ads/mockups/tiktok.html`
- `docs/ads/mockups/yad2.html`
- `docs/ads/mockups/whatsapp.html`

**Modify:**
- `components/LandingContact.tsx` — reduce to 3 fields (name, phone, level)
- `app/bagrut/page.tsx` — full 8-section rebuild
- `app/middle-school/page.tsx` — full 8-section rebuild
- `app/academic/page.tsx` — full 8-section rebuild

---

## Task 1: UrgencyStrip component

**Files:**
- Create: `components/UrgencyStrip.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'

interface UrgencyStripProps {
  spotsLeft: number
  month: string
}

export default function UrgencyStrip({ spotsLeft, month }: UrgencyStripProps) {
  return (
    <motion.div
      className="w-full bg-accent text-gray-900 text-center py-2.5 px-4 text-sm font-bold z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      🔥 נשארו {spotsLeft} מקומות בלבד לחודש {month} —{' '}
      <a href="#contact" className="underline hover:no-underline">
        הבטח את המקום שלך עכשיו
      </a>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/UrgencyStrip.tsx
git commit -m "feat: add UrgencyStrip component"
```

---

## Task 2: LandingStats component

**Files:**
- Create: `components/LandingStats.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '100+', label: 'תלמידים מרוצים' },
  { value: '25', label: 'נקודות שיפור ממוצע בבגרות' },
  { value: '90%', label: 'מהתלמידים שיפרו ציון' },
  { value: '4+', label: 'שנות ניסיון' },
]

export default function LandingStats() {
  return (
    <section className="py-8 px-4 bg-primary">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-accent">{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/LandingStats.tsx
git commit -m "feat: add LandingStats component"
```

---

## Task 3: TrialCTABlock component

**Files:**
- Create: `components/TrialCTABlock.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle, Shield, Clock, CheckCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

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
          <p className="text-white/70 mb-8 text-lg">ללא התחייבות — אם לא מרוצים, לא משלמים</p>

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
              שיעור ניסיון — ₪99 בלבד
              <ArrowLeft className="w-5 h-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp — מענה מיידי
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/TrialCTABlock.tsx
git commit -m "feat: add TrialCTABlock component"
```

---

## Task 4: LandingFAQ component

**Files:**
- Create: `components/LandingFAQ.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

export default function LandingFAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 px-4 bg-background-secondary">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-primary text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          שאלות נפוצות
        </motion.h2>

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-right font-bold text-primary hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-accent shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-4 text-text-light text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/LandingFAQ.tsx
git commit -m "feat: add LandingFAQ accordion component"
```

---

## Task 5: Reduce LandingContact to 3 fields

**Files:**
- Modify: `components/LandingContact.tsx`

- [ ] **Step 1: Replace the component**

Replace full file content with:

```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, Shield, Clock, MessageCircle, ArrowLeft } from 'lucide-react'
import { LEVEL_OPTIONS, WHATSAPP_URL } from '@/lib/constants'

interface FormData {
  name: string
  phone: string
  level: string
}

export default function LandingContact({
  defaultLevel,
  headline = 'השאירו פרטים ונחזור אליכם תוך שעות',
}: {
  defaultLevel?: string
  headline?: string
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

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-text mb-1">רמת לימוד</label>
                <select
                  id="level"
                  {...register('level')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors bg-white"
                >
                  {LEVEL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'שולח...' : (
                  <><Send className="w-5 h-5" />שליחה — שיעור ניסיון ב-₪99</>
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
            שלחו הודעה בוואטסאפ — מענה מיידי
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/LandingContact.tsx
git commit -m "feat: reduce landing contact form to 3 fields"
```

---

## Task 6: Rebuild /bagrut page

**Files:**
- Modify: `app/bagrut/page.tsx`

- [ ] **Step 1: Replace full file**

```tsx
import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingStats from '@/components/LandingStats'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import TrialCTABlock from '@/components/TrialCTABlock'
import LandingFAQ from '@/components/LandingFAQ'
import LandingContact from '@/components/LandingContact'
import UrgencyStrip from '@/components/UrgencyStrip'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'הכנה לבגרות במתמטיקה | 3, 4, 5 יחידות — שיעורים פרטיים אונליין | Math+',
  description:
    'שיעורים פרטיים במתמטיקה לבגרות — 3, 4, 5 יחידות. מורה פרטי עם 100 בבגרות ותואר בהצטיינות. שיטה מוכחת, ליווי אישי, ולמידה בלי חרדות. שיעור ניסיון ב-₪99!',
  keywords: [
    'הכנה לבגרות מתמטיקה',
    'בגרות מתמטיקה 5 יחידות',
    'בגרות מתמטיקה 4 יחידות',
    'בגרות מתמטיקה 3 יחידות',
    'מורה פרטי לבגרות מתמטיקה',
    'שיעורים פרטיים בגרות מתמטיקה',
    'הכנה לבגרות מתמטיקה אונליין',
  ],
}

const BENEFITS = [
  { icon: 'Target', title: 'מותאם לרמה שלך', description: 'תוכנית לימודים אישית ל-3, 4 או 5 יחידות — בדיוק מה שאתה צריך למבחן' },
  { icon: 'Heart', title: 'בלי חרדת מבחנים', description: 'סביבה נעימה ותומכת. לומדים להתמודד עם הבחינה בביטחון ובלי לחץ' },
  { icon: 'BookOpen', title: 'בגרויות אמיתיות', description: 'עובדים על מבחני בגרות משנים קודמות, חוסכים טעויות נפוצות וחוסכים נקודות' },
  { icon: 'Monitor', title: 'אונליין מהבית', description: 'שיעורים ב-Teams עם לוח לבן דיגיטלי — בנוחות מהסלון, בלי נסיעות' },
  { icon: 'TrendingUp', title: 'תוצאות מוכחות', description: 'תלמידים שיפרו בממוצע 25 נקודות בציון הבגרות — עם שיטה ממוקדת' },
  { icon: 'Award', title: 'מורה שהיה שם', description: 'עליתי מ-3 ל-5 יחידות וקיבלתי 100 בבגרות. אני יודע בדיוק מה צריך לעשות' },
]

const TESTIMONIALS = [
  { quote: 'בן תודה רבה על הכל!! עליתי מ-62 ל-89 בבגרות, בלעדיך לא הייתי מצליחה. סוף סוף הבנתי את החומר 🙏', name: 'יעל כ.', detail: 'בגרות 4 יחידות', improvement: 'מ-62 ל-89' },
  { quote: 'בן אני חייבת להגיד לך תודה!! קיבלתי 94 בבגרות 5 יחידות. נכנסתי לבחינה בביטחון מלא, הכל בזכותך ❤️', name: 'נועה ש.', detail: 'בגרות 5 יחידות', improvement: 'ציון 94' },
  { quote: 'בן תודה אחי!! התחלתי את השנה עם 54 ועכשיו סיימתי עם 85. בלי השיעורים איתך לא הייתי מגיע לשם 🙏', name: 'תומר א.', detail: 'בגרות 3 יחידות', improvement: 'מ-54 ל-85' },
  { quote: 'בן תודה רבה על הסבלנות עם הבת שלי! היא הייתה בלחץ רציני והצלחת להרגיע אותה. קיבלה 88 בבגרות!!', name: 'רונית מ.', detail: 'אמא של תלמידת בגרות 4 יח׳', improvement: 'ציון 88' },
]

const FAQ = [
  { question: 'כמה עולה שיעור ניסיון?', answer: 'שיעור הניסיון עולה ₪99 בלבד — ללא התחייבות לשיעורים נוספים. בשיעור נאבחן את הרמה ונבנה תוכנית מותאמת.' },
  { question: 'לאיזו יחידות אתה מכין?', answer: 'אני מכין לכל הרמות — 3, 4 ו-5 יחידות. כל תוכנית לימודים מותאמת לרמה הספציפית ולסילבוס הבחינה.' },
  { question: 'כמה זמן לפני הבגרות כדאי להתחיל?', answer: 'ככל שמוקדם יותר — יותר טוב. אבל גם עם 4-6 שבועות לפני הבחינה ניתן לשפר משמעותית. יצרת קשר? נבנה תוכנית ריאלית.' },
  { question: 'איך עובדים השיעורים?', answer: 'שיעורים ב-Teams עם לוח כתיבה דיגיטלי משותף. בסוף כל שיעור מקבלים PDF של כל מה שנלמד + גישה להקלטה.' },
  { question: 'מה אם לא מרוצה מהשיעור הראשון?', answer: 'אם שיעור הניסיון לא עמד בציפיות — לא תשלם. פשוט ככה. אין סיכון.' },
]

export default function BagrutPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={3} month="מאי" />
      <LandingHero
        badge="100 בבגרות 5 יחידות — המורה שהיה שם"
        headline="הכנה לבגרות במתמטיקה —"
        highlightedWord="להיכנס לבחינה בביטחון מלא"
        subheadline="שיעורים פרטיים אונליין ל-3, 4, 5 יחידות עם מורה שעלה מ-3 יחידות ל-100 בבגרות ותואר בהצטיינות מהאוניברסיטה העברית. שיטה מוכחת, ליווי אישי עד יום הבחינה."
        bullets={['שיפור ממוצע 25 נקודות', 'ליווי עד יום הבחינה', 'שיעור ניסיון ב-₪99', 'זמינות מלאה לכל שאלה']}
        ctaText="שיעור ניסיון — ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה תלמידי בגרות בוחרים ב-Math+?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="מוכן לשפר את ציון הבגרות? שיעור ניסיון ב-₪99" />
      <LandingFAQ items={FAQ} />
      <LandingContact defaultLevel="bagrut-5" headline="השאירו פרטים — נבנה תוכנית הכנה לבגרות" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/bagrut/page.tsx
git commit -m "feat: rebuild /bagrut landing page for PPC conversion"
```

---

## Task 7: Rebuild /middle-school page

**Files:**
- Modify: `app/middle-school/page.tsx`

- [ ] **Step 1: Replace full file**

```tsx
import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingStats from '@/components/LandingStats'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import TrialCTABlock from '@/components/TrialCTABlock'
import LandingFAQ from '@/components/LandingFAQ'
import LandingContact from '@/components/LandingContact'
import UrgencyStrip from '@/components/UrgencyStrip'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'מורה פרטי למתמטיקה — חטיבת ביניים כיתות ז׳-ט׳ | שיעורים אונליין | Math+',
  description:
    'שיעורים פרטיים במתמטיקה לחטיבת ביניים — כיתות ז, ח, ט. בניית בסיס חזק, הכנה למבחנים, ולמידה בלי חרדות. מורה מנוסה עם תואר בהצטיינות. שיעור ניסיון ב-₪99!',
  keywords: [
    'מורה פרטי למתמטיקה חטיבת ביניים',
    'שיעורים פרטיים מתמטיקה כיתה ז',
    'שיעורים פרטיים מתמטיקה כיתה ח',
    'שיעורים פרטיים מתמטיקה כיתה ט',
    'מתמטיקה חטיבת ביניים',
    'עזרה במתמטיקה לילדים',
  ],
}

const BENEFITS = [
  { icon: 'Heart', title: 'למידה בלי לחץ', description: 'סביבה חמה ותומכת שגורמת לילד להתחבר למתמטיקה במקום לפחד ממנה' },
  { icon: 'Target', title: 'מותאם לקצב של הילד', description: 'כל ילד לומד בקצב שלו. מזהים את הפערים ובונים תוכנית ממוקדת' },
  { icon: 'TrendingUp', title: 'ביטחון עצמי אמיתי', description: 'התלמידים לא רק משתפרים בציונים — הם מתחילים להאמין שהם יכולים' },
  { icon: 'BookOpen', title: 'הכנה למבחנים', description: 'תרגול ממוקד למבחנים בית-ספריים ולמיצ"ב, עם טכניקות שעובדות' },
  { icon: 'Monitor', title: 'שיעורים מהבית', description: 'אונליין ב-Teams — ההורים רגועים והילד לומד בנוחות ובלי נסיעות' },
  { icon: 'Award', title: 'בסיס חזק לתיכון', description: 'מתמטיקה חזקה בחטיבה = כניסה חזקה לתיכון ולרמה גבוהה בבגרות' },
]

const TESTIMONIALS = [
  { quote: 'בן רציתי להגיד תודה ענקית!! הבן שלי מחכה לשיעורים איתך, מילא הוא היה שונא מתמטיקה. שינית לו את הגישה', name: 'מיכל ר.', detail: 'אמא של תלמיד כיתה ח׳', improvement: 'שינוי גישה מוחלט' },
  { quote: 'בן אתה אלוף!! לימדת אותי מאפס ועכשיו אני באמת מבין מתמטיקה. עליתי מ-58 ל-82, תודה על הכל אחי 🙏', name: 'איתי ג.', detail: 'תלמיד כיתה ט׳', improvement: 'מ-58 ל-82' },
  { quote: 'בן תודה רבה!! הבת שלי עברה מ-65 ל-90 בגיאומטריה. עבדת איתה על ביטחון וזה עשה את כל ההבדל 💪', name: 'דנה ש.', detail: 'אמא של תלמידה כיתה ז׳', improvement: 'מ-65 ל-90' },
  { quote: 'בן תודה אחי!! חשבתי שאני לא מתאים למתמטיקה ואתה שינית לי את הראש. עכשיו אני הולך על 5 יחידות 🙏', name: 'עידו ק.', detail: 'תלמיד כיתה ט׳', improvement: 'הולך על 5 יח׳' },
]

const FAQ = [
  { question: 'כמה עולה שיעור ניסיון?', answer: 'שיעור הניסיון עולה ₪99 בלבד — ללא התחייבות לשיעורים נוספים. בשיעור נאבחן את הרמה ונבנה תוכנית מותאמת לילד.' },
  { question: 'האם השיעורים מתאימים לכיתה ז, ח וגם ט?', answer: 'כן — אני מלמד את כל כיתות חטיבת הביניים. התוכנית מותאמת לחומר הספציפי של הכיתה ולפערים האישיים של הילד.' },
  { question: 'איך עובד שיעור אונליין לילד?', answer: 'שיעורים ב-Teams עם לוח לבן דיגיטלי — ממש כמו לוח בכיתה, רק על המחשב. הילד מקבל PDF עם כל מה שנלמד בסוף כל שיעור.' },
  { question: 'כמה שיעורים בשבוע מומלץ?', answer: 'בדרך כלל שיעור אחד עד שניים בשבוע, תלוי ברמת הפערים ובמטרות. נקבע ביחד אחרי שיעור ההיכרות.' },
  { question: 'מה אם הילד לא מתחבר לשיעור הראשון?', answer: 'אם שיעור הניסיון לא עמד בציפיות — לא תשלמו. אין סיכון. הרבה ילדים צריכים קצת זמן להסתגל, אבל אם ממש לא מתאים — אין חיוב.' },
]

export default function MiddleSchoolPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={3} month="מאי" />
      <LandingHero
        badge="הורים ממליצים — דירוג 5 כוכבים"
        headline="מורה פרטי למתמטיקה לחטיבת ביניים —"
        highlightedWord="הילד שלכם יכול לאהוב מתמטיקה"
        subheadline="כל ילד יכול להצליח במתמטיקה עם הגישה הנכונה. שיעורים פרטיים אונליין לכיתות ז׳-ט׳ עם מורה מנוסה שבונה ביטחון אמיתי — ומביא תוצאות."
        bullets={['מותאם לקצב הילד', 'שיפור ביטחון עצמי', 'הכנה למבחנים ולמיצ"ב', 'שיעור ניסיון ב-₪99']}
        ctaText="שיעור ניסיון — ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה הורים בוחרים ב-Math+ לילדים שלהם?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="רוצים לראות שינוי? שיעור ניסיון ב-₪99 ללא התחייבות" />
      <LandingFAQ items={FAQ} />
      <LandingContact defaultLevel="middle-school" headline="השאירו פרטים — נתאם שיעור היכרות לילד" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/middle-school/page.tsx
git commit -m "feat: rebuild /middle-school landing page for PPC conversion"
```

---

## Task 8: Rebuild /academic page

**Files:**
- Modify: `app/academic/page.tsx`

- [ ] **Step 1: Replace full file**

```tsx
import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingStats from '@/components/LandingStats'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import TrialCTABlock from '@/components/TrialCTABlock'
import LandingFAQ from '@/components/LandingFAQ'
import LandingContact from '@/components/LandingContact'
import UrgencyStrip from '@/components/UrgencyStrip'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'שיעורים פרטיים במתמטיקה לסטודנטים | אינפי, לינארית, סטטיסטיקה | Math+',
  description:
    'שיעורים פרטיים במתמטיקה אקדמית — חשבון אינפיניטסימלי, אלגברה לינארית, הסתברות ומתמטיקה בדידה. מורה עם תואר בהצטיינות מהאוניברסיטה העברית. שיעור ניסיון ב-₪99!',
  keywords: [
    'חשבון אינפיניטסימלי שיעורים פרטיים',
    'אלגברה לינארית עזרה',
    'מתמטיקה אקדמית שיעורים פרטיים',
    'הסתברות וסטטיסטיקה שיעורים',
    'אינפי 1 עזרה',
    'אינפי 2 שיעורים',
    'מורה פרטי מתמטיקה אוניברסיטה',
  ],
}

const BENEFITS = [
  { icon: 'Award', title: 'תואר בהצטיינות', description: 'למדתי מתמטיקה באוניברסיטה העברית וסיימתי בהצטיינות. מכיר את החומר לעומק' },
  { icon: 'Target', title: 'מותאם לקורס שלך', description: 'עובדים לפי הסילבוס של הקורס שלך — תרגילים, מטלות והכנה לבחינות' },
  { icon: 'Heart', title: 'בלי בושה לשאול', description: 'בשיעור פרטי אתה יכול לשאול כל שאלה. אין שיפוט, אין "שאלות טיפשות"' },
  { icon: 'BookOpen', title: 'מורכב הופך פשוט', description: 'לוקח נושאים קשים ומסביר אותם בצורה ברורה ואינטואיטיבית — עם דוגמאות מהחיים' },
  { icon: 'Monitor', title: 'שעות גמישות', description: 'שיעורים ב-Teams — גם בערב, גם בסופ"ש, גם לפני בחינה בבוקר' },
  { icon: 'TrendingUp', title: 'הכנה לפני סמסטר', description: 'גם הכנה לפני תחילת הסמסטר — תתחיל את הקורס עם בסיס חזק וביטחון' },
]

const TESTIMONIALS = [
  { quote: 'אחי תודה!! עברתי אינפי 1 עם 91 בזכותך. אתה יודע להסביר דברים מורכבים בצורה שפתאום הכל ברור 💪', name: 'אורי ד.', detail: 'סטודנט למדעי המחשב', improvement: 'ציון 91 בקורס' },
  { quote: 'בן תודה!! עשית לי סדר בראש בלינארית, פתאום הכל התחבר לי. עברתי עם 85 ואני עדיין בשוק מזה 😂', name: 'שירה ל.', detail: 'סטודנטית להנדסת תעשייה', improvement: 'ציון 85 בלינארית' },
  { quote: 'בן אתה הצלת לי את הסמסטר!! נכשלתי באינפי 2 במועד א׳ ובזכותך קיבלתי 78 במועד ב׳. תודה רבה 🙏', name: 'דניאל ר.', detail: 'סטודנט לכלכלה', improvement: 'מנכשל ל-78' },
  { quote: 'בן תודה רבה!! הסברת לי הסתברות עם דוגמאות מהחיים ופתאום הכל נהיה הגיוני. קיבלתי 88 בבחינה ❤️', name: 'מאיה כ.', detail: 'סטודנטית לפסיכולוגיה', improvement: 'ציון 88' },
]

const FAQ = [
  { question: 'כמה עולה שיעור ניסיון?', answer: 'שיעור הניסיון עולה ₪99 בלבד — ללא התחייבות. בשיעור נאבחן איפה הפערים ונבנה תוכנית מותאמת לקורס.' },
  { question: 'אילו קורסים אתה מלמד?', answer: 'חשבון אינפיניטסימלי 1 ו-2, אלגברה לינארית, הסתברות וסטטיסטיקה, מתמטיקה בדידה, ועוד. שאל אם הקורס שלך ברשימה.' },
  { question: 'אפשר לתאם שיעור לפני הבחינה בזמן קצר?', answer: 'כן — אני מנסה להתפנות גם לשיעורי חירום לפני בחינה. כתוב בוואטסאפ ונסדר.' },
  { question: 'האם אתה מכיר את הסילבוס של האוניברסיטה שלי?', answer: 'עבדתי עם תלמידים מהאוניברסיטה העברית, TAU, הטכניון, אריאל ועוד. שלח את הסילבוס ונסתנכרן.' },
  { question: 'מה אם לא מרוצה מהשיעור הראשון?', answer: 'אם שיעור הניסיון לא עמד בציפיות — לא תשלם. אין סיכון.' },
]

export default function AcademicPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={3} month="מאי" />
      <LandingHero
        badge="תואר בהצטיינות מהאוניברסיטה העברית"
        headline="שיעורים פרטיים במתמטיקה אקדמית —"
        highlightedWord="להבין, לא רק לעבור"
        subheadline="חשבון אינפיניטסימלי, אלגברה לינארית, הסתברות וסטטיסטיקה — הכל אונליין עם מורה בעל תואר בהצטיינות מהאוניברסיטה העברית, שיודע להפוך מורכב לפשוט."
        bullets={['אינפי 1+2, לינארית, סטטיסטיקה', 'הכנה לבחינות ומטלות', 'שעות גמישות', 'שיעור ניסיון ב-₪99']}
        ctaText="שיעור ניסיון — ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה סטודנטים בוחרים ב-Math+?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="תקוע בקורס? שיעור ניסיון ב-₪99 — נסדר את זה" />
      <LandingFAQ items={FAQ} />
      <LandingContact defaultLevel="academic" headline="השאירו פרטים — נבנה תוכנית מותאמת לקורס שלך" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/academic/page.tsx
git commit -m "feat: rebuild /academic landing page for PPC conversion"
```

---

## Task 9: Google Search ad copy

**Files:**
- Create: `docs/ads/google.md`

- [ ] **Step 1: Create the file**

```markdown
# Google Search Ads — Math+

> Paste into Google Ads RSA builder. Each campaign targets one landing page.

---

## Campaign 1: בגרות מתמטיקה → /bagrut

**Keywords (exact + phrase match):**
- [מורה פרטי לבגרות מתמטיקה]
- [הכנה לבגרות מתמטיקה]
- [בגרות מתמטיקה 5 יחידות]
- [בגרות מתמטיקה 4 יחידות]
- "שיעורים פרטיים בגרות"
- "עזרה בגרות מתמטיקה"

**Headlines (15):**
1. מורה פרטי לבגרות מתמטיקה
2. הכנה לבגרות — 3, 4, 5 יחידות
3. שיעור ניסיון ב-₪99 בלבד
4. עלה מ-3 יחידות ל-100 בבגרות
5. שיפור ממוצע 25 נקודות בבגרות
6. 100+ תלמידי בגרות הצליחו
7. ליווי אישי עד יום הבחינה
8. אונליין מהבית — בלי נסיעות
9. 90% מהתלמידים שיפרו ציון
10. נשארו 3 מקומות לחודש זה
11. מורה עם תואר בהצטיינות
12. בגרות 5 יחידות — שיטה ממוקדת
13. ללא התחייבות — קבע היום
14. Math+ שיעורים פרטיים אונליין
15. בגרות מתמטיקה — שיטה מוכחת

**Descriptions (4):**
1. מורה שעלה מ-3 יחידות ל-100 בבגרות. שיעור ניסיון ב-₪99 ללא התחייבות. מענה תוך שעות.
2. 100+ תלמידים שיפרו ציון ממוצע של 25 נקודות. הכנה מותאמת ל-3, 4, 5 יחידות. קבע שיעור ניסיון.
3. שיעורים אונליין עם לוח דיגיטלי. ליווי אישי עד יום הבחינה. שיעור ניסיון ב-₪99 — ללא סיכון.
4. הייתי בדיוק במקום שלך — ואני יודע מה עובד. שיעור ניסיון ב-₪99. נשארו מקומות מוגבלים.

**Extensions:**
- Call: 054-253-0058
- Sitelink 1: "בגרות 5 יחידות" → /bagrut
- Sitelink 2: "בגרות 3-4 יחידות" → /bagrut
- Sitelink 3: "WhatsApp מיידי" → wa.me/972542530058

---

## Campaign 2: חטיבת ביניים → /middle-school

**Keywords:**
- [מורה פרטי למתמטיקה חטיבת ביניים]
- [שיעורים פרטיים מתמטיקה כיתה ז]
- [שיעורים פרטיים מתמטיקה כיתה ח]
- [שיעורים פרטיים מתמטיקה כיתה ט]
- "עזרה במתמטיקה לילדים"
- "מתמטיקה חטיבת ביניים"

**Headlines (15):**
1. מורה פרטי למתמטיקה לכיתה ז-ט
2. שיעורים פרטיים חטיבת ביניים
3. הילד שלכם יכול לאהוב מתמטיקה
4. שיעור ניסיון ב-₪99 בלבד
5. מותאם לקצב ולרמה של הילד
6. 100+ תלמידים שיפרו ציון
7. בניית ביטחון עצמי במתמטיקה
8. אונליין — בנוחות מהבית
9. הכנה למבחנים ולמיצ"ב
10. 90% מהתלמידים שיפרו ציון
11. ללא התחייבות — קבע היום
12. נשארו 3 מקומות לחודש זה
13. מורה מנוסה עם תואר בהצטיינות
14. בסיס חזק לכניסה לתיכון
15. Math+ — שיעורים פרטיים אונליין

**Descriptions (4):**
1. מורה מנוסה עם תואר בהצטיינות. מותאם לקצב הילד. שיעור ניסיון ב-₪99 — ללא התחייבות.
2. 100+ תלמידים שיפרו ציון. גישה תומכת שגורמת לילד להתחבר למתמטיקה. קבע שיעור היכרות.
3. שיעורים ב-Teams עם לוח דיגיטלי. PDF מסכם בסוף כל שיעור. שיעור ניסיון ב-₪99.
4. כיתות ז, ח, ט — בניית בסיס חזק לתיכון ולבגרות. קבע שיעור ניסיון ב-₪99 ללא סיכון.

---

## Campaign 3: מתמטיקה אקדמית → /academic

**Keywords:**
- [חשבון אינפיניטסימלי שיעורים פרטיים]
- [אלגברה לינארית עזרה]
- [אינפי 1 שיעורים פרטיים]
- [אינפי 2 עזרה]
- "מורה פרטי מתמטיקה אוניברסיטה"
- "מתמטיקה אקדמית שיעורים"

**Headlines (15):**
1. שיעורים פרטיים אינפי ולינארית
2. מורה פרטי למתמטיקה אקדמית
3. תואר בהצטיינות — האוניברסיטה העברית
4. שיעור ניסיון ב-₪99 בלבד
5. אינפי 1+2, לינארית, סטטיסטיקה
6. להבין, לא רק לעבור
7. הכנה לבחינות — שעות גמישות
8. גם ערב, גם סופ"ש — אונליין
9. 91 בקורס — תלמידים מספרים
10. ללא התחייבות — קבע היום
11. נשארו מקומות מוגבלים
12. מורכב הופך פשוט — שיטה ברורה
13. הצלתי סמסטרים — סטודנטים מספרים
14. כל אוניברסיטה — כל סילבוס
15. Math+ שיעורים פרטיים אקדמיים

**Descriptions (4):**
1. מורה עם תואר בהצטיינות מהאוניברסיטה העברית. אינפי, לינארית, הסתברות. שיעור ניסיון ב-₪99.
2. עבדתי עם סטודנטים מהאוניברסיטה העברית, TAU, הטכניון ועוד. שולח PDF בסוף כל שיעור.
3. תקוע לפני בחינה? גם שיעורי חירום אפשרי. ניצור קשר בוואטסאפ ונסדר. ₪99 לשיעור ניסיון.
4. "עברתי אינפי 1 עם 91 בזכותו" — אורי ד. 100+ סטודנטים עברו קורסים. קבע שיעור ניסיון.
```

- [ ] **Step 2: Commit**

```bash
git add docs/ads/google.md
git commit -m "feat: add Google Search ad copy for all 3 campaigns"
```

---

## Task 10: Facebook + Instagram ad copy

**Files:**
- Create: `docs/ads/facebook.md`

- [ ] **Step 1: Create the file**

```markdown
# Facebook & Instagram Ads — Math+

> Upload to Meta Ads Manager. Run Facebook for parents (35–55), Instagram for students (16–24).

---

## Audience 1: הורים (Facebook Feed) — 35–55, Israel, interests: education, parenting

### Ad F1 — Pain/Anxiety Hook
**Headline:** הילד שלכם נלחם עם מתמטיקה?
**Primary text:**
זה לא שהוא לא מוכשר.
זה שאף אחד עוד לא הסביר לו בשפה שלו.

100+ תלמידים שיפרו ציון עם Math+.
שיעור ניסיון ב-₪99 — ללא התחייבות.
**CTA button:** שלח הודעה (→ WhatsApp)
**Visual:** Photo of Ben at whiteboard, relaxed student. Warm tone.

---

### Ad F2 — Social Proof
**Headline:** "עליתי מ-62 ל-89 בבגרות בזכות בן" 🙏
**Primary text:**
יעל לא האמינה שתצליח.
היום היא מחזיקה תעודת בגרות עם 89.

מה השתנה? מורה שמבין מאיפה היא באה.

שיעור ניסיון ב-₪99 — ללא התחייבות.
נשארו 3 מקומות לחודש מאי.
**CTA button:** קבל מידע (→ WhatsApp)
**Visual:** WhatsApp-style screenshot of yael's testimonial.

---

### Ad F3 — Urgency/Scarcity
**Headline:** נשארו 3 מקומות לחודש מאי
**Primary text:**
אני מגביל את מספר התלמידים כדי לתת לכל אחד תשומת לב אישית.

✔ שיעורים אונליין — 3, 4, 5 יחידות
✔ מורה שעצמו קיבל 100 בבגרות
✔ שיעור ניסיון ב-₪99 ללא התחייבות

הבטח את המקום לפני שיתמלא.
**CTA button:** הרשם עכשיו
**Visual:** Urgency-framed dark blue card with "3 מקומות נותרו" text.

---

## Audience 2: סטודנטים (Instagram Feed/Reels) — 16–24, Israel, interests: study, bagrut

### Ad I1 — Before/After
**Headline:** מ-54 ל-85 בבגרות
**Primary text:**
תומר התחיל את השנה עם 54.
הוא לא האמין שאפשר לשנות כיוון.

3 חודשים אחרי — 85 בבגרות.

שיעור ניסיון ב-₪99 ← קישור בביו
**CTA:** קישור בביו → /bagrut
**Visual:** Split image: before (stressed student) / after (student celebrating).

---

### Ad I2 — Ben's Story Hook (Reels 15s)
**Hook (0–2s):** "הייתי הכי גרוע בכיתה במתמטיקה."
**Body (2–12s):** Ben on camera, casual: "ממש. ידעו אותי בכיתה כמי שלא מבין. עברתי מ-3 יחידות ל-100 בבגרות. היום אני מלמד — ויודע בדיוק מה לא עבד לי ואיך לתקן."
**CTA (12–15s):** "שיעור ניסיון ב-₪99. קישור בביו."
**Caption:** הסיפור שלי ↑ שיעור ניסיון ב-₪99 — קישור בביו 🔗 #מתמטיקה #בגרות #מורהפרטי

---

### Ad I3 — Testimonial Carousel
**Frame 1:** "עליתי מ-62 ל-89 בבגרות" — יעל כ. | בגרות 4 יחידות
**Frame 2:** "קיבלתי 94 בבגרות 5 יחידות" — נועה ש.
**Frame 3:** "מ-54 ל-85 — בלי השיעורים לא הייתי מגיע" — תומר א.
**Frame 4 (CTA):** שיעור ניסיון ב-₪99 | ללא התחייבות | Math+
**Caption:** תוצאות אמיתיות, תלמידים אמיתיים. קישור בביו לשיעור ניסיון ב-₪99.
```

- [ ] **Step 2: Commit**

```bash
git add docs/ads/facebook.md
git commit -m "feat: add Facebook and Instagram ad copy"
```

---

## Task 11: TikTok scripts

**Files:**
- Create: `docs/ads/tiktok.md`

- [ ] **Step 1: Create the file**

```markdown
# TikTok Ad Scripts — Math+

> Film casually. No production needed. Ben on camera, phone tripod okay. Post organic first — boost as Spark Ad once traction appears.

---

## Script T1 — הסיפור האישי (30s)
**Hook (0–3s, bold text on screen):** "הייתי הכי גרוע בכיתה במתמטיקה."
**Body (3–22s):** Ben to camera, sitting naturally:
"ממש. הייתי בכיתה ג' יחידות ולא הבנתי כלום. כולם ידעו אותי כמי שמתמטיקה זה לא שלו. אז החלטתי לשנות את זה. עברתי לחמש יחידות. למדתי כמו משוגע. וקיבלתי 100 בבגרות. [pause] היום אני מלמד מתמטיקה — ואני יודע בדיוק מה עצר אותי ואיך לתקן את זה."
**CTA (22–30s):** "אם אתה במקום שהייתי — קישור בביו. שיעור ניסיון ב-₪99."
**On-screen text:** שיעור ניסיון ₪99 | קישור בביו
**Caption:** מ-3 יחידות ל-100 בבגרות 🧮 #מתמטיקה #בגרות #מורהפרטי #mathplus

---

## Script T2 — טיפ מהיר (20s, Spark Ad candidate)
**Hook (0–2s):** "הטעות הכי נפוצה בבגרות מתמטיקה:"
**Body (2–15s):** Ben at whiteboard, fast-paced: מסביר טעות נפוצה אחת ספציפית (למשל: שכחת לבדוק תחום הגדרה, או טעות בנגזרת של מכפלה). הסבר קצר ופתרון מהיר.
**CTA (15–20s):** "עוד טיפים — ותוכנית הכנה מלאה? קישור בביו."
**Caption:** הטעות הזו עולה נקודות 😤 #בגרות #מתמטיקה #טיפים

---

## Script T3 — תגובה לתלמיד (25s, duet format)
**Format:** Duet עם הודעת וואטסאפ של תלמיד (screenshot)
**Hook (0–3s):** Ben reads message on screen: "בן קיבלתי 91 באינפי!!"
**Body (3–20s):** Ben reacts genuinely, explains what they worked on together (without naming student): "עבדנו על גבולות ורציפות שלושה שיעורים. הוא נכנס לבחינה בטוח. זה מה שקורה כשמבינים את הבסיס."
**CTA (20–25s):** "רוצה גם? קישור בביו — שיעור ניסיון ב-₪99."
**Caption:** תוצאות אמיתיות 💪 #מתמטיקה #אינפי #סטודנטים
```

- [ ] **Step 2: Commit**

```bash
git add docs/ads/tiktok.md
git commit -m "feat: add TikTok ad scripts"
```

---

## Task 12: Yad2 + WhatsApp copy

**Files:**
- Create: `docs/ads/yad2.md`
- Create: `docs/ads/whatsapp.md`

- [ ] **Step 1: Create yad2.md**

```markdown
# Yad2 Listings — Math+

> Post under: שיעורים פרטיים > מתמטיקה. Refresh weekly (delete + repost) to stay at top. Include a photo of Ben.

---

## Listing 1: בגרות מתמטיקה

**Title:** מורה פרטי לבגרות מתמטיקה 3/4/5 יח׳ — שיעור ניסיון ב-₪99 | Math+

**Body:**
שלום! אני בן כפיר, מורה למתמטיקה עם תואר בהצטיינות מהאוניברסיטה העברית.
עצמי עליתי מ-3 יחידות ל-100 בבגרות — אז אני יודע בדיוק מה עצר אותך ואיך לתקן.

✔ הכנה ל-3, 4, 5 יחידות
✔ שיעורים אונליין ב-Teams עם לוח דיגיטלי
✔ ליווי אישי עד יום הבחינה
✔ PDF מסכם בסוף כל שיעור
✔ זמינות מלאה לשאלות בין שיעורים

100+ תלמידים שיפרו ציון ממוצע של 25 נקודות.

שיעור ניסיון ב-₪99 בלבד — ללא התחייבות.
נשארו מקומות מוגבלים לחודש זה.

📱 וואטסאפ: 054-253-0058
🌐 Math-plus.co.il

---

## Listing 2: חטיבת ביניים

**Title:** מורה פרטי למתמטיקה חטיבת ביניים ז-ט — שיעור ניסיון ב-₪99 | Math+

**Body:**
שלום! אני בן כפיר, מורה מנוסה עם תואר בהצטיינות מהאוניברסיטה העברית.

אני עובד עם תלמידי חטיבת ביניים בגישה שמתאימה לקצב ולרמה של כל ילד.
הרבה ילדים מגיעים אליי עם "שנאת מתמטיקה" — ויוצאים עם ביטחון אמיתי.

✔ כיתות ז, ח, ט — כל הנושאים
✔ שיעורים אונליין מהבית ב-Teams
✔ הכנה למבחנים ולמיצ"ב
✔ תוכנית לימודים מותאמת אישית

שיעור ניסיון ב-₪99 — ללא התחייבות.

📱 וואטסאפ: 054-253-0058

---

## Listing 3: מתמטיקה אקדמית

**Title:** מורה פרטי לאינפי, לינארית, סטטיסטיקה — שיעור ניסיון ב-₪99 | Math+

**Body:**
שלום! אני בן כפיר, בוגר תואר במתמטיקה בהצטיינות מהאוניברסיטה העברית.

עובד עם סטודנטים מהאוניברסיטה העברית, TAU, הטכניון, אריאל ועוד.

✔ חשבון אינפיניטסימלי 1+2
✔ אלגברה לינארית
✔ הסתברות וסטטיסטיקה
✔ מתמטיקה בדידה
✔ שעות גמישות — גם ערב, גם סופ"ש
✔ גם הכנה לפני תחילת סמסטר

"עברתי אינפי 1 עם 91 בזכותו" — אורי ד., מדעי המחשב

שיעור ניסיון ב-₪99 — ללא התחייבות.
📱 וואטסאפ: 054-253-0058
```

- [ ] **Step 2: Create whatsapp.md**

```markdown
# WhatsApp Broadcast Templates — Math+

> Send to existing contacts (past inquiries, students who didn't convert). Use WhatsApp Business broadcast list. Send from Ben's number. Max 1 message per 3–4 weeks per contact.

---

## Template W1 — Spots Urgency (send any time)

היי [שם],

בן מ-Math+ כאן 👋

רציתי לעדכן — נשארו 2 מקומות פנויים לחודש מאי.
אם חשבת על שיעורים פרטיים במתמטיקה — זה הזמן.

שיעור ניסיון ב-₪99 בלבד, ללא התחייבות.
ענה להודעה הזו ונסדר מועד 🙏

---

## Template W2 — Social Proof (send mid-month)

היי [שם],

בן מ-Math+ כאן.

קיבלתי הודעה השבוע מנועה — היא קיבלה 94 בבגרות 5 יחידות 🎉
(הייתה תלמידה שלי מהשנה שעברה)

אם אתה/את מתכוננ/ת לבגרות (או מכיר/ה מישהו) — אשמח לעזור.
שיעור ניסיון ב-₪99, ללא התחייבות.

---

## Template W3 — Seasonal / Exam Cycle (send 6 weeks before bagrut)

היי [שם],

מועד א׳ בבגרות בעוד ~6 שבועות.

אם עדיין לא התחלת להתכונן — יש עוד זמן, אבל הוא מוגבל.
אני פנוי ל-2 תלמידים נוספים לחודש זה.

שיעור ניסיון ב-₪99 — ניבנה תוכנית הכנה ריאלית לפני המועד.
ענה להודעה הזו ונקבע 🙏
```

- [ ] **Step 3: Commit both**

```bash
git add docs/ads/yad2.md docs/ads/whatsapp.md
git commit -m "feat: add Yad2 listings and WhatsApp broadcast templates"
```

---

## Task 13: Ad visual mockups

**Files:**
- Create: `docs/ads/mockups/google.html`
- Create: `docs/ads/mockups/facebook.html`
- Create: `docs/ads/mockups/instagram.html`
- Create: `docs/ads/mockups/tiktok.html`
- Create: `docs/ads/mockups/yad2.html`
- Create: `docs/ads/mockups/whatsapp.html`

- [ ] **Step 1: Create google.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>Google Search Ad Mockup — Math+</title>
<style>
  body { font-family: Arial, sans-serif; background: #f1f3f4; padding: 40px; direction: rtl; }
  h1 { font-size: 18px; color: #333; margin-bottom: 24px; }
  .ad { background: white; border-radius: 8px; padding: 20px 24px; max-width: 600px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
  .ad-label { background: #e8f0fe; color: #1a73e8; font-size: 11px; font-weight: bold; padding: 1px 5px; border-radius: 3px; display: inline-block; margin-bottom: 6px; }
  .ad-url { color: #202124; font-size: 13px; margin-bottom: 4px; }
  .ad-title { color: #1a0dab; font-size: 18px; font-weight: normal; margin-bottom: 4px; cursor: pointer; }
  .ad-title:hover { text-decoration: underline; }
  .ad-desc { color: #4d5156; font-size: 13px; line-height: 1.5; }
  .ad-ext { color: #1a0dab; font-size: 13px; margin-top: 8px; }
  .ad-ext span { margin-left: 16px; cursor: pointer; }
  .ad-ext span:hover { text-decoration: underline; }
  .campaign-label { font-size: 13px; font-weight: bold; color: #555; margin: 24px 0 8px; }
</style>
</head>
<body>
<h1>🔍 Google Search Ads — Math+ (מדגם)</h1>

<div class="campaign-label">קמפיין 1: בגרות מתמטיקה</div>
<div class="ad">
  <div class="ad-label">מודעה</div>
  <div class="ad-url">math-plus.co.il/bagrut</div>
  <div class="ad-title">מורה פרטי לבגרות מתמטיקה | שיעור ניסיון ב-₪99 בלבד</div>
  <div class="ad-desc">מורה שעלה מ-3 יחידות ל-100 בבגרות. שיעור ניסיון ב-₪99 ללא התחייבות. 100+ תלמידים שיפרו ציון ממוצע של 25 נקודות. מענה תוך שעות.</div>
  <div class="ad-ext">
    <span>בגרות 5 יחידות</span>
    <span>בגרות 3–4 יחידות</span>
    <span>WhatsApp מיידי</span>
  </div>
</div>

<div class="campaign-label">קמפיין 2: חטיבת ביניים</div>
<div class="ad">
  <div class="ad-label">מודעה</div>
  <div class="ad-url">math-plus.co.il/middle-school</div>
  <div class="ad-title">מורה פרטי למתמטיקה כיתה ז-ט | שיעור ניסיון ב-₪99</div>
  <div class="ad-desc">מורה מנוסה עם תואר בהצטיינות. מותאם לקצב הילד. שיעור ניסיון ב-₪99 ללא התחייבות. 100+ תלמידים שיפרו ציון.</div>
  <div class="ad-ext">
    <span>כיתה ז</span>
    <span>כיתה ח–ט</span>
    <span>WhatsApp מיידי</span>
  </div>
</div>

<div class="campaign-label">קמפיין 3: מתמטיקה אקדמית</div>
<div class="ad">
  <div class="ad-label">מודעה</div>
  <div class="ad-url">math-plus.co.il/academic</div>
  <div class="ad-title">שיעורים פרטיים אינפי ולינארית | תואר בהצטיינות</div>
  <div class="ad-desc">מורה עם תואר בהצטיינות מהאוניברסיטה העברית. אינפי, לינארית, הסתברות. שיעור ניסיון ב-₪99 — ללא התחייבות. שעות גמישות.</div>
  <div class="ad-ext">
    <span>אינפי 1+2</span>
    <span>לינארית</span>
    <span>סטטיסטיקה</span>
  </div>
</div>
</body>
</html>
```

- [ ] **Step 2: Create facebook.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>Facebook Ad Mockup — Math+</title>
<style>
  body { font-family: Arial, sans-serif; background: #e9ebee; padding: 30px; direction: rtl; }
  h1 { font-size: 18px; color: #333; margin-bottom: 24px; }
  .feed { display: flex; gap: 24px; flex-wrap: wrap; }
  .card { background: white; border-radius: 8px; width: 320px; box-shadow: 0 1px 4px rgba(0,0,0,0.15); overflow: hidden; }
  .card-meta { padding: 12px 14px 8px; display: flex; align-items: center; gap: 10px; }
  .avatar { width: 40px; height: 40px; background: #1e3a5f; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; }
  .page-name { font-weight: bold; font-size: 13px; color: #1c1e21; }
  .sponsored { color: #606770; font-size: 11px; }
  .ad-label { background: #e4e6eb; color: #606770; font-size: 10px; padding: 1px 5px; border-radius: 2px; margin-right: 4px; }
  .card-body { padding: 0 14px 12px; font-size: 13px; color: #1c1e21; line-height: 1.5; }
  .card-image { height: 180px; background: linear-gradient(135deg, #1e3a5f, #2d5a8e); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold; text-align: center; padding: 20px; }
  .card-footer { border-top: 1px solid #e4e6eb; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; }
  .card-link { font-size: 11px; color: #606770; }
  .card-cta { background: #1877f2; color: white; border: none; border-radius: 6px; padding: 6px 14px; font-size: 13px; font-weight: bold; cursor: pointer; }
  .label { font-size: 12px; font-weight: bold; color: #888; margin: 20px 0 8px; }
</style>
</head>
<body>
<h1>📘 Facebook Ad Mockups — Math+</h1>
<div class="feed">

  <div>
    <div class="label">Ad F1 — כאב הורים</div>
    <div class="card">
      <div class="card-meta">
        <div class="avatar">M+</div>
        <div>
          <div class="page-name">Math+ <span class="ad-label">ממומן</span></div>
          <div class="sponsored">ישראל</div>
        </div>
      </div>
      <div class="card-body">הילד שלכם נלחם עם מתמטיקה?<br><br>זה לא שהוא לא מוכשר. זה שאף אחד עוד לא הסביר לו בשפה שלו.<br><br>100+ תלמידים שיפרו ציון עם Math+. שיעור ניסיון ב-₪99 ללא התחייבות.</div>
      <div class="card-image">הילד שלכם יכול לאהוב מתמטיקה ❤️</div>
      <div class="card-footer">
        <div class="card-link">math-plus.co.il</div>
        <button class="card-cta">שלח הודעה</button>
      </div>
    </div>
  </div>

  <div>
    <div class="label">Ad F2 — עדות</div>
    <div class="card">
      <div class="card-meta">
        <div class="avatar">M+</div>
        <div>
          <div class="page-name">Math+ <span class="ad-label">ממומן</span></div>
          <div class="sponsored">ישראל</div>
        </div>
      </div>
      <div class="card-body">"עליתי מ-62 ל-89 בבגרות בזכות בן" 🙏<br><br>יעל לא האמינה שתצליח. היום היא מחזיקה תעודת בגרות עם 89.<br><br>שיעור ניסיון ב-₪99 — נשארו 3 מקומות לחודש מאי.</div>
      <div class="card-image" style="font-size:16px; direction:rtl; background: #075e54;">💬 "עליתי מ-62 ל-89 בבגרות!!"<br><small style="opacity:0.8">יעל כ. — בגרות 4 יחידות</small></div>
      <div class="card-footer">
        <div class="card-link">math-plus.co.il</div>
        <button class="card-cta">קבל מידע</button>
      </div>
    </div>
  </div>

  <div>
    <div class="label">Ad F3 — דחיפות</div>
    <div class="card">
      <div class="card-meta">
        <div class="avatar">M+</div>
        <div>
          <div class="page-name">Math+ <span class="ad-label">ממומן</span></div>
          <div class="sponsored">ישראל</div>
        </div>
      </div>
      <div class="card-body">נשארו 3 מקומות לחודש מאי 🔥<br><br>✔ שיעורים אונליין — 3, 4, 5 יחידות<br>✔ מורה שעצמו קיבל 100 בבגרות<br>✔ שיעור ניסיון ב-₪99 ללא התחייבות</div>
      <div class="card-image" style="background: #e8a000; color: #1a1a1a;">🔥 נשארו 3 מקומות בלבד<br><small>לחודש מאי 2026</small></div>
      <div class="card-footer">
        <div class="card-link">math-plus.co.il/bagrut</div>
        <button class="card-cta">הרשם עכשיו</button>
      </div>
    </div>
  </div>

</div>
</body>
</html>
```

- [ ] **Step 3: Create instagram.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>Instagram Ad Mockup — Math+</title>
<style>
  body { font-family: Arial, sans-serif; background: #fafafa; padding: 30px; direction: rtl; }
  h1 { font-size: 18px; color: #333; margin-bottom: 24px; }
  .feed { display: flex; gap: 30px; flex-wrap: wrap; }
  .phone { width: 300px; border: 2px solid #dbdbdb; border-radius: 20px; background: white; overflow: hidden; }
  .phone-status { background: #fafafa; padding: 8px 16px; font-size: 11px; color: #999; border-bottom: 1px solid #dbdbdb; text-align: center; }
  .post-header { padding: 10px 12px; display: flex; align-items: center; gap: 10px; }
  .avatar { width: 32px; height: 32px; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; }
  .username { font-size: 12px; font-weight: bold; color: #1c1e21; }
  .sponsored-tag { font-size: 10px; color: #8e8e8e; }
  .post-image { width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; color: white; text-align: center; padding: 20px; }
  .post-footer { padding: 10px 12px; }
  .cta-bar { background: #3897f0; color: white; text-align: center; padding: 8px; font-size: 12px; font-weight: bold; }
  .caption { font-size: 11px; color: #262626; padding: 8px 12px; line-height: 1.4; }
  .label { font-size: 12px; font-weight: bold; color: #888; margin: 20px 0 8px; }
  .script-box { background: #f0f0f0; border-radius: 8px; padding: 16px; width: 280px; font-size: 12px; line-height: 1.6; color: #333; }
  .script-box h3 { font-size: 13px; margin: 0 0 10px; color: #1e3a5f; }
  .time { color: #999; font-size: 10px; }
</style>
</head>
<body>
<h1>📸 Instagram Ad Mockups — Math+</h1>
<div class="feed">

  <div>
    <div class="label">Ad I1 — Before/After (Feed)</div>
    <div class="phone">
      <div class="phone-status">Instagram</div>
      <div class="post-header">
        <div class="avatar">M+</div>
        <div>
          <div class="username">mathplus.il <span class="sponsored-tag">· ממומן</span></div>
        </div>
      </div>
      <div class="post-image" style="background: linear-gradient(135deg, #1e3a5f, #4ade80);">
        מ-54 ל-85 בבגרות 📈<br><small style="font-size:13px; font-weight:normal;">תומר א. | בגרות 3 יחידות</small>
      </div>
      <div class="cta-bar">שיעור ניסיון ב-₪99 ←</div>
      <div class="caption">תומר לא האמין שיצליח לשנות כיוון. 3 חודשים אחרי — 85 בבגרות. שיעור ניסיון ב-₪99, קישור בביו 🔗 #מתמטיקה #בגרות</div>
    </div>
  </div>

  <div>
    <div class="label">Ad I2 — Ben's Story Reel (script)</div>
    <div class="script-box">
      <h3>🎬 Reel Script — 15 שניות</h3>
      <p><span class="time">0–2s</span><br><strong>"הייתי הכי גרוע בכיתה במתמטיקה."</strong><br><em>Bold text on screen. Ben to camera.</em></p>
      <p><span class="time">2–12s</span><br>Ben casual: "ממש. ידעו אותי כמי שלא מבין. עברתי מ-3 יחידות ל-100 בבגרות. היום אני מלמד — ויודע בדיוק מה עצר אותך."</p>
      <p><span class="time">12–15s</span><br><strong>"שיעור ניסיון ב-₪99. קישור בביו."</strong><br><em>Text overlay + arrow pointing up.</em></p>
      <p>Caption: הסיפור שלי ↑ #מתמטיקה #בגרות #מורהפרטי</p>
    </div>
  </div>

  <div>
    <div class="label">Ad I3 — Testimonial Carousel</div>
    <div class="phone">
      <div class="phone-status">Instagram · Carousel</div>
      <div class="post-header">
        <div class="avatar">M+</div>
        <div>
          <div class="username">mathplus.il <span class="sponsored-tag">· ממומן</span></div>
        </div>
      </div>
      <div class="post-image" style="background: #075e54; font-size: 15px;">
        💬 "עליתי מ-62 ל-89!!"<br><small style="font-size:12px; font-weight:normal;">יעל כ. — בגרות 4 יחידות</small><br><small style="font-size:11px; opacity:0.7;">← החלק לעוד</small>
      </div>
      <div class="cta-bar">שיעור ניסיון — ₪99 | ללא התחייבות</div>
      <div class="caption">תוצאות אמיתיות, תלמידים אמיתיים. קישור בביו לשיעור ניסיון ב-₪99 🔗</div>
    </div>
  </div>

</div>
</body>
</html>
```

- [ ] **Step 4: Create tiktok.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>TikTok Ad Mockup — Math+</title>
<style>
  body { font-family: Arial, sans-serif; background: #111; padding: 30px; direction: rtl; color: white; }
  h1 { font-size: 18px; color: #eee; margin-bottom: 24px; }
  .feed { display: flex; gap: 24px; flex-wrap: wrap; }
  .phone { width: 220px; background: #1a1a1a; border-radius: 16px; overflow: hidden; border: 1px solid #333; }
  .video { height: 380px; display: flex; flex-direction: column; justify-content: flex-end; padding: 16px 12px; position: relative; }
  .bg1 { background: linear-gradient(180deg, #1e3a5f 0%, #0a0a0a 100%); }
  .bg2 { background: linear-gradient(180deg, #2d1b4e 0%, #0a0a0a 100%); }
  .bg3 { background: linear-gradient(180deg, #1a3a1a 0%, #0a0a0a 100%); }
  .hook { font-size: 22px; font-weight: bold; text-align: center; width: 100%; position: absolute; top: 40px; right: 0; left: 0; padding: 0 16px; text-shadow: 0 2px 4px rgba(0,0,0,0.8); }
  .overlay { font-size: 11px; line-height: 1.6; color: #e0e0e0; }
  .username { font-weight: bold; font-size: 12px; color: white; margin-bottom: 4px; }
  .caption-text { font-size: 10px; color: #aaa; }
  .cta-pill { background: #fe2c55; color: white; border-radius: 20px; padding: 5px 12px; font-size: 11px; font-weight: bold; display: inline-block; margin-top: 8px; }
  .sidebar { position: absolute; left: 10px; top: 100px; display: flex; flex-direction: column; gap: 16px; align-items: center; }
  .icon { width: 36px; height: 36px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .label { font-size: 12px; font-weight: bold; color: #aaa; margin: 20px 0 8px; }
</style>
</head>
<body>
<h1>🎵 TikTok Ad Mockups — Math+</h1>
<div class="feed">

  <div>
    <div class="label">Script T1 — הסיפור האישי</div>
    <div class="phone">
      <div class="video bg1">
        <div class="hook">"הייתי הכי גרוע בכיתה במתמטיקה."</div>
        <div class="sidebar">
          <div class="icon">❤️</div>
          <div class="icon">💬</div>
          <div class="icon">↗️</div>
        </div>
        <div class="overlay">
          <div class="username">@mathplus.ben</div>
          <div class="caption-text">מ-3 יחידות ל-100 בבגרות 🧮</div>
          <div class="cta-pill">שיעור ניסיון ₪99 — קישור בביו</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="label">Script T2 — טיפ מהיר</div>
    <div class="phone">
      <div class="video bg2">
        <div class="hook">הטעות הכי נפוצה בבגרות מתמטיקה:</div>
        <div class="sidebar">
          <div class="icon">❤️</div>
          <div class="icon">💬</div>
          <div class="icon">↗️</div>
        </div>
        <div class="overlay">
          <div class="username">@mathplus.ben</div>
          <div class="caption-text">הטעות הזו עולה נקודות 😤 #בגרות</div>
          <div class="cta-pill">עוד טיפים — קישור בביו</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="label">Script T3 — תגובה לתלמיד</div>
    <div class="phone">
      <div class="video bg3">
        <div class="hook" style="font-size:16px;">"בן קיבלתי 91 באינפי!!" 🎉</div>
        <div class="sidebar">
          <div class="icon">❤️</div>
          <div class="icon">💬</div>
          <div class="icon">↗️</div>
        </div>
        <div class="overlay">
          <div class="username">@mathplus.ben</div>
          <div class="caption-text">תוצאות אמיתיות 💪 #מתמטיקה #אינפי</div>
          <div class="cta-pill">שיעור ניסיון ₪99 — קישור בביו</div>
        </div>
      </div>
    </div>
  </div>

</div>
</body>
</html>
```

- [ ] **Step 5: Create yad2.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>Yad2 Listing Mockup — Math+</title>
<style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px; direction: rtl; }
  h1 { font-size: 18px; color: #333; margin-bottom: 24px; }
  .listing { background: white; border-radius: 4px; border: 1px solid #ddd; max-width: 640px; margin-bottom: 16px; padding: 16px 20px; display: flex; gap: 16px; }
  .thumb { width: 80px; height: 80px; background: linear-gradient(135deg, #1e3a5f, #4ade80); border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; }
  .content { flex: 1; }
  .title { font-size: 15px; font-weight: bold; color: #e8650a; margin-bottom: 4px; cursor: pointer; }
  .title:hover { text-decoration: underline; }
  .desc { font-size: 12px; color: #555; line-height: 1.5; margin-bottom: 8px; }
  .meta { font-size: 11px; color: #999; display: flex; gap: 12px; }
  .promoted { background: #fff3e0; border: 1px solid #e8650a; border-radius: 3px; padding: 1px 6px; font-size: 10px; color: #e8650a; font-weight: bold; }
  .price { font-size: 14px; font-weight: bold; color: #4ade80; }
  .label { font-size: 12px; font-weight: bold; color: #888; margin: 20px 0 8px; }
  .yad2-header { background: #e8650a; color: white; padding: 10px 20px; border-radius: 4px; font-size: 16px; font-weight: bold; max-width: 640px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
</style>
</head>
<body>
<h1>🏠 Yad2 Listing Mockups — Math+</h1>

<div class="yad2-header">יד2 — שיעורים פרטיים &gt; מתמטיקה</div>

<div class="label">Listing 1: בגרות</div>
<div class="listing">
  <div class="thumb">M+</div>
  <div class="content">
    <div class="title">מורה פרטי לבגרות מתמטיקה 3/4/5 יח׳ — שיעור ניסיון ב-₪99 | Math+ <span class="promoted">מודגש</span></div>
    <div class="desc">מורה עם תואר בהצטיינות שעצמו עלה מ-3 ל-100 בבגרות. שיעורים אונליין ב-Teams. ליווי עד יום הבחינה. 100+ תלמידים שיפרו ציון ממוצע 25 נקודות.</div>
    <div class="meta">
      <span class="price">שיעור ניסיון ₪99</span>
      <span>📍 אונליין — כל הארץ</span>
      <span>📱 054-253-0058</span>
    </div>
  </div>
</div>

<div class="label">Listing 2: חטיבת ביניים</div>
<div class="listing">
  <div class="thumb">M+</div>
  <div class="content">
    <div class="title">מורה פרטי למתמטיקה חטיבת ביניים ז-ט — שיעור ניסיון ב-₪99 | Math+ <span class="promoted">מודגש</span></div>
    <div class="desc">גישה תומכת שמותאמת לקצב הילד. בניית ביטחון עצמי אמיתי. הכנה למבחנים ולמיצ"ב. שיעורים אונליין מהבית.</div>
    <div class="meta">
      <span class="price">שיעור ניסיון ₪99</span>
      <span>📍 אונליין — כל הארץ</span>
      <span>📱 054-253-0058</span>
    </div>
  </div>
</div>

<div class="label">Listing 3: אקדמי</div>
<div class="listing">
  <div class="thumb">M+</div>
  <div class="content">
    <div class="title">מורה פרטי לאינפי, לינארית, סטטיסטיקה — שיעור ניסיון ב-₪99 | Math+ <span class="promoted">מודגש</span></div>
    <div class="desc">בוגר תואר מתמטיקה בהצטיינות מהאוניברסיטה העברית. עובד עם סטודנטים מכל האוניברסיטאות. שעות גמישות — גם ערב וסופ"ש.</div>
    <div class="meta">
      <span class="price">שיעור ניסיון ₪99</span>
      <span>📍 אונליין — כל הארץ</span>
      <span>📱 054-253-0058</span>
    </div>
  </div>
</div>
</body>
</html>
```

- [ ] **Step 6: Create whatsapp.html**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>WhatsApp Broadcast Mockup — Math+</title>
<style>
  body { font-family: Arial, sans-serif; background: #e5ddd5; padding: 30px; direction: rtl; }
  h1 { font-size: 18px; color: #333; margin-bottom: 24px; }
  .feed { display: flex; gap: 24px; flex-wrap: wrap; }
  .phone { width: 280px; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .wa-header { background: #075e54; color: white; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
  .wa-avatar { width: 36px; height: 36px; background: #25d366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; }
  .wa-name { font-size: 13px; font-weight: bold; }
  .wa-status { font-size: 10px; color: rgba(255,255,255,0.7); }
  .chat { background: #e5ddd5; padding: 16px 12px; min-height: 220px; display: flex; flex-direction: column; gap: 8px; }
  .bubble { background: white; border-radius: 8px 8px 0 8px; padding: 10px 12px; max-width: 90%; align-self: flex-end; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
  .bubble-text { font-size: 12px; color: #1c1e21; line-height: 1.5; white-space: pre-line; }
  .bubble-time { font-size: 10px; color: #999; text-align: left; margin-top: 4px; }
  .label { font-size: 12px; font-weight: bold; color: #888; margin: 20px 0 8px; }
</style>
</head>
<body>
<h1>💬 WhatsApp Broadcast Mockups — Math+</h1>
<div class="feed">

  <div>
    <div class="label">W1 — Spots Urgency</div>
    <div class="phone">
      <div class="wa-header">
        <div class="wa-avatar">בן</div>
        <div>
          <div class="wa-name">בן | Math+</div>
          <div class="wa-status">מחובר</div>
        </div>
      </div>
      <div class="chat">
        <div class="bubble">
          <div class="bubble-text">היי דני,

בן מ-Math+ כאן 👋

רציתי לעדכן — נשארו 2 מקומות פנויים לחודש מאי.
אם חשבת על שיעורים פרטיים במתמטיקה — זה הזמן.

שיעור ניסיון ב-₪99 בלבד, ללא התחייבות.
ענה להודעה הזו ונסדר מועד 🙏</div>
          <div class="bubble-time">10:24 ✓✓</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="label">W2 — Social Proof</div>
    <div class="phone">
      <div class="wa-header">
        <div class="wa-avatar">בן</div>
        <div>
          <div class="wa-name">בן | Math+</div>
          <div class="wa-status">מחובר</div>
        </div>
      </div>
      <div class="chat">
        <div class="bubble">
          <div class="bubble-text">היי דני,

בן מ-Math+ כאן.

קיבלתי הודעה השבוע מנועה — היא קיבלה 94 בבגרות 5 יחידות 🎉

אם אתה מתכונן לבגרות — אשמח לעזור.
שיעור ניסיון ב-₪99, ללא התחייבות.</div>
          <div class="bubble-time">14:05 ✓✓</div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="label">W3 — Seasonal</div>
    <div class="phone">
      <div class="wa-header">
        <div class="wa-avatar">בן</div>
        <div>
          <div class="wa-name">בן | Math+</div>
          <div class="wa-status">מחובר</div>
        </div>
      </div>
      <div class="chat">
        <div class="bubble">
          <div class="bubble-text">היי דני,

מועד א׳ בבגרות בעוד ~6 שבועות.

אם עדיין לא התחלת — יש עוד זמן, אבל הוא מוגבל.
נשארו 2 מקומות לחודש זה.

שיעור ניסיון ב-₪99 — ניבנה תוכנית ריאלית לפני המועד.
ענה להודעה הזו ונקבע 🙏</div>
          <div class="bubble-time">09:15 ✓✓</div>
        </div>
      </div>
    </div>
  </div>

</div>
</body>
</html>
```

- [ ] **Step 7: Commit all mockups**

```bash
git add docs/ads/mockups/
git commit -m "feat: add visual ad mockups for all 6 platforms"
```

---

## Task 14: Build verification

- [ ] **Step 1: Run build**

```bash
cd /c/Users/KenBfirxd/Desktop/levelup && npm run build
```

Expected: no TypeScript errors, no missing imports. If errors appear, fix import paths for new components.

- [ ] **Step 2: Start dev server and verify pages load**

```bash
npm run dev
```

Open and check:
- http://localhost:3000/bagrut — should show UrgencyStrip at top, LandingStats after hero, TrialCTABlock mid-page, LandingFAQ, 3-field form
- http://localhost:3000/middle-school — same structure
- http://localhost:3000/academic — same structure

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete PPC landing pages + ad creatives for all platforms"
```
