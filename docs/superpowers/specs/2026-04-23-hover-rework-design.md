# Hover Rework Design — Math+ Website

## Problem
Every element with a hover state appears interactive, including containers that aren't clickable. Program cards, differentiator cards, benefit cards, and step circles all scale/lift on hover — misleading users and creating visual noise.

## Rule
**Hover effects belong only on interactive elements** (`<a>`, `<button>`, form submits). Non-interactive containers get no hover state.

## Hover Style (Level C — Flat)
Interactive elements: color/background darkens on hover. No scale, no translate, no shadow changes. Transition: `transition-colors duration-200`.

Exception: the "לפרטים נוספים" link (`inline-flex` with gap trick) keeps its gap animation since it's genuinely interactive and the effect is text-only, not spatial.

## Changes Per File

### `components/Programs.tsx`
- Remove `whileHover={{ y: -4 }}` from card `motion.div`
- Remove `hover:shadow-xl` from card className
- Remove `group` class from card (no group-hover needed)
- Remove `group-hover:opacity-10` from decorative formula divs (set to `opacity-0` permanently or a static low opacity)
- Remove `whileHover={{ rotate: 10 }}` from icon `motion.div`

### `components/About.tsx`
- Differentiator cards: remove `hover:shadow-xl hover:-translate-y-2` and `group` class
- Remove `group-hover:bg-accent/20` from icon div (static `bg-accent/10`)
- About image: remove `group-hover:scale-105` (static, no zoom)
- Remove blur overlay `group-hover:opacity-100` — set to static `opacity-70`
- CTA button (`bg-green-500`): remove `hover:scale-105`, keep `hover:bg-green-600`

### `components/HowItWorks.tsx`
- Step circles: remove `whileHover={{ scale: 1.1 }}`
- Remove `group-hover:border-accent/40` from circle div (static border)

### `components/LandingBenefits.tsx`
- Cards: remove `hover:shadow-lg hover:-translate-y-1` and `group` class
- Remove `group-hover:bg-accent/20` from icon div

### `components/Hero.tsx`
- Primary CTA: remove `hover:scale-105`, keep `hover:bg-accent-dark`

### `components/CtaBanner.tsx`
- CTA button: remove `hover:scale-105`, keep `hover:bg-accent-dark`

### `components/FAQ.tsx`
- CTA button: remove `hover:scale-105`, keep `hover:bg-primary-dark`

### `components/ContactForm.tsx`
- Submit button: remove `hover:scale-[1.02]`, keep `hover:bg-accent-dark`
- WhatsApp/phone sidebar links: remove `group-hover:bg-green-200` / `group-hover:bg-blue-200` from inner icon divs (those containers are interactive links so flat hover on the `<a>` is fine, but inner div color change can stay since it's subtle)

### `components/LandingHero.tsx`
- CTA button: remove `hover:scale-105`, keep `hover:bg-accent-dark`

### `components/LandingContact.tsx`
- Submit button: remove `hover:scale-[1.02]`
- WhatsApp button: remove `hover:scale-[1.02]`, keep `hover:bg-green-600`

### `components/LandingTestimonials.tsx`
- Testimonial cards: remove `hover:shadow-md` (non-interactive)

## What Stays Unchanged
- All scroll-triggered entrance animations (`whileInView`, `initial/animate`) — these are fine
- `cta-glow` pulsing on CTAs — out of scope
- `float-animation` on WhatsApp button — out of scope
- Footer/Header link hover color changes — these are interactive, flat color change is correct
- "לפרטים נוספים" gap animation — interactive link, keep
- Form field focus rings — functional, keep

## Approach
Surgical: edit each file individually. No global CSS override (Framer Motion `whileHover` props require JSX edits).
