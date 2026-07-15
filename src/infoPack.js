import { createT } from './i18n/index.js'

// Mock downloadable info pack — English content for the text file (PoC).
export function downloadInfoPack(profile) {
  const t = createT('en')
  const isCascade = profile.pathwayType === 'cascade'
  const faqItems = [
    { q: t('faqInsuranceQ'), a: t('faqInsuranceA') },
    { q: t('faqWhoSeesQ'), a: t('faqWhoSeesA') },
    { q: t('faqProtectedQ'), a: t('faqProtectedA') },
    { q: t('faqChangeMindQ'), a: t('faqChangeMindA') },
  ]

  const lines = [
    'FH PATHWAY COMPANION — INFORMATION PACK',
    '========================================',
    '',
    `Prepared for: ${profile.name}`,
    `Pathway: ${isCascade ? 'Cascade screening' : 'Index patient'}`,
    `Date: ${new Date().toLocaleDateString('en-SG')}`,
    '',
    '--- WHAT IS FH? ---',
    '',
    isCascade
      ? 'You have been invited for cascade screening as a first-degree relative of someone with confirmed FH.'
      : `Your recent LDL reading of ${profile.ldlValue} mmol/L is one of the signs it is worth checking for FH.`,
    '',
    '--- FREQUENTLY ASKED QUESTIONS ---',
    '',
    ...faqItems.flatMap((item) => [`Q: ${item.q}`, '', item.a, '', '---', '']),
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fh-info-pack-${profile.name.replace(/\s+/g, '-').toLowerCase()}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
