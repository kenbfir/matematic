# מתמטיק Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all "Math+" brand references with "מתמטיק" across the site — logo, page titles, component text, and email sender name.

**Architecture:** Surgical find-and-replace across 9 files. No logic changes — only text and one structural change to Logo.tsx (remove two-span "Math"+"+" structure, replace with single Hebrew word span).

**Tech Stack:** Next.js 14, TypeScript, React, inline styles (Logo.tsx uses inline styles not Tailwind)

---

### Task 1: Logo.tsx — replace "Math+" with "מתמטיק"

**Files:**
- Modify: `components/Logo.tsx`

- [ ] **Step 1: Read the file**

Read `components/Logo.tsx` in full. The key section is the `inner` div — it currently has:
1. A `div dir="ltr"` wrapper containing two `<span>` elements: "Math" (teal/white) and "+" (gold with glow)
2. A gold divider `div`
3. A Hebrew subtitle `span`

- [ ] **Step 2: Replace the two-span row with a single Hebrew word**

Find this block (the "Math+ row" section):

```tsx
{/* Math+ row */}
<div dir="ltr" style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'baseline' }}>
  <span
    style={{
      fontFamily: 'Rubik, Heebo, sans-serif',
      fontSize: mathSize,
      fontWeight: 900,
      color: mathColor,
      letterSpacing: '-0.5px',
    }}
  >
    Math
  </span>
  <span
    style={{
      fontFamily: 'Rubik, Heebo, sans-serif',
      fontSize: plusSize,
      fontWeight: 900,
      color: '#eab308',
      lineHeight: 0.85,
      textShadow: '0 0 18px rgba(234,179,8,0.6), 0 0 36px rgba(234,179,8,0.25)',
      marginLeft: 2,
    }}
  >
    +
  </span>
</div>
```

Replace with:

```tsx
{/* מתמטיק row */}
<div style={{ lineHeight: 1 }}>
  <span
    style={{
      fontFamily: 'Rubik, Heebo, sans-serif',
      fontSize: mathSize,
      fontWeight: 900,
      color: mathColor,
      letterSpacing: '-0.5px',
    }}
  >
    מתמטיק
  </span>
</div>
```

- [ ] **Step 3: Remove the unused `plusSize` variable**

Find and delete this line near the top of the function:

```tsx
const plusSize = Math.round(46 * s)
```

- [ ] **Step 4: Commit**

```bash
git add components/Logo.tsx
git commit -m "feat: rebrand logo from Math+ to מתמטיק"
```

---

### Task 2: app/layout.tsx — update site-wide meta

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Read the file**

Read `app/layout.tsx`. Find all 3 occurrences of "Math+".

- [ ] **Step 2: Replace all "Math+" with "מתמטיק"**

Find:
```tsx
title: 'Math+ | מורה פרטי למתמטיקה אונליין - בן כפיר',
```
Replace with:
```tsx
title: 'מתמטיק | מורה פרטי למתמטיקה אונליין - בן כפיר',
```

Find (in openGraph or twitter meta):
```tsx
title: 'Math+ | מורה פרטי למתמטיקה אונליין - בן כפיר',
```
Replace with:
```tsx
title: 'מתמטיק | מורה פרטי למתמטיקה אונליין - בן כפיר',
```

Find (in structured data / JSON-LD or metadata name field):
```tsx
name: 'Math+',
```
Replace with:
```tsx
name: 'מתמטיק',
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: update site meta title to מתמטיק"
```

---

### Task 3: Landing pages — update titles and benefit section headings

**Files:**
- Modify: `app/bagrut/page.tsx`
- Modify: `app/middle-school/page.tsx`
- Modify: `app/academic/page.tsx`
- Modify: `app/pre-academic/page.tsx`

- [ ] **Step 1: bagrut/page.tsx**

Read the file. Make these two changes:

Change title:
```tsx
// FIND:
title: 'הכנה לבגרות במתמטיקה | 3, 4, 5 יחידות - שיעורים פרטיים אונליין | Math+',
// REPLACE:
title: 'הכנה לבגרות במתמטיקה | 3, 4, 5 יחידות - שיעורים פרטיים אונליין | מתמטיק',
```

Change LandingBenefits title prop:
```tsx
// FIND:
<LandingBenefits title="למה תלמידי בגרות בוחרים ב-Math+?" benefits={BENEFITS} />
// REPLACE:
<LandingBenefits title="למה תלמידי בגרות בוחרים במתמטיק?" benefits={BENEFITS} />
```

- [ ] **Step 2: middle-school/page.tsx**

Read the file. Make these two changes:

Change title:
```tsx
// FIND:
title: 'מורה פרטי למתמטיקה - חטיבת ביניים כיתות ז׳-ט׳ | שיעורים אונליין | Math+',
// REPLACE:
title: 'מורה פרטי למתמטיקה - חטיבת ביניים כיתות ז׳-ט׳ | שיעורים אונליין | מתמטיק',
```

Change LandingBenefits title prop:
```tsx
// FIND:
<LandingBenefits title="למה הורים בוחרים ב-Math+ לילדים שלהם?" benefits={BENEFITS} />
// REPLACE:
<LandingBenefits title="למה הורים בוחרים במתמטיק לילדים שלהם?" benefits={BENEFITS} />
```

- [ ] **Step 3: academic/page.tsx**

Read the file. Make these two changes:

Change title:
```tsx
// FIND:
title: 'שיעורים פרטיים במתמטיקה לסטודנטים | אינפי, לינארית, סטטיסטיקה | Math+',
// REPLACE:
title: 'שיעורים פרטיים במתמטיקה לסטודנטים | אינפי, לינארית, סטטיסטיקה | מתמטיק',
```

Change LandingBenefits title prop:
```tsx
// FIND:
<LandingBenefits title="למה סטודנטים בוחרים ב-Math+?" benefits={BENEFITS} />
// REPLACE:
<LandingBenefits title="למה סטודנטים בוחרים במתמטיק?" benefits={BENEFITS} />
```

- [ ] **Step 4: pre-academic/page.tsx**

Read the file. Make these two changes:

Change title:
```tsx
// FIND:
title: 'הכנה למתמטיקה אקדמית | לפני שנה א׳ ואחרי צבא | Math+',
// REPLACE:
title: 'הכנה למתמטיקה אקדמית | לפני שנה א׳ ואחרי צבא | מתמטיק',
```

Change LandingBenefits title prop:
```tsx
// FIND:
<LandingBenefits title="למה להתכונן עם Math+?" benefits={BENEFITS} />
// REPLACE:
<LandingBenefits title="למה להתכונן עם מתמטיק?" benefits={BENEFITS} />
```

- [ ] **Step 5: Commit all four pages**

```bash
git add app/bagrut/page.tsx app/middle-school/page.tsx app/academic/page.tsx app/pre-academic/page.tsx
git commit -m "feat: update landing page titles and benefit headings to מתמטיק"
```

---

### Task 4: Components and API — update remaining brand text

**Files:**
- Modify: `components/About.tsx`
- Modify: `components/Footer.tsx`
- Modify: `components/SocialProofToast.tsx`
- Modify: `app/api/contact/route.ts`

- [ ] **Step 1: About.tsx**

Read the file. Find:
```tsx
למה Math+?
```
Replace with:
```tsx
למה מתמטיק?
```

- [ ] **Step 2: Footer.tsx**

Read the file. Find the copyright line:
```tsx
<p>© {new Date().getFullYear()} Math+ - בן כפיר. כל הזכויות שמורות.</p>
```
Replace with:
```tsx
<p>© {new Date().getFullYear()} מתמטיק - בן כפיר. כל הזכויות שמורות.</p>
```

Do NOT change `info@levelup-math.co.il` — that is the actual email account address.

- [ ] **Step 3: SocialProofToast.tsx**

Read the file. Find:
```tsx
<p className="text-xs text-text-lighter">Math+</p>
```
Replace with:
```tsx
<p className="text-xs text-text-lighter">מתמטיק</p>
```

- [ ] **Step 4: app/api/contact/route.ts**

Read the file. Find:
```tsx
from: `"LevelUp - טופס יצירת קשר" <${process.env.SMTP_USER}>`,
```
Replace with:
```tsx
from: `"מתמטיק - טופס יצירת קשר" <${process.env.SMTP_USER}>`,
```

- [ ] **Step 5: Commit all**

```bash
git add components/About.tsx components/Footer.tsx components/SocialProofToast.tsx app/api/contact/route.ts
git commit -m "feat: update remaining brand references to מתמטיק"
```

---

### Task 5: Verify no Math+ references remain

- [ ] **Step 1: Search for remaining "Math+" in source files**

```bash
grep -rn "Math+" --include="*.tsx" --include="*.ts" app/ components/ lib/
```

Expected output: no matches (or only in comments/docs, not live UI).

- [ ] **Step 2: Search for remaining "LevelUp" in source files**

```bash
grep -rn "LevelUp\|levelup" --include="*.tsx" --include="*.ts" app/ components/ lib/
```

Expected: only `info@levelup-math.co.il` in Footer.tsx (the actual email address — intentionally kept).

- [ ] **Step 3: Check dev server**

Open `http://localhost:3001`. Verify:
- Header logo shows "מתמטיק"
- Page title in browser tab shows "מתמטיק | מורה פרטי..."
- Footer copyright shows "מתמטיק - בן כפיר"
- About section heading "למה מתמטיק?" is visible
- SocialProofToast shows "מתמטיק" (trigger by waiting ~10s on homepage)
