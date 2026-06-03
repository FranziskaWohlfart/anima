import React, { useRef } from 'react'
import Navigation from '../Navigation.jsx'
import RaceCard from '../RaceCard.jsx'
import ScrollableRow from '../ScrollableRow.jsx'
import { RACES } from '../../data/races.js'

export default function Step2Race({ step, character, updateCharacter, onBack, onContinue }) {
  const detailRef = useRef(null)
  const selectedRace = RACES.find(r => r.id === character.race)

  function handleSelectRace(raceId) {
    if (character.race !== raceId) {
      updateCharacter({
        race: raceId,
        origin: null,
        animalForm: '',
        abilityBonusPlusTwo: '',
        abilityBonusPlusOne: '',
        originSkills: [],
        selectedEquipmentPacks: character.selectedEquipmentPacks.filter(
          p => !isOriginPack(p, character.race)
        ),
      })
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 0)
    }
  }

  function isOriginPack(packId, raceId) {
    // Remove old origin-based packs when race changes
    const originPackIds = [
      'cityfolk', 'sandstrider', 'atlantean', 'oceanic',
      'ruby-drakanis', 'sapphire-drakanis', 'emerald-drakanis',
      'silver-drakanis', 'golden-drakanis', 'wildling',
    ]
    return originPackIds.includes(packId)
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Choose Your People</h1>
      <p className="screen-intro">
        The peoples of Lemuria are shaped by the Curse in different ways — some as stable lineages
        with proud cultures, others as wanderers at the edge of transformation. Choose the people
        your character belongs to.
      </p>

      {!character.race && (
        <p className="helper-hint">Click on a card to learn more about each people of Lemuria.</p>
      )}

      <ScrollableRow className="race-cards-row">
        {RACES.map(race => (
          <RaceCard
            key={race.id}
            race={race}
            isSelected={character.race === race.id}
            onSelect={handleSelectRace}
          />
        ))}
      </ScrollableRow>

      {selectedRace && (
        <div className="detail-panel" ref={detailRef}>
          <div className="detail-panel__title">{selectedRace.name}</div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-label">About</div>
            <div className="detail-panel__section-text">{selectedRace.description}</div>
          </div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-label">Appearance</div>
            <div className="detail-panel__section-text">{selectedRace.appearance}</div>
          </div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-label">Culture</div>
            <div className="detail-panel__section-text">{selectedRace.culture}</div>
          </div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-label">World Tension</div>
            <div className="detail-panel__section-text">{selectedRace.tension}</div>
          </div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-label">Racial Traits</div>
            <div className="detail-panel__traits">
              {selectedRace.mechanics.map((m, i) => (
                <span key={i} className="trait-badge">{m}</span>
              ))}
            </div>
          </div>

          <p style={{ marginTop: 'var(--spacing-md)', fontStyle: 'italic', color: 'var(--color-sepia)', fontSize: '0.88rem' }}>
            {selectedRace.originHint}
          </p>
        </div>
      )}

      {character.race && (
        <div className="sticky-cta">
          <button className="btn-continue" onClick={onContinue}>
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
