import React, { useRef, useEffect } from 'react'
import Navigation from '../Navigation.jsx'
import ScrollableRow from '../ScrollableRow.jsx'
import { CLASS_GROUPS, findClassById } from '../../data/classes.js'
import { SKILLS } from '../../data/skills.js'

const allSkillNames = SKILLS.map(s => s.name)

export default function Step5Class({ step, character, updateCharacter, onBack, onContinue }) {
  const selectedGroup = CLASS_GROUPS.find(g => g.id === character.classGroup)
  const selectedClass = findClassById(character.characterClass)

  const classRowRef = useRef(null)
  const detailRef = useRef(null)
  const ctaRef = useRef(null)
  const wasComplete = useRef(false)
  const prevClassGroup = useRef(character.classGroup)
  const prevCharacterClass = useRef(character.characterClass)

  function isComplete() {
    if (!character.classGroup || !character.characterClass || !selectedClass) return false
    return character.classSkills.filter(Boolean).length === selectedClass.skillCount
  }

  const complete = isComplete()

  useEffect(() => {
    if (character.classGroup && character.classGroup !== prevClassGroup.current) {
      classRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    prevClassGroup.current = character.classGroup
  }, [character.classGroup])

  useEffect(() => {
    if (character.characterClass && character.characterClass !== prevCharacterClass.current) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    prevCharacterClass.current = character.characterClass
  }, [character.characterClass])

  useEffect(() => {
    if (complete && !wasComplete.current) {
      ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    wasComplete.current = complete
  }, [complete])

  function handleSelectGroup(groupId) {
    if (character.classGroup !== groupId) {
      updateCharacter({
        classGroup: groupId,
        characterClass: null,
        classSkills: [],
      })
    }
  }

  function handleSelectClass(classId) {
    if (character.characterClass !== classId) {
      updateCharacter({
        characterClass: classId,
        classSkills: [],
      })
    }
  }

  function isSkillDisabled(skill) {
    return character.originSkills.includes(skill)
  }

  const callingImages = {
    martial: '/Class_Icon_Martial.png',
    divine: '/Class_Icon_Divine.png',
    arcane: '/Class_Icon_Arcane.png',
    wilds: '/Class_Icon_Nature.png',
    cunning: '/Class_Icon_Cunning.png',
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Choose Your Class</h1>
      <p className="screen-intro">
        First choose a calling — the broad path your character follows. Then choose the specific
        class within that calling.
      </p>

      {/* Calling cards */}
      <div className="section-divider">
        <span className="section-divider__text">Step 1 — Choose a Calling</span>
      </div>
      <div className="calling-cards-grid">
        {CLASS_GROUPS.map(group => (
          <div
            key={group.id}
            className={`calling-card${character.classGroup === group.id ? ' selected' : ''}`}
            onClick={() => handleSelectGroup(group.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleSelectGroup(group.id)}
          >
            {callingImages[group.id]
              ? <img src={callingImages[group.id]} alt={group.name} className="calling-card__icon-img" />
              : <span className="calling-card__icon">◆</span>
            }
            <div className="calling-card__name">{group.name}</div>
            <div className="calling-card__desc">{group.description}</div>
          </div>
        ))}
      </div>

      {/* Class cards — always in DOM so classRowRef is available for scrollIntoView */}
      <div ref={classRowRef} style={{ visibility: selectedGroup ? 'visible' : 'hidden' }}>
        <div className="section-divider">
          <span className="section-divider__text">Step 2 — Choose a Class</span>
        </div>
        <ScrollableRow className="class-cards-row">
          {(selectedGroup?.classes ?? []).map(cls => (
            <div
              key={cls.id}
              className={`race-card${character.characterClass === cls.id ? ' selected' : ''}`}
              onClick={() => handleSelectClass(cls.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleSelectClass(cls.id)}
              aria-pressed={character.characterClass === cls.id}
            >
              <div className="race-card__image-wrapper">
                {cls.stillImage && (
                  <img src={cls.stillImage} alt={cls.name} />
                )}
              </div>
              <div className="race-card__body">
                <div className="race-card__name">{cls.name}</div>
                {cls.cardDescription && (
                  <div className="race-card__flavor">{cls.cardDescription}</div>
                )}
                {cls.isSpellcaster && (
                  <div className="race-card__mechanics">
                    <span className="mechanic-tag">Spellcaster</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </ScrollableRow>
      </div>

      {/* Class detail panel + skill selection */}
      {selectedClass && (
        <div className="detail-panel" ref={detailRef}>
          <div className="detail-panel__title">{selectedClass.name}</div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-text">{selectedClass.description}</div>
          </div>

          <div className="detail-panel__section">
            <div className="detail-panel__section-label">Often Found Among</div>
            <div className="found-among">
              {selectedClass.foundAmong.split(',').map((tag, i) => (
                <span key={i} className="found-among-tag">{tag.trim()}</span>
              ))}
            </div>
          </div>

          {selectedClass.isSpellcaster && (
            <div className="detail-panel__section">
              <div style={{ display: 'inline-block', background: 'var(--color-parchment-dark)', border: '1px solid var(--color-gold)', fontSize: '0.78rem', padding: '2px 8px', borderRadius: '2px', color: 'var(--color-sepia)' }}>
                ✦ Spellcasting class — Spell Sheet included in PDF
              </div>
            </div>
          )}

          <div className="section-divider">
            <span className="section-divider__text">
              Choose {selectedClass.skillCount} Skill{selectedClass.skillCount > 1 ? 's' : ''}
            </span>
          </div>

          <div className="skill-selection">
            <div className="skill-selection__title">
              Class Skill Proficiencies — Choose {selectedClass.skillCount}
            </div>
            <div className="skill-selection__helper">
              Selected: {character.classSkills.filter(Boolean).length} / {selectedClass.skillCount}
              {character.originSkills.length > 0 && (
                <span style={{ marginLeft: 8, color: 'var(--color-sepia)' }}>
                  · Greyed out skills are already proficient from your origin.
                </span>
              )}
            </div>

            <div className="skill-checkboxes">
              {(selectedClass.skills === null ? allSkillNames : selectedClass.skills).map(skill => {
                const isDisabled = isSkillDisabled(skill)
                const isSelected = character.classSkills.includes(skill)
                const isMaxed = character.classSkills.filter(Boolean).length >= selectedClass.skillCount && !isSelected

                function toggle() {
                  if (isDisabled || isMaxed) return
                  if (isSelected) {
                    updateCharacter({ classSkills: character.classSkills.filter(s => s !== skill) })
                  } else {
                    updateCharacter({ classSkills: [...character.classSkills.filter(Boolean), skill] })
                  }
                }

                return (
                  <div
                    key={skill}
                    className={`skill-checkbox-item${isSelected ? ' selected' : ''}${isDisabled || isMaxed ? ' disabled' : ''}`}
                    onClick={toggle}
                    role="button"
                    tabIndex={isDisabled || isMaxed ? -1 : 0}
                    onKeyDown={e => e.key === 'Enter' && toggle()}
                    aria-pressed={isSelected}
                  >
                    {skill}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {complete && (
        <div className="cta-area" ref={ctaRef}>
          <button className="btn-continue" onClick={onContinue}>
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
