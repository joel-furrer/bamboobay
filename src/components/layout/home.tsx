import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Leaf,
  Zap,
  ChevronDown,
  TrendingUp,
  Eye,
  Sprout,
  Star,
  Clock,
  Grip,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StatItem {
  value: string
  labelKey: string
  icon: React.ReactNode
}

const stats: StatItem[] = [
  { value: '1'864', labelKey: 'home.stats.wild',     icon: <Eye size={20} /> },
  { value: '~10'000', labelKey: 'home.stats.redPanda', icon: <TrendingUp size={20} /> },
  { value: '67+',    labelKey: 'home.stats.reserves', icon: <Leaf size={20} /> },
  { value: '12-38',  labelKey: 'home.stats.bamboo',   icon: <Sprout size={20} /> },
]

export default function Home() {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            entry.target.classList.remove('opacity-0-initial')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section
        ref={heroRef}
        aria-label="Hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bamboo-50 via-white to-bamboo-100 dark:from-bamboo-950 dark:via-bamboo-950 dark:to-bamboo-900" />
        <div className="absolute inset-0 opacity-30 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(120 47% 42% / 0.15) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, hsl(120 47% 42% / 0.1) 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, hsl(120 47% 42% / 0.08) 0%, transparent 40%)`
          }}
        />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-bamboo-200/20 dark:bg-bamboo-800/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-bamboo-300/15 dark:bg-bamboo-700/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <div
            data-animate
            className="opacity-0-initial inline-flex items-center gap-2 bg-bamboo-100 dark:bg-bamboo-900 text-bamboo-700 dark:text-bamboo-300 rounded-full px-4 py-1.5 text-sm font-body font-medium mb-8 border border-bamboo-200 dark:border-bamboo-700"
          >
            <Star size={14} />
            {t('home.hero.badge')}
          </div>

          {/* Title */}
          <h1
            data-animate
            className="opacity-0-initial font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-bamboo-900 dark:text-white leading-tight tracking-tight text-balance mb-6 animate-delay-100"
          >
            {t('home.hero.title')}
          </h1>

          {/* Subtitle */}
          <p
            data-animate
            className="opacity-0-initial font-body text-lg sm:text-xl text-panda-gray dark:text-bamboo-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-delay-200"
          >
            {t('home.hero.subtitle')}
          </p>

          {/* CTAs */}
          <div
            data-animate
            className="opacity-0-initial flex flex-col sm:flex-row items-center justify-center gap-4 animate-delay-300"
          >
            <Button asChild size="xl">
              <Link to="/lexikon" className="flex items-center gap-2">
                <BookOpen size={18} />
                {t('home.hero.cta')}
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link to="/rechner">
                <Calculator size={18} />
                {t('home.hero.ctaSecondary')}
              </Link>
            </Button>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-bamboo-400 dark:text-bamboo-600">
            <span className="text-xs font-body">{t('home.hero.scrollHint')}</span>
            <ChevronDown size={20} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section aria-label={t('home.stats.title')} className="py-16 bg-bamboo-500 dark:bg-bamboo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-white text-center mb-10">
            {t('home.stats.title')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.labelKey}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white mb-3 group-hover:bg-white/30 transition-colors duration-200">
                  {stat.icon}
                </div>
                <div className="font-display text-3xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-bamboo-200 leading-tight">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section aria-label={t('home.features.title')} className="py-24 bg-white dark:bg-bamboo-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="font-body text-panda-gray dark:text-bamboo-400 max-w-xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Encyclopedia */}
            <Link
              to="/lexikon"
              className="group block p-6 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900 hover:border-bamboo-300 dark:hover:border-bamboo-600 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500"
              aria-label={t('home.features.encyclopedia.title')}
            >
              <div className="w-12 h-12 rounded-xl bg-bamboo-500 flex items-center justify-center text-white mb-4 group-hover:bg-bamboo-600 transition-colors duration-200">
                <BookOpen size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white mb-2">
                {t('home.features.encyclopedia.title')}
              </h3>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.features.encyclopedia.description')}
              </p>
            </Link>

            {/* Calculator */}
            <Link
              to="/rechner"
              className="group block p-6 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900 hover:border-bamboo-300 dark:hover:border-bamboo-600 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500"
              aria-label={t('home.features.calculator.title')}
            >
              <div className="w-12 h-12 rounded-xl bg-bamboo-500 flex items-center justify-center text-white mb-4 group-hover:bg-bamboo-600 transition-colors duration-200">
                <Calculator size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white mb-2">
                {t('home.features.calculator.title')}
              </h3>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.features.calculator.description')}
              </p>
            </Link>

            {/* Conservation */}
            <Link
              to="/schutzprojekte"
              className="group block p-6 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900 hover:border-bamboo-300 dark:hover:border-bamboo-600 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500"
              aria-label={t('home.features.conservation.title')}
            >
              <div className="w-12 h-12 rounded-xl bg-bamboo-500 flex items-center justify-center text-white mb-4 group-hover:bg-bamboo-600 transition-colors duration-200">
                <Leaf size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white mb-2">
                {t('home.features.conservation.title')}
              </h3>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.features.conservation.description')}
              </p>
            </Link>

            {/* Interactive */}
            <div className="p-6 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900">
              <div className="w-12 h-12 rounded-xl bg-bamboo-500 flex items-center justify-center text-white mb-4">
                <Zap size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white mb-2">
                {t('home.features.interactive.title')}
              </h3>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.features.interactive.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section aria-label={t('home.bento.title')} className="py-24 bg-bamboo-50 dark:bg-bamboo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white mb-4">
              {t('home.bento.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Fact 1 - Large */}
            <div className="sm:col-span-2 lg:col-span-1 bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-bamboo-100 dark:bg-bamboo-900 flex items-center justify-center text-bamboo-600 dark:text-bamboo-400 shrink-0">
                  <Eye size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white">
                  {t('home.bento.fact1.title')}
                </h3>
              </div>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.bento.fact1.text')}
              </p>
              {/* Image placeholder */}
              <div className="mt-4 w-full h-32 rounded-xl bg-bamboo-100 dark:bg-bamboo-800" aria-hidden="true" />
            </div>

            {/* Fact 2 */}
            <div className="bg-bamboo-500 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                  <Clock size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">
                  {t('home.bento.fact2.title')}
                </h3>
              </div>
              <p className="font-body text-sm text-bamboo-100 leading-relaxed">
                {t('home.bento.fact2.text')}
              </p>
            </div>

            {/* Fact 3 */}
            <div className="bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-bamboo-100 dark:bg-bamboo-900 flex items-center justify-center text-bamboo-600 dark:text-bamboo-400 shrink-0">
                  <Grip size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white">
                  {t('home.bento.fact3.title')}
                </h3>
              </div>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.bento.fact3.text')}
              </p>
            </div>

            {/* Fact 4 */}
            <div className="bg-bamboo-100 dark:bg-bamboo-800 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-bamboo-200 dark:bg-bamboo-700 flex items-center justify-center text-bamboo-700 dark:text-bamboo-300 shrink-0">
                  <Star size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white">
                  {t('home.bento.fact4.title')}
                </h3>
              </div>
              <p className="font-body text-sm text-bamboo-700 dark:text-bamboo-300 leading-relaxed">
                {t('home.bento.fact4.text')}
              </p>
            </div>

            {/* Fact 5 - Large with image placeholder */}
            <div className="sm:col-span-2 bg-bamboo-950 dark:bg-black rounded-2xl p-6 hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
              {/* Image placeholder as background */}
              <div className="absolute inset-0 bg-gradient-to-br from-bamboo-900 to-bamboo-950 opacity-80" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-bamboo-300 shrink-0">
                    <Leaf size={18} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {t('home.bento.fact5.title')}
                  </h3>
                </div>
                <p className="font-body text-sm text-bamboo-300 leading-relaxed">
                  {t('home.bento.fact5.text')}
                </p>
              </div>
            </div>

            {/* Fact 6 */}
            <div className="bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-bamboo-100 dark:bg-bamboo-900 flex items-center justify-center text-bamboo-600 dark:text-bamboo-400 shrink-0">
                  <Sprout size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold text-bamboo-900 dark:text-white">
                  {t('home.bento.fact6.title')}
                </h3>
              </div>
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('home.bento.fact6.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section aria-label="Call to Action" className="py-20 bg-white dark:bg-bamboo-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white mb-6">
            {t('nav.conservation')}
          </h2>
          <p className="font-body text-lg text-panda-gray dark:text-bamboo-400 mb-8 leading-relaxed">
            {t('conservation.subtitle')}
          </p>
          <Button asChild size="xl">
            <Link to="/schutzprojekte" className="flex items-center gap-2">
              <Leaf size={18} />
              {t('common.learnMore')}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
