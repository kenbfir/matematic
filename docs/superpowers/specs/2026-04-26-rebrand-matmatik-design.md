# Rebrand to מתמטיק — Design Spec

## Background
Brand was "Math+" (itself a partial rebrand from "LevelUp"). Dropping "Math+" because in a Hebrew accent it sounds like "מת+" / "meth" (the drug). New name: **מתמטיק** (Hebrew for "mathematician"). PPC-friendly for Hebrew Google Ads, covers all levels (bagrut + university courses: אינפי, לינארית, דיסקרטית).

## Scope — Files to Change

### `app/layout.tsx`
Replace all 3 "Math+" occurrences with "מתמטיק":
- `title: 'Math+ | מורה פרטי למתמטיקה אונליין - בן כפיר'` → `'מתמטיק | מורה פרטי למתמטיקה אונליין - בן כפיר'`
- `og:title` same change
- `name: 'Math+'` in structured data → `'מתמטיק'`

### `app/bagrut/page.tsx`
- `title`: replace "Math+" → "מתמטיק"

### `app/middle-school/page.tsx`
- `title`: replace "Math+" → "מתמטיק"

### `app/academic/page.tsx`
- `title`: replace "Math+" → "מתמטיק"
- `LandingBenefits title` prop: `"למה סטודנטים בוחרים ב-Math+?"` → `"למה סטודנטים בוחרים במתמטיק?"`

### `app/pre-academic/page.tsx`
- `title`: replace "Math+" → "מתמטיק"
- `LandingBenefits title` prop: `"למה להתכונן עם Math+?"` → `"למה להתכונן עם מתמטיק?"`

### `app/middle-school/page.tsx` (LandingBenefits prop)
- `"למה הורים בוחרים ב-Math+ לילדים שלהם?"` → `"למה הורים בוחרים במתמטיק לילדים שלהם?"`

### `app/bagrut/page.tsx` (LandingBenefits prop)
- `"למה תלמידי בגרות בוחרים ב-Math+?"` → `"למה תלמידי בגרות בוחרים במתמטיק?"`

### `components/Logo.tsx`
Currently renders two spans: `"Math"` (teal/white, 36px, weight 900) + `"+"` (gold #eab308, 46px, glow). Replace with a single `"מתמטיק"` span:
- Remove the `dir="ltr"` wrapper and both existing spans
- Add a single span: `"מתמטיק"` in `dir="rtl"`, same font (Rubik/Heebo), weight 900, size `mathSize`, color `mathColor`
- Remove the `plusSize` variable (no longer needed)
- Gold divider line and Hebrew subtitle below stay unchanged
- Remove `marginLeft: 2` (was for "+" offset)

### `components/About.tsx`
- `"למה Math+?"` heading → `"למה מתמטיק?"`

### `components/Footer.tsx`
- Copyright: `"Math+ - בן כפיר"` → `"מתמטיק - בן כפיר"`
- Email display text stays as-is (`info@levelup-math.co.il`) — actual email account, cannot rename

### `components/SocialProofToast.tsx`
- `"Math+"` brand label → `"מתמטיק"`

### `app/api/contact/route.ts`
- Email `from` name: `"LevelUp - טופס יצירת קשר"` → `"מתמטיק - טופס יצירת קשר"`

## Out of Scope
- `info@levelup-math.co.il` — actual email account address, requires external action
- `.claude/agents/` config files — not site-facing
- `docs/ads/` — ad copy docs, separate task

## Grammar note
Hebrew preposition before מתמטיק:
- "בוחרים ב**מתמטיק**" (ב + מתמטיק, no space) — correct Hebrew
- "עם מתמטיק" — correct for "with מתמטיק"
- "למה מתמטיק?" — correct for standalone question
