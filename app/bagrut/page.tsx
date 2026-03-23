import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import LandingContact from '@/components/LandingContact'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'הכנה לבגרות במתמטיקה | 3, 4, 5 יחידות — שיעורים פרטיים אונליין | LevelUp',
  description:
    'שיעורים פרטיים במתמטיקה לבגרות — 3, 4, 5 יחידות. מורה פרטי עם 100 בבגרות ותואר בהצטיינות. שיטה מוכחת, ליווי אישי, ולמידה בלי חרדות. שיעור ניסיון במחיר מוזל!',
  keywords: [
    'הכנה לבגרות מתמטיקה',
    'בגרות מתמטיקה 5 יחידות',
    'בגרות מתמטיקה 4 יחידות',
    'בגרות מתמטיקה 3 יחידות',
    'מורה פרטי לבגרות מתמטיקה',
    'שיעורים פרטיים בגרות מתמטיקה',
    'הכנה לבגרות מתמטיקה אונליין',
  ],
}

const BENEFITS = [
  { icon: 'Target', title: 'מותאם לרמה שלך', description: 'תוכנית לימודים אישית ל-3, 4 או 5 יחידות — בדיוק מה שאתה צריך למבחן' },
  { icon: 'Heart', title: 'בלי חרדת מבחנים', description: 'סביבה נעימה ותומכת. לומדים להתמודד עם הבחינה בביטחון ובלי לחץ' },
  { icon: 'BookOpen', title: 'פתרון מבחנים אמיתיים', description: 'עובדים על בגרויות משנים קודמות, מתרגלים טכניקות וחוסכים טעויות נפוצות' },
  { icon: 'Monitor', title: 'אונליין מהבית', description: 'שיעורים ב-Teams עם לוח לבן דיגיטלי. בנוחות מהסלון, בלי נסיעות' },
  { icon: 'TrendingUp', title: 'תוצאות מוכחות', description: 'תלמידים שלנו שיפרו בממוצע 25 נקודות בציון הבגרות' },
  { icon: 'Award', title: 'מורה שהיה שם', description: 'עליתי מ-3 ל-5 יחידות וקיבלתי 100 בבגרות. אני יודע בדיוק מה צריך' },
]

const TESTIMONIALS = [
  {
    quote: 'בזכות בן עליתי מ-62 ל-89 בבגרות 4 יחידות. הוא הסביר בצורה שסוף סוף הבנתי את החומר.',
    name: 'יעל כ.',
    detail: 'בגרות 4 יחידות',
    improvement: 'מ-62 ל-89',
  },
  {
    quote: 'בן עזר לי להתכונן לבגרות 5 יחידות. הגשתי בביטחון וקיבלתי 94. ממליצה בחום!',
    name: 'נועה ש.',
    detail: 'בגרות 5 יחידות',
    improvement: 'ציון 94',
  },
]

export default function BagrutPage() {
  return (
    <>
      <LandingHero
        badge="100 בבגרות 5 יחידות — המורה שהיה שם"
        headline="הכנה לבגרות במתמטיקה —"
        highlightedWord="בלי פחד, עם תוצאות"
        subheadline="שיעורים פרטיים אונליין ל-3, 4, 5 יחידות עם מורה שקיבל 100 בבגרות ותואר בהצטיינות באוניברסיטה העברית. שיטה מוכחת, ליווי אישי עד יום הבחינה."
        bullets={[
          'שיפור ממוצע של 25 נקודות',
          'ליווי עד יום הבחינה',
          'למידה בלי חרדות',
          'זמינות מלאה לכל שאלה',
        ]}
      />
      <LandingBenefits title="למה תלמידי בגרות בוחרים ב-LevelUp?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <LandingContact defaultLevel="bagrut-5" headline="השאירו פרטים — נבנה תוכנית הכנה אישית לבגרות" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
