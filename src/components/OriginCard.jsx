import React, { useRef, useEffect, useState } from 'react'

export default function OriginCard({ origin, isSelected, onSelect, onLearnMore }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const wasSelected = useRef(false)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isSelected && !reducedMotion) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  }, [isSelected, reducedMotion])

  useEffect(() => {
    if (isSelected && !wasSelected.current && window.innerWidth <= 768) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
    wasSelected.current = isSelected
  }, [isSelected])

  const showVideo = isSelected && !reducedMotion && origin.animatedImage

  return (
    <div
      ref={cardRef}
      className={`origin-card${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(origin.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(origin.id)}
      aria-pressed={isSelected}
      aria-label={`Select ${origin.name}`}
    >
      {origin.stillImage && (
        <div className="origin-card__image-wrapper">
          <img
            src={origin.stillImage}
            alt={origin.name}
            style={{ display: showVideo ? 'none' : 'block' }}
          />
          {origin.animatedImage && (
            <video
              ref={videoRef}
              src={origin.animatedImage}
              muted
              playsInline
              style={{ display: showVideo ? 'block' : 'none' }}
            />
          )}
        </div>
      )}
      <div className="origin-card__body">
        <div className="origin-card__name">{origin.name}</div>
        <div className="origin-card__subtitle">{origin.subtitle}</div>
        {origin.resistance && (
          <div style={{ marginTop: 'var(--spacing-sm)', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <span className="mechanic-tag">{origin.resistance} Resistance</span>
            <span className="mechanic-tag">{origin.breathWeapon?.damageType} Breath</span>
          </div>
        )}
        {isSelected && (
          <button
            className="card-learn-more-btn"
            onClick={e => { e.stopPropagation(); onLearnMore() }}
          >
            Learn More ↓
          </button>
        )}
      </div>
    </div>
  )
}
