import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Leaf,
  AlertTriangle,
  TreePine,
  Users,
  Thermometer,
  Network,
  Shield,
  GraduationCap,
  Heart,
  MapPin,
  Target,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ThreatItem {
  key: string
  icon: React.ReactNode
  color: string
}

const threats: ThreatItem[] = [
  { key: 'habitat',  icon: <TreePine size={22} />,     color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' },
  { key: 'poaching', icon: <AlertTriangle size={22} />, color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400' },
  { key: 'climate',  icon: <Thermometer size={22} />,  color: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400' },
  { key: 'isolation', icon: <Network size={22} />,     color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400' },
]

interface MeasureItem {
  key: string
  icon: React.ReactNode
}

const measures: MeasureItem[] = [
  { key: 'reserves',   icon: <Shield size={20} /> },
  { key: 'corridors',  icon: <Network size={20} /> },
  { key: 'breeding',   icon: <Heart size={20} /> },
  { key: 'education',  icon: <GraduationCap size={20} /> },
]

interface ProjectItem {
  key: string
  progress: number
}

const projects: ProjectItem[] = [
  { key: 'project1', progress: 70 },
  { key: 'project2', progress: 69 },
  { key: 'project3', progress: 79 },
  { key: 'project4', progress: 100 },
]

const typeVariant = (type: string) => {
  const t = type.toLowerCase()
  if (t.includes('lebensraum') || t.includes('habitat')) return 'secondary'
  if (t.includes('schutz') || t.includes('protection')) return 'warning'
  if (t.includes('aufforstung') || t.includes('reforestation')) return 'success'
  if (t.includes('bildung') || t.includes('education')) return 'outline'
  return 'default'
}

export default function Conservation() {
  const { t } = useTranslation()

  return (
    <main id="main-content" className="min-h-screen bg-bamboo-50 dark:bg-bamboo-900 pt-20">
      {/* Header */}
      <header className="bg-white dark:bg-bamboo-950 border-b border-bamboo-100 dark:border-bamboo-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-bamboo-500 flex items-center justify-center text-white">
              <Leaf size={20} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white">
              {t('conservation.title')}
            </h1>
          </div>
          <p className="font-body text-panda-gray dark:text-bamboo-400 max-w-2xl">
            {t('conservation.subtitle')}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Threats Section */}
        <section aria-labelledby="threats-heading">
          <div className="mb-8">
            <h2
              id="threats-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-bamboo-900 dark:text-white mb-2"
            >
              {t('conservation.threats.title')}
            </h2>
            <p className="font-body text-panda-gray dark:text-bamboo-400">
              {t('conservation.threats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {threats.map((threat) => (
              <Card key={threat.key} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="pt-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${threat.color}`}
                    aria-hidden="true"
                  >
                    {threat.icon}
                  </div>
                  <h3 className="font-display text-base font-semibold text-bamboo-900 dark:text-white mb-2">
                    {t(`conservation.threats.${threat.key}.title`)}
                  </h3>
                  <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                    {t(`conservation.threats.${threat.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Measures Section */}
        <section aria-labelledby="measures-heading" className="bg-white dark:bg-bamboo-950 rounded-2xl p-8 border border-bamboo-100 dark:border-bamboo-800">
          <div className="mb-8">
            <h2
              id="measures-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-bamboo-900 dark:text-white mb-2"
            >
              {t('conservation.measures.title')}
            </h2>
            <p className="font-body text-panda-gray dark:text-bamboo-400">
              {t('conservation.measures.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {measures.map((measure) => (
              <div
                key={measure.key}
                className="flex gap-4 p-4 rounded-xl bg-bamboo-50 dark:bg-bamboo-900"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-bamboo-500 flex items-center justify-center text-white shrink-0"
                  aria-hidden="true"
                >
                  {measure.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-bamboo-900 dark:text-white mb-1">
                    {t(`conservation.measures.${measure.key}.title`)}
                  </h3>
                  <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                    {t(`conservation.measures.${measure.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section aria-labelledby="projects-heading">
          <div className="mb-3">
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-bamboo-900 dark:text-white mb-2"
            >
              {t('conservation.projects.title')}
            </h2>
            <p className="font-body text-panda-gray dark:text-bamboo-400 mb-3">
              {t('conservation.projects.subtitle')}
            </p>
          </div>

          {/* Disclaimer */}
          <div
            className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 mb-8"
            role="note"
          >
            <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
            <p className="font-body text-sm text-amber-700 dark:text-amber-300">
              {t('conservation.projects.disclaimer')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project) => {
              const progress = project.progress
              const isComplete = progress >= 100
              const typeLabel = t(`conservation.projects.${project.key}.type`)

              return (
                <Card
                  key={project.key}
                  className="hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  {/* Image Placeholder */}
                  <div className="w-full h-36 bg-bamboo-100 dark:bg-bamboo-900" aria-hidden="true" />

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg">
                        {t(`conservation.projects.${project.key}.title`)}
                      </CardTitle>
                      <Badge variant={typeVariant(typeLabel) as 'default' | 'secondary' | 'warning' | 'success' | 'outline'}>
                        {typeLabel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-bamboo-500 font-body">
                      <MapPin size={12} aria-hidden="true" />
                      {t(`conservation.projects.${project.key}.location`)}
                    </div>
                    <CardDescription>
                      {t(`conservation.projects.${project.key}.description`)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Target size={12} className="text-bamboo-500" aria-hidden="true" />
                          <span className="font-body text-xs text-panda-gray dark:text-bamboo-400">
                            {t(`conservation.projects.${project.key}.raised`)} von {t(`conservation.projects.${project.key}.goal`)}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-medium text-bamboo-600 dark:text-bamboo-400">
                          {progress}%
                        </span>
                      </div>
                      <div
                        className="w-full h-2 rounded-full bg-bamboo-100 dark:bg-bamboo-800 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${t(`conservation.projects.${project.key}.title`)}: ${progress}%`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${isComplete ? 'bg-green-500' : 'bg-bamboo-500'}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        aria-label={`${t('conservation.projects.adopt')}: ${t(`conservation.projects.${project.key}.title`)}`}
                      >
                        <Heart size={14} />
                        {t('conservation.projects.adopt')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        aria-label={`${t('conservation.projects.donate')}: ${t(`conservation.projects.${project.key}.title`)}`}
                      >
                        <Users size={14} />
                        {t('conservation.projects.donate')}
                      </Button>
                    </div>

                    {isComplete && (
                      <p className="text-center font-body text-xs text-green-600 dark:text-green-400 font-medium">
                        Ziel erreicht - Vielen Dank!
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
