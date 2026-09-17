import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getLandingVariant } from '@/lib/landingVariants'
import { cookieNameFor } from '@/lib/abVariant'
import { PRICE_FAQ_ITEM } from '@/lib/constants'
import LandingHero from '@/components/LandingHero'
import LandingStats from '@/components/LandingStats'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import TrialCTABlock from '@/components/TrialCTABlock'
import LandingFAQ from '@/components/LandingFAQ'
import LandingContact from '@/components/LandingContact'
import UrgencyStrip from '@/components/UrgencyStrip'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import StickyContactSidebar from '@/components/StickyContactSidebar'

export const metadata: Metadata = {
  title: 'מורה פרטי למתמטיקה - חטיבת ביניים כיתות ז׳-ט׳ | שיעורים אונליין | Matematic',
  description:
    'שיעורים פרטיים במתמטיקה לחטיבת ביניים - כיתות ז, ח, ט. בניית בסיס חזק, הכנה למבחנים, ולמידה בלי חרדות. מורה מנוסה עם תואר בהצטיינות. צרו קשר עוד היום!',
  keywords: [
    'מורה פרטי למתמטיקה חטיבת ביניים',
    'שיעורים פרטיים מתמטיקה כיתה ז',
    'שיעורים פרטיים מתמטיקה כיתה ח',
    'שיעורים פרטיים מתמטיקה כיתה ט',
    'מתמטיקה חטיבת ביניים',
    'עזרה במתמטיקה לילדים',
  ],
}

const BENEFITS = [
  { icon: 'Heart', title: 'למידה בלי לחץ', description: 'סביבה חמה ותומכת שגורמת לילד להתחבר למתמטיקה במקום לפחד ממנה' },
  { icon: 'Target', title: 'מותאם לקצב של הילד', description: 'כל ילד לומד בקצב שלו. מזהים את הפערים ובונים תוכנית ממוקדת' },
  { icon: 'TrendingUp', title: 'ביטחון עצמי אמיתי', description: 'התלמידים לא רק משתפרים בציונים - הם מתחילים להאמין שהם יכולים' },
  { icon: 'BookOpen', title: 'הכנה למבחנים', description: 'תרגול ממוקד למבחנים בית-ספריים ולמיצ"ב, עם טכניקות שעובדות' },
  { icon: 'Monitor', title: 'שיעורים מהבית', description: 'אונליין ב-Teams - ההורים רגועים והילד לומד בנוחות ובלי נסיעות' },
  { icon: 'Award', title: 'בסיס חזק לתיכון', description: 'מתמטיקה חזקה בחטיבה = כניסה חזקה לתיכון ולרמה גבוהה בבגרות' },
]

const TESTIMONIALS = [
  { quote: 'הבן שלי פשוט שינה יחס למתמטיקה. לא האמנתי שזה אפשרי. עכשיו הוא מבקש לעשות תרגילים.', name: 'מיכל ר.', detail: 'אמא של תלמיד כיתה ח׳', improvement: 'שינוי גישה מוחלט' },
  { quote: 'עלה מ-58 ל-82 תוך סמסטר. בן לא ויתר עליו - עבד על כל פרצה עד שנסגרה.', name: 'איתי ג.', detail: 'תלמיד כיתה ט׳', improvement: 'מ-58 ל-82' },
  { quote: 'הבת שלי עברה מ-65 ל-90 בגיאומטריה. בן עבד איתה על ביטחון - וזה עשה את כל ההבדל.', name: 'דנה ש.', detail: 'אמא של תלמידה כיתה ז׳', improvement: 'מ-65 ל-90' },
  { quote: 'חשבתי שאני לא מתאים למתמטיקה. בן שינה לי את הגישה. עכשיו אני הולך על 5 יחידות.', name: 'עידו ק.', detail: 'תלמיד כיתה ט׳', improvement: 'הולך על 5 יח׳' },
]

const FAQ = [
  { question: 'האם השיעורים מתאימים לכיתה ז, ח וגם ט?', answer: 'כן - אני מלמד את כל כיתות חטיבת הביניים. התוכנית מותאמת לחומר הספציפי של הכיתה ולפערים האישיים של הילד.' },
  { question: 'איך עובד שיעור אונליין לילד?', answer: 'שיעורים ב-Teams עם שיתוף מסך בזמן אמת - הילד רואה את ההסבר בזמן אמת ומתרגל ישירות, ממש כמו שיעור פרונטלי. בסוף כל שיעור מקבלים PDF עם כל מה שנלמד וגישה להקלטה של השיעור.' },
  { question: 'כמה שיעורים בשבוע מומלץ?', answer: 'בדרך כלל שיעור אחד עד שניים בשבוע, תלוי ברמת הפערים ובמטרות. נקבע ביחד אחרי שיעור ההיכרות.' },
  { question: 'מה קורה אם הילד מפספס שיעור?', answer: 'ניתן לבטל שיעור עד 24 שעות לפני המועד המתוכנן ללא חיוב. ביטול מאוחר יותר יחויב בתשלום מלא. במקרים חריגים ניתן לתאם שיעור חלופי. כל שיעור גם מוקלט - הילד תמיד יכול לחזור על החומר.' },
]

export default function MiddleSchoolPage() {
  const variant = cookies().get(cookieNameFor('middle-school'))?.value
  const hero = getLandingVariant('middle-school', variant === 'b' || variant === 'c' ? variant : 'a')
  const faq = variant === 'c' ? [...FAQ, PRICE_FAQ_ITEM] : FAQ

  return (
    <>
      <UrgencyStrip />
      <LandingHero {...hero} />
      <LandingStats />
      <LandingBenefits title="למה הורים בוחרים ב-Matematic לילדים שלהם?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="רוצים לראות שינוי?" variant={variant} />
      <LandingFAQ items={faq} />
      <LandingContact
        defaultLevel="middle-school"
        headline="השאירו פרטים - נתאם שיעור היכרות לילד"
        variant={variant}
      />
      <StickyMobileCTA variant={variant} />
      <StickyContactSidebar variant={variant} />
    </>
  )
}
