# LevelUp - Math Tutoring Website

## Project Overview
Online math tutoring business website for Ben Kfir (LevelUp). Hebrew-only (RTL), targeting Israeli students and parents. The site's primary goal is **lead generation** — getting visitors to submit the contact form or reach out via WhatsApp.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React
- **Database:** Prisma (contact form submissions)
- **Font:** Heebo (Hebrew + Latin)

## Site Structure

### Pages
- `/` — Main homepage (Hero, About/Story, Programs, How It Works, CTA Banner, Testimonials, FAQ, Contact Form)
- `/bagrut` — PPC landing page for bagrut (high school exam) students
- `/middle-school` — PPC landing page for middle school students
- `/academic` — PPC landing page for university students

### Key Components
- `Hero.tsx` — Main hero with animated counters and math symbols
- `About.tsx` — Ben's personal story (failed math -> got 100 on bagrut -> math degree with honors) + differentiators
- `Programs.tsx` — 4 program cards (middle school, bagrut, academic, pre-academic)
- `Testimonials.tsx` — WhatsApp screenshot-style carousel with real messages
- `ContactForm.tsx` — Lead capture form (name, phone, email, level, message) + WhatsApp/phone sidebar
- `LandingHero.tsx`, `LandingBenefits.tsx`, `LandingTestimonials.tsx`, `LandingContact.tsx` — Reusable PPC landing page components
- `WhatsAppButton.tsx` — Floating WhatsApp button
- `StickyMobileCTA.tsx` — Mobile-only sticky bottom CTA bar
- `SocialProofToast.tsx` — Popup social proof notifications

### Data
- All content constants are in `lib/constants.ts` (testimonials, programs, FAQ, stats, nav links, contact info)
- WhatsApp number: 972542530058
- Contact form posts to `/api/contact`

## Design System
- **Primary color:** Dark blue (`primary`, `primary-light`)
- **Accent color:** Green (`accent`, `accent-dark`) — used for all CTAs
- **CTA style:** Green buttons with pulsing glow animation (`cta-glow` class)
- **Section pattern:** Each section has subtle math-themed decorative backgrounds (symbols, grid patterns, formulas)
- **Animations:** Scroll-triggered fade-in/slide-up via Framer Motion `whileInView`
- **Layout classes:** `section-padding` (py-16 md:py-24 px-4 md:px-8), `container-max` (max-w-6xl mx-auto)

## Language & Direction
- **All UI text is in Hebrew.** The site is RTL (`dir="rtl"` on `<html>`).
- When writing new components or text, always use Hebrew.
- Phone numbers and emails use `dir="ltr"` / `ltr-nums` class for proper display.

## Lead Generation Focus
- Every section should drive toward the contact form (`#contact`) or WhatsApp
- The primary CTA across the site is "שיעור ניסיון במחיר מוזל" (discounted trial lesson)
- Trust signals appear throughout: "100+ students", "90% grade improvement", "4+ years experience"
- Testimonials are styled as WhatsApp screenshots to feel authentic

## Conventions
- Components are in `/components`, one component per file
- All components that use hooks/interactivity have `'use client'` directive
- Framer Motion is used for all animations (no CSS animation except `cta-glow` and `float-animation`)
- Constants/data live in `lib/constants.ts`, not inline in components
- PPC landing pages reuse `Landing*` components with props for customization

## AI Agents & Strategy
This project uses a 3-agent specialized workflow to manage market data, brand voice, and conversion.

### 1. israel-math-market-intelligence (The Researcher)
- **Role:** Competitive analysis, pricing benchmarks (NIS), and market gap discovery.
- **Use for:** Researching competitors like Geva/Kidum, checking Yad2 tutoring rates, and identifying underserved niches.

### 2. israel-math-brand-strategist (The Voice)
- **Role:** Hebrew copywriting, psychological trust-building, and Ben's "Struggle → Mastery" narrative.
- **Use for:** Rewriting `About.tsx`, crafting high-resonance headlines in `lib/constants.ts`, and framing social proof.

### 3. math-funnel-optimizer (The Engine)
- **Role:** PPC strategy, RTL-UX optimization, and WhatsApp lead-flow design.
- **Use for:** Auditing `StickyMobileCTA.tsx`, generating Google Ads copy, and designing `wa.me` pre-filled messages.

## Persistent Memory
Each agent maintains its own institutional knowledge at:
`C:\Users\KenBfirxd\.claude\agent-memory\[agent-name]\`
Update these memories whenever a key strategic decision is made (e.g., a price change or a high-performing ad hook).