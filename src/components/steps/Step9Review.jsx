import React, { useState } from 'react'
import Navigation from '../Navigation.jsx'
import { RACES } from '../../data/races.js'
import { ORIGINS } from '../../data/origins.js'
import { FAITHS } from '../../data/faiths.js'
import { findClassById, CLASS_GROUPS } from '../../data/classes.js'
import { BACKGROUNDS } from '../../data/backgrounds.js'
import { AnimaPDFDocument, downloadPDF } from '../../utils/pdfExport.jsx'
import { PDFViewer } from '@react-pdf/renderer'

export default function Step9Review({ step, character, onBack, jumpToStep }) {
  const [downloading, setDownloading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const race = RACES.find(r => r.id === character.race)
  const originList = ORIGINS[character.race] || []
  const origin = originList.find(o => o.id === character.origin)
  const faith = FAITHS.find(f => f.id === character.faith)
  const cls = findClassById(character.characterClass)
  const classGroup = CLASS_GROUPS.find(g => g.id === character.classGroup)
  const background = character.background === 'custom'
    ? { name: character.customBackgroundName || 'Custom Background', description: character.customBackgroundDescription || '' }
    : BACKGROUNDS.find(b => b.id === character.background)

  const displayPortrait = character.portraitImage
    || (!character.portraitCleared && cls?.stillImage)
    || null

  const callingImages = {
    martial: '/Class_Icon_Martial.png',
    divine: '/Class_Icon_Divine.png',
    arcane: '/Class_Icon_Arcane.png',
    wilds: '/Class_Icon_Nature.png',
    cunning: '/Class_Icon_Cunning.png',
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      await downloadPDF(character)
    } catch (err) {
      console.error('PDF download failed:', err)
      alert('PDF generation failed. Please try again.')
    }
    setDownloading(false)
  }

  function Section({ title, value, detail, editStep, emptyLabel = 'Not set', iconImg, iconEmoji, extraClass }) {
    const hasIcon = value && (iconImg || iconEmoji)
    return (
      <div className={`review-card${extraClass ? ` ${extraClass}` : ''}`}>
        <div className="review-card__header">
          <div className="review-card__section-title">{title}</div>
          <button className="review-card__edit-btn" onClick={() => jumpToStep(editStep)}>
            Edit
          </button>
        </div>
        {hasIcon && iconImg && (
          <img src={iconImg} alt="" style={{ width: '100%', maxWidth: 200, aspectRatio: '1', objectFit: 'contain', display: 'block', margin: '0 auto 8px' }} />
        )}
        {hasIcon && !iconImg && iconEmoji && (
          <span style={{ fontSize: '2.2rem', display: 'block', textAlign: 'center', marginBottom: 8 }}>{iconEmoji}</span>
        )}
        <div className="review-card__value">
          {value || <span style={{ color: 'var(--color-sepia)', fontStyle: 'italic' }}>{emptyLabel}</span>}
        </div>
        {detail && <div className="review-card__detail">{detail}</div>}
      </div>
    )
  }

  return (
    <div className="screen">
      <Navigation step={step} onBack={onBack} />
      <h1 className="screen-title">Review Your Character</h1>

      <div className="review-warning">
        <strong>Your character is not saved.</strong> Download your PDF before closing or refreshing the page.
      </div>

      <div className="review-sections">
        <div className="review-card review-card--identity">
          <div className="review-card__header">
            <div className="review-card__section-title">Character</div>
            <button className="review-card__edit-btn" onClick={() => jumpToStep(8)}>Edit</button>
          </div>
          {displayPortrait ? (
            <img
              src={displayPortrait}
              alt="Portrait"
              style={{ width: '100%', maxWidth: 200, aspectRatio: '3 / 4', objectFit: 'cover', display: 'block', margin: '0 auto 8px' }}
            />
          ) : (
            <div style={{ width: '100%', maxWidth: 200, aspectRatio: '3 / 4', background: 'var(--color-parchment-dark)', border: '1px dashed var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', color: 'var(--color-sepia)', fontSize: '0.8rem', fontStyle: 'italic' }}>
              No portrait
            </div>
          )}
          <div className="review-card__value">
            {character.name || <span style={{ color: 'var(--color-sepia)', fontStyle: 'italic' }}>No name entered</span>}
          </div>
          {[character.gender, character.age, character.alignment].filter(Boolean).length > 0 && (
            <div className="review-card__detail">{[character.gender, character.age, character.alignment].filter(Boolean).join(' · ')}</div>
          )}
        </div>

        <Section
          title="Race"
          value={race?.name}
          detail={race?.flavor}
          editStep={2}
          emptyLabel="No race selected"
          extraClass="review-card--identity"
        />

        <Section
          title="Origin / Ancestry"
          value={origin?.name}
          detail={origin?.subtitle}
          editStep={3}
          emptyLabel="No origin selected"
          extraClass="review-card--identity"
        />

        <Section
          title="Faith"
          value={faith?.name}
          editStep={4}
          emptyLabel="None selected"
          iconImg={faith?.tabImage}
          iconEmoji={faith?.icon}
        />

        <Section
          title="Class"
          value={cls ? `${classGroup?.name} — ${cls.name}` : null}
          detail={cls ? `${character.classSkills.filter(Boolean).join(', ')}` : null}
          editStep={5}
          emptyLabel="No class selected"
          iconImg={classGroup ? callingImages[classGroup.id] : null}
        />

        <Section
          title="Background"
          value={character.background === 'custom'
            ? (character.customBackgroundName || 'Custom Background')
            : background?.name}
          detail={character.background === 'custom'
            ? (character.customBackgroundDescription?.slice(0, 80) || null)
            : (background?.description?.slice(0, 80) + (background?.description?.length > 80 ? '...' : ''))}
          editStep={6}
          emptyLabel="None selected"
          iconImg={character.background === 'custom' ? '/Background_none.png' : background?.image}
        />

        <div className="review-card review-card--tall">
          <div className="review-card__header">
            <div className="review-card__section-title">Equipment</div>
            <button className="review-card__edit-btn" onClick={() => jumpToStep(7)}>Edit</button>
          </div>
          {character.equipmentItems.length > 0 ? (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.82rem', color: 'var(--color-ink-light)' }}>
              {character.equipmentItems.map((item, i) => (
                <li key={i} style={{ padding: '2px 0', borderBottom: '1px solid var(--color-parchment-dark)' }}>
                  ◆ {item}
                </li>
              ))}
            </ul>
          ) : (
            <div className="review-card__value" style={{ color: 'var(--color-sepia)', fontStyle: 'italic' }}>No items selected</div>
          )}
        </div>

        <div className="review-card review-card--tall">
          <div className="review-card__header">
            <div className="review-card__section-title">Story Prompts</div>
            <button className="review-card__edit-btn" onClick={() => jumpToStep(8)}>
              Edit
            </button>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-light)' }}>
            {character.curseAnswer || character.leftHomeAnswer || character.memoryAnswer ? (
              <span>{[character.curseAnswer, character.leftHomeAnswer, character.memoryAnswer].filter(Boolean).length} prompt{[character.curseAnswer, character.leftHomeAnswer, character.memoryAnswer].filter(Boolean).length !== 1 ? 's' : ''} answered</span>
            ) : (
              <span style={{ fontStyle: 'italic', color: 'var(--color-sepia)' }}>None answered — will show as blank lines in PDF</span>
            )}
          </div>
        </div>

        <div className="review-card review-card--tall">
          <div className="review-card__header">
            <div className="review-card__section-title">Skills</div>
            <button className="review-card__edit-btn" onClick={() => jumpToStep(3)}>
              Edit
            </button>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-light)' }}>
            {[...character.originSkills, ...character.classSkills.filter(Boolean)].length > 0 ? (
              <span>
                Proficient in: {[...new Set([...character.originSkills, ...character.classSkills.filter(Boolean)])].join(', ')}
              </span>
            ) : (
              <span style={{ fontStyle: 'italic', color: 'var(--color-sepia)' }}>No skills selected</span>
            )}
          </div>
        </div>
      </div>

      <div className="section-divider">
        <span className="section-divider__text">PDF Export</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <button
          className="btn-secondary"
          onClick={() => setShowPreview(p => !p)}
          style={{ marginBottom: 'var(--spacing-md)' }}
        >
          {showPreview ? 'Hide PDF Preview' : 'Show PDF Preview'}
        </button>
      </div>

      {showPreview && (
        <div className="pdf-preview-wrapper" style={{ height: 600 }}>
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            <AnimaPDFDocument character={character} />
          </PDFViewer>
        </div>
      )}

      <div className="cta-area" style={{ flexDirection: 'column', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
        <button
          className="btn-continue"
          onClick={handleDownload}
          disabled={downloading}
          style={{ fontSize: '1.1rem', padding: '14px 40px' }}
        >
          {downloading ? 'Generating PDF...' : '⬇ Download Printable PDF'}
        </button>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-sepia)', fontStyle: 'italic' }}>
          A4 format, printable at home or at a print shop.
        </p>
      </div>
    </div>
  )
}
