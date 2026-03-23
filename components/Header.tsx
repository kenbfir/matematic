'use client'

import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-max flex items-center justify-between h-16 px-4 md:px-8">
        <a href="#" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-accent" />
          <span className="text-xl font-bold text-primary">LevelUp</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-light hover:text-primary transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            שיעור ניסיון במחיר מוזל
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-light hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-accent hover:bg-accent-dark text-white px-5 py-3 rounded-lg font-medium text-center transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              שיעור ניסיון במחיר מוזל
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
