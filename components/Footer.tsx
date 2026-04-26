import { MessageCircle, Phone, Mail } from 'lucide-react'
import Logo from '@/components/Logo'
import { NAV_LINKS, WHATSAPP_URL, PHONE_NUMBER } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 px-4 md:px-8">
      <div className="container-max">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo size="sm" variant="inline" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              שיעורים פרטיים במתמטיקה אונליין.
              <br />
              הכנה לבגרות, חטיבת ביניים, אקדמיה ותוכנית מצטיינים.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">ניווט מהיר</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">יצירת קשר</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="ltr-nums">{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@levelup-math.co.il"
                  className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span dir="ltr">info@levelup-math.co.il</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} מתמטיק - בן כפיר. כל הזכויות שמורות.</p>
          <a href="#" className="hover:text-white/60 transition-colors">
            מדיניות פרטיות
          </a>
        </div>
      </div>
    </footer>
  )
}
