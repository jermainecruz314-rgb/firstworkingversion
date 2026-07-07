import enDict from './en.js'
import zhDict from './zh.js'
import msDict from './ms.js'
import taDict from './ta.js'

export const LANG_OPTIONS = [
  { code: 'en', native: 'English' },
  { code: 'zh', native: '中文' },
  { code: 'ms', native: 'Bahasa Melayu' },
  { code: 'ta', native: 'தமிழ்' },
]

export const translations = {
  en: enDict,
  zh: zhDict,
  ms: msDict,
  ta: taDict,
}

const LANGUAGE_ALIASES = {
  English: 'en',
  Mandarin: 'zh',
  Malay: 'ms',
  Tamil: 'ta',
}

const STATUS_KEY_MAP = {
  'Not yet booked': 'statusNotYetBooked',
  Booked: 'statusBooked',
  Completed: 'statusCompleted',
  'Reminder scheduled': 'statusReminderScheduled',
}

const interpolate = (template, vars = {}) =>
  template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = vars[key]
    return value == null ? match : String(value)
  })

const resolveLang = (lang) => {
  if (translations[lang]) return lang
  if (LANGUAGE_ALIASES[lang]) return LANGUAGE_ALIASES[lang]
  return 'en'
}

const daysBetween = (fromIso, toIso) => {
  const from = new Date(fromIso)
  const to = new Date(toIso)
  from.setHours(0, 0, 0, 0)
  to.setHours(0, 0, 0, 0)
  return Math.round((to - from) / (1000 * 60 * 60 * 24))
}

const mockTodayISO = () => new Date().toISOString().slice(0, 10)

const ldlAboveThreshold = (ldlValue, threshold) =>
  Math.max(0, Number((Number(ldlValue || 0) - Number(threshold || 0)).toFixed(1)))

export function createT(lang) {
  const resolvedLang = resolveLang(lang)
  const dict = translations[resolvedLang] ?? translations.en
  const fallback = translations.en

  return (key, vars = {}) => {
    const template = dict[key] ?? fallback[key]
    if (typeof template !== 'string') return key
    return interpolate(template, vars)
  }
}

export function translateStatus(status, t) {
  const key = STATUS_KEY_MAP[status]
  return key ? t(key) : status
}

const STAGE_KEYS = ['stepReferral', 'stepCounselling', 'stepTest', 'stepResults']

export function translatePathwayStage(stage, t) {
  const index = Math.min(Math.max(Number(stage) || 0, 0), STAGE_KEYS.length - 1)
  return t(STAGE_KEYS[index])
}

export function buildRiskSummaryT(t, profile, threshold) {
  const ldl = Number(profile?.ldlValue ?? 0)
  const above = ldlAboveThreshold(ldl, threshold)

  return {
    intro: t('riskIntro', {
      name: profile?.name ?? '',
      ldl,
      threshold,
      above,
    }),
    points: [
      {
        title: t('riskPoint1Title'),
        body: t('riskPoint1Body', { ldl }),
      },
      {
        title: t('riskPoint2Title'),
        body: t('riskPoint2Body', { ldl }),
      },
      {
        title: t('riskPoint3Title'),
        body: t('riskPoint3Body'),
      },
    ],
    aboveThreshold: above,
  }
}

export function buildCascadeSummaryT(t, profile) {
  return {
    intro: t('cascadeIntro', {
      name: profile?.name ?? '',
    }),
    points: [
      {
        title: t('cascadePoint1Title'),
        body: t('cascadePoint1Body', {
          relation: profile?.relationToIndex ?? t('cascadeRelationFallback'),
        }),
      },
      {
        title: t('cascadePoint2Title'),
        body: t('cascadePoint2Body', {
          risk: profile?.inheritanceRisk ?? t('cascadeInheritanceFallback'),
        }),
      },
      {
        title: t('cascadePoint3Title'),
        body: t('cascadePoint3Body'),
      },
    ],
  }
}

export function buildFamilyImpactT(t, profile) {
  const reading =
    profile?.ldlValue != null
      ? t('familyImpactReadingWithValue', { ldl: profile.ldlValue })
      : t('familyImpactReadingFallback')

  return {
    intro: t('familyImpactIntro', {
      name: profile?.name ?? '',
    }),
    points: [
      {
        title: t('familyImpactPoint1Title'),
        body: t('familyImpactPoint1Body'),
      },
      {
        title: t('familyImpactPoint2Title'),
        body: t('familyImpactPoint2Body'),
      },
      {
        title: t('familyImpactPoint3Title'),
        body: t('familyImpactPoint3Body', { reading }),
      },
    ],
  }
}

export function buildRemindersT(t, profile, todayIso = mockTodayISO()) {
  const reminders = []
  const referralDate = profile?.referralDate
  const appointmentStatus = profile?.appointmentStatus

  if (referralDate) {
    const daysSince = daysBetween(referralDate, todayIso)

    if (appointmentStatus === 'Booked' && profile?.appointmentDate) {
      const daysUntil = daysBetween(todayIso, profile.appointmentDate)
      const when =
        daysUntil <= 0
          ? t('remindersWhenToday')
          : daysUntil === 1
            ? t('remindersWhenTomorrow')
            : t('remindersWhenInDays', { daysUntil })

      reminders.push({
        id: 'appt-countdown',
        tone: 'appointment',
        message: t('remindersMessageAppointment', { when, daysUntil }),
        detail: profile?.appointmentSlotLabel ?? profile?.appointmentDate,
      })
    }

    if (appointmentStatus === 'Completed') {
      reminders.push({
        id: 'results-ready',
        tone: 'appointment',
        message: t('remindersMessageCompleted'),
        detail: t('remindersDetailCompleted'),
      })
    }

    if (appointmentStatus === 'Reminder scheduled') {
      reminders.push({
        id: 'reminder-later',
        tone: 'gentle',
        message: t('remindersMessageReminderLater'),
        detail: t('remindersDetailReminderLater'),
      })
    }

    if (
      (appointmentStatus === 'Not yet booked' ||
        appointmentStatus === 'Reminder scheduled') &&
      daysSince >= 7
    ) {
      reminders.push({
        id: 'no-booking-nudge',
        tone: 'nudge',
        message: t('remindersMessageNoBooking', { days: daysSince }),
        detail: t('remindersDetailNoBooking'),
      })
    }
  }

  if (reminders.length === 0) {
    reminders.push({
      id: 'all-clear',
      tone: 'gentle',
      message: t('remindersMessageAllClear'),
      detail: t('remindersDetailAllClear'),
    })
  }

  return reminders
}

export function buildShareMessageT(t, profile) {
  return t('shareMessageTemplate', {
    name: profile?.name ?? '',
  })
}

export function getFaqItems(t) {
  return [
    {
      id: 'insurance',
      q: t('faqInsuranceQ'),
      a: t('faqInsuranceA'),
    },
    {
      id: 'who-sees',
      q: t('faqWhoSeesQ'),
      a: t('faqWhoSeesA'),
    },
    {
      id: 'protected',
      q: t('faqProtectedQ'),
      a: t('faqProtectedA'),
    },
    {
      id: 'change-mind',
      q: t('faqChangeMindQ'),
      a: t('faqChangeMindA'),
    },
  ]
}
