# PPC Landing Pages + Ad Creatives — Design Spec
**Date:** 2026-04-14  
**Status:** Approved

---

## Overview

Full rebuild of 3 existing landing pages (`/bagrut`, `/middle-school`, `/academic`) optimized for paid traffic conversion. Plus copy + visual mockups for 6 ad platforms targeting Israeli students and parents.

**Goal:** Maximum lead volume (form submissions + WhatsApp clicks).  
**Audience:** Israeli students and parents. Hebrew RTL throughout.  
**Business:** Math+ (Ben Kfir) — online math tutoring, WhatsApp-first.

---

## Research Foundations

- Single CTA pages convert 32% better than multi-CTA
- 3-field forms yield 20–35% more completions vs. 5+ fields
- Satisfaction guarantees drive ~34% lift in service categories
- Specific outcome testimonials (grade X→Y) are the #1 trust signal
- Fake urgency backfires in trust-sensitive categories — scarcity must be real
- WhatsApp-screenshot testimonials = highest-trust format for Israeli audience
- Trial-only pricing = best balance of lead volume vs. qualification

---

## Landing Pages — All Three

### Shared Structure (every page)

| # | Section | Key Elements |
|---|---|---|
| 1 | **Urgency Strip** | Fixed top banner: "נשארו X מקומות לחודש [month]" — updated manually each month |
| 2 | **Hero** | Outcome headline + highlighted word (accent color) + Ben's photo + 3 trust stats + bullet list + single CTA button |
| 3 | **Social Proof Bar** | 3 numbers: 100+ תלמידים, 90% שיפרו ציון, 4+ שנות ניסיון |
| 4 | **Benefits** | 6 cards — outcome language, not feature language. Parent/student framing per page |
| 5 | **Testimonials** | WhatsApp-screenshot style, specific grade improvements (e.g., מ-62 ל-89) |
| 6 | **Trial CTA Block** | "שיעור ניסיון — ₪99 בלבד" + guarantee badge ("ללא התחייבות, 100% שביעות רצון") + CTA |
| 7 | **FAQ** | 5 objection-handling questions per page |
| 8 | **3-Field Contact Form** | Name + Phone + Level only. No email, no message field |

### Per-Page Differences

#### `/bagrut` — High School Bagrut
- **Target:** Students (16–18) and their parents
- **Hero headline:** Outcome = "להיכנס לבחינה בביטחון מלא"
- **Badge:** "100 בבגרות 5 יחידות — המורה שהיה שם"
- **Bullets:** שיפור ממוצע 25 נקודות / מועד א׳ 2026 / ליווי עד יום הבחינה
- **Benefits angle:** Exam confidence, methods, past papers practice
- **FAQ focus:** Exam scheduling, what units are covered, timeline

#### `/middle-school` — Grades 7–9
- **Target:** Parents (primary decision-maker)
- **Hero headline:** Outcome = "הילד שלכם יכול לאהוב מתמטיקה"
- **Badge:** "הורים ממליצים — דירוג 5 כוכבים"
- **Bullets:** מותאם לקצב הילד / שיפור ביטחון עצמי / הכנה לתיכון
- **Benefits angle:** Safe environment, patience, building strong foundation for high school
- **FAQ focus:** How do online lessons work for kids, what age, parental involvement

#### `/academic` — University Students
- **Target:** Students (18–28)
- **Hero headline:** Outcome = "להבין, לא רק לעבור"
- **Badge:** "תואר בהצטיינות מהאוניברסיטה העברית"
- **Bullets:** אינפי / לינארית / סטטיסטיקה / שעות גמישות
- **Benefits angle:** Flexible hours, exam prep, pre-semester prep, no-shame environment
- **FAQ focus:** Which courses, last-minute exam help, session recordings

### 3-Field Form
Current form has 5 fields (name, phone, email, level, message). Rebuild to 3:
- שם מלא (required)
- טלפון (required)
- רמת לימוד (select, pre-selected per page)

### Urgency Strip Component
New shared component `UrgencyStrip.tsx`. Props: `spotsLeft: number`, `month: string`. Renders a top-of-page fixed banner in accent color. Updated manually via props in each page file.

### Trial CTA Block
New shared component `TrialCTABlock.tsx`. Dark blue background section with:
- Large price callout: "שיעור ניסיון — ₪99 בלבד"
- Guarantee badge: "ללא התחייבות · 100% שביעות רצון · מענה תוך שעות"
- CTA button → `#contact`
- WhatsApp secondary CTA

---

## Ad Creatives

### Deliverable Format
For each platform: Hebrew copy document (`docs/ads/[platform].md`) + HTML visual mockup page (`docs/ads/mockups/[platform].html`).

### Google Search Ads (RSA)
- 3 campaigns (one per page/level)
- 15 headlines + 4 descriptions per campaign
- Call extension + lead form extension
- Keyword themes: בגרות מתמטיקה / מורה פרטי / חטיבת ביניים / אינפי

### Facebook
- 2 audiences: parents (35–50) and students (16–24)
- 3 ad variations per audience (6 total)
- Format: single image (1:1), 15s video script option
- Objective: Lead generation → WhatsApp

### Instagram Reels
- 3 vertical video scripts (9:16, 15–30s)
- Hook-first structure (first 2 seconds must stop scroll)
- Captions mandatory
- CTA: link in bio → `/bagrut` or `/middle-school`

### TikTok
- 3 raw-style scripts, Ben on camera
- Casual tone, no production value needed
- Hook: personal struggle-to-mastery story
- Boost as Spark Ads once organic traction appears

### Yad2
- 3 listing copies (one per level)
- Category: שיעורים פרטיים
- Title formula: outcome + price anchor + "שיעור ניסיון"

### WhatsApp Broadcast
- 3 message templates:
  1. Urgency/spots — "נשארו 2 מקומות לחודש מאי"
  2. Social proof — specific student result
  3. Seasonal — tied to exam cycle or new semester

---

## Technical Notes

- All new components go in `/components`
- `'use client'` on any component using hooks or framer-motion
- Urgency strip number updated via props (no database/CMS needed — manual update)
- Form reduced to 3 fields; `defaultLevel` prop still pre-selects per page
- New sections use existing design tokens: `primary`, `accent`, `section-padding`, `container-max`
- No new dependencies required

---

## Out of Scope

- Actual ad image/video production (copy + scripts only)
- CMS for urgency strip number
- A/B testing infrastructure
- Analytics/conversion tracking setup
