import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Search,
  MapPin,
  Utensils,
  Scale,
  Clock,
  AlertTriangle,
  Filter,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Category = 'all' | 'Art' | 'Lebensraum' | 'Ernährung' | 'Species' | 'Habitat' | 'Diet'

interface EntryKey {
  id: string
  categoryKey: string
}

const entryKeys: EntryKey[] = [
  { id: 'greatPanda',           categoryKey: 'Art' },
  { id: 'redPanda',             categoryKey: 'Art' },
  { id: 'qinlingPanda',         categoryKey: 'Art' },
  { id: 'bambooBelt',           categoryKey: 'Lebensraum' },
  { id: 'habitatFragmentation', categoryKey: 'Lebensraum' },
  { id: 'bambooNutrition',      categoryKey: 'Ernährung' },
]

const statusVariant = (status: string): 'warning' | 'destructive' | 'secondary' => {
  const s = status.toLowerCase()
  if (s.includes('stark') || s.includes('critically') || s.includes('critical')) return 'destructive'
  if (s.includes('gefährdet') || s.includes('endangered') || s.includes('vulnerable')) return 'warning'
  return 'secondary'
}

function ExpandableCard({ entryId }: { entryId: string }) {
  const { t, i18n } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const lang = i18n.language
  const categoryFromTranslation = t(`encyclopedia.entries.${entryId}.category`)

  // Normalise category to English for filtering
  const normalisedCategory = (() => {
    const c = categoryFromTranslation.toLowerCase()
    if (c === 'art' || c === 'species') return 'species'
    if (c === 'lebensraum' || c === 'habitat') return 'habitat'
    if (c.includes('ernährung') || c.includes('diet') || c.includes('nutrition')) return 'diet'
    return c
  })()

  const _ = normalisedCategory // used only for filtering in parent

  const imagePath = `${import.meta.env.BASE_URL}images/encyclopedia/${entryId}.webp`

  return (
    <article
      className="bg-white dark:bg-bamboo-950 rounded-2xl border border-bamboo-100 dark:border-bamboo-800 overflow-hidden hover:shadow-md transition-shadow duration-200"
      aria-label={t(`encyclopedia.entries.${entryId}.title`)}
    >
      <div className="w-full h-44 bg-bamboo-100 dark:bg-bamboo-900 overflow-hidden relative">
        <img
          src={imagePath}
          alt={t(`encyclopedia.entries.${entryId}.title`)}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?q=80&w=600'
          }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-bamboo-900 dark:text-white mb-0.5">
              {t(`encyclopedia.entries.${entryId}.title`)}
            </h3>
            <p className="font-mono text-xs text-bamboo-500 dark:text-bamboo-500 italic">
              {t(`encyclopedia.entries.${entryId}.latin`)}
            </p>
          </div>
          <Badge variant={statusVariant(t(`encyclopedia.entries.${entryId}.status`))}>
            {t(`encyclopedia.entries.${entryId}.status`)}
          </Badge>
        </div>

        {/* Category Badge */}
        <Badge variant="outline" className="mb-4">
          {t(`encyclopedia.entries.${entryId}.category`)}
        </Badge>

        {/* Quick Info */}
        <dl className="space-y-2 mb-4">
          <div className="flex items-start gap-2">
            <dt className="sr-only">{lang === 'de' ? 'Lebensraum' : 'Habitat'}</dt>
            <MapPin size={14} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
            <dd className="font-body text-xs text-panda-gray dark:text-bamboo-400">
              {t(`encyclopedia.entries.${entryId}.habitat`)}
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="sr-only">{lang === 'de' ? 'Ernährung' : 'Diet'}</dt>
            <Utensils size={14} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
            <dd className="font-body text-xs text-panda-gray dark:text-bamboo-400">
              {t(`encyclopedia.entries.${entryId}.diet`)}
            </dd>
          </div>
          {t(`encyclopedia.entries.${entryId}.weight`) !== '-' && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">{lang === 'de' ? 'Gewicht' : 'Weight'}</dt>
              <Scale size={14} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
              <dd className="font-body text-xs text-panda-gray dark:text-bamboo-400">
                {t(`encyclopedia.entries.${entryId}.weight`)}
              </dd>
            </div>
          )}
          {t(`encyclopedia.entries.${entryId}.lifespan`) !== '-' && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">{lang === 'de' ? 'Lebenserwartung' : 'Lifespan'}</dt>
              <Clock size={14} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
              <dd className="font-body text-xs text-panda-gray dark:text-bamboo-400">
                {t(`encyclopedia.entries.${entryId}.lifespan`)}
              </dd>
            </div>
          )}
        </dl>

        {/* Description (expandable) */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            expanded ? 'max-h-96' : 'max-h-0'
          )}
          id={`entry-desc-${entryId}`}
        >
          <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed mb-4">
            {t(`encyclopedia.entries.${entryId}.description`)}
          </p>
        </div>

        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`entry-desc-${entryId}`}
          className="w-full justify-between text-bamboo-600 dark:text-bamboo-400"
        >
          {expanded ? t('common.learnMore').replace('Mehr erfahren', 'Weniger anzeigen').replace('Learn more', 'Show less') : t('encyclopedia.readMore')}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
      </div>
    </article>
  )
}

export default function Encyclopedia() {
  const { t, i18n } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<Category>('all')

  const filters: { key: Category; label: string }[] = [
    { key: 'all',          label: t('encyclopedia.filterAll') },
    { key: 'Art',          label: t('encyclopedia.filterGreat') },
    { key: 'Lebensraum',   label: t('encyclopedia.filterHabitat') },
    { key: 'Ernährung',    label: t('encyclopedia.filterDiet') },
  ]

  const filteredEntries = useMemo(() => {
    return entryKeys.filter(({ id }) => {
      const title       = t(`encyclopedia.entries.${id}.title`).toLowerCase()
      const description = t(`encyclopedia.entries.${id}.description`).toLowerCase()
      const habitat     = t(`encyclopedia.entries.${id}.habitat`).toLowerCase()
      const category    = t(`encyclopedia.entries.${id}.category`).toLowerCase()
      const query       = searchQuery.toLowerCase()

      const matchesSearch =
        !searchQuery ||
        title.includes(query) ||
        description.includes(query) ||
        habitat.includes(query)

      const matchesFilter = (() => {
        if (activeFilter === 'all') return true
        const filterLower = activeFilter.toLowerCase()
        if (filterLower === 'art' || filterLower === 'species') {
          return category === 'art' || category === 'species'
        }
        if (filterLower === 'lebensraum' || filterLower === 'habitat') {
          return category === 'lebensraum' || category === 'habitat'
        }
        if (filterLower === 'ernährung' || filterLower === 'diet') {
          return category === 'ernährung' || category === 'diet' || category === 'nutrition' || category === 'ernâhrung'
        }
        return category.includes(filterLower)
      })()

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter, t, i18n.language])

  return (
    <main id="main-content" className="min-h-screen bg-bamboo-50 dark:bg-bamboo-900 pt-20">
      {/* Header */}
      <header className="bg-white dark:bg-bamboo-950 border-b border-bamboo-100 dark:border-bamboo-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-bamboo-500 flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white">
              {t('encyclopedia.title')}
            </h1>
          </div>
          <p className="font-body text-panda-gray dark:text-bamboo-400 max-w-2xl">
            {t('encyclopedia.subtitle')}
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-bamboo-400 pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder={t('encyclopedia.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              aria-label={t('encyclopedia.search')}
            />
          </div>
          <div
            role="group"
            aria-label={t('encyclopedia.filterAll')}
            className="flex items-center gap-2 flex-wrap"
          >
            <Filter size={16} className="text-bamboo-500 shrink-0" aria-hidden="true" />
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500',
                  activeFilter === f.key
                    ? 'bg-bamboo-500 text-white shadow-sm'
                    : 'bg-white dark:bg-bamboo-950 text-bamboo-700 dark:text-bamboo-300 border border-bamboo-200 dark:border-bamboo-700 hover:border-bamboo-400 dark:hover:border-bamboo-500'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="font-body text-sm text-bamboo-500 dark:text-bamboo-500 mb-6" aria-live="polite">
          {filteredEntries.length}{' '}
          {filteredEntries.length === 1 ? 'Eintrag' : 'Einträge'}
        </p>

        {/* Grid */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-20">
            <AlertTriangle size={32} className="text-bamboo-400 mx-auto mb-4" aria-hidden="true" />
            <p className="font-body text-panda-gray dark:text-bamboo-400">
              {t('encyclopedia.noResults')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntries.map(({ id }) => (
              <ExpandableCard key={id} entryId={id} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
