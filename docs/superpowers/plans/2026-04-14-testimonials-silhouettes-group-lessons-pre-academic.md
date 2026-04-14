# Testimonials Rewrite + Group Lessons + Pre-Academic Landing Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 4 bugs, rewrite 10 testimonials with blurred silhouette avatars, add group lessons across all programs, create `/pre-academic` landing page, level dropdown only on bagrut page.

**Architecture:** All content changes go through `lib/constants.ts`. Silhouettes are inline SVG arrays in `Testimonials.tsx`. New landing page reuses existing `Landing*` components. `LandingContact` gets a `levelOptions` prop — when provided shows dropdown, when absent submits `defaultLevel` silently.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React.

---

## File Map

**Modify:**
- `components/Logo.tsx` — fix dead ternary + add `dir="ltr"` to logo row
- `components/Hero.tsx` — fix `pt-16` → `pt-24`
- `components/ContactForm.tsx` — restore `cta-glow` on submit button
- `lib/constants.ts` — new TESTIMONIALS, updated PROGRAMS bullets, new FAQ entry, updated LEVEL_OPTIONS
- `components/Testimonials.tsx` — replace generic avatar with 8 blurred silhouette SVGs
- `components/LandingContact.tsx` — add `levelOptions` prop; hide dropdown when absent, submit `defaultLevel` silently
- `app/bagrut/page.tsx` — pass `levelOptions` (3/4/5 units only) + rewrite local testimonials
- `app/middle-school/page.tsx` — remove level dropdown (no `levelOptions`) + rewrite local testimonials
- `app/academic/page.tsx` — remove level dropdown (no `levelOptions`) + rewrite local testimonials

**Create:**
- `app/pre-academic/page.tsx` — new landing page

---

## Task 1: Bug fixes

**Files:**
- Modify: `components/Logo.tsx`
- Modify: `components/Hero.tsx`
- Modify: `components/ContactForm.tsx`

- [ ] **Step 1: Fix Logo.tsx — dead ternary + RTL order**

Open `components/Logo.tsx`. Make two changes:

1. Line 22: fix the dead ternary so pill variant has a visible color on white bg
2. Add `dir="ltr"` to the `+Math` row div so it always renders left-to-right

```tsx
// Line 22 — change:
const mathColor = isPill ? '#ffffff' : '#ffffff'
// to:
const mathColor = isPill ? '#0f766e' : '#ffffff'
```

```tsx
// The +Math row div — add dir="ltr":
// Change:
<div style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'baseline' }}>
// to:
<div dir="ltr" style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'baseline' }}>
```

- [ ] **Step 2: Fix Hero.tsx — header clearance**

Open `components/Hero.tsx`. Find line 88:
```tsx
<div className="container-max text-center px-4 relative z-10 pt-16">
```
Change `pt-16` to `pt-24`:
```tsx
<div className="container-max text-center px-4 relative z-10 pt-24">
```

- [ ] **Step 3: Fix ContactForm.tsx — restore cta-glow**

Open `components/ContactForm.tsx`. Find the submit button (around line 177):
```tsx
className="w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
```
Add `cta-glow` to the className:
```tsx
className="cta-glow w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
```

- [ ] **Step 4: Verify lint passes**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/Logo.tsx components/Hero.tsx components/ContactForm.tsx
git commit -m "fix: logo RTL order, hero header clearance, contact form cta-glow"
```

---

## Task 2: Update lib/constants.ts

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Replace TESTIMONIALS array**

Find the `export const TESTIMONIALS` block and replace it entirely with:

```ts
export const TESTIMONIALS = [
  {
    quote: 'עליתי מ-62 ל-89 בבגרות. בן לא ויתר עליי גם כשאני כבר הייתי בטוח שנגמר לי. תודה על הכל.',
    name: 'יעל כ.',
    detail: 'בגרות 4 יחידות',
    improvement: 'מ-62 ל-89',
  },
  {
    quote: 'הבן שלי פשוט שינה יחס למתמטיקה. לא האמנתי שזה אפשרי. עכשיו הוא מבקש לעשות תרגילים.',
    name: 'מיכל ר.',
    detail: 'אמא של תלמיד כיתה ח׳',
    improvement: 'שינוי גישה מוחלט',
  },
  {
    quote: 'עברתי אינפי 1 עם 91. הסביר לי כל שאלה עד שהבנתי — לא קידם הלאה לפני שהיה לי ברור.',
    name: 'אורי ד.',
    detail: 'סטודנט למדעי המחשב',
    improvement: 'ציון 91 באינפי',
  },
  {
    quote: 'נכנסתי לבחינת הבגרות 5 יחידות בביטחון. ציון 94. בן הכין אותי לכל תרחיש אפשרי בבחינה.',
    name: 'נועה ש.',
    detail: 'בגרות 5 יחידות',
    improvement: 'ציון 94',
  },
  {
    quote: 'התחלתי את השנה עם 54 וסיימתי עם 85. פתאום הכל נפל למקום — הסבר אחד שלו שינה לי הכל.',
    name: 'תומר א.',
    detail: 'בגרות 3 יחידות',
    improvement: 'מ-54 ל-85',
  },
  {
    quote: 'הבת שלי הייתה בלחץ אדיר לפני הבגרות. בן הצליח להרגיע אותה ולסדר לה את הראש. קיבלה 88.',
    name: 'רונית מ.',
    detail: 'אמא של תלמידת בגרות 4 יח׳',
    improvement: 'ציון 88',
  },
  {
    quote: 'הצלת לי את הסמסטר בלינארית. ממש לא ציפיתי לעבור, ועברתי עם 85.',
    name: 'שירה ל.',
    detail: 'סטודנטית להנדסת תעשייה',
    improvement: 'ציון 85 בלינארית',
  },
  {
    quote: 'חזרתי ללמוד אחרי 4 שנות צבא. לא נגעתי במתמטיקה מהתיכון. בן לימד אותי מאפס בלי שיפוטיות.',
    name: 'רועי ב.',
    detail: 'הכנה לאקדמיה — שירות צבאי',
    improvement: 'מוכן לתואר',
  },
  {
    quote: 'עשינו חודש הכנה לפני שנה א׳ — הגעתי לאינפי 1 עם בסיס שלא היה לי בתיכון. זה שינה את כל הסמסטר.',
    name: 'דנה ה.',
    detail: 'הכנה לאקדמיה — לפני שנה א׳',
    improvement: 'שנה א׳ עם בסיס חזק',
  },
  {
    quote: 'למדתי בקבוצה קטנה עם עוד שניים. מחיר מצוין, וגם ראיתי איך חברים בקבוצה שואלים שאלות שאני לא העזתי.',
    name: 'איתי ג.',
    detail: 'קבוצה קטנה — בגרות 4 יח׳',
    improvement: 'עלה מ-58 ל-82',
  },
]
```

- [ ] **Step 2: Update PROGRAMS — add group lessons bullet + update pre-academic bullets**

Find `export const PROGRAMS` and replace it entirely:

```ts
export const PROGRAMS = [
  {
    title: 'חטיבת ביניים',
    grades: 'כיתות ז׳-ט׳',
    description: 'בניית בסיס חזק במתמטיקה שילווה את התלמיד לתיכון',
    bullets: [
      'אלגברה, גיאומטריה, סטטיסטיקה',
      'הכנה למבחנים ולמיצ"ב',
      'פיתוח חשיבה מתמטית',
      'בניית ביטחון עצמי',
      'שיעורים פרטיים או בקבוצה קטנה (2-4 תלמידים)',
    ],
    color: 'blue',
  },
  {
    title: 'תיכון — בגרות',
    grades: '3, 4, 5 יחידות',
    description: 'הכנה ממוקדת לבחינות הבגרות במתמטיקה בכל הרמות',
    bullets: [
      'פתרון מבחני בגרות',
      'שליטה בכל נושאי הבחינה',
      'טכניקות למבחן',
      'ליווי עד יום הבחינה',
      'זמינות מלאה מצד המורה לכל שאלה',
      'שיעורים פרטיים או בקבוצה קטנה (2-4 תלמידים)',
    ],
    color: 'green',
  },
  {
    title: 'קורסים אקדמיים',
    grades: 'סטודנטים',
    description: 'עזרה בקורסי מתמטיקה באוניברסיטה ובמכללות',
    bullets: [
      'חשבון אינפיניטסימלי',
      'אלגברה לינארית',
      'הסתברות וסטטיסטיקה',
      'מתמטיקה בדידה',
      'שיעורים פרטיים או בקבוצה קטנה (2-4 תלמידים)',
    ],
    color: 'purple',
  },
  {
    title: 'הכנה לאקדמיה',
    grades: 'לפני תואר',
    description: 'הכנה מקיפה במתמטיקה לקראת לימודים אקדמיים — להתחיל את התואר עם בסיס חזק',
    bullets: [
      'מיפוי פערים אישי — נדע בדיוק מאיפה להתחיל',
      'חיזוק יסודות: אלגברה, טריגונומטריה, פונקציות',
      'היכרות עם חומר אינפי 1 ולינארית',
      'מתאים גם למי שחזר ממסגרת ולא נגע במתמטיקה שנים',
      'שיעורים פרטיים או בקבוצה קטנה (2-4 תלמידים)',
    ],
    color: 'orange',
  },
]
```

- [ ] **Step 3: Add group lessons FAQ entry**

Find `export const FAQ_ITEMS` array. Add this entry after the last existing item (before the closing `]`):

```ts
  {
    question: 'האם יש שיעורים קבוצתיים?',
    answer: 'כן — ניתן ללמוד בקבוצה קטנה של 2-4 תלמידים באותה רמה. עלות השיעור לתלמיד נמוכה משמעותית משיעור פרטי. כתבו לי בוואטסאפ ונתאם.',
  },
```

- [ ] **Step 4: Add group option to LEVEL_OPTIONS**

Find `export const LEVEL_OPTIONS`. Add before the last `{ value: 'other', ... }` entry:

```ts
  { value: 'group', label: 'שיעור קבוצתי (2-4 תלמידים)' },
```

- [ ] **Step 5: Verify lint passes**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: rewrite testimonials, add group lessons to programs and FAQ"
```

---

## Task 3: Blurred silhouette avatars in Testimonials.tsx

**Files:**
- Modify: `components/Testimonials.tsx`

- [ ] **Step 1: Add SILHOUETTES array**

Open `components/Testimonials.tsx`. After the `BATTERY` array (around line 38), add the following `SILHOUETTES` array. Each entry is a unique SVG silhouette representing a different person type, used as blurred profile photos:

```tsx
// 8 distinct person silhouettes — index matches testimonial slot
// Applied with blur to simulate a photo blurred for privacy
const SILHOUETTES = [
  // 0: Long straight dark hair, female
  <svg key="0" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#c8a888"/>
    <rect x="9" y="2" width="18" height="26" rx="9" fill="#1e0e06"/>
    <ellipse cx="18" cy="13" rx="7" ry="8" fill="#f0c090"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#6b4498"/>
  </svg>,
  // 1: Short bob, older female (parent), grey-brown hair
  <svg key="1" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#a8b8c8"/>
    <ellipse cx="18" cy="10" rx="9" ry="9" fill="#7a6858"/>
    <ellipse cx="18" cy="14" rx="6.5" ry="7" fill="#e8b088"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#2e6898"/>
  </svg>,
  // 2: Short hair male, dark stubble
  <svg key="2" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#a8c0a0"/>
    <rect x="10" y="2" width="16" height="9" rx="8" fill="#1a1008"/>
    <rect x="11" y="8" width="14" height="16" rx="5" fill="#d89860"/>
    <rect x="12" y="21" width="12" height="3" rx="1.5" fill="#b07840" opacity="0.6"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#1e5830"/>
  </svg>,
  // 3: Long curly auburn hair, female
  <svg key="3" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#d0b8c8"/>
    <ellipse cx="18" cy="14" rx="13" ry="13" fill="#7a2808"/>
    <ellipse cx="18" cy="13" rx="7" ry="8" fill="#f5c898"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#a83860"/>
  </svg>,
  // 4: Buzzcut male
  <svg key="4" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#c8b898"/>
    <ellipse cx="18" cy="11" rx="9" ry="9" fill="#100808"/>
    <ellipse cx="18" cy="15" rx="8" ry="8.5" fill="#d08050"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#1a3868"/>
  </svg>,
  // 5: Hijab, navy blue
  <svg key="5" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#98b8b0"/>
    <ellipse cx="18" cy="16" rx="14" ry="18" fill="#183060"/>
    <ellipse cx="18" cy="12" rx="7" ry="7.5" fill="#f0c090"/>
    <ellipse cx="18" cy="42" rx="18" ry="12" fill="#183060"/>
  </svg>,
  // 6: Ponytail female, dark brown hair
  <svg key="6" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#b8d0b8"/>
    <ellipse cx="18" cy="10" rx="9" ry="8" fill="#3a1e08"/>
    <rect x="26" y="0" width="5" height="14" rx="2.5" fill="#3a1e08"/>
    <ellipse cx="18" cy="13" rx="6.5" ry="7.5" fill="#f0c890"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#28784a"/>
  </svg>,
  // 7: Older male, grey receding hairline
  <svg key="7" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" fill="#b0b8c8"/>
    <rect x="6" y="4" width="7" height="8" rx="3.5" fill="#888890"/>
    <rect x="23" y="4" width="7" height="8" rx="3.5" fill="#888890"/>
    <ellipse cx="18" cy="15" rx="8.5" ry="9" fill="#c87850"/>
    <ellipse cx="18" cy="42" rx="16" ry="12" fill="#304860"/>
  </svg>,
]
```

- [ ] **Step 2: Replace avatar div in WhatsAppScreenshot**

Inside the `WhatsAppScreenshot` function, find this block (around line 82):

```tsx
<div className="w-9 h-9 rounded-full bg-[#dfe5e7] flex items-center justify-center shrink-0">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#aab8c2">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
</div>
```

Replace it with:

```tsx
<div
  className="w-9 h-9 rounded-full overflow-hidden shrink-0"
  style={{ filter: 'blur(3px) brightness(0.88)' }}
>
  {SILHOUETTES[index % SILHOUETTES.length]}
</div>
```

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: replace generic avatar with blurred silhouette per testimonial"
```

---

## Task 4: Pre-academic landing page

**Files:**
- Create: `app/pre-academic/page.tsx`

- [ ] **Step 1: Create the page**

Create `app/pre-academic/page.tsx` with the following content:

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
  title: 'הכנה למתמטיקה אקדמית | לפני שנה א׳ ואחרי צבא | Math+',
  description:
    'הכנה למתמטיקה אקדמית לפני שנה א׳ — מיפוי פערים, חיזוק יסודות והיכרות עם חשבון אינפיניטסימלי ואלגברה לינארית. מתאים גם למי שחזר מהצבא ולא נגע בחומר שנים. שיעור ניסיון ב-₪99!',
  keywords: [
    'הכנה למתמטיקה אקדמית',
    'הכנה לאינפי 1',
    'מתמטיקה לפני תואר',
    'הכנה לאוניברסיטה מתמטיקה',
    'מתמטיקה אחרי צבא',
    'פערים במתמטיקה לפני שנה א׳',
    'מורה פרטי הכנה לאקדמיה',
  ],
}

const BENEFITS = [
  {
    icon: 'Target',
    title: 'מיפוי פערים אישי',
    description: 'נאבחן בדיוק מה חסר ונבנה תוכנית ממוקדת — לא מתחילים מאפס אלא מהנקודה שצריך',
  },
  {
    icon: 'BookOpen',
    title: 'חיזוק יסודות',
    description: 'אלגברה, טריגונומטריה, פונקציות — כל מה שצריך כדי שחומר שנה א׳ לא יהיה סינית',
  },
  {
    icon: 'TrendingUp',
    title: 'היכרות עם חומר שנה א׳',
    description: 'אינפי 1 ולינארית — לא מגיעים לשם בפעם הראשונה ביום הראשון ללימודים',
  },
  {
    icon: 'Heart',
    title: 'בלי שיפוטיות',
    description: 'לא נשאל כמה שנים עבר מהתיכון. מתחילים מהמצב שלך, לא מהמצב האידיאלי',
  },
  {
    icon: 'Monitor',
    title: 'שעות גמישות',
    description: 'שיעורים ב-Teams — גם בערב, גם בסוף שבוע. מתאים גם לתקופת השחרור מהצבא',
  },
  {
    icon: 'Award',
    title: 'תוצאות מוכחות',
    description: 'תלמידים שעברו הכנה איתי נכנסו לסמסטר הראשון בביטחון ועברו את הקורסים',
  },
]

const TESTIMONIALS = [
  {
    quote: 'חזרתי ללמוד אחרי 4 שנות צבא. לא נגעתי במתמטיקה מהתיכון. בן לימד אותי מאפס בלי שיפוטיות.',
    name: 'רועי ב.',
    detail: 'הכנה לאקדמיה — שירות צבאי',
    improvement: 'מוכן לתואר',
  },
  {
    quote: 'עשינו חודש הכנה לפני שנה א׳ — הגעתי לאינפי 1 עם בסיס שלא היה לי בתיכון. זה שינה את כל הסמסטר.',
    name: 'דנה ה.',
    detail: 'הכנה לאקדמיה — לפני שנה א׳',
    improvement: 'שנה א׳ עם בסיס חזק',
  },
  {
    quote: 'עברתי אינפי 1 עם 91. הסביר לי כל שאלה עד שהבנתי — לא קידם הלאה לפני שהיה לי ברור.',
    name: 'אורי ד.',
    detail: 'סטודנט למדעי המחשב',
    improvement: 'ציון 91 באינפי',
  },
  {
    quote: 'הצלת לי את הסמסטר בלינארית. ממש לא ציפיתי לעבור, ועברתי עם 85.',
    name: 'שירה ל.',
    detail: 'סטודנטית להנדסת תעשייה',
    improvement: 'ציון 85 בלינארית',
  },
]

const FAQ = [
  {
    question: 'מתי כדאי להתחיל הכנה?',
    answer: 'ממליץ להתחיל 4-8 שבועות לפני תחילת הסמסטר. אבל גם חודש אחד מספיק לסגור פערים בסיסיים. כל כמה שיותר מוקדם — יותר טוב.',
  },
  {
    question: 'כמה שיעורים צריך?',
    answer: 'תלוי בפערים הקיימים. ממוצע: 8-16 שיעורים. נקבע ביחד אחרי שיעור האבחון הראשון — שם רואים בדיוק מאיפה להתחיל.',
  },
  {
    question: 'מה אם עברו שנים מהתיכון?',
    answer: 'הרבה מהתלמידים שלי חזרו ממסגרת ולא נגעו בחומר 3-5 שנים. זה לגמרי בסדר — מתחילים מהנקודה שלך, בלי לדלג על כלום.',
  },
  {
    question: 'אילו קורסים ההכנה הזו מכינה?',
    answer: 'בעיקר חשבון אינפיניטסימלי 1 ואלגברה לינארית — הקורסים שמפילים הכי הרבה סטודנטים בשנה א׳. אפשר גם להתכונן לקורסים ספציפיים לפי הסילבוס.',
  },
  {
    question: 'האם יש שיעורים קבוצתיים?',
    answer: 'כן — ניתן ללמוד בקבוצה קטנה של 2-4 תלמידים באותה רמה. עלות לתלמיד נמוכה משמעותית משיעור פרטי. כתבו לי בוואטסאפ לפרטים.',
  },
]

export default function PreAcademicPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={4} month="מאי" />
      <LandingHero
        badge="100+ תלמידים — 90% שיפרו ציון"
        headline="מתמטיקה מפחידה אותך לפני התואר?"
        highlightedWord="נכנסים מוכנים."
        subheadline="בין אם סיימת בגרות לאחרונה ובין אם לא נגעת במתמטיקה שנים — נמפה את הפערים ונסגור אותם לפני שנה א׳."
        bullets={['מיפוי פערים אישי', 'הכנה לאינפי 1 ולינארית', 'מתאים גם אחרי הצבא', 'שיעור ניסיון ב-₪99']}
        ctaText="שיעור ניסיון — ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה להתכונן עם Math+?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="מגיעים לתואר עם בסיס חזק — שיעור ניסיון ב-₪99" />
      <LandingFAQ items={FAQ} />
      <LandingContact
        defaultLevel="pre-academic"
        headline="השאירו פרטים — נבנה תוכנית הכנה מותאמת אישית"
      />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
```

- [ ] **Step 2: Verify lint passes**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/pre-academic/page.tsx
git commit -m "feat: add /pre-academic landing page for academic prep service"
```

---

## Task 5: LandingContact level dropdown — bagrut only

**Files:**
- Modify: `components/LandingContact.tsx`
- Modify: `app/bagrut/page.tsx`
- Modify: `app/middle-school/page.tsx`
- Modify: `app/academic/page.tsx`

- [ ] **Step 1: Add `levelOptions` prop to LandingContact**

Open `components/LandingContact.tsx`. Make the following changes:

1. Update the `FormData` interface — `level` is always a string (no change needed).
2. Add `levelOptions` to the props interface and the destructure:

```tsx
// Change the props interface from:
export default function LandingContact({
  defaultLevel,
  headline = 'השאירו פרטים ונחזור אליכם תוך שעות',
}: {
  defaultLevel?: string
  headline?: string
})

// To:
export default function LandingContact({
  defaultLevel,
  headline = 'השאירו פרטים ונחזור אליכם תוך שעות',
  levelOptions,
}: {
  defaultLevel?: string
  headline?: string
  levelOptions?: { value: string; label: string }[]
})
```

3. Replace the level `<div>` block inside the form (currently lines 120-131) with conditional rendering:

```tsx
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
```

Also remove the `import { LEVEL_OPTIONS, WHATSAPP_URL } from '@/lib/constants'` reference to `LEVEL_OPTIONS` — change it to just:
```tsx
import { WHATSAPP_URL } from '@/lib/constants'
```

- [ ] **Step 2: Update bagrut page — pass levelOptions**

Open `app/bagrut/page.tsx`. Find the `<LandingContact>` call and add `levelOptions`:

```tsx
<LandingContact
  defaultLevel="bagrut-5"
  levelOptions={[
    { value: 'bagrut-3', label: 'בגרות 3 יחידות' },
    { value: 'bagrut-4', label: 'בגרות 4 יחידות' },
    { value: 'bagrut-5', label: 'בגרות 5 יחידות' },
  ]}
  headline="השאירו פרטים — נבנה תוכנית הכנה לבגרות"
/>
```

Also rewrite the local `TESTIMONIALS` const (lines 37-42) with natural language versions:

```tsx
const TESTIMONIALS = [
  { quote: 'עליתי מ-62 ל-89 בבגרות. בן לא ויתר עליי גם כשאני כבר הייתי בטוח שנגמר לי. תודה על הכל.', name: 'יעל כ.', detail: 'בגרות 4 יחידות', improvement: 'מ-62 ל-89' },
  { quote: 'נכנסתי לבחינת הבגרות 5 יחידות בביטחון. ציון 94. בן הכין אותי לכל תרחיש אפשרי בבחינה.', name: 'נועה ש.', detail: 'בגרות 5 יחידות', improvement: 'ציון 94' },
  { quote: 'התחלתי את השנה עם 54 וסיימתי עם 85. פתאום הכל נפל למקום — הסבר אחד שלו שינה לי הכל.', name: 'תומר א.', detail: 'בגרות 3 יחידות', improvement: 'מ-54 ל-85' },
  { quote: 'הבת שלי הייתה בלחץ אדיר לפני הבגרות. בן הצליח להרגיע אותה ולסדר לה את הראש. קיבלה 88.', name: 'רונית מ.', detail: 'אמא של תלמידת בגרות 4 יח׳', improvement: 'ציון 88' },
]
```

- [ ] **Step 3: Rewrite middle-school page testimonials**

Open `app/middle-school/page.tsx`. Replace the local `TESTIMONIALS` const with:

```tsx
const TESTIMONIALS = [
  { quote: 'הבן שלי פשוט שינה יחס למתמטיקה. לא האמנתי שזה אפשרי. עכשיו הוא מבקש לעשות תרגילים.', name: 'מיכל ר.', detail: 'אמא של תלמיד כיתה ח׳', improvement: 'שינוי גישה מוחלט' },
  { quote: 'עלה מ-58 ל-82 תוך סמסטר. בן לא ויתר עליו — עבד על כל פרצה עד שנסגרה.', name: 'איתי ג.', detail: 'תלמיד כיתה ט׳', improvement: 'מ-58 ל-82' },
  { quote: 'הבת שלי עברה מ-65 ל-90 בגיאומטריה. בן עבד איתה על ביטחון — וזה עשה את כל ההבדל.', name: 'דנה ש.', detail: 'אמא של תלמידה כיתה ז׳', improvement: 'מ-65 ל-90' },
  { quote: 'חשבתי שאני לא מתאים למתמטיקה. בן שינה לי את הגישה. עכשיו אני הולך על 5 יחידות.', name: 'עידו ק.', detail: 'תלמיד כיתה ט׳', improvement: 'הולך על 5 יח׳' },
]
```

The `<LandingContact defaultLevel="middle-school" ...>` call needs no `levelOptions` — dropdown will be hidden automatically.

- [ ] **Step 4: Rewrite academic page testimonials**

Open `app/academic/page.tsx`. Replace the local `TESTIMONIALS` const (lines 37-41) with:

```tsx
const TESTIMONIALS = [
  { quote: 'עברתי אינפי 1 עם 91. הסביר לי כל שאלה עד שהבנתי — לא קידם הלאה לפני שהיה לי ברור.', name: 'אורי ד.', detail: 'סטודנט למדעי המחשב', improvement: 'ציון 91 באינפי' },
  { quote: 'הצלת לי את הסמסטר בלינארית. ממש לא ציפיתי לעבור, ועברתי עם 85.', name: 'שירה ל.', detail: 'סטודנטית להנדסת תעשייה', improvement: 'ציון 85 בלינארית' },
  { quote: 'נכשלתי באינפי 2 במועד א׳. בן עשה סדר בחומר ועברתי עם 78 במועד ב׳. לא ציפיתי לזה.', name: 'דניאל ר.', detail: 'סטודנט לכלכלה', improvement: 'מנכשל ל-78' },
  { quote: 'הסביר לי הסתברות עם דוגמאות מהחיים ופתאום הכל נהיה הגיוני. קיבלתי 88 בבחינה.', name: 'מאיה כ.', detail: 'סטודנטית לפסיכולוגיה', improvement: 'ציון 88' },
]
```

The `<LandingContact defaultLevel="academic" ...>` call needs no `levelOptions`.

- [ ] **Step 5: Verify lint passes**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/LandingContact.tsx app/bagrut/page.tsx app/middle-school/page.tsx app/academic/page.tsx
git commit -m "feat: level dropdown only on bagrut page, rewrite landing page testimonials"
```

---

## Task 6: Commit all uncommitted rebrand changes

The repo has a large set of uncommitted changes from the rebrand (LevelUp → Math+, color system, testimonials, header). These were reviewed in pre-launch review and are ready to stage.

- [ ] **Step 1: Stage all modified tracked files**

```bash
git add app/globals.css app/layout.tsx components/About.tsx components/ContactForm.tsx components/Footer.tsx components/Header.tsx components/Hero.tsx components/LandingHero.tsx components/LandingTestimonials.tsx components/SocialProofToast.tsx components/StickyMobileCTA.tsx components/Testimonials.tsx lib/constants.ts package-lock.json package.json prisma/schema.prisma tailwind.config.ts
```

- [ ] **Step 2: Stage new untracked files**

```bash
git add components/Logo.tsx public/images/whatsapp-bg.jpg
```

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: rebrand to Math+, teal/gold color system, updated copy and components"
```

---

## Self-Review Checklist

- [x] All 4 bug fixes covered (Logo dead ternary, Logo dir="ltr", Hero pt-24, ContactForm cta-glow)
- [x] 10 testimonials specified with full content
- [x] 8 silhouette SVGs with complete JSX code
- [x] PROGRAMS — group lessons bullet added to all 4 programs
- [x] FAQ_ITEMS — group lessons entry added
- [x] LEVEL_OPTIONS — group option added
- [x] pre-academic page — complete with all 8 sections, full code
- [x] Uncommitted rebrand changes committed in Task 5
- [x] All imports in pre-academic page match existing component names
- [x] `defaultLevel="pre-academic"` matches existing LEVEL_OPTIONS value
- [x] `LandingContact` levelOptions prop — dropdown shown only when prop provided
- [x] Bagrut page passes levelOptions with 3/4/5 units only
- [x] Middle-school, academic, pre-academic pass no levelOptions → level submitted silently
- [x] Landing page testimonials rewritten in all 3 existing pages
