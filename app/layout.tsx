import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import Analytics from '@/components/Analytics'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  display: 'swap',
  variable: '--font-heebo',
})

export const metadata: Metadata = {
  title: 'Matematic | מורה פרטי למתמטיקה אונליין - בן כפיר',
  description:
    'שיעורים פרטיים במתמטיקה אונליין עם בן כפיר. הכנה לבגרות, חטיבת ביניים, קורסים אקדמיים ותוכנית מצטיינים. שיעור ניסיון במחיר מוזל!',
  keywords: [
    'מורה פרטי למתמטיקה',
    'שיעורים פרטיים מתמטיקה אונליין',
    'הכנה לבגרות מתמטיקה',
    'בגרות מתמטיקה 5 יחידות',
    'בגרות מתמטיקה 4 יחידות',
    'בגרות מתמטיקה 3 יחידות',
    'מתמטיקה לחטיבת ביניים',
    'קורס מתמטיקה אקדמי',
  ],
  openGraph: {
    title: 'Matematic | מורה פרטי למתמטיקה אונליין - בן כפיר',
    description:
      'שיעורים פרטיים במתמטיקה אונליין. הכנה לבגרות, חטיבת ביניים, קורסים אקדמיים. שיעור ניסיון במחיר מוזל!',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Matematic',
              description: 'שיעורים פרטיים במתמטיקה אונליין',
              founder: {
                '@type': 'Person',
                name: 'בן כפיר',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Israel',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'מסלולי לימוד',
                itemListElement: [
                  {
                    '@type': 'Course',
                    name: 'הכנה לבגרות מתמטיקה',
                    description: 'הכנה לבגרות מתמטיקה 3, 4, 5 יחידות',
                  },
                  {
                    '@type': 'Course',
                    name: 'מתמטיקה לחטיבת ביניים',
                    description: 'שיעורים פרטיים למתמטיקה כיתות ז-ט',
                  },
                  {
                    '@type': 'Course',
                    name: 'קורסים אקדמיים במתמטיקה',
                    description:
                      'חשבון אינפיניטסימלי, אלגברה לינארית, סטטיסטיקה',
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${heebo.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
