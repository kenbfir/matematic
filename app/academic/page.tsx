import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import LandingContact from '@/components/LandingContact'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'שיעורים פרטיים במתמטיקה לסטודנטים | אינפי, לינארית, סטטיסטיקה | LevelUp',
  description:
    'שיעורים פרטיים במתמטיקה אקדמית — חשבון אינפיניטסימלי, אלגברה לינארית, הסתברות וסטטיסטיקה. מורה עם תואר בהצטיינות מהאוניברסיטה העברית. שיעור ניסיון במחיר מוזל!',
  keywords: [
    'חשבון אינפיניטסימלי שיעורים פרטיים',
    'אלגברה לינארית עזרה',
    'מתמטיקה אקדמית שיעורים פרטיים',
    'הסתברות וסטטיסטיקה שיעורים',
    'אינפי 1 עזרה',
    'אינפי 2 שיעורים',
    'מורה פרטי מתמטיקה אוניברסיטה',
    'הכנה למתמטיקה אקדמית',
  ],
}

const BENEFITS = [
  { icon: 'Award', title: 'תואר בהצטיינות', description: 'למדתי מתמטיקה באוניברסיטה העברית וסיימתי בהצטיינות. אני מכיר את החומר לעומק' },
  { icon: 'Target', title: 'מותאם לקורס שלך', description: 'עובדים לפי הסילבוס של הקורס שלך — תרגילים, מטלות, והכנה לבחינות' },
  { icon: 'Heart', title: 'בלי בושה לשאול', description: 'בשיעור פרטי אתה יכול לשאול כל שאלה, גם את ה"טיפשות". אין שיפוט' },
  { icon: 'BookOpen', title: 'הסבר פשוט למורכב', description: 'אני יודע לקחת נושאים מורכבים ולהסביר אותם בצורה ברורה ואינטואיטיבית' },
  { icon: 'Monitor', title: 'אונליין ונוח', description: 'שיעורים ב-Teams בשעות גמישות — גם בערב, גם בסופש, גם לפני בחינה' },
  { icon: 'TrendingUp', title: 'הכנה לקורסים', description: 'גם הכנה לפני תחילת הסמסטר — תתחיל את הקורס עם בסיס חזק וביטחון' },
]

const TESTIMONIALS = [
  {
    quote: 'עברתי חשבון אינפיניטסימלי 1 עם 91 בזכות השיעורים. בן יודע להסביר דברים מורכבים בצורה פשוטה.',
    name: 'אורי ד.',
    detail: 'סטודנט למדעי המחשב',
    improvement: 'ציון 91 בקורס',
  },
  {
    quote: 'בן עזר לי להתכונן לבגרות 5 יחידות. הגשתי בביטחון וקיבלתי 94. ממליצה בחום!',
    name: 'נועה ש.',
    detail: 'כיום סטודנטית להנדסה',
    improvement: 'ציון 94',
  },
]

export default function AcademicPage() {
  return (
    <>
      <LandingHero
        badge="תואר בהצטיינות מהאוניברסיטה העברית"
        headline="שיעורים פרטיים במתמטיקה אקדמית —"
        highlightedWord="מהסבר לציון"
        subheadline="נתקעת באינפי? לא מבין לינארית? חשבון אינפיניטסימלי, אלגברה לינארית, הסתברות וסטטיסטיקה — הכל אונליין עם מורה בעל תואר בהצטיינות שיודע להסביר מורכב בפשטות."
        bullets={[
          'אינפי 1+2, לינארית, סטטיסטיקה',
          'הכנה לבחינות ומטלות',
          'שעות גמישות',
          'הכנה לפני תחילת סמסטר',
        ]}
      />
      <LandingBenefits title="למה סטודנטים בוחרים ב-LevelUp?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <LandingContact defaultLevel="academic" headline="השאירו פרטים — נבנה תוכנית מותאמת לקורס שלך" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
