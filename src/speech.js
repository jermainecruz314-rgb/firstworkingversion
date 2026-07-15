const SUMMARY_SCRIPTS = {
  en: `Your recent cholesterol result was above the threshold that can indicate a genetic condition called Familial Hypercholesterolaemia. Unlike lifestyle-related high cholesterol, this is inherited and present from birth. A genetic test confirms whether you carry the gene variant, allowing your doctor to tailor your treatment more precisely. Most importantly, if you carry the variant, each of your children and siblings has a 50 percent chance of carrying it too. One test appointment protects your whole family.`,
  zh: `您近期的胆固醇检测结果超出了正常标准，这可能与一种名为家族性高胆固醇血症的遗传病有关。与生活方式引起的高胆固醇不同，这种病从出生起就存在于基因中。基因检测能确认您是否携带相关基因变异，从而帮助医生为您制定更精准的治疗方案。最重要的是，如果您携带该变异，您的每位子女和兄弟姐妹都有50%的可能性携带相同的基因。一次检测预约，保护全家人的健康。`,
  ms: `Keputusan kolesterol anda baru-baru ini melebihi ambang yang boleh menunjukkan keadaan genetik yang dipanggil Hiperkolesterolaemia Familial. Berbeza dengan kolesterol tinggi akibat gaya hidup, keadaan ini diwarisi dan hadir sejak lahir. Ujian genetik mengesahkan sama ada anda membawa varian gen tersebut, membolehkan doktor anda menyesuaikan rawatan dengan lebih tepat. Yang paling penting, jika anda membawa varian ini, setiap anak dan adik-beradik anda mempunyai 50 peratus peluang untuk membawanya juga. Satu temujanji ujian melindungi seluruh keluarga anda.`,
  ta: `உங்கள் சமீபத்திய கொலஸ்ட்ரால் பரிசோதனை முடிவு, குடும்ப அதிக கொலஸ்ட்ரால் எனப்படும் மரபணு நிலையை சுட்டிக்காட்டும் வரம்பை மீறியுள்ளது. வாழ்க்கை முறையால் ஏற்படும் அதிக கொலஸ்ட்ராலைப் போலல்லாமல், இது பிறப்பிலிருந்தே மரபணுவில் உள்ளது. மரபணு சோதனை உங்களிடம் இந்த மரபணு மாறுபாடு உள்ளதா என்பதை உறுதிப்படுத்துகிறது. முக்கியமாக, நீங்கள் இந்த மாறுபாட்டை கொண்டிருந்தால், உங்கள் ஒவ்வொரு குழந்தைக்கும் உடன்பிறந்தவருக்கும் 50 சதவீத வாய்ப்பு உள்ளது. ஒரே ஒரு சோதனை சந்திப்பு உங்கள் முழு குடும்பத்தையும் பாதுகாக்கும்.`,
}

const CONVERSATION_SCRIPTS = {
  en: `You could say something like: I recently found out I have a gene that causes high cholesterol. The doctor told me there is a chance you might have it too, and it is worth getting checked because it can be treated very easily.`,
  zh: `您可以这样说：我最近发现自己携带了一种会导致高胆固醇的基因。医生告诉我，您也有可能携带相同的基因，建议您去检查一下，因为这种情况很容易治疗。`,
  ms: `Anda boleh berkata seperti ini: Saya baru-baru ini mendapati saya mempunyai gen yang menyebabkan kolesterol tinggi. Doktor memberitahu saya bahawa anda mungkin juga membawanya, dan patut diperiksa kerana ia boleh dirawat dengan mudah.`,
  ta: `நீங்கள் இப்படி சொல்லலாம்: நான் சமீபத்தில் என்னிடம் அதிக கொலஸ்ட்ராலை ஏற்படுத்தும் ஒரு மரபணு இருப்பதை கண்டறிந்தேன். மருத்துவர் என்னிடம் கூறினார், உங்களிடமும் இது இருக்கலாம், மேலும் இது மிகவும் எளிதாக சிகிச்சையளிக்கக் கூடியது என்பதால் பரிசோதனை செய்துகொள்வது நல்லது.`,
}

const VOICE_LANG = {
  en: 'en-SG',
  zh: 'zh-CN',
  ms: 'ms-MY',
  ta: 'ta-IN',
}

const VOICE_FALLBACK = {
  en: 'en-GB',
}

const LANG_ALIASES = {
  English: 'en',
  Mandarin: 'zh',
  Malay: 'ms',
  Tamil: 'ta',
}

export const AUDIO_DURATION_MS = 60000

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function resolveLang(language) {
  if (LANG_ALIASES[language]) return LANG_ALIASES[language]
  if (SUMMARY_SCRIPTS[language]) return language
  return 'en'
}

export function getSpeechScript(scriptType, language) {
  const lang = resolveLang(language)
  const scripts = scriptType === 'familyConversation' ? CONVERSATION_SCRIPTS : SUMMARY_SCRIPTS
  return scripts[lang] ?? scripts.en
}

function pickVoice(langCode) {
  const voices = window.speechSynthesis.getVoices()
  const primary = VOICE_LANG[langCode] ?? VOICE_LANG.en
  const fallback = VOICE_FALLBACK[langCode]

  return (
    voices.find((v) => v.lang === primary) ??
    voices.find((v) => v.lang.startsWith(primary.split('-')[0])) ??
    (fallback ? voices.find((v) => v.lang === fallback || v.lang.startsWith('en')) : null) ??
    voices[0] ??
    null
  )
}

export function speakSummary(text, language, { onStart, onEnd, onError } = {}) {
  if (!isSpeechSupported()) return null

  window.speechSynthesis.cancel()

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text)
    const lang = resolveLang(language)
    utterance.lang = VOICE_LANG[lang] ?? VOICE_LANG.en
    utterance.rate = 0.95

    const voice = pickVoice(lang)
    if (voice) utterance.voice = voice

    utterance.onstart = onStart
    utterance.onend = onEnd
    utterance.onerror = onError

    window.speechSynthesis.speak(utterance)
    return utterance
  }

  const voices = window.speechSynthesis.getVoices()
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null
      speak()
    }
    window.speechSynthesis.getVoices()
    return null
  }

  return speak()
}

export function pauseSpeech() {
  if (isSpeechSupported()) window.speechSynthesis.pause()
}

export function resumeSpeech() {
  if (isSpeechSupported()) window.speechSynthesis.resume()
}

export function cancelSpeech() {
  if (isSpeechSupported()) window.speechSynthesis.cancel()
}

export function isSpeechSpeaking() {
  return isSpeechSupported() && window.speechSynthesis.speaking
}

export function isSpeechPaused() {
  return isSpeechSupported() && window.speechSynthesis.paused
}
