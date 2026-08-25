# Testimonials 3-Up Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show 3 WhatsApp testimonial screenshots side by side on desktop, cycling in groups of 3, with 12 total testimonials (add 2 new ones).

**Architecture:** Page-based carousel — state tracks page index (0–3) instead of individual testimonial index. Desktop renders 3 `WhatsAppScreenshot` components in a CSS grid per page; mobile renders 1. `WhatsAppScreenshot` gets a `compact` prop to reduce sizing on desktop. Two new testimonials added to constants.

**Tech Stack:** Next.js 14, Framer Motion, Tailwind CSS 3, TypeScript

---

### Task 1: Add 2 testimonials to constants

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Add 2 testimonials to the TESTIMONIALS array**

Open `lib/constants.ts`. Find the `TESTIMONIALS` array (line ~117). It currently has 10 items. Append these 2 entries before the closing `]`:

```ts
  {
    quote: 'בן עזרת לי להבין לינארית מאפס תוך חודש וחצי. עברתי עם 79 😮 לא ידעתי שאני מסוגל לזה',
    name: 'יונתן פ.',
    detail: 'סטודנט להנדסה אזרחית',
    improvement: 'ציון 79 בלינארית',
  },
  {
    quote: 'הבת שלי פחדה ממתמטיקה שנים. אחרי חצי שנה איתך היא מבקשת לתרגל לבד 😭 תודה מהלב',
    name: 'שרה נ.',
    detail: 'אמא של תלמידת כיתה ט׳',
    improvement: 'ביטחון עצמי מלא',
  },
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add 2 testimonials to reach 12 total"
```

---

### Task 2: Rewrite Testimonials.tsx — page-based carousel with 3-up desktop layout

**Files:**
- Modify: `components/Testimonials.tsx`

- [ ] **Step 1: Read the current file**

Read `components/Testimonials.tsx` in full before making any changes to understand the existing structure.

- [ ] **Step 2: Add `compact` prop to `WhatsAppScreenshot`**

Change the props interface of `WhatsAppScreenshot` to accept a `compact` boolean:

```tsx
function WhatsAppScreenshot({
  testimonial,
  index,
  compact = false,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
  compact?: boolean
}) {
```

Then in the chat area div, change `min-h-[220px]` to be conditional:

```tsx
<div
  className={`px-3 py-4 flex flex-col justify-end ${compact ? 'min-h-[180px]' : 'min-h-[220px]'}`}
  style={{
    backgroundImage: 'url("/images/whatsapp-bg.jpg")',
    backgroundSize: '320px auto',
    backgroundRepeat: 'repeat',
  }}
>
```

And the outer wrapper — change `max-w-[360px]` to be conditional:

```tsx
<div className={`w-full ${compact ? 'max-w-full' : 'max-w-[360px]'} mx-auto select-none pointer-events-none`}>
```

- [ ] **Step 3: Replace carousel state and logic**

Replace the entire `Testimonials` export function with the page-based version below. Do NOT change `WhatsAppScreenshot` — only replace from `export default function Testimonials()` to the end of the file:

```tsx
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
            הודעות אמיתיות מתלמידים והורים
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
```

- [ ] **Step 4: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: testimonials 3-up desktop carousel, page-based navigation"
```

---

### Task 3: Visual verification

- [ ] **Step 1: Check dev server is running**

Dev server should already be running at `http://localhost:3001`. If not: `npm run dev`

- [ ] **Step 2: Verify desktop layout**

Open `http://localhost:3001/#testimonials` in a browser at full desktop width (≥768px). Confirm:
- 3 WhatsApp screenshots side by side
- Prev/next arrows advance all 3 at once
- 4 dots below, active dot changes per page
- Autoplay cycles through all 4 pages every 6s

- [ ] **Step 3: Verify mobile layout**

Resize browser to <768px width. Confirm:
- Single card shown (first card of current page group)
- Arrows still visible
- 4 dots still shown

- [ ] **Step 4: Verify no console errors**

Open browser devtools console. Confirm no React key errors or out-of-bounds index errors.
