import React, { useEffect } from 'react'
import Navigation from '../Navigation.jsx'
import OriginCard from '../OriginCard.jsx'
import { ORIGINS } from '../../data/origins.js'
import { RACES } from '../../data/races.js'
import { SKILLS } from '../../data/skills.js'

const ABILITY_SCORES = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']

function SkillCheckboxes({ availableSkills, selectedSkills, maxCount, onChange, disabledSkills = [] }) {
  function toggleSkill(skill) {
    if (disabledSkills.includes(skill)) return
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill))
    } else if (selectedSkills.length < maxCount) {
      onChange([...selectedSkills, skill])
    }
  }

  return (
    <div className="skill-checkboxes">
      {availableSkills.map(skill => {
        const isDisabled = disabledSkills.includes(skill)
        const isChecked = selectedSkills.includes(skill)
        const isMaxed = selectedSkills.length >= maxCount && !isChecked

        return (
          <div
            key={skill}
            className={`skill-checkbox-item${isChecked ? ' selected' : ''}${isDisabled || isMaxed ? ' disabled' : ''}`}
            onClick={() => !isDisabled && !isMaxed && toggleSkill(skill)}
            role="button"
            tabIndex={isDisabled || isMaxed ? -1 : 0}
            onKeyDown={e => e.key === 'Enter' && !isDisabled && !isMaxed && toggleSkill(skill)}
            aria-pressed={isChecked}
          >
            {skill}
          </div>
        )
      })}
    </div>
  )
}

function WildlingFields({ character, updateCharacter, selectedSkills, onSkillChange }) {
  const allSkillNames = SKILLS.map(s => s.name)

  function setSkillAtIndex(index, value) {
    const updated = [...selectedSkills]
    updated[index] = value
    // Ensure no duplicates
    if (updated[0] === updated[1] && updated[0] !== '') {
      updated[index] = ''
    }
    onSkillChange(updated.filter(Boolean))
  }

  const skill1 = selectedSkills[0] || ''
  const skill2 = selectedSkills[1] || ''

  return (
    <div className="wildling-fields">
      <div className="wildling-fields__title">Wildling Custom Fields</div>

      <div className="form-group">
        <label htmlFor="animal-form">What animal is your Wildling becoming?</label>
        <input
          type="text"
          id="animal-form"
          placeholder="Wolf, deer, fox, bear, crow, serpent, moth, boar..."
          value={character.animalForm || ''}
          onChange={e => updateCharacter({ animalForm: e.target.value })}
          maxLength={60}
        />
        <div className="helper-text">
          Wildlings can reflect nearly any animal form. Choose something that inspires your
          movement, instincts, senses, culture, or appearance.
        </div>
      </div>

      <div className="ability-dropdowns">
        <div className="form-group">
          <label htmlFor="bonus-plus-two">+2 Ability Score</label>
          <select
            id="bonus-plus-two"
            value={character.abilityBonusPlusTwo || ''}
            onChange={e => updateCharacter({ abilityBonusPlusTwo: e.target.value })}
          >
            <option value="">— Choose —</option>
            {ABILITY_SCORES.filter(a => a !== character.abilityBonusPlusOne).map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bonus-plus-one">+1 Ability Score</label>
          <select
            id="bonus-plus-one"
            value={character.abilityBonusPlusOne || ''}
            onChange={e => updateCharacter({ abilityBonusPlusOne: e.target.value })}
          >
            <option value="">— Choose —</option>
            {ABILITY_SCORES.filter(a => a !== character.abilityBonusPlusTwo).map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="racial-trait">Racial Trait</label>
        <select
          id="racial-trait"
          value={character.wildlingRacialTrait || ''}
          onChange={e => updateCharacter({ wildlingRacialTrait: e.target.value })}
        >
          <option value="">— Choose a racial trait —</option>
          <option value="Adrenaline Rush">Adrenaline Rush</option>
          <option value="Brave">Brave</option>
          <option value="Darkvision">Darkvision</option>
          <option value="Flying Speed">Flying Speed</option>
          <option value="Keen Sense">Keen Sense</option>
          <option value="Lucky">Lucky</option>
          <option value="Trance">Trance</option>
        </select>
      </div>

      <div className="form-group">
        <label>Skill Proficiencies — Choose 2</label>
        <div className="helper-text" style={{ marginBottom: 'var(--spacing-sm)' }}>
          Choose two skills that reflect your animal nature, instincts, movement, senses, or
          survival style. The same skill cannot be chosen twice.
        </div>
        <div className="skill-dropdown-row">
          <div className="skill-dropdown">
            <label htmlFor="wildling-skill-1">Skill 1</label>
            <select
              id="wildling-skill-1"
              value={skill1}
              onChange={e => setSkillAtIndex(0, e.target.value)}
            >
              <option value="">— Choose skill —</option>
              {allSkillNames.filter(s => s !== skill2).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="skill-dropdown">
            <label htmlFor="wildling-skill-2">Skill 2</label>
            <select
              id="wildling-skill-2"
              value={skill2}
              onChange={e => setSkillAtIndex(1, e.target.value)}
            >
              <option value="">— Choose skill —</option>
              {allSkillNames.filter(s => s !== skill1).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Step3Origin({ step, character, updateCharacter, onBack, onContinue }) {
  const race = RACES.find(r => r.id === character.race)
  const origins = ORIGINS[character.race] || []
  const selectedOrigin = origins.find(o => o.id === character.origin)
  const isWildling = character.race === 'wildling'
  const isDrakanis = character.race === 'drakanis'

  useEffect(() => {
    if (!character.origin && origins.length > 0) {
      updateCharacter({ origin: origins[0].id, originSkills: [] })
    }
  }, [character.race])

  const titleMap = {
    bashet: 'Choose Your Origin',
    nald: 'Choose Your Origin',
    drakanis: 'Choose Your Ancestry',
    wildling: 'Choose Your Origin',
  }
  const title = titleMap[character.race] || 'Choose Your Origin'

  function handleSelectOrigin(originId) {
    if (character.origin !== originId) {
      updateCharacter({
        origin: originId,
        originSkills: [],
        animalForm: '',
        abilityBonusPlusTwo: '',
        abilityBonusPlusOne: '',
        selectedEquipmentPacks: character.selectedEquipmentPacks.filter(
          p => !isOriginPackId(p)
        ),
      })
    }
  }

  function isOriginPackId(packId) {
    const originPackIds = [
      'cityfolk', 'sandstrider', 'atlantean', 'oceanic',
      'ruby-drakanis', 'sapphire-drakanis', 'emerald-drakanis',
      'silver-drakanis', 'golden-drakanis', 'wildling',
    ]
    return originPackIds.includes(packId)
  }

  function isComplete() {
    if (!character.origin) return false
    if (isWildling) {
      return (
        character.animalForm &&
        character.abilityBonusPlusTwo &&
        character.abilityBonusPlusOne &&
        character.abilityBonusPlusTwo !== character.abilityBonusPlusOne &&
        character.wildlingRacialTrait &&
        character.originSkills.length === 2
      )
    }
    return character.originSkills.length === 2
  }

  const introText = {
    bashet: 'Bashet come from two very different worlds. Cityfolk are shaped by Rem\'s beauty, art, and politics. Sandstriders are shaped by the open Rivarin Desert and older, harder freedoms.',
    nald: 'Nald can trace their identity to the great city of Atlantis and its deep ceremonies, or to the open sea and the practical life of reefs and currents.',
    drakanis: 'Drakanis lineages are defined by their Dragonlord ancestry. Each lineage carries its own elemental power, resistance, and cultural weight.',
    wildling: 'Wildlings can come from within the circle of a tribe and its traditions, or from the solitary path of the Wildstray. Both lead to the same connection with the living world.',
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} title={title} />
      <h1 className="screen-title">{title}</h1>
      <p className="screen-intro">{introText[character.race]}</p>

      <div className="origin-cards-row">
        {origins.map(origin => (
          <OriginCard
            key={origin.id}
            origin={origin}
            isSelected={character.origin === origin.id}
            onSelect={handleSelectOrigin}
          />
        ))}
      </div>

      {selectedOrigin && (
        <div className="detail-panel">
          <div className="detail-panel__title">{selectedOrigin.name}</div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-text">
              {selectedOrigin.description.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {isDrakanis && selectedOrigin.resistance && (
            <div className="detail-panel__section">
              <div className="detail-panel__section-label">Lineage Traits</div>
              <div className="detail-panel__traits">
                <span className="trait-badge">+1 Constitution</span>
                <span className="trait-badge">+1 Strength</span>
                <span className="trait-badge">{selectedOrigin.resistance} Resistance</span>
                <span className="trait-badge">{selectedOrigin.breathWeapon?.damageType} Breath Weapon</span>
              </div>
            </div>
          )}

          {isDrakanis && selectedOrigin.breathWeapon && (
            <div className="detail-panel__section">
              <div className="detail-panel__section-label">Breath Weapon</div>
              <div className="detail-panel__traits">
                <span className="trait-badge">{selectedOrigin.breathWeapon.damageType}</span>
                <span className="trait-badge">{selectedOrigin.breathWeapon.shape}</span>
                <span className="trait-badge">{selectedOrigin.breathWeapon.savingThrow} Save</span>
                <span className="trait-badge">1d10 damage</span>
                <span className="trait-badge">Once per long rest</span>
              </div>
            </div>
          )}

          {!isWildling && (
            <div className="skill-selection">
              <div className="skill-selection__title">Skill Proficiencies — Choose 2</div>
              <div className="skill-selection__helper">
                Selected: {character.originSkills.length} / 2
              </div>
              <SkillCheckboxes
                availableSkills={selectedOrigin.skills}
                selectedSkills={character.originSkills}
                maxCount={2}
                onChange={skills => updateCharacter({ originSkills: skills })}
              />
            </div>
          )}

          {isWildling && (
            <WildlingFields
              character={character}
              updateCharacter={updateCharacter}
              selectedSkills={character.originSkills}
              onSkillChange={skills => updateCharacter({ originSkills: skills })}
            />
          )}
        </div>
      )}

      {isComplete() && (
        <div className="cta-area">
          <button className="btn-continue" onClick={onContinue}>
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
