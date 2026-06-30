import { useState } from 'react'
import SecurityBadge from '../components/SecurityBadge.jsx'
import FamilyTreeIcon from '../components/FamilyTreeIcon.jsx'
import { formatDate } from '../utils.js'
import { CONSENT_DATA_POINTS } from '../mockHealthHub.js'

// Profile and data-security settings for the signed-in patient.
export default function MyAccount({ profile, dataAccessGranted, onToggleAccess }) {
  const [deleteRequested, setDeleteRequested] = useState(false)
  const isCascade = profile.pathwayType === 'cascade'

  return (
    <section className="screen">
      <SecurityBadge />

      <div className="card">
        <span className="eyebrow">My account</span>
        <h1 className="screen-title">Your profile</h1>

        <dl className="record-list">
          <RecordRow label="Name" value={profile.name} />
          <RecordRow
            label="Pathway"
            value={
              isCascade ? (
                <span className="record-family">
                  <FamilyTreeIcon size={18} />
                  Cascade screening
                </span>
              ) : (
                'Index patient'
              )
            }
          />
          <RecordRow label="Referred by" value={profile.referredBy} />
          <RecordRow label="Referral date" value={formatDate(profile.referralDate)} />
          <RecordRow label="Language" value={profile.preferredLanguage} />
        </dl>
      </div>

      <div className="card">
        <span className="eyebrow">Manage data access</span>
        <h2 className="section-title">Health information access</h2>
        <p className="body-text">
          FH Pathway Companion can read the following from your health record to
          personalise your journey:
        </p>
        <ul className="consent-list compact">
          {CONSENT_DATA_POINTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="access-toggle">
          <button
            type="button"
            className={`toggle${dataAccessGranted ? ' on' : ''}`}
            role="switch"
            aria-checked={dataAccessGranted}
            onClick={() => onToggleAccess(!dataAccessGranted)}
          >
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            <span className="toggle-label">
              {dataAccessGranted ? 'Access granted' : 'Access revoked'}
            </span>
          </button>
        </div>
        {!dataAccessGranted && (
          <p className="helper-note">
            With access revoked, personalised details will no longer update from
            your health record. You can re-enable access at any time.
          </p>
        )}
      </div>

      <div className="card">
        <span className="eyebrow">Data security</span>
        <h2 className="section-title">How we protect your information</h2>
        <div className="info-list">
          <div className="info-item">
            <p className="info-body">
              Your information is stored securely and only used to personalise
              your journey through this program.
            </p>
          </div>
          <div className="info-item">
            <p className="info-body">
              Your data is not shared with insurers. Under Singapore&apos;s MOH
              moratorium, genetic test results from the national FH programme
              cannot be used by life or health insurers to affect your coverage or
              premiums.
            </p>
          </div>
          <div className="info-item">
            <p className="info-body">
              You can request your data be deleted at any time.
            </p>
            {deleteRequested ? (
              <p className="confirmation-inline" role="status">
                Your deletion request has been noted. Our care team will follow
                up within 5 working days.
              </p>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setDeleteRequested(true)}
              >
                Request data deletion
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function RecordRow({ label, value }) {
  return (
    <div className="record-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
