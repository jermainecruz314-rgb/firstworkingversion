import { useState } from 'react'
import { downloadInfoPack } from '../infoPack.js'
import Toast from './Toast.jsx'

export default function DownloadInfoPackButton({
  profile,
  label = 'Download info pack',
  doneLabel = 'Info pack downloaded',
  className = '',
}) {
  const [toast, setToast] = useState('')

  const handleDownload = () => {
    downloadInfoPack(profile)
    setToast(doneLabel)
    setTimeout(() => setToast(''), 2800)
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-secondary ${className}`.trim()}
        onClick={handleDownload}
      >
        {label}
      </button>
      <Toast message={toast} visible={!!toast} />
    </>
  )
}
