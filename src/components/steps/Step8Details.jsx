import React, { useRef } from 'react'
import Navigation from '../Navigation.jsx'
import { findClassById } from '../../data/classes.js'

export default function Step8Details({ step, character, updateCharacter, onBack, onContinue }) {
  const fileInputRef = useRef(null)
  const nameError = character.name && character.name.length > 32

  const cls = findClassById(character.characterClass)
  const suggestedPortrait = cls?.stillImage || null
  // What to actually display: uploaded image > suggested (unless cleared)
  const displayPortrait = character.portraitImage
    || (!character.portraitCleared && suggestedPortrait)
    || null
  const isSuggested = !character.portraitImage && !character.portraitCleared && !!suggestedPortrait

  function handlePortraitUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      updateCharacter({ portraitImage: ev.target.result, portraitCleared: false })
    }
    reader.readAsDataURL(file)
  }

  function removePortrait() {
    updateCharacter({ portraitImage: null, portraitCleared: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const canContinue = character.name && character.name.trim().length > 0 && !nameError

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Character Details</h1>
      <p className="screen-intro">
        Add the personal details you want printed on your character sheet. Anything you leave blank
        will stay empty on the PDF so you can fill it in by hand later.
      </p>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <div className="details-layout">

          {/* Portrait — left column */}
          <div className="details-layout__portrait">
            <div className="detail-panel__section-label" style={{ marginBottom: 'var(--spacing-sm)' }}>
              Portrait (optional)
            </div>
            <div
              className="portrait-frame"
              onClick={() => !displayPortrait && fileInputRef.current?.click()}
              style={{ cursor: displayPortrait ? 'default' : 'pointer' }}
            >
              {displayPortrait ? (
                <img src={displayPortrait} alt="Character portrait" />
              ) : (
                <div className="portrait-frame__placeholder">
                  <span className="portrait-frame__placeholder-icon">🖼️</span>
                  <div className="portrait-frame__placeholder-text">
                    Click to upload portrait<br />
                    <small>PNG, JPG, JPEG, WebP</small>
                  </div>
                </div>
              )}
            </div>
            {isSuggested && (
              <div style={{ fontSize: '0.75rem', color: 'var(--color-sepia)', fontStyle: 'italic', marginTop: 'var(--spacing-xs)', textAlign: 'center' }}>
                Suggested based on your class
              </div>
            )}
            <div className="portrait-controls">
              {!displayPortrait && (
                <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                  Upload Portrait
                </button>
              )}
              {displayPortrait && (
                <>
                  <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>
                    {isSuggested ? 'Upload own' : 'Replace'}
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={removePortrait}
                    style={{ color: 'var(--color-accent-red)', borderColor: 'var(--color-accent-red)' }}
                  >
                    Remove portrait
                  </button>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpg,image/jpeg,image/webp"
              style={{ display: 'none' }}
              onChange={handlePortraitUpload}
            />
          </div>

          {/* Fields — right column */}
          <div className="details-layout__fields">

            {/* Name */}
            <div className="form-group">
              <label htmlFor="char-name">Character Name *</label>
              <input
                type="text"
                id="char-name"
                value={character.name}
                onChange={e => updateCharacter({ name: e.target.value })}
                maxLength={32}
                placeholder="Enter your character's name"
              />
              <div className="char-count">{character.name.length} / 32</div>
              {nameError && <div className="form-error">Name must be 32 characters or fewer.</div>}
              <div className="helper-text">
                Your character name will appear as the title of your printable sheet.
              </div>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="char-gender">Gender (optional)</label>
              <input
                type="text"
                id="char-gender"
                value={character.gender || ''}
                onChange={e => updateCharacter({ gender: e.target.value })}
                placeholder="Enter gender or leave blank"
                maxLength={40}
              />
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="char-age">Age (optional)</label>
              <input
                type="text"
                id="char-age"
                value={character.age || ''}
                onChange={e => updateCharacter({ age: e.target.value })}
                placeholder="Enter age or leave blank"
                maxLength={20}
              />
            </div>

            {/* Alignment */}
            <div className="form-group">
              <label htmlFor="char-alignment">Alignment (optional)</label>
              <select
                id="char-alignment"
                value={character.alignment || ''}
                onChange={e => updateCharacter({ alignment: e.target.value })}
              >
                <option value="">— Choose alignment —</option>
                <optgroup label="Good">
                  <option value="Lawful Good">Lawful Good</option>
                  <option value="Neutral Good">Neutral Good</option>
                  <option value="Chaotic Good">Chaotic Good</option>
                </optgroup>
                <optgroup label="Neutral">
                  <option value="Lawful Neutral">Lawful Neutral</option>
                  <option value="True Neutral">True Neutral</option>
                  <option value="Chaotic Neutral">Chaotic Neutral</option>
                </optgroup>
                <optgroup label="Evil">
                  <option value="Lawful Evil">Lawful Evil</option>
                  <option value="Neutral Evil">Neutral Evil</option>
                  <option value="Chaotic Evil">Chaotic Evil</option>
                </optgroup>
              </select>
            </div>

          </div>
        </div>

        {/* Appearance — full width */}
        <div className="form-group">
          <label htmlFor="char-appearance">Appearance (optional)</label>
          <textarea
            id="char-appearance"
            value={character.appearance || ''}
            onChange={e => updateCharacter({ appearance: e.target.value })}
            placeholder="Describe your character's appearance..."
            rows={3}
            maxLength={400}
          />
        </div>

        {/* Story prompts */}
        <div className="section-divider">
          <span className="section-divider__text">Story Prompts</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-sepia)', marginBottom: 'var(--spacing-lg)' }}>
          These are optional. If you leave them blank, the PDF will print the questions with writing lines so you can answer them by hand later.
        </p>

        <div className="form-group">
          <label htmlFor="curse-answer">How has the Curse shaped your life?</label>
          <textarea
            id="curse-answer"
            value={character.curseAnswer || ''}
            onChange={e => updateCharacter({ curseAnswer: e.target.value })}
            placeholder="Write your answer, or leave blank..."
            rows={3}
            maxLength={600}
          />
        </div>

        <div className="form-group">
          <label htmlFor="home-answer">Why have you left home?</label>
          <textarea
            id="home-answer"
            value={character.leftHomeAnswer || ''}
            onChange={e => updateCharacter({ leftHomeAnswer: e.target.value })}
            placeholder="Write your answer, or leave blank..."
            rows={3}
            maxLength={600}
          />
        </div>

        <div className="form-group">
          <label htmlFor="memory-answer">What memory do you never want to forget?</label>
          <textarea
            id="memory-answer"
            value={character.memoryAnswer || ''}
            onChange={e => updateCharacter({ memoryAnswer: e.target.value })}
            placeholder="Write your answer, or leave blank..."
            rows={3}
            maxLength={600}
          />
        </div>

      </div>

      {!canContinue && (
        <p style={{ textAlign: 'center', color: 'var(--color-sepia)', fontSize: '0.82rem', marginTop: 'var(--spacing-sm)' }}>
          A character name is required to continue.
        </p>
      )}

      {canContinue && (
        <div className="cta-area">
          <button className="btn-continue" onClick={onContinue}>
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
