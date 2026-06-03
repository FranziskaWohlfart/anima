import React, { useState, useRef } from 'react'
import Navigation from '../Navigation.jsx'
import { LORE_SECTIONS } from '../../data/lore.js'

function AccordionItem({ title, content }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="lore-accordion__item">
      <div
        className="lore-accordion__header"
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
      >
        <span>{title}</span>
        <span className={`lore-accordion__arrow${open ? ' open' : ''}`}>▶</span>
      </div>
      {open && (
        <div className="lore-accordion__content">
          {content.split('\n').map((line, i) =>
            line.trim() ? <p key={i} style={{ margin: '0 0 8px' }}>{line}</p> : null
          )}
        </div>
      )}
    </div>
  )
}

function LoreDetail({ section }) {
  if (!section) return null
  return (
    <div className="lore-section">
      <div className="lore-section__title">{section.title}</div>
      <p className="lore-section__summary">{section.summary}</p>
      {section.id === 'lands' && (
        <img
          src="/Lemuria_Map.jpg"
          alt="Map of Lemuria"
          style={{ width: '100%', borderRadius: 'var(--border-radius)', margin: 'var(--spacing-md) 0', border: 'var(--border-gold)' }}
        />
      )}
      <div className="lore-accordion">
        {section.accordions.map(acc => (
          <AccordionItem key={acc.title} title={acc.title} content={acc.content} />
        ))}
      </div>
    </div>
  )
}

export default function Step1World({ step, onBack, onContinue }) {
  const [selectedLoreId, setSelectedLoreId] = useState(null)
  const detailRef = useRef(null)

  const selectedSection = LORE_SECTIONS.find(s => s.id === selectedLoreId)

  function handleLoreClick(id) {
    const isDeselecting = selectedLoreId === id
    setSelectedLoreId(isDeselecting ? null : id)
    if (!isDeselecting) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Learn About the World</h1>

      <div className="screen-intro">
        <p>
          Lemuria is a small and ancient continent, separated from the wider world by dangerous seas,
          old storms, and stranger things still. It is a strange land of deep forests, golden deserts,
          shattered islands, silent ruins, and mountains ruled by dragons.
        </p>
        <p>But Lemuria is best known for its curse.</p>
        <p>
          Every human-like creature born on the continent carries the touch of this curse. Slowly,
          across generations, bodies change. Ears sharpen, eyes gleam in the dark, skin becomes scale,
          feather, fur, or fin. Some people remain stable for centuries as proud peoples with their
          own cultures and kingdoms. Others change further. In the worst cases, memory, language, and
          selfhood fade, until nothing remains but instinct.
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-sepia)' }}>
          Some call this fate a curse.<br />
          Some call it nature's will.<br />
          Some call it the punishment of forgotten gods.
        </p>
      </div>

      <div className="lore-cards-grid">
        {LORE_SECTIONS.map(section => (
          <div
            key={section.id}
            className={`lore-card${selectedLoreId === section.id ? ' selected' : ''}`}
            onClick={() => handleLoreClick(section.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handleLoreClick(section.id)}
            aria-pressed={selectedLoreId === section.id}
          >
            {section.tabImage
              ? <img src={section.tabImage} alt="" className="lore-card__icon-img" />
              : <span className="lore-card__icon">{section.icon}</span>
            }
            <div className="lore-card__title">{section.title}</div>
            <div className="lore-card__teaser">{section.teaser}</div>
          </div>
        ))}
      </div>

      <div ref={detailRef} />
      {selectedSection && <LoreDetail section={selectedSection} />}

      <div className="sticky-cta">
        <button className="btn-continue" onClick={onContinue}>
          Continue to Character Creation
        </button>
      </div>
    </div>
  )
}
