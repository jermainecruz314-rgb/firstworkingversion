import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AUDIO_DURATION_MS,
  cancelSpeech,
  getSpeechScript,
  isSpeechPaused,
  isSpeechSpeaking,
  isSpeechSupported,
  pauseSpeech,
  resumeSpeech,
  speakSummary,
} from '../speech.js'

const HEADPHONES_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M4 14v3a2 2 0 0 0 2 2h1M20 14v3a2 2 0 0 1-2 2h-1" strokeLinecap="round" />
    <path d="M4 11a8 8 0 0 1 16 0v3H4v-3z" strokeLinejoin="round" />
  </svg>
)

export default function AudioSummaryPlayer({
  scriptType,
  language,
  t,
  labelKey = 'audioListenSummary',
}) {
  const [supported, setSupported] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)
  const segmentStartRef = useRef(0)

  useEffect(() => {
    setSupported(isSpeechSupported())
    return () => {
      cancelSpeech()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resetPlayer = useCallback(() => {
    clearTimer()
    setPlaying(false)
    setPaused(false)
    setProgress(0)
    elapsedRef.current = 0
  }, [clearTimer])

  const startProgressTimer = useCallback(() => {
    clearTimer()
    segmentStartRef.current = Date.now()
    intervalRef.current = setInterval(() => {
      if (!isSpeechSpeaking() && !isSpeechPaused()) return
      const segmentElapsed = Date.now() - segmentStartRef.current
      const total = Math.min(1, (elapsedRef.current + segmentElapsed) / AUDIO_DURATION_MS)
      setProgress(total)
    }, 80)
  }, [clearTimer])

  const handlePlay = useCallback(() => {
    if (paused) {
      resumeSpeech()
      setPaused(false)
      setPlaying(true)
      startProgressTimer()
      return
    }

    const text = getSpeechScript(scriptType, language)
    elapsedRef.current = 0
    setProgress(0)

    speakSummary(text, language, {
      onStart: () => {
        setPlaying(true)
        setPaused(false)
        startProgressTimer()
      },
      onEnd: resetPlayer,
      onError: resetPlayer,
    })
  }, [language, paused, resetPlayer, scriptType, startProgressTimer])

  const handlePause = useCallback(() => {
    if (isSpeechSpeaking()) {
      pauseSpeech()
      elapsedRef.current += Date.now() - segmentStartRef.current
      clearTimer()
      setPaused(true)
      setPlaying(false)
    }
  }, [clearTimer])

  const toggle = () => {
    if (playing) handlePause()
    else handlePlay()
  }

  if (!supported) return null

  return (
    <div className="audio-summary-player">
      <p className="audio-summary-label">
        <span className="audio-summary-label-icon">{HEADPHONES_ICON}</span>
        {t(labelKey)}
      </p>
      <div className="audio-summary-bar">
        <button
          type="button"
          className="audio-summary-play"
          onClick={toggle}
          aria-label={playing ? t('audioPause') : t('audioPlay')}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="7" y="6" width="3" height="12" rx="0.5" />
              <rect x="14" y="6" width="3" height="12" rx="0.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 7.5v9l8-4.5-8-4.5z" />
            </svg>
          )}
        </button>
        <div className="audio-summary-progress" aria-hidden="true">
          <div className="audio-summary-progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="audio-summary-duration">{t('audioDuration')}</span>
      </div>
    </div>
  )
}
