import { useState } from 'react'
import { downloadInfoPack } from '../infoPack.js'
import SuccessState from './SuccessState.jsx'

export default function DownloadInfoPackButton({ profile, t, className = '' }) {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    downloadInfoPack(profile)
    setDownloaded(true)
  }

  if (downloaded) {
    return (
      <SuccessState
        className={className}
        title={t('downloadInfoPackSuccessTitle')}
        body={t('downloadInfoPackSuccessBody')}
        actionLabel={t('downloadInfoPack')}
        onAction={() => setDownloaded(false)}
      />
    )
  }

  return (
    <button
      type="button"
      className={`btn btn-secondary btn-inline ${className}`.trim()}
      onClick={handleDownload}
    >
      {t('downloadInfoPack')}
    </button>
  )
}
