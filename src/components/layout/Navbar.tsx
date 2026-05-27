import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  BookOpen,
  Calculator,
  Leaf,
  Home,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  key: string
  path: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { key: 'nav.home',         path: '/',           icon: <Home size={16} /> },
  { key: 'nav.encyclopedia', path: '/lexikon',      icon: <BookOpen size={16} /> },
  { key: 'nav.calculator',   path: '/rechner',      icon: <Calculator size={16} /> },
  { key: 'nav.conservation', path: '/schutzprojekte', icon: <Leaf size={16} /> },
  { key: 'nav.legal',        path: '/impressum',    icon: <FileText size={16} /> },
]

interface NavbarProps {
  darkMode: boolean
  onToggleDark: () => void
}

export default function Navbar({ darkMode, onToggleDark }: NavbarProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de')
  }

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || mobileOpen
          ? 'bg-white/95 dark:bg-bamboo-950/95 backdrop-blur-md border-b border-bamboo-100 dark:border-bamboo-800 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Hauptnavigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500 rounded-lg"
            aria-label="BambooBay - Zur Startseite"
          >
            <div className="w-8 h-8 rounded-full bg-bamboo-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              <div className="w-4 h-4 relative">
                <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-panda-dark" />
                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-panda-dark" />
                <div className="absolute bottom-0 left-0.5 right-0.5 h-2 rounded-full bg-panda-white" />
              </div>
            </div>
            <span className="font-display text-xl font-semibold text-bamboo-800 dark:text-bamboo-100 group-hover:text-bamboo-600 dark:group-hover:text-bamboo-300 transition-colors">
              BambooBay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-body font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500',
                  location.pathname === item.path
                    ? 'bg-bamboo-100 dark:bg-bamboo-900 text-bamboo-700 dark:text-bamboo-300'
                    : 'text-panda-gray dark:text-bamboo-400 hover:bg-bamboo-50 dark:hover:bg-bamboo-900 hover:text-bamboo-700 dark:hover:text-bamboo-200'
                )}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.icon}
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              aria-label={t('nav.toggleDark')}
              title={i18n.language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
              className="hidden sm:inline-flex"
            >
              <Globe size={16} />
              <span className="ml-1 text-xs font-mono font-medium">
                {i18n.language === 'de' ? 'EN' : 'DE'}
              </span>
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDark}
              aria-label={t('nav.toggleDark')}
              title={t('nav.toggleDark')}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile Navigation"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen 
              ? 'max-h-96 opacity-100 bg-white dark:bg-bamboo-950' 
              : 'max-h-0 opacity-0'
          )}
        >
          <div className="pb-4 pt-2 space-y-1 border-t border-bamboo-100 dark:border-bamboo-800 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-medium transition-all duration-150',
                  location.pathname === item.path
                    ? 'bg-bamboo-100 dark:bg-bamboo-900 text-bamboo-700 dark:text-bamboo-300'
                    : 'text-panda-gray dark:text-bamboo-400 hover:bg-bamboo-50 dark:hover:bg-bamboo-900'
                )}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.icon}
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-2 border-t border-bamboo-100 dark:border-bamboo-800">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-medium text-panda-gray dark:text-bamboo-400 hover:bg-bamboo-50 dark:hover:bg-bamboo-900 w-full transition-all duration-150"
              >
                <Globe size={16} />
                {i18n.language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
