# Testimonials 3-Up Carousel Design

## Goal
Show 3 WhatsApp testimonial screenshots side by side on desktop, cycling in groups of 3. Mobile stays single-card. 12 total testimonials (add 2 to current 10).

## Data Changes
Add 2 new testimonials to `TESTIMONIALS` array in `lib/constants.ts`. Must follow existing structure: `name`, `quote`, `detail`, `improvement`. Hebrew text, realistic WhatsApp tone.

## Component Changes — `components/Testimonials.tsx`

### State
Replace `current` (single index) with `page` (0–3). Keep `direction` for animation.

```ts
const [page, setPage] = useState(0)
const [direction, setDirection] = useState(0)
const PAGES = 4 // 12 testimonials / 3 per page
```

### Navigation
`prev`/`next` advance by page, not by individual testimonial. Wraps: page 3 → page 0.

### Layout (desktop)
On `md+`: render 3 `WhatsAppScreenshot` components in a `grid grid-cols-3 gap-6` inside the animated div.
On mobile (`< md`): render only the first card of the page (index 0 of the current group) — same single-card layout as today.

Implementation: use Tailwind responsive classes. The grid wrapper is `hidden md:grid grid-cols-3 gap-6` and the single-card wrapper is `block md:hidden`.

### Animation
Same `AnimatePresence` + `variants` pattern as today. The animated `motion.div` wraps the entire row (or single card on mobile). Key = `page` instead of `current`.

### Dots
4 dots (one per page), same pill/circle style as current implementation.

### Autoplay
`setInterval` of 6000ms advancing page, same as today.

### Touch / Swipe
Same touch handler — `diff > 50` triggers prev/next page.

### Nav Arrows
Same arrow buttons, same positioning. Keep on all breakpoints.

## Responsive Behavior
| Breakpoint | Cards shown | Dots |
|---|---|---|
| Mobile (< md) | 1 (first of page group) | 4 |
| Desktop (md+) | 3 side by side | 4 |

## WhatsAppScreenshot sizing
Current: `max-w-[360px]` per card. On desktop 3-up, cards must be smaller. Set `max-w-[280px]` or let the grid column constrain width naturally (remove fixed max-w on desktop). Use `w-full` inside grid cell so each card fills its column.

The `WhatsAppScreenshot` component receives a `compact` prop (boolean). When `compact=true`, reduce font sizes and padding slightly to fit 3 cards in a row comfortably:
- Phone frame padding: `px-2 py-3` instead of `px-3 py-4`
- Chat area `min-h-[180px]` instead of `[220px]`
- Status bar text stays same

## Files Changed
- `lib/constants.ts` — add 2 testimonials
- `components/Testimonials.tsx` — page-based carousel, 3-up desktop layout
