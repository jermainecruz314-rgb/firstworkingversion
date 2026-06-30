import { FAQ_ITEMS } from './faqContent.js'

// Generate and trigger a mock downloadable info pack (plain text).
export function downloadInfoPack(profile) {
  const isCascade = profile.pathwayType === 'cascade'
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
    'Familial hypercholesterolaemia (FH) is an inherited condition that can keep',
    'LDL cholesterol higher than usual. It is not caused by diet or lifestyle alone.',
    isCascade
      ? 'You have been invited for cascade screening as a first-degree relative of someone with confirmed FH.'
      : `Your recent LDL reading of ${profile.ldlValue} mmol/L is one of the signs it is worth checking for.`,
    '',
    '--- WHAT THE TEST INVOLVES ---',
    '',
    'A simple genetic test through the Genetic Assessment Centre (GAC) can confirm',
    'whether FH is present. This helps your care team tailor treatment to you and,',
    'if needed, support your family through cascade screening.',
    '',
    '--- COST SUMMARY ---',
    '',
    `Base test cost: ${isCascade ? '$334 (cascade screening)' : '$764 (index patient)'}`,
    'Subsidies apply for Singapore Citizens and PRs based on residency and income.',
    'MediSave may be used (up to $500–$700/year, with Flexi-MediSave for ages 60+).',
    'See the Cost Transparency screen in the app for a personalised estimate.',
    '',
    '--- FREQUENTLY ASKED QUESTIONS ---',
    '',
    ...FAQ_ITEMS.flatMap((item) => [`Q: ${item.q}`, '', item.a, '', '---', '']),
    '',
    'This document is for demonstration purposes only.',
    "Singapore's National FH Genetic Testing Programme (MOH, 2025)",
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
