import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Calculator as CalculatorIcon,
  Info,
  Sprout,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type PandaType = 'great' | 'red'

interface PandaConfig {
  type: PandaType
  ratio: number        // fraction of body weight eaten per day
  avgWeight: number    // avg panda weight in kg
  avgBamboo: number    // avg bamboo consumption in kg/day
  stalkWeight: number  // kg per bamboo stalk
  breadWeight: number  // kg per loaf
}

const pandaConfigs: Record<PandaType, PandaConfig> = {
  great: {
    type: 'great',
    ratio: 0.30,
    avgWeight: 100,
    avgBamboo: 25,
    stalkWeight: 0.5,
    breadWeight: 0.75,
  },
  red: {
    type: 'red',
    ratio: 0.25,
    avgWeight: 4.5,
    avgBamboo: 1.1,
    stalkWeight: 0.5,
    breadWeight: 0.75,
  },
}

export default function Calculator() {
  const { t } = useTranslation()
  const [weight, setWeight] = useState<number>(70)
  const [pandaType, setPandaType] = useState<PandaType>('great')

  const config = pandaConfigs[pandaType]

  const bambooKg = useMemo(() => {
    return Math.round(weight * config.ratio * 10) / 10
  }, [weight, config.ratio])

  const loaves = useMemo(() => {
    return Math.round(bambooKg / config.breadWeight)
  }, [bambooKg, config.breadWeight])

  const stalks = useMemo(() => {
    return Math.round(bambooKg / config.stalkWeight)
  }, [bambooKg, config.stalkWeight])

  return (
    <main id="main-content" className="min-h-screen bg-bamboo-50 dark:bg-bamboo-900 pt-20">
      {/* Header */}
      <header className="bg-white dark:bg-bamboo-950 border-b border-bamboo-100 dark:border-bamboo-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-bamboo-500 flex items-center justify-center text-white">
              <CalculatorIcon size={20} />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-bamboo-900 dark:text-white">
              {t('calculator.title')}
            </h1>
          </div>
          <p className="font-body text-panda-gray dark:text-bamboo-400 max-w-2xl">
            {t('calculator.subtitle')}
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Panda Type Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculator.pandaType')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  role="radiogroup"
                  aria-label={t('calculator.pandaType')}
                  className="grid grid-cols-2 gap-3"
                >
                  {(['great', 'red'] as PandaType[]).map((type) => (
                    <button
                      key={type}
                      role="radio"
                      aria-checked={pandaType === type}
                      onClick={() => setPandaType(type)}
                      className={cn(
                        'relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500',
                        pandaType === type
                          ? 'border-bamboo-500 bg-bamboo-50 dark:bg-bamboo-900'
                          : 'border-bamboo-100 dark:border-bamboo-800 hover:border-bamboo-300 dark:hover:border-bamboo-600'
                      )}
                    >
                      {/* Panda illustration placeholder */}
                      <div
                        className={cn(
                          'w-16 h-16 rounded-full flex items-center justify-center',
                          type === 'great'
                            ? 'bg-bamboo-100 dark:bg-bamboo-800'
                            : 'bg-amber-100 dark:bg-amber-900'
                        )}
                        aria-hidden="true"
                      >
                        <Sprout
                          size={24}
                          className={
                            type === 'great'
                              ? 'text-bamboo-600 dark:text-bamboo-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }
                        />
                      </div>
                      <div className="text-center">
                        <div className="font-display font-semibold text-bamboo-900 dark:text-white text-sm">
                          {type === 'great' ? t('calculator.greatPanda') : t('calculator.redPanda')}
                        </div>
                        <div className="font-mono text-xs text-bamboo-500 mt-0.5">
                          {type === 'great' ? 'Ø 100 kg' : 'Ø 4.5 kg'}
                        </div>
                      </div>
                      {pandaType === type && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-bamboo-500" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weight Slider */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('calculator.yourWeight')}</CardTitle>
                <CardDescription>{t('calculator.sliderHint')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end justify-between mb-2">
                  <Label htmlFor="weight-slider" className="sr-only">
                    {t('calculator.yourWeight')}
                  </Label>
                  <div
                    className="font-display text-5xl font-bold text-bamboo-600 dark:text-bamboo-400 tabular-nums"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {weight}
                    <span className="text-2xl text-bamboo-400 dark:text-bamboo-600 ml-1 font-body font-normal">
                      {t('calculator.weightLabel')}
                    </span>
                  </div>
                </div>

                <Slider
                  id="weight-slider"
                  min={20}
                  max={300}
                  step={1}
                  value={[weight]}
                  onValueChange={([val]) => setWeight(val)}
                  aria-label={t('calculator.yourWeight')}
                  aria-valuemin={20}
                  aria-valuemax={300}
                  aria-valuenow={weight}
                  aria-valuetext={`${weight} kg`}
                />

                <div className="flex justify-between text-xs font-body text-bamboo-400">
                  <span>20 kg</span>
                  <span>300 kg</span>
                </div>

                {/* Quick-select buttons */}
                <div className="flex gap-2 flex-wrap">
                  {[50, 70, 90, 120].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-body font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo-500',
                        weight === w
                          ? 'bg-bamboo-500 text-white'
                          : 'bg-bamboo-100 dark:bg-bamboo-800 text-bamboo-700 dark:text-bamboo-300 hover:bg-bamboo-200 dark:hover:bg-bamboo-700'
                      )}
                      aria-pressed={weight === w}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparison */}
            <Card className="bg-bamboo-50 dark:bg-bamboo-900 border-bamboo-200 dark:border-bamboo-700">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-body font-medium text-sm text-bamboo-800 dark:text-bamboo-200 mb-1">
                      {t('calculator.comparison')}
                    </p>
                    <p className="font-body text-xs text-bamboo-600 dark:text-bamboo-400 leading-relaxed">
                      {t('calculator.comparisonText')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Result Panel */}
          <div className="space-y-6">
            {/* Main Result */}
            <Card className="border-2 border-bamboo-500 dark:border-bamboo-400 bg-white dark:bg-bamboo-950">
              <CardHeader>
                <CardTitle className="text-lg text-bamboo-700 dark:text-bamboo-300">
                  {t('calculator.result')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="text-center py-6"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="font-display text-7xl font-bold text-bamboo-600 dark:text-bamboo-400 tabular-nums mb-2">
                    {bambooKg}
                  </div>
                  <div className="font-body text-bamboo-500 dark:text-bamboo-500 text-sm">
                    {t('calculator.resultUnit')}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Fun Stats */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-bamboo-50 dark:bg-bamboo-900">
                    <Sprout size={16} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-bamboo-700 dark:text-bamboo-300">
                      {t('calculator.bambooStalks', { stalks })}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-bamboo-50 dark:bg-bamboo-900">
                    <CalculatorIcon size={16} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-bamboo-700 dark:text-bamboo-300">
                      {t('calculator.funFact1', { loaves })}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-bamboo-50 dark:bg-bamboo-900">
                    <Info size={16} className="text-bamboo-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-bamboo-700 dark:text-bamboo-300">
                      {t('calculator.funFact2')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Explanation */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle size={16} className="text-bamboo-500" aria-hidden="true" />
                  <CardTitle className="text-lg">{t('calculator.explanation')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-panda-gray dark:text-bamboo-400 leading-relaxed">
                  {pandaType === 'great'
                    ? t('calculator.explanationText', { weight, bamboo: bambooKg })
                    : t('calculator.explanationRedPanda', { weight, bamboo: bambooKg })}
                </p>
              </CardContent>
            </Card>

            {/* How it works */}
            <Card className="bg-bamboo-950 dark:bg-black text-white border-0">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-bamboo-400" aria-hidden="true" />
                  <CardTitle className="text-lg text-white">{t('calculator.howItWorks')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-body text-sm text-bamboo-300 leading-relaxed">
                  {t('calculator.howItWorksText')}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-white/10">
                    <div className="font-display text-xl font-bold text-bamboo-400">
                      {Math.round(config.ratio * 100)}%
                    </div>
                    <div className="font-body text-xs text-bamboo-400 mt-1">Körpergew.</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/10">
                    <div className="font-display text-xl font-bold text-bamboo-400">14h</div>
                    <div className="font-body text-xs text-bamboo-400 mt-1">Fresszeit</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/10">
                    <div className="font-display text-xl font-bold text-bamboo-400">
                      {config.avgBamboo}kg
                    </div>
                    <div className="font-body text-xs text-bamboo-400 mt-1">Panda-Ø</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
