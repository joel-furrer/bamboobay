import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Encyclopedia from '@/pages/Encyclopedia'
import Calculator from '@/pages/Calculator'
import Conservation from '@/pages/Conservation'
import Legal from '@/pages/Legal'
import { BookOpen, Home as HomeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function NotFound() {
  const { t } = useTranslation()
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center bg-bamboo-50 dark:bg-bamboo-900 pt-16"
    >
      <div className="text-center px-4">
        <div className="font-display text-8xl font-bold text-bamboo-200 dark:text-bamboo-800 mb-4">
          404
        </div>
        <h1 className="font-display text-2xl font-semibold text-bamboo-900 dark:text-white mb-3">
          {t('common.errorTitle')}
        </h1>
        <p className="font-body text-panda-gray dark:text-bamboo-400 mb-8">
          {t('common.errorText')}
        </p>
        <Button asChild>
          <Link to="/">
            <HomeIcon size={16} />
            {t('common.backHome')}
          </Link>
        </Button>
      </div>
    </main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function AppContent({ darkMode, onToggleDark }: { darkMode: boolean; onToggleDark: () => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-bamboo-500 focus:text-white focus:rounded-lg font-body text-sm"
      >
        Zum Hauptinhalt springen
      </a>
      <ScrollToTop />
      <Navbar darkMode={darkMode} onToggleDark={onToggleDark} />
      <Routes>
        <Route path="/"                index element={<Home />} />
        <Route path="/lexikon"         element={<Encyclopedia />} />
        <Route path="/rechner"         element={<Calculator />} />
        <Route path="/schutzprojekte"  element={<Conservation />} />
        <Route path="/impressum"       element={<Legal />} />
        <Route path="*"                element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('bb-dark-mode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('bb-dark-mode', String(darkMode))
  }, [darkMode])

  const toggleDark = () => setDarkMode((prev) => !prev)

  return (
    <BrowserRouter basename="/bamboobay">
      <AppContent darkMode={darkMode} onToggleDark={toggleDark} />
    </BrowserRouter>
  )
}
