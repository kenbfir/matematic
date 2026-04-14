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
  title: 'הכנה לבגרות במתמטיקה | 3, 4, 5 יחידות — שיעורים פרטיים אונליין | Math+',
  description:
    'שיעורים פרטיים במתמטיקה לבגרות — 3, 4, 5 יחידות. מורה פרטי עם 100 בבגרות ותואר בהצטיינות. שיטה מוכחת, ליווי אישי, ולמידה בלי חרדות. שיעור ניסיון ב-₪99!',
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
  { icon: 'BookOpen', title: 'בגרויות אמיתיות', description: 'עובדים על מבחני בגרות משנים קודמות, חוסכים טעויות נפוצות וחוסכים נקודות' },
  { icon: 'Monitor', title: 'אונליין מהבית', description: 'שיעורים ב-Teams עם לוח לבן דיגיטלי — בנוחות מהסלון, בלי נסיעות' },
  { icon: 'TrendingUp', title: 'תוצאות מוכחות', description: 'תלמידים שיפרו בממוצע 25 נקודות בציון הבגרות — עם שיטה ממוקדת' },
  { icon: 'Award', title: 'מורה שהיה שם', description: 'עליתי מ-3 ל-5 יחידות וקיבלתי 100 בבגרות. אני יודע בדיוק מה צריך לעשות' },
]

const TESTIMONIALS = [
  { quote: 'בן תודה רבה על הכל!! עליתי מ-62 ל-89 בבגרות, בלעדיך לא הייתי מצליחה. סוף סוף הבנתי את החומר 🙏', name: 'יעל כ.', detail: 'בגרות 4 יחידות', improvement: 'מ-62 ל-89' },
  { quote: 'בן אני חייבת להגיד לך תודה!! קיבלתי 94 בבגרות 5 יחידות. נכנסתי לבחינה בביטחון מלא, הכל בזכותך ❤️', name: 'נועה ש.', detail: 'בגרות 5 יחידות', improvement: 'ציון 94' },
  { quote: 'בן תודה אחי!! התחלתי את השנה עם 54 ועכשיו סיימתי עם 85. בלי השיעורים איתך לא הייתי מגיע לשם 🙏', name: 'תומר א.', detail: 'בגרות 3 יחידות', improvement: 'מ-54 ל-85' },
  { quote: 'בן תודה רבה על הסבלנות עם הבת שלי! היא הייתה בלחץ רציני והצלחת להרגיע אותה. קיבלה 88 בבגרות!!', name: 'רונית מ.', detail: 'אמא של תלמידת בגרות 4 יח׳', improvement: 'ציון 88' },
]

const FAQ = [
  { question: 'כמה עולה שיעור ניסיון?', answer: 'שיעור הניסיון עולה ₪99 בלבד — ללא התחייבות לשיעורים נוספים. בשיעור נאבחן את הרמה ונבנה תוכנית מותאמת.' },
  { question: 'לאיזו יחידות אתה מכין?', answer: 'אני מכין לכל הרמות — 3, 4 ו-5 יחידות. כל תוכנית לימודים מותאמת לרמה הספציפית ולסילבוס הבחינה.' },
  { question: 'כמה זמן לפני הבגרות כדאי להתחיל?', answer: 'ככל שמוקדם יותר — יותר טוב. אבל גם עם 4-6 שבועות לפני הבחינה ניתן לשפר משמעותית. יצרת קשר? נבנה תוכנית ריאלית.' },
  { question: 'איך עובדים השיעורים?', answer: 'שיעורים ב-Teams עם לוח כתיבה דיגיטלי משותף. בסוף כל שיעור מקבלים PDF של כל מה שנלמד + גישה להקלטה.' },
  { question: 'מה אם לא מרוצה מהשיעור הראשון?', answer: 'אם שיעור הניסיון לא עמד בציפיות — לא תשלם. פשוט ככה. אין סיכון.' },
]

export default function BagrutPage() {
  return (
    <>
      <UrgencyStrip spotsLeft={3} month="מאי" />
      <LandingHero
        badge="100 בבגרות 5 יחידות — המורה שהיה שם"
        headline="הכנה לבגרות במתמטיקה —"
        highlightedWord="להיכנס לבחינה בביטחון מלא"
        subheadline="שיעורים פרטיים אונליין ל-3, 4, 5 יחידות עם מורה שעלה מ-3 יחידות ל-100 בבגרות ותואר בהצטיינות מהאוניברסיטה העברית. שיטה מוכחת, ליווי אישי עד יום הבחינה."
        bullets={['שיפור ממוצע 25 נקודות', 'ליווי עד יום הבחינה', 'שיעור ניסיון ב-₪99', 'זמינות מלאה לכל שאלה']}
        ctaText="שיעור ניסיון — ₪99 בלבד"
      />
      <LandingStats />
      <LandingBenefits title="למה תלמידי בגרות בוחרים ב-Math+?" benefits={BENEFITS} />
      <LandingTestimonials testimonials={TESTIMONIALS} />
      <TrialCTABlock headline="מוכן לשפר את ציון הבגרות? שיעור ניסיון ב-₪99" />
      <LandingFAQ items={FAQ} />
      <LandingContact defaultLevel="bagrut-5" headline="השאירו פרטים — נבנה תוכנית הכנה לבגרות" />
      <WhatsAppButton />
      <StickyMobileCTA />
    </>
  )
}
