# Hover Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove hover effects from non-interactive containers; apply flat color-only hover to real interactive elements (buttons, links).

**Architecture:** Surgical per-file edits. Non-interactive wrappers lose all hover/whileHover. Interactive elements (`<a>`, `<button>`) keep hover but only change color/background — no scale, no translate, no shadow.

**Tech Stack:** Next.js 14, Tailwind CSS 3, Framer Motion

---

### Task 1: Programs.tsx — strip non-interactive card hover

**Files:**
- Modify: `components/Programs.tsx`

- [ ] **Step 1: Remove `whileHover`, `hover:shadow-xl`, `group` from card**

In `components/Programs.tsx`, find the `motion.div` at line 59. Replace:

```tsx
<motion.div
  key={program.title}
  className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.gradient} p-8 hover:shadow-xl transition-all duration-300 group overflow-hidden`}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  whileHover={{ y: -4 }}
>
```

With:

```tsx
<motion.div
  key={program.title}
  className={`relative rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.gradient} p-8 overflow-hidden`}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

- [ ] **Step 2: Remove group-hover from decorative formula divs**

Find the two decorative formula divs (lines ~69-74). Replace both `group-hover:opacity-10` with a static `opacity-5`:

```tsx
<div className="absolute top-4 left-4 text-xs font-mono opacity-5 pointer-events-none text-primary">
  {formulas[0]}
</div>
<div className="absolute bottom-4 left-8 text-sm font-mono opacity-5 pointer-events-none text-primary">
  {formulas[1]}
</div>
```

- [ ] **Step 3: Remove `whileHover` from icon div**

Find the icon `motion.div` (~line 77). Replace:

```tsx
<motion.div
  className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shrink-0`}
  whileHover={{ rotate: 10 }}
>
```

With a plain `div`:

```tsx
<div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center shrink-0`}>
```

- [ ] **Step 4: Commit**

```bash
git add components/Programs.tsx
git commit -m "fix: remove fake-interactive hover from program cards"
```

---

### Task 2: About.tsx — strip card lifts, image zoom, fix button

**Files:**
- Modify: `components/About.tsx`

- [ ] **Step 1: Remove hover from differentiator cards**

Find the differentiator card div (~line 140):

```tsx
className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
```

Replace with:

```tsx
className="bg-white rounded-2xl p-8 text-center shadow-sm"
```

- [ ] **Step 2: Remove group-hover from icon div inside differentiator cards**

Find (~line 146):

```tsx
<div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition">
```

Replace with:

```tsx
<div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
```

- [ ] **Step 3: Remove image zoom and blur overlay group-hover**

Find the image wrapper div (~line 45):

```tsx
<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
```

Replace with:

```tsx
<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/20 blur-2xl opacity-70"></div>
```

Find the image (~line 53):

```tsx
className="object-cover group-hover:scale-105 transition duration-500"
```

Replace with:

```tsx
className="object-cover"
```

Also remove `group` from the outer wrapper div that contains the image (find `className="... group ..."` on the image container and remove just the `group` token).

- [ ] **Step 4: Fix CTA button — remove scale, keep color**

Find (~line 112):

```tsx
className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
```

Replace with:

```tsx
className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
```

- [ ] **Step 5: Commit**

```bash
git add components/About.tsx
git commit -m "fix: remove hover lifts from about cards and image"
```

---

### Task 3: HowItWorks.tsx — strip step circle whileHover

**Files:**
- Modify: `components/HowItWorks.tsx`

- [ ] **Step 1: Remove whileHover and group-hover from step circles**

Find the step circle `motion.div` (~line 57-59):

```tsx
className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-accent/20 relative z-10 group-hover:border-accent/40 transition-colors`}
whileHover={{ scale: 1.1 }}
transition={{ type: 'spring', stiffness: 300 }}
```

Replace the entire `motion.div` with a plain `div` (it only needs entrance animation on the parent):

```tsx
<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-accent/20 relative z-10">
```

Also remove `group` from the step wrapper div if present.

- [ ] **Step 2: Commit**

```bash
git add components/HowItWorks.tsx
git commit -m "fix: remove scale hover from how-it-works step circles"
```

---

### Task 4: LandingBenefits.tsx — strip card lifts

**Files:**
- Modify: `components/LandingBenefits.tsx`

- [ ] **Step 1: Remove hover from benefit cards**

Find (~line 47):

```tsx
className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
```

Replace with:

```tsx
className="bg-white rounded-2xl p-6 text-center shadow-sm"
```

- [ ] **Step 2: Remove group-hover from icon div**

Find (~line 53):

```tsx
<div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
```

Replace with:

```tsx
<div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
```

- [ ] **Step 3: Commit**

```bash
git add components/LandingBenefits.tsx
git commit -m "fix: remove hover lifts from landing benefit cards"
```

---

### Task 5: Hero.tsx + CtaBanner.tsx + FAQ.tsx — flatten button hover

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/CtaBanner.tsx`
- Modify: `components/FAQ.tsx`

- [ ] **Step 1: Hero.tsx — remove scale from primary CTA**

Find (~line 132):

```tsx
className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center gap-2"
```

Replace with:

```tsx
className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-colors flex items-center gap-2"
```

- [ ] **Step 2: CtaBanner.tsx — remove scale from CTA**

Find (~line 60):

```tsx
className="cta-glow inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105"
```

Replace with:

```tsx
className="cta-glow inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-lg font-bold transition-colors"
```

- [ ] **Step 3: FAQ.tsx — remove scale from CTA**

Find (~line 96):

```tsx
className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-all hover:scale-105"
```

Replace with:

```tsx
className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-medium transition-colors"
```

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx components/CtaBanner.tsx components/FAQ.tsx
git commit -m "fix: flatten CTA button hover to color-only"
```

---

### Task 6: ContactForm.tsx + LandingHero.tsx + LandingContact.tsx — flatten remaining buttons

**Files:**
- Modify: `components/ContactForm.tsx`
- Modify: `components/LandingHero.tsx`
- Modify: `components/LandingContact.tsx`

- [ ] **Step 1: ContactForm.tsx — remove scale from submit button**

Find (~line 180):

```tsx
className="cta-glow w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
```

Replace with:

```tsx
className="cta-glow w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
```

Also find the success-state WhatsApp button (~line 92):

```tsx
className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
```

Replace with:

```tsx
className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
```

- [ ] **Step 2: LandingHero.tsx — remove scale from CTA**

Find (~line 110):

```tsx
className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 flex items-center gap-2"
```

Replace with:

```tsx
className="cta-glow bg-accent hover:bg-accent-dark text-gray-900 px-10 py-4 rounded-xl text-lg font-bold transition-colors flex items-center gap-2"
```

- [ ] **Step 3: LandingContact.tsx — remove scale from submit and WhatsApp buttons**

Find submit button (~line 142):

```tsx
className="w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
```

Replace with:

```tsx
className="w-full bg-accent hover:bg-accent-dark text-gray-900 py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
```

Find WhatsApp button (~line 179):

```tsx
className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
```

Replace with:

```tsx
className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-colors"
```

- [ ] **Step 4: Commit**

```bash
git add components/ContactForm.tsx components/LandingHero.tsx components/LandingContact.tsx
git commit -m "fix: flatten submit and WhatsApp button hover to color-only"
```

---

### Task 7: LandingTestimonials.tsx — remove card hover shadow

**Files:**
- Modify: `components/LandingTestimonials.tsx`

- [ ] **Step 1: Remove hover shadow from testimonial cards**

Find (~line 30):

```tsx
className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
```

Replace with:

```tsx
className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
```

- [ ] **Step 2: Commit**

```bash
git add components/LandingTestimonials.tsx
git commit -m "fix: remove hover shadow from non-interactive testimonial cards"
```

---

### Task 8: Visual verification

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check each page**

Open http://localhost:3000 and verify:
- Hover over each program card — no lift, no shadow, no icon rotate
- Hover over differentiator cards in About — no lift
- Hover over HowItWorks step circles — no scale
- Hover over all green CTA buttons — background darkens, nothing moves
- Hover over "לפרטים נוספים" links — gap animation still works (intentional)
- Open /bagrut, /middle-school, /academic — repeat checks

- [ ] **Step 3: Stop dev server when done**
