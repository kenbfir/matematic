import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingStats from '@/components/LandingStats'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import TrialCTABlock from '@/components/TrialCTABlock'
import LandingFAQ from '@/components/LandingFAQ'
import LandingContact from '@/components/LandingContact'
import UrgencyStrip from '@/components/UrgencyStrip'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'שיעורים פרטיים במתמטיקה לסטודנטים | אינפי, לינארית, סטטיסטיקה | מתמטיק',
  description:
    'שיעורים פרטיים במתמטיקה אקדמית - חשבון אינפיניטסימלי, אלגברה לינארית, הסתברות ומתמטיקה בדידה. מורה עם תואר בהצטיינות מהאוניברסיטה העברית. שיעור ניסיון ב-₪99!',
  keywords: [
    'חשבון אינפיניטסימלי שיעורים פרטיים',
    'אלגברה לינארית עזרה',
    'מתמטיקה אקדמית שיעורים פרטיים',
    'הסתברות וסטטיסטיקה שיעורים',
    'אינפי 1 עזרה',
    'אינפי 2 שיעורים',
    'מורה פרטי מתמטיקה אוניברסיטה',
  ],
}

const BENEFITS = [
  { icon: 'Award', title: 'תואר בהצטיינות', description: 'למדתי מתמטיקה באוניברסיטה העברית וסיימתי בהצטיינות. מכיר את החומר לעומק' },
  { icon: 'Target', title: 'מותאם לקורס שלך', description: 'עובדים לפי הסילבוס של הקורס שלך - תרגילים, מטלות והכנה לבחינות' },
  { icon: 'Heart', title: 'בלי בושה לשאול', description: 'בשיעור פרטי אתה יכול לשאול כל שאלה. אין שיפוט, אין "שאלות טיפשות"' },
  { icon: 'BookOpen', title: 'מורכב הופך פשוט', description: 'לוקח נושאים קשים ומסביר אותם בצורה ברורה ואינטואיטיבית - עם דוגמאות מהחיים' },
  { icon: 'Monitor', title: 'שעות גמישות', description: 'שיעורים ב-Teams - גם בערב, גם בסופ"ש, גם לפני בחינה בבוקר' },
  { icon: 'TrendingUp', title: 'הכנה לפני סמסטר', description: 'גם הכנה לפני תחילת הסמסטר - תתחיל את הקורס עם בסיס חזק וביטחון' },
]

const TESTIMONIALS = [
  { quote: 'עברתי אינפי 1 עם 91. הסביר לי כל שאלה עד שהבנתי - לא קידם הלאה לפני שהיה לי ברור.', name: 'אורי ד.', detail: 'סטודנט למדעי המחשב', improvement: 'ציון 91 באינפי' },
  { quote: 'הצלת לי את הסמסטר בלינארית. ממש לא ציפיתי לעבור, ועברתי עם 85.', name: 'שירה ל.', detail: 'סטודנטית להנדסת תעשייה', improvement: 'ציון 85 בלינארית' },
  { quote: 'נכשלתי באינפי 2 במועד א׳. בן עשה סדר בחומר ועברתי עם 78 במועד ב׳. לא ציפיתי לזה.', name: 'דניאל ר.', detail: 'סטודנט לכלכלה', improvement: 'מנכשל ל-78' },
  { quote: 'הסביר לי הסתברות עם דוגמאות מהחיים ופתאום הכל נהיה הגיוני. קיבלתי 88 בבחינה.', name: 'מאיה כ.', detail: 'סטודנטית לפסיכולוגיה', improvement: 'ציון 88' },
]

const FAQ = [
  { question: 'כמה עולה שיעור ניסיון?', answer: 'שיעור הניסיון עולה ₪99 בלבד - ללא התחייבות. בשיעור נאבחן איפה הפערים ונבנה תוכנית מותאמת לקורס.' },
  { question: 'אילו קורסים אתה מלמד?', answer: 'חשבון אינפיניטסימלי 1 ו-2, אלגברה לינארית, הסתברות וסטטיסטיקה, מתמטיקה בדידה, ועוד. שאל אם הקורס שלך ברשימה.' },
  { question: 'אפשר לתאם שיעור לפני הבחינה בזמן קצר?', answer: 'כן - אני מנסה להתפנות גם לשיעורי חירום לפני בחינה. כתוב בוואטסאפ ונסדר.' },
  { question: 'האם אתה עובד עם כל האוניברסיטאות?', answer: 'עבדתי עם תלמידים מהאוניברסיטה העברית, TAU, הטכניון, אריאל, מכון וייצמן ועוד. שלח את הסילבוס - נסתנכרן ונעבוד לפי החומר שלך.' },
]

export default function AcademicPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={3} month="מאי" />
      <LandingHero
        badge="תואר בהצטיינות מהאוניברסיטה העברית"
        headline="שיעורים פרטיים במתמטיקה אקדמית -"
        highlightedWord="להבין, לא רק לעבור"
        subheadline="חשבון אינפיניטסימלי, אלגברה לינארית, הסתברות וסטטיסטיקה - הכל אונליין עם מורה בעל תואר בהצטיינות מהאוניברסיטה העברית, שיודע להפוך מורכב לפשוט."
        bullets={['אינפי 1+2, לינארית, סטטיסטיקה', 'הכנה לבחינות ומטלות', 'שעות גמישות', 'שיעור ניסיון ב-₪99']}
        ctaText="שיעור ניסיון - ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה סטודנטים בוחרים במתמטיק?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="תקוע בקורס? שיעור ניסיון ב-₪99 - נסדר את זה" />
      <LandingFAQ items={FAQ} />
      <LandingContact defaultLevel="academic" headline="השאירו פרטים - נבנה תוכנית מותאמת לקורס שלך" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
