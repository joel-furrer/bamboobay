import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Leaf, BookOpen, Calculator, FileText, Home, ArrowUp } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      role="contentinfo"
      className="bg-bamboo-950 dark:bg-black text-bamboo-100 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-bamboo-500 flex items-center justify-center">
                <div className="w-4 h-4 relative">
                  <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-panda-dark" />
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-panda-dark" />
                  <div className="absolute bottom-0 left-0.5 right-0.5 h-2 rounded-full bg-panda-white" />
                </div>
              </div>
              <span className="font-display text-xl font-semibold text-white">
                BambooBay
              </span>
            </div>
            <p className="text-bamboo-400 text-sm font-body leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <p className="text-bamboo-500 text-xs font-body mt-3">
              {t('footer.madeWith')}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-display font-semibold text-bamboo-200 mb-4 text-sm uppercase tracking-wider">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-sm text-bamboo-400 hover:text-bamboo-200 transition-colors duration-150 font-body"
                >
                  <Home size={14} />
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/lexikon"
                  className="flex items-center gap-2 text-sm text-bamboo-400 hover:text-bamboo-200 transition-colors duration-150 font-body"
                >
                  <BookOpen size={14} />
                  {t('nav.encyclopedia')}
                </Link>
              </li>
              <li>
                <Link
                  to="/rechner"
                  className="flex items-center gap-2 text-sm text-bamboo-400 hover:text-bamboo-200 transition-colors duration-150 font-body"
                >
                  <Calculator size={14} />
                  {t('nav.calculator')}
                </Link>
              </li>
              <li>
                <Link
                  to="/schutzprojekte"
                  className="flex items-center gap-2 text-sm text-bamboo-400 hover:text-bamboo-200 transition-colors duration-150 font-body"
                >
                  <Leaf size={14} />
                  {t('nav.conservation')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold text-bamboo-200 mb-4 text-sm uppercase tracking-wider">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/impressum"
                  className="flex items-center gap-2 text-sm text-bamboo-400 hover:text-bamboo-200 transition-colors duration-150 font-body"
                >
                  <FileText size={14} />
                  {t('nav.legal')}
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={scrollToTop}
                aria-label={t('common.backToTop')}
                className="flex items-center gap-2 text-xs text-bamboo-500 hover:text-bamboo-300 transition-colors duration-150 font-body"
              >
                <ArrowUp size={12} />
                {t('common.backToTop')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-bamboo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-bamboo-500 text-xs font-body">
            © Leroy [Nachname] - {t('footer.rights')}
          </p>
          <p className="text-bamboo-600 text-xs font-mono">
            BambooBay v1.0.0
          </p>
        </div>
      </div>
    </footer>
  )
}
