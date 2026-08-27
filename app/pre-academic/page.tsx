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
  title: 'הכנה למתמטיקה אקדמית | לפני שנה א׳ ואחרי צבא | Matematic',
  description:
    'הכנה למתמטיקה אקדמית לפני שנה א׳ - מיפוי פערים, חיזוק יסודות והיכרות עם חשבון אינפיניטסימלי ואלגברה לינארית. מתאים גם למי שחזר מהצבא ולא נגע בחומר שנים. שיעור ניסיון ב-₪99!',
  keywords: [
    'הכנה למתמטיקה אקדמית',
    'הכנה לאינפי 1',
    'מתמטיקה לפני תואר',
    'הכנה לאוניברסיטה מתמטיקה',
    'מתמטיקה אחרי צבא',
    'פערים במתמטיקה לפני שנה א׳',
    'מורה פרטי הכנה לאקדמיה',
  ],
}

const BENEFITS = [
  {
    icon: 'Target',
    title: 'מיפוי פערים אישי',
    description: 'נאבחן בדיוק מה חסר ונבנה תוכנית ממוקדת - לא מתחילים מאפס אלא מהנקודה שצריך',
  },
  {
    icon: 'BookOpen',
    title: 'חיזוק יסודות',
    description: 'אלגברה, טריגונומטריה, פונקציות - כל מה שצריך כדי שחומר שנה א׳ לא יהיה סינית',
  },
  {
    icon: 'TrendingUp',
    title: 'היכרות עם חומר שנה א׳',
    description: 'אינפי 1 ולינארית - לא מגיעים לשם בפעם הראשונה ביום הראשון ללימודים',
  },
  {
    icon: 'Heart',
    title: 'בלי שיפוטיות',
    description: 'לא נשאל כמה שנים עבר מהתיכון. מתחילים מהמצב שלך, לא מהמצב האידיאלי',
  },
  {
    icon: 'Monitor',
    title: 'שעות גמישות',
    description: 'שיעורים ב-Teams - גם בערב, גם בסוף שבוע. מתאים גם לתקופת השחרור מהצבא',
  },
  {
    icon: 'Award',
    title: 'תוצאות מוכחות',
    description: 'תלמידים שעברו הכנה איתי נכנסו לסמסטר הראשון בביטחון ועברו את הקורסים',
  },
]

const TESTIMONIALS = [
  {
    quote: 'חזרתי ללמוד אחרי 4 שנות צבא. לא נגעתי במתמטיקה מהתיכון. בן לימד אותי מאפס בלי שיפוטיות.',
    name: 'רועי ב.',
    detail: 'הכנה לאקדמיה - שירות צבאי',
    improvement: 'מוכן לתואר',
  },
  {
    quote: 'עשינו חודש הכנה לפני שנה א׳ - הגעתי לאינפי 1 עם בסיס שלא היה לי בתיכון. זה שינה את כל הסמסטר.',
    name: 'דנה ה.',
    detail: 'הכנה לאקדמיה - לפני שנה א׳',
    improvement: 'שנה א׳ עם בסיס חזק',
  },
  {
    quote: 'עברתי אינפי 1 עם 91. הסביר לי כל שאלה עד שהבנתי - לא קידם הלאה לפני שהיה לי ברור.',
    name: 'אורי ד.',
    detail: 'סטודנט למדעי המחשב',
    improvement: 'ציון 91 באינפי',
  },
  {
    quote: 'הצלת לי את הסמסטר בלינארית. ממש לא ציפיתי לעבור, ועברתי עם 85.',
    name: 'שירה ל.',
    detail: 'סטודנטית להנדסת תעשייה',
    improvement: 'ציון 85 בלינארית',
  },
]

const FAQ = [
  {
    question: 'מתי כדאי להתחיל הכנה?',
    answer: 'ממליץ להתחיל 4-8 שבועות לפני תחילת הסמסטר. אבל גם חודש אחד מספיק לסגור פערים בסיסיים. כל כמה שיותר מוקדם - יותר טוב.',
  },
  {
    question: 'כמה שיעורים צריך?',
    answer: 'תלוי בפערים הקיימים. ממוצע: 8-16 שיעורים. נקבע ביחד אחרי שיעור האבחון הראשון - שם רואים בדיוק מאיפה להתחיל.',
  },
  {
    question: 'מה אם עברו שנים מהתיכון?',
    answer: 'הרבה מהתלמידים שלי חזרו ממסגרת ולא נגעו בחומר 3-5 שנים. זה לגמרי בסדר - מתחילים מהנקודה שלך, בלי לדלג על כלום.',
  },
  {
    question: 'אילו קורסים ההכנה הזו מכינה?',
    answer: 'בעיקר חשבון אינפיניטסימלי 1 ואלגברה לינארית - הקורסים שמפילים הכי הרבה סטודנטים בשנה א׳. אפשר גם להתכונן לקורסים ספציפיים לפי הסילבוס.',
  },
  {
    question: 'האם יש שיעורים קבוצתיים?',
    answer: 'כן - ניתן ללמוד בקבוצה קטנה של 2-4 תלמידים באותה רמה. עלות לתלמיד נמוכה משמעותית משיעור פרטי. כתבו לי בוואטסאפ לפרטים.',
  },
]

export default function PreAcademicPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={4} month="מאי" />
      <LandingHero
        badge="100+ תלמידים - 90% שיפרו ציון"
        headline="מתמטיקה מפחידה אותך לפני התואר?"
        highlightedWord="נכנסים מוכנים."
        subheadline="בין אם סיימת בגרות לאחרונה ובין אם לא נגעת במתמטיקה שנים - נמפה את הפערים ונסגור אותם לפני שנה א׳."
        bullets={['מיפוי פערים אישי', 'הכנה לאינפי 1 ולינארית', 'מתאים גם אחרי הצבא', 'שיעור ניסיון ב-₪99']}
        ctaText="שיעור ניסיון - ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה להתכונן עם Matematic?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="מגיעים לתואר עם בסיס חזק - שיעור ניסיון ב-₪99" />
      <LandingFAQ items={FAQ} />
      <LandingContact
        defaultLevel="pre-academic"
        headline="השאירו פרטים - נבנה תוכנית הכנה מותאמת אישית"
      />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
