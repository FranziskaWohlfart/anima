import React, { useRef } from 'react'
import Navigation from '../Navigation.jsx'
import { BACKGROUNDS } from '../../data/backgrounds.js'

function isRecommended(bg, character) {
  if (!character) return false
  if (bg.suggestedRaces.includes(character.race)) return true
  if (character.origin && bg.suggestedOrigins.includes(character.origin)) return true
  if (character.characterClass && bg.suggestedClasses.includes(character.characterClass)) return true
  if (character.faith && bg.suggestedFaiths.includes(character.faith)) return true
  return false
}

function getRecommendReasons(bg, character) {
  const reasons = []
  if (bg.suggestedRaces.includes(character.race)) reasons.push('Suggested for your race')
  if (character.origin && bg.suggestedOrigins.includes(character.origin)) reasons.push('Suggested for your origin')
  if (character.characterClass && bg.suggestedClasses.includes(character.characterClass)) reasons.push('Suggested for your class')
  if (character.faith && bg.suggestedFaiths.includes(character.faith)) reasons.push('Suggested for your faith')
  return reasons
}

export default function Step6Background({ step, character, updateCharacter, onBack, onContinue }) {
  const detailRef = useRef(null)
  const selectedBg = BACKGROUNDS.find(b => b.id === character.background)

  function handleSelect(bgId) {
    const isDeselecting = character.background === bgId
    updateCharacter({ background: isDeselecting ? null : bgId })
    if (!isDeselecting) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Choose Your Background</h1>
      <p className="screen-intro">
        Backgrounds are story-only. They give no mechanical bonuses, but they shape who you are,
        where you come from, and what you carry with you. Choose one, or continue without one — the
        PDF will leave the background section blank for you to fill by hand.
      </p>

      <div className="background-cards-row">
        {BACKGROUNDS.map(bg => {
          const recommended = isRecommended(bg, character)
          return (
            <div
              key={bg.id}
              className={`option-card${character.background === bg.id ? ' selected' : ''}`}
              onClick={() => handleSelect(bg.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleSelect(bg.id)}
              style={{ position: 'relative' }}
            >
              {recommended && <span className="recommended-badge">Recommended</span>}
              {bg.image
                ? <img src={bg.image} alt={bg.name} className="option-card__img" />
                : <span className="option-card__icon">{bg.icon}</span>
              }
              <div className="option-card__title">{bg.name}</div>
            </div>
          )
        })}

        {/* Custom background card */}
        <div
          className={`option-card${character.background === 'custom' ? ' selected' : ''}`}
          onClick={() => handleSelect('custom')}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleSelect('custom')}
          style={{ position: 'relative' }}
        >
          <img src="/Background_none.png" alt="Custom Background" className="option-card__img" />
          <div className="option-card__title">Custom Background</div>
        </div>
      </div>

      <div ref={detailRef} />

      {selectedBg && (
        <div className="detail-panel">
          <div className="detail-panel__title">
            {selectedBg.name}
          </div>
          <div className="detail-panel__section-text">{selectedBg.description}</div>

          <div className="detail-panel__section" style={{ marginTop: 'var(--spacing-md)' }}>
            <div className="detail-panel__section-label">Story Prompt</div>
            <div style={{ fontStyle: 'italic', color: 'var(--color-ink-light)', fontSize: '0.9rem' }}>
              "{selectedBg.prompt}"
            </div>
          </div>

          {getRecommendReasons(selectedBg, character).length > 0 && (
            <div className="detail-panel__section" style={{ marginTop: 'var(--spacing-md)' }}>
              <div className="detail-panel__section-label">Why Recommended</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {getRecommendReasons(selectedBg, character).map((r, i) => (
                  <span key={i} className="trait-badge" style={{ fontSize: '0.78rem' }}>{r}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {character.background === 'custom' && (
        <div className="detail-panel">
          <div className="detail-panel__title">
            Custom Background
          </div>
          <p className="detail-panel__section-text">
            Write your own background. Both fields are optional — if left blank the PDF will leave the section empty.
          </p>
          <div className="form-group" style={{ marginTop: 'var(--spacing-md)' }}>
            <label htmlFor="custom-bg-name">Background Name (optional)</label>
            <input
              type="text"
              id="custom-bg-name"
              value={character.customBackgroundName}
              onChange={e => updateCharacter({ customBackgroundName: e.target.value })}
              placeholder="e.g. Exile, Hedge Knight, Plague Survivor..."
              maxLength={60}
            />
          </div>
          <div className="form-group">
            <label htmlFor="custom-bg-desc">Background Description (optional)</label>
            <textarea
              id="custom-bg-desc"
              value={character.customBackgroundDescription}
              onChange={e => updateCharacter({ customBackgroundDescription: e.target.value })}
              placeholder="Describe your character's background..."
              rows={4}
              maxLength={600}
            />
          </div>
        </div>
      )}

      <div className="cta-area">
        <button className="btn-continue" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}
