import { useState } from 'react'
import { downloadInfoPack } from '../infoPack.js'
import Toast from './Toast.jsx'

export default function DownloadInfoPackButton({
  profile,
  t,
  className = '',
}) {
  const [toast, setToast] = useState('')

  const handleDownload = () => {
    downloadInfoPack(profile)
    setToast(t('downloadInfoPackDone'))
    setTimeout(() => setToast(''), 2800)
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-secondary ${className}`.trim()}
        onClick={handleDownload}
      >
        {t('downloadInfoPack')}
      </button>
      <Toast message={toast} visible={!!toast} />
    </>
  )
}
