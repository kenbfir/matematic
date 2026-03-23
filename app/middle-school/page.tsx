import type { Metadata } from 'next'
import LandingHero from '@/components/LandingHero'
import LandingBenefits from '@/components/LandingBenefits'
import LandingTestimonials from '@/components/LandingTestimonials'
import LandingContact from '@/components/LandingContact'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileCTA from '@/components/StickyMobileCTA'

export const metadata: Metadata = {
  title: 'מורה פרטי למתמטיקה — חטיבת ביניים כיתות ז׳-ט׳ | שיעורים אונליין | LevelUp',
  description:
    'שיעורים פרטיים במתמטיקה לחטיבת ביניים — כיתות ז, ח, ט. בניית בסיס חזק, הכנה למבחנים, ולמידה בלי חרדות. מורה מנוסה עם תואר בהצטיינות. שיעור ניסיון במחיר מוזל!',
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
  { icon: 'Target', title: 'מותאם לקצב של הילד', description: 'כל ילד לומד בקצב שלו. אני מזהה את הפערים ובונה תוכנית ממוקדת' },
  { icon: 'TrendingUp', title: 'בניית ביטחון עצמי', description: 'התלמידים שלי לא רק משתפרים בציונים — הם מתחילים להאמין שהם יכולים' },
  { icon: 'BookOpen', title: 'הכנה למבחנים', description: 'תרגול ממוקד למבחנים בית-ספריים ולמיצ"ב, עם טכניקות שעובדות' },
  { icon: 'Monitor', title: 'שיעורים מהבית', description: 'אונליין ב-Teams — ההורים יכולים להיות רגועים והילד לומד בנוחות' },
  { icon: 'Award', title: 'בסיס חזק לתיכון', description: 'מתמטיקה חזקה בחטיבה = כניסה חזקה לתיכון ולרמה גבוהה בבגרות' },
]

const TESTIMONIALS = [
  {
    quote: 'הבן שלי היה שונא מתמטיקה. אחרי חודשיים עם בן, הוא מחכה לשיעורים איתו. תודה רבה!!',
    name: 'מיכל ר.',
    detail: 'אמא של תלמיד כיתה ח׳',
    improvement: 'שינוי גישה מוחלט',
  },
  {
    quote: 'בזכות בן עליתי מ-62 ל-89 בבגרות 4 יחידות. הוא הסביר בצורה שסוף סוף הבנתי את החומר.',
    name: 'יעל כ.',
    detail: 'התחילה בחטיבה, המשיכה לבגרות',
    improvement: 'מ-62 ל-89',
  },
]

export default function MiddleSchoolPage() {
  return (
    <>
      <LandingHero
        badge="הורים ממליצים — דירוג 5 כוכבים"
        headline="מורה פרטי למתמטיקה לחטיבת ביניים —"
        highlightedWord="בסיס חזק, בלי פחד"
        subheadline="הילד שלכם מתקשה במתמטיקה? עם הגישה הנכונה, כל ילד יכול להצליח. שיעורים פרטיים אונליין לכיתות ז׳-ט׳ עם מורה מנוסה שיודע לגרום לילדים לאהוב מתמטיקה."
        bullets={[
          'מותאם לקצב הילד',
          'שיפור ביטחון עצמי',
          'הכנה למבחנים ולמיצ"ב',
          'בנוחות מהבית',
        ]}
      />
      <LandingBenefits title="למה הורים בוחרים ב-LevelUp לילדים שלהם?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <LandingContact defaultLevel="middle-school" headline="השאירו פרטים — נתאם שיעור היכרות לילד" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
