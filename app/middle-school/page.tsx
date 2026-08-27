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
  title: 'מורה פרטי למתמטיקה - חטיבת ביניים כיתות ז׳-ט׳ | שיעורים אונליין | Matematic',
  description:
    'שיעורים פרטיים במתמטיקה לחטיבת ביניים - כיתות ז, ח, ט. בניית בסיס חזק, הכנה למבחנים, ולמידה בלי חרדות. מורה מנוסה עם תואר בהצטיינות. שיעור ניסיון ב-₪99!',
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
  { question: 'כמה עולה שיעור ניסיון?', answer: 'שיעור הניסיון עולה ₪99 בלבד - ללא התחייבות לשיעורים נוספים. בשיעור נאבחן את הרמה ונבנה תוכנית מותאמת לילד.' },
  { question: 'האם השיעורים מתאימים לכיתה ז, ח וגם ט?', answer: 'כן - אני מלמד את כל כיתות חטיבת הביניים. התוכנית מותאמת לחומר הספציפי של הכיתה ולפערים האישיים של הילד.' },
  { question: 'איך עובד שיעור אונליין לילד?', answer: 'שיעורים ב-Teams עם לוח לבן דיגיטלי - ממש כמו לוח בכיתה, רק על המחשב. הילד מקבל PDF עם כל מה שנלמד בסוף כל שיעור.' },
  { question: 'כמה שיעורים בשבוע מומלץ?', answer: 'בדרך כלל שיעור אחד עד שניים בשבוע, תלוי ברמת הפערים ובמטרות. נקבע ביחד אחרי שיעור ההיכרות.' },
  { question: 'מה קורה אם הילד מפספס שיעור?', answer: 'ניתן לבטל שיעור עד 24 שעות מראש ללא חיוב. ביטול מאוחר יותר יחויב. כל שיעור מוקלט - הילד תמיד יכול לחזור על החומר.' },
]

export default function MiddleSchoolPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={3} month="מאי" />
      <LandingHero
        badge="הורים ממליצים - דירוג 5 כוכבים"
        headline="מורה פרטי למתמטיקה לחטיבת ביניים -"
        highlightedWord="הילד שלכם יכול לאהוב מתמטיקה"
        subheadline="כל ילד יכול להצליח במתמטיקה עם הגישה הנכונה. שיעורים פרטיים אונליין לכיתות ז׳-ט׳ עם מורה מנוסה שבונה ביטחון אמיתי - ומביא תוצאות."
        bullets={['מותאם לקצב הילד', 'שיפור ביטחון עצמי', 'הכנה למבחנים ולמיצ"ב', 'שיעור ניסיון ב-₪99']}
        ctaText="שיעור ניסיון - ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה הורים בוחרים ב-Matematic לילדים שלהם?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="רוצים לראות שינוי? שיעור ניסיון ב-₪99 ללא התחייבות" />
      <LandingFAQ items={FAQ} />
      <LandingContact defaultLevel="middle-school" headline="השאירו פרטים - נתאם שיעור היכרות לילד" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
