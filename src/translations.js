// Multilingual strings — PoC subset for Landing and Why screens.
// Extend by adding keys here; untranslated screens stay in English.

export const LANGUAGE_OPTIONS = [
  { value: 'English', label: 'English' },
  { value: 'Mandarin', label: '中文' },
  { value: 'Malay', label: 'Bahasa Melayu' },
  { value: 'Tamil', label: 'தமிழ்' },
]

const en = {
  landing: {
    eyebrow: 'Your referral summary',
    greeting: (name) => `Hello, ${name}`,
    lead:
      "We've pulled together the details from your referral so you can see exactly where things stand.",
    reassurance:
      "This is an invitation to learn more through Singapore's National FH Genetic Testing Program. There's nothing you need to worry about right now — take your time.",
    cta: 'Go to my dashboard',
  },
  why: {
    eyebrow: 'Why this matters to you',
    title: "Let's make sense of your result",
    ldlLabel: 'Your LDL reading',
    aboveThreshold: (threshold, above) =>
      above > 0
        ? `This is above the ${threshold} mmol/L level we look out for — by ${above} mmol/L.`
        : `This is above the ${threshold} mmol/L level we look out for.`,
    cascadeLabel: 'Cascade screening',
    downloadPack: 'Download info pack',
    downloadDone: 'Info pack downloaded',
  },
}

const zh = {
  landing: {
    eyebrow: '您的转诊摘要',
    greeting: (name) => `您好，${name}`,
    lead: '我们已整理您转诊的详细信息，让您清楚了解目前的情况。',
    reassurance:
      '这是邀请您进一步了解新加坡国家家族性高胆固醇血症（FH）基因检测计划。目前无需担心，您可以按自己的节奏进行。',
    cta: '前往我的主页',
  },
  why: {
    eyebrow: '为什么这对我很重要',
    title: '让我们一起理解您的检查结果',
    ldlLabel: '您的低密度脂蛋白（LDL）读数',
    aboveThreshold: (threshold, above) =>
      above > 0
        ? `这高于我们关注的 ${threshold} mmol/L 水平 — 高出 ${above} mmol/L。`
        : `这高于我们关注的 ${threshold} mmol/L 水平。`,
    cascadeLabel: '级联筛查',
    downloadPack: '下载资料包',
    downloadDone: '资料包已下载',
  },
}

const ms = {
  landing: {
    eyebrow: 'Ringkasan rujukan anda',
    greeting: (name) => `Hello, ${name}`,
    lead: 'Kami telah menyusun butiran rujukan anda supaya anda dapat melihat dengan jelas keadaan semasa.',
    reassurance:
      'Ini adalah jemputan untuk mengetahui lebih lanjut tentang Program Ujian Genetik FH Kebangsaan Singapura. Tiada apa yang perlu anda bimbangkan buat masa ini — ambil masa anda.',
    cta: 'Pergi ke papan pemuka saya',
  },
  why: {
    eyebrow: 'Mengapa ini penting untuk saya',
    title: 'Mari kita fahami keputusan anda',
    ldlLabel: 'Bacaan LDL anda',
    aboveThreshold: (threshold, above) =>
      above > 0
        ? `Ini melebihi paras ${threshold} mmol/L yang kami pantau — sebanyak ${above} mmol/L.`
        : `Ini melebihi paras ${threshold} mmol/L yang kami pantau.`,
    cascadeLabel: 'Saringan kaskad',
    downloadPack: 'Muat turun pek maklumat',
    downloadDone: 'Pek maklumat dimuat turun',
  },
}

const ta = {
  landing: {
    eyebrow: 'உங்கள் பரிந்துரைச் சுருக்கம்',
    greeting: (name) => `வணக்கம், ${name}`,
    lead: 'உங்கள் பரிந்துரை விவரங்களை ஒன்றிணைத்துள்ளோம் — நிலைமை என்ன என்பதை தெளிவாகப் பார்க்கலாம்.',
    reassurance:
      'இது சிங்கப்பூர் தேசிய FH மரபணு பரிசோதனை திட்டத்தைப் பற்றி அறிய அழைப்பு. இப்போது கவலைப்பட வேண்டியதில்லை — உங்கள் வேகத்தில் முன்னேறுங்கள்.',
    cta: 'என் டாஷ்போர்டுக்குச் செல்லுங்கள்',
  },
  why: {
    eyebrow: 'இது எனக்கு ஏன் முக்கியம்',
    title: 'உங்கள் முடிவைப் புரிந்துகொள்வோம்',
    ldlLabel: 'உங்கள் LDL அளவு',
    aboveThreshold: (threshold, above) =>
      above > 0
        ? `இது நாம் கவனிக்கும் ${threshold} mmol/L வரம்பை விட அதிகம் — ${above} mmol/L.`
        : `இது நாம் கவனிக்கும் ${threshold} mmol/L வரம்பை விட அதிகம்.`,
    cascadeLabel: 'கேஸ்கேட் திரையிடல்',
    downloadPack: 'தகவல் தொகுப்பைப் பதிவிறக்கு',
    downloadDone: 'தகவல் தொகுப்பு பதிவிறக்கப்பட்டது',
  },
}

export const TRANSLATIONS = {
  English: en,
  Mandarin: zh,
  Malay: ms,
  Tamil: ta,
}

export function getStrings(language) {
  return TRANSLATIONS[language] ?? TRANSLATIONS.English
}
