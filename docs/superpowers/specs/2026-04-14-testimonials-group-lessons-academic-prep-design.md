# Design Spec: Testimonials Rewrite, Group Lessons, Academic Prep Landing Page

**Date:** 2026-04-14
**Status:** Approved

---

## 1. Bug Fixes (pre-requisite)

Four bugs identified in pre-launch review + branding fix, fixed first.

| File | Bug | Fix |
|------|-----|-----|
| `components/Logo.tsx:22` | Both pill/inline variants return same color `#ffffff` | Pill variant: `mathColor = '#0f766e'` (teal on white bg) |
| `components/Logo.tsx` (logo row) | In RTL page context, flex order flips: renders "+Math" instead of "Math+" | Add `dir="ltr"` to the `+Math` row div so order is always LTR |
| `components/Hero.tsx` + `components/LandingHero.tsx` | Hero `pt-16` (64px) doesn't clear new `h-24` (96px) header | Change `pt-16` → `pt-24` in both hero sections |
| `components/ContactForm.tsx:177` | `cta-glow` removed from submit button unintentionally | Restore `cta-glow` class on submit button |

---

## 2. Testimonials Rewrite

### Problem
Current 8 testimonials are formulaic: all open with "בן תודה...", same 3-sentence structure, same emoji combos (🙏/💪/❤️), uniform length. Research on limudnaim.co.il confirms real Israeli tutor reviews are shorter, more varied, use phrases like "הצלת לי את הסמסטר", "לא ויתרת עד שהבנתי", "פתאום הכל נפל למקום".

### New testimonials (10 total, replacing 8)

Covers these personas: bagrut students (3), parents (2), academic students (2), adult returner (1), academic prep (1), group lesson student (1).

```ts
export const TESTIMONIALS = [
  // Bagrut 4 units - student
  {
    quote: 'עליתי מ-62 ל-89 בבגרות. בן לא ויתר עליי גם כשאני כבר הייתי בטוח שנגמר לי. תודה על הכל.',
    name: 'יעל כ.',
    detail: 'בגרות 4 יחידות',
    improvement: 'מ-62 ל-89',
  },
  // Parent - middle school boy
  {
    quote: 'הבן שלי פשוט שינה יחס למתמטיקה. לא האמנתי שזה אפשרי. עכשיו הוא מבקש לעשות תרגילים.',
    name: 'מיכל ר.',
    detail: 'אמא של תלמיד כיתה ח׳',
    improvement: 'שינוי גישה מוחלט',
  },
  // Academic - CS student
  {
    quote: 'עברתי אינפי 1 עם 91. הסביר לי כל שאלה עד שהבנתי — לא קידם הלאה לפני שהיה לי ברור.',
    name: 'אורי ד.',
    detail: 'סטודנט למדעי המחשב',
    improvement: 'ציון 91 באינפי',
  },
  // Bagrut 5 units - student
  {
    quote: 'נכנסתי לבחינת הבגרות 5 יחידות בביטחון. ציון 94. בן הכין אותי לכל תרחיש אפשרי בבחינה.',
    name: 'נועה ש.',
    detail: 'בגרות 5 יחידות',
    improvement: 'ציון 94',
  },
  // Bagrut 3 units - student
  {
    quote: 'התחלתי את השנה עם 54 וסיימתי עם 85. פתאום הכל נפל למקום — הסבר אחד שלו שינה לי הכל.',
    name: 'תומר א.',
    detail: 'בגרות 3 יחידות',
    improvement: 'מ-54 ל-85',
  },
  // Parent - bagrut daughter
  {
    quote: 'הבת שלי הייתה בלחץ אדיר לפני הבגרות. בן הצליח להרגיע אותה ולסדר לה את הראש. קיבלה 88.',
    name: 'רונית מ.',
    detail: 'אמא של תלמידת בגרות 4 יח׳',
    improvement: 'ציון 88',
  },
  // Academic - industrial engineering
  {
    quote: 'הצלת לי את הסמסטר בלינארית. ממש לא ציפיתי לעבור, ועברתי עם 85.',
    name: 'שירה ל.',
    detail: 'סטודנטית להנדסת תעשייה',
    improvement: 'ציון 85 בלינארית',
  },
  // Adult returner - army to university
  {
    quote: 'חזרתי ללמוד אחרי 4 שנות צבא. לא נגעתי במתמטיקה מהתיכון. בן לימד אותי מאפס בלי שיפוטיות.',
    name: 'רועי ב.',
    detail: 'הכנה לאקדמיה — שירות צבאי',
    improvement: 'מוכן לתואר',
  },
  // Academic prep - post-bagrut
  {
    quote: 'עשינו חודש הכנה לפני שנה א׳ — הגעתי לאינפי 1 עם בסיס שלא היה לי בתיכון. זה שינה את כל הסמסטר.',
    name: 'דנה ה.',
    detail: 'הכנה לאקדמיה — לפני שנה א׳',
    improvement: 'שנה א׳ עם בסיס חזק',
  },
  // Group lesson student
  {
    quote: 'למדתי בקבוצה קטנה עם עוד שניים. מחיר מצוין, וגם ראיתי איך חברים בקבוצה שואלים שאלות שאני לא העזתי.',
    name: 'איתי ג.',
    detail: 'קבוצה קטנה — בגרות 4 יח׳',
    improvement: 'עלה מ-58 ל-82',
  },
]
```

### Profile picture silhouettes

**Location:** `Testimonials.tsx` — inside `WhatsAppScreenshot` component.

Replace the current generic `<svg>` person icon in the WhatsApp header with 8 unique SVG silhouettes. Each silhouette is a different person type:

| Index | Type |
|-------|------|
| 0 | Long straight hair, female |
| 1 | Short hair, older female (parent) |
| 2 | Short hair male, slight stubble |
| 3 | Long curly hair, female |
| 4 | Buzzcut male |
| 5 | Hijab female |
| 6 | Ponytail female |
| 7 | Older male, receding hairline |

Implementation: array of SVG path components, selected by `index % 8`. Container uses CSS `filter: blur(4px) brightness(0.85)` to simulate a blurred photo.

---

## 3. Group Lessons

### `lib/constants.ts` changes

**PROGRAMS** — add bullet to each of the 4 programs:
```ts
'שיעורים פרטיים או בקבוצה קטנה (2-4 תלמידים)'
```

**FAQ_ITEMS** — add one entry:
```ts
{
  question: 'האם יש שיעורים קבוצתיים?',
  answer: 'כן — ניתן ללמוד בקבוצה קטנה של 2-4 תלמידים באותה רמה. עלות השיעור לתלמיד נמוכה משמעותית משיעור פרטי. כתבו לי בוואטסאפ ונתאם.',
}
```

**LEVEL_OPTIONS** — add:
```ts
{ value: 'group', label: 'שיעור קבוצתי (2-4 תלמידים)' }
```

---

## 4. Academic Prep Program

### Program card update (`PROGRAMS[3]`)

Update bullets to speak to both personas (post-bagrut + army returnee):
```ts
bullets: [
  'מיפוי פערים אישי — נדע בדיוק מאיפה להתחיל',
  'חיזוק יסודות: אלגברה, טריגונומטריה, פונקציות',
  'היכרות עם חומר אינפי 1 ולינארית',
  'מתאים גם למי שחזר ממסגרת ולא נגע במתמטיקה שנים',
  'שיעורים פרטיים או בקבוצה קטנה',
]
```

### New landing page: `app/pre-academic/page.tsx`

**Metadata:**
- Title: `הכנה למתמטיקה אקדמית | לפני שנה א׳ ואחרי צבא | Math+`
- Description: targeted at both post-bagrut and army returnees

**Structure (8 sections, same as other landing pages):**

1. `UrgencyStrip` — `spotsLeft={4} month="מאי"`
2. `LandingHero`:
   - badge: `"100+ תלמידים — 90% שיפרו ציון"`
   - headline: `"מתמטיקה מפחידה אותך לפני התואר?"`
   - highlightedWord: `"נכנסים מוכנים."`
   - subheadline: `"בין אם סיימת בגרות לאחרונה ובין אם לא נגעת במתמטיקה שנים — נמפה את הפערים ונסגור אותם לפני שנה א׳."`
   - bullets: `['מיפוי פערים אישי', 'הכנה לאינפי 1 ולינארית', 'מתאים גם אחרי הצבא', 'שיעור ניסיון ב-₪99']`
   - ctaText: `"שיעור ניסיון — ₪99 בלבד"`
3. `LandingStats`
4. `LandingBenefits` — 6 benefits (see below)
5. `LandingTestimonials` — 4 testimonials (adult returner, post-bagrut, parent, prep success)
6. `TrialCTABlock` — `"מגיעים לתואר עם בסיס חזק — שיעור ניסיון ב-₪99"`
7. `LandingFAQ` — 5 items (see below)
8. `LandingContact` — `defaultLevel="pre-academic"`, headline: `"השאירו פרטים — נבנה תוכנית הכנה מותאמת אישית"`

**Benefits (6):**
1. Icon: `Target` — "מיפוי פערים אישי" — נאבחן בדיוק מה חסר ונבנה תוכנית ממוקדת
2. Icon: `BookOpen` — "חיזוק יסודות" — אלגברה, טריגונומטריה, פונקציות — הכל מסודר מחדש
3. Icon: `TrendingUp` — "היכרות עם חומר שנה א׳" — אינפי 1 ולינארית — לא מגיעים לשם בפעם הראשונה ביום הראשון
4. Icon: `Heart` — "בלי שיפוטיות" — לא נשאל כמה שנים עבר מהתיכון. מתחילים מהמצב שלך, לא מהמצב האידיאלי
5. Icon: `Monitor` — "שעות גמישות" — גם בערב, גם בסוף שבוע. שיעורים ב-Teams מכל מקום
6. Icon: `Award` — "תוצאות מוכחות" — תלמידים שעברו הכנה איתי נכנסו לסמסטר הראשון בביטחון

**FAQ (5):**
1. "מתי כדאי להתחיל הכנה?" — ממליץ על 4-8 שבועות לפני תחילת הסמסטר, אבל גם חודש מספיק
2. "כמה שיעורים צריך?" — תלוי בפערים. ממוצע: 8-16 שיעורים. נקבע אחרי שיעור האבחון
3. "מה אם עברו שנים מהתיכון?" — הרבה מהתלמידים שלי חזרו ממסגרת ולא נגעו בחומר שנים. מתחילים מהנקודה שלך
4. "אילו קורסים הכנה זו מכינה?" — בעיקר חשבון אינפיניטסימלי 1 ואלגברה לינארית — הקורסים שמפילים הכי הרבה סטודנטים בשנה א׳
5. "האם יש שיעורים קבוצתיים?" — כן, ניתן ללמוד בקבוצה קטנה. עלות נמוכה יותר לתלמיד. צרו קשר לפרטים

---

## 5. Files Changed

**Modified:**
- `components/Logo.tsx` — bug fix
- `components/Hero.tsx` — bug fix (pt-24)
- `components/LandingHero.tsx` — bug fix (pt-24)
- `components/ContactForm.tsx` — bug fix (cta-glow) + remove email field already done
- `components/Testimonials.tsx` — add silhouette SVGs per index
- `lib/constants.ts` — new TESTIMONIALS, updated PROGRAMS bullets, new FAQ entry, updated LEVEL_OPTIONS

**Created:**
- `app/pre-academic/page.tsx` — new landing page

**Not changed:**
- `LandingTestimonials.tsx` — already works with the `Testimonial[]` prop interface
- All other landing pages — group lessons added via constants only
