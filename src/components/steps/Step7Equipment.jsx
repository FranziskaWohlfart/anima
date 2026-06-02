import React, { useState } from 'react'
import Navigation from '../Navigation.jsx'
import { ORIGINS } from '../../data/origins.js'
import { BACKGROUNDS } from '../../data/backgrounds.js'
import { EQUIPMENT_PACKS } from '../../data/equipment.js'

export default function Step7Equipment({ step, character, updateCharacter, onBack, onContinue }) {
  const [customInput, setCustomInput] = useState('')

  // Find origin pack
  const originData = (ORIGINS[character.race] || []).find(o => o.id === character.origin)
  const originPackId = originData?.suggestedPack || null
  const originPack = originPackId ? EQUIPMENT_PACKS[originPackId] : null

  // Find background pack
  const bgData = BACKGROUNDS.find(b => b.id === character.background)
  const bgPackId = bgData?.suggestedPack || null
  const bgPack = bgPackId ? EQUIPMENT_PACKS[bgPackId] : null

  function isPackSelected(packId) {
    return character.selectedEquipmentPacks.includes(packId)
  }

  function togglePack(packId, items) {
    if (isPackSelected(packId)) {
      // Remove pack and its items
      const pack = EQUIPMENT_PACKS[packId]
      const packItems = pack ? pack.items : []
      updateCharacter({
        selectedEquipmentPacks: character.selectedEquipmentPacks.filter(p => p !== packId),
        equipmentItems: character.equipmentItems.filter(item => !packItems.includes(item)),
      })
    } else {
      // Add pack and its items (avoid duplicates)
      const pack = EQUIPMENT_PACKS[packId]
      const packItems = pack ? pack.items : []
      const newItems = packItems.filter(item => !character.equipmentItems.includes(item))
      updateCharacter({
        selectedEquipmentPacks: [...character.selectedEquipmentPacks, packId],
        equipmentItems: [...character.equipmentItems, ...newItems],
      })
    }
  }

  function removeItem(item) {
    updateCharacter({
      equipmentItems: character.equipmentItems.filter(i => i !== item),
    })
  }

  function addCustomItem() {
    const trimmed = customInput.trim()
    if (!trimmed) return
    if (!character.equipmentItems.includes(trimmed)) {
      updateCharacter({ equipmentItems: [...character.equipmentItems, trimmed] })
    }
    setCustomInput('')
  }

  function handleCustomKeyDown(e) {
    if (e.key === 'Enter') addCustomItem()
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Choose Equipment</h1>
      <p className="screen-intro">
        Equipment in this creator is flavor-only. Choose any suggested packs, customize your items,
        or continue with a blank equipment section that you can fill in by hand later.
      </p>

      <div className="pack-cards">
        {originPack && (
          <div className="pack-card">
            <div className="pack-card__header">
              <div className="pack-card__title">{originPack.name}</div>
              {isPackSelected(originPackId) ? (
                <button className="btn-remove-pack" onClick={() => togglePack(originPackId)}>
                  Remove
                </button>
              ) : (
                <button className="btn-add-pack" onClick={() => togglePack(originPackId)}>
                  Add Pack
                </button>
              )}
            </div>
            <ul className="pack-card__items">
              {originPack.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-sepia)', fontStyle: 'italic' }}>
              Origin pack
            </div>
          </div>
        )}

        {bgPack && bgPack.id !== originPackId && (
          <div className="pack-card">
            <div className="pack-card__header">
              <div className="pack-card__title">{bgPack.name}</div>
              {isPackSelected(bgPackId) ? (
                <button className="btn-remove-pack" onClick={() => togglePack(bgPackId)}>
                  Remove
                </button>
              ) : (
                <button className="btn-add-pack" onClick={() => togglePack(bgPackId)}>
                  Add Pack
                </button>
              )}
            </div>
            <ul className="pack-card__items">
              {bgPack.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-sepia)', fontStyle: 'italic' }}>
              Background pack
            </div>
          </div>
        )}

        {!originPack && !bgPack && (
          <p style={{ color: 'var(--color-sepia)', fontStyle: 'italic', fontSize: '0.9rem' }}>
            No suggested packs available. You can add custom items below.
          </p>
        )}
      </div>

      <div className="equipment-list">
        <div className="equipment-list__title">Your Equipment</div>
        {character.equipmentItems.length === 0 ? (
          <div className="equipment-list__empty">
            No items selected yet. Add a pack above or add custom items below.
          </div>
        ) : (
          character.equipmentItems.map((item, i) => (
            <div key={i} className="equipment-item">
              <span>{item}</span>
              <button
                className="btn-remove-item"
                onClick={() => removeItem(item)}
                aria-label={`Remove ${item}`}
              >
                ×
              </button>
            </div>
          ))
        )}

        <div className="custom-item-row">
          <input
            type="text"
            placeholder="Cracked compass, mother's ring, forbidden temple key..."
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            onKeyDown={handleCustomKeyDown}
            maxLength={80}
          />
          <button className="btn-add-item" onClick={addCustomItem}>
            Add Item
          </button>
        </div>
      </div>

      <div className="cta-area">
        <button className="btn-continue" onClick={onContinue}>
          Continue →
        </button>
      </div>
    </div>
  )
}
