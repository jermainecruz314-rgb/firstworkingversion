function initialsFromName(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function ProfileStrip({ name, meta }) {
  return (
    <div className="hb-profile">
      <span className="hb-avatar" aria-hidden="true">
        {initialsFromName(name)}
      </span>
      <div className="hb-profile-copy">
        <p className="hb-profile-name">{name}</p>
        {meta && <p className="hb-profile-meta">{meta}</p>}
      </div>
    </div>
  )
}
