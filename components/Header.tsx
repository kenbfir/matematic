'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import Logo from '@/components/Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-primary shadow-md shadow-primary/20">
      <div className="container-max flex items-center justify-between h-24 px-4 md:px-8">
        <a href="#">
          <Logo size="md" variant="inline" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/75 hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-accent hover:bg-accent-dark text-gray-900 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors cta-glow"
          >
            קביעת שיעור
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-primary-dark border-t border-white/10 px-4 py-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/75 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-accent hover:bg-accent-dark text-gray-900 px-5 py-3 rounded-lg font-medium text-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              קביעת שיעור
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
