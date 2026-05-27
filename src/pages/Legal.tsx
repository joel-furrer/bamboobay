import React from 'react'
import { useTranslation } from 'react-i18next'
import { FileText, Shield, AlertCircle, User, Mail, MapPin, Info } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface LegalSection {
  titleKey: string
  textKey: string
}

const privacySections: LegalSection[] = [
  { titleKey: 'legal.privacy.section1.title', textKey: 'legal.privacy.section1.text' },
  { titleKey: 'legal.privacy.section2.title', textKey: 'legal.privacy.section2.text' },
  { titleKey: 'legal.privacy.section3.title', textKey: 'legal.privacy.section3.text' },
  { titleKey: 'legal.privacy.section4.title', textKey: 'legal.privacy.section4.text' },
  { titleKey: 'legal.privacy.section5.title', textKey: 'legal.privacy.section5.text' },
  { titleKey: 'legal.privacy.section6.title', textKey: 'legal.privacy.section6.text' },
]

export default function Legal() {
  const { t } = useTranslation()

  return (
    <main id="main-content" className="min-h-screen bg-bamboo-50 dark:bg-bamboo-900 pt-20">
      {/* Header */}
      <header className="bg-white dark:bg-bamboo-950 border-b border-bamboo-100 dark:border-bamboo-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-bamboo-500 flex items-center justify-center text-white">
              <FileText size={20} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white">
              {t('legal.title')}
            </h1>
          </div>
          <p className="font-body text-panda-gray dark:text-bamboo-400 max-w-2xl">
            {t('legal.subtitle')}
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Imprint Section */}
        <section aria-labelledby="imprint-heading">
          <div className="bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center gap-3 p-6 border-b border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900">
              <User size={18} className="text-bamboo-500" aria-hidden="true" />
              <h2
                id="imprint-heading"
                className="font-display text-xl font-semibold text-bamboo-900 dark:text-white"
              >
                {t('legal.imprint.title')}
              </h2>
            </div>

            <dl className="divide-y divide-bamboo-100 dark:divide-bamboo-800">
              {/* Owner */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 px-6 py-4">
                <dt className="font-body font-medium text-sm text-bamboo-600 dark:text-bamboo-400 sm:w-40 shrink-0">
                  {t('legal.imprint.owner')}
                </dt>
                <dd className="font-body text-sm text-panda-gray dark:text-bamboo-300">
                  {t('legal.imprint.ownerName')}
                </dd>
              </div>

              {/* Address */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 px-6 py-4">
                <dt className="font-body font-medium text-sm text-bamboo-600 dark:text-bamboo-400 sm:w-40 shrink-0 flex items-center gap-1.5">
                  <MapPin size={12} aria-hidden="true" />
                  {t('legal.imprint.address')}
                </dt>
                <dd className="font-body text-sm text-panda-gray dark:text-bamboo-300">
                  {t('legal.imprint.addressValue')}
                </dd>
              </div>

              {/* Contact */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 px-6 py-4">
                <dt className="font-body font-medium text-sm text-bamboo-600 dark:text-bamboo-400 sm:w-40 shrink-0 flex items-center gap-1.5">
                  <Mail size={12} aria-hidden="true" />
                  {t('legal.imprint.contact')}
                </dt>
                <dd className="font-body text-sm">
                  
                    href={`mailto:${t('legal.imprint.email')}`}
                    className="text-bamboo-600 dark:text-bamboo-400 hover:text-bamboo-800 dark:hover:text-bamboo-200 underline underline-offset-4 transition-colors"
                  >
                    {t('legal.imprint.email')}
                  </a>
                </dd>
              </div>

              {/* Responsible */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 px-6 py-4">
                <dt className="font-body font-medium text-sm text-bamboo-600 dark:text-bamboo-400 sm:w-40 shrink-0">
                  {t('legal.imprint.responsible')}
                </dt>
                <dd className="font-body text-sm text-panda-gray dark:text-bamboo-300">
                  {t('legal.imprint.responsibleValue')}
                </dd>
              </div>

              {/* Copyright */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 px-6 py-4">
                <dt className="font-body font-medium text-sm text-bamboo-600 dark:text-bamboo-400 sm:w-40 shrink-0">
                  {t('legal.imprint.copyright')}
                </dt>
                <dd className="font-body text-sm text-panda-gray dark:text-bamboo-300 leading-relaxed">
                  {t('legal.imprint.copyrightValue')}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Privacy Section */}
        <section aria-labelledby="privacy-heading">
          <div className="bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center gap-3 p-6 border-b border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900">
              <Shield size={18} className="text-bamboo-500" aria-hidden="true" />
              <h2
                id="privacy-heading"
                className="font-display text-xl font-semibold text-bamboo-900 dark:text-white"
              >
                {t('legal.privacy.title')}
              </h2>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Intro */}
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('legal.privacy.intro')}
              </p>

              <Separator />

              {/* Sections */}
              {privacySections.map((section) => (
                <div key={section.titleKey}>
                  <h3 className="font-display font-semibold text-bamboo-900 dark:text-white mb-2">
                    {t(section.titleKey)}
                  </h3>
                  <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                    {t(section.textKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section aria-labelledby="disclaimer-heading">
          <div className="bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 overflow-hidden">
            <div className="flex items-center gap-3 p-6 border-b border-bamboo-100 dark:border-bamboo-800 bg-bamboo-50 dark:bg-bamboo-900">
              <AlertCircle size={18} className="text-bamboo-500" aria-hidden="true" />
              <h2
                id="disclaimer-heading"
                className="font-display text-xl font-semibold text-bamboo-900 dark:text-white"
              >
                {t('legal.disclaimer.title')}
              </h2>
            </div>
            <div className="px-6 py-6">
              <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                {t('legal.disclaimer.text')}
              </p>
            </div>
          </div>
        </section>

        {/* Note about external links */}
        <div
          className="flex items-start gap-3 p-4 rounded-xl bg-bamboo-50 dark:bg-bamboo-900 border border-bamboo-200 dark:border-bamboo-700"
          role="note"
        >
          <Info size={16} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="font-body text-xs text-bamboo-600 dark:text-bamboo-400 leading-relaxed">
            Stand dieser Erklärung: Januar 2025. Änderungen vorbehalten.
          </p>
        </div>
      </div>
    </main>
  )
}
