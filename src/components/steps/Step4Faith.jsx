import React, { useRef } from 'react'
import Navigation from '../Navigation.jsx'
import { FAITHS } from '../../data/faiths.js'

function isRecommended(faithId, character) {
  const race = character.race
  const origin = character.origin
  if (race === 'nald' && faithId === 'deep') return true
  if (race === 'bashet' && faithId === 'khazar') return true
  if (race === 'drakanis' && faithId === 'dragons') return true
  if (race === 'wildling' && (faithId === 'wilds' || faithId === 'none')) return true
  if (race === 'bashet' && origin === 'sandstrider' && faithId === 'none') return true
  return false
}

export default function Step4Faith({ step, character, updateCharacter, onBack, onContinue }) {
  const detailRef = useRef(null)
  const selectedFaith = FAITHS.find(f => f.id === character.faith)

  function handleSelect(faithId) {
    const isDeselecting = character.faith === faithId
    updateCharacter({ faith: isDeselecting ? null : faithId })
    if (!isDeselecting) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Choose Your Faith</h1>
      <p className="screen-intro">
        Faith shapes many lives in Lemuria, but not every character is devout. You may choose a
        belief, leave it uncertain, or reject faith entirely.
      </p>

      <div className="lore-cards-grid">
        {FAITHS.map(faith => (
          <div
            key={faith.id}
            className={`lore-card${character.faith === faith.id ? ' selected' : ''}`}
            onClick={() => handleSelect(faith.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleSelect(faith.id)}
            aria-pressed={character.faith === faith.id}
            style={{ position: 'relative' }}
          >
            {isRecommended(faith.id, character) && (
              <span className="recommended-badge">Recommended</span>
            )}
            {faith.tabImage
              ? <img src={faith.tabImage} alt="" className="lore-card__icon-img" />
              : <span className="lore-card__icon">{faith.icon}</span>
            }
            <div className="lore-card__title">{faith.name}</div>
          </div>
        ))}
      </div>

      {selectedFaith && (
        <div className="detail-panel" ref={detailRef}>
          <div className="detail-panel__title">{selectedFaith.name}</div>
          <div className="detail-panel__section-text">
            {selectedFaith.description.split('\n').map((line, i) =>
              line.trim() ? <p key={i}>{line}</p> : null
            )}
          </div>
        </div>
      )}

      <div className="sticky-cta">
        <button className="btn-continue" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}
