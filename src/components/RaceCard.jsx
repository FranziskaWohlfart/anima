import React, { useRef, useEffect, useState } from 'react'

export default function RaceCard({ race, isSelected, onSelect, onLearnMore }) {
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

  const showVideo = isSelected && !reducedMotion && race.animatedImage

  return (
    <div
      ref={cardRef}
      className={`race-card${isSelected ? ' selected' : ''}`}
      onClick={() => onSelect(race.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(race.id)}
      aria-pressed={isSelected}
      aria-label={`Select ${race.name}`}
    >
      <div className="race-card__image-wrapper">
        <img
          src={race.stillImage}
          alt={race.name}
          style={{ display: showVideo ? 'none' : 'block' }}
        />
        {race.animatedImage && (
          <video
            ref={videoRef}
            src={race.animatedImage}
            muted
            playsInline
            style={{ display: showVideo ? 'block' : 'none' }}
            onEnded={() => {}}
          />
        )}
      </div>
      <div className="race-card__body">
        <div className="race-card__name">{race.name}</div>
        <div className="race-card__flavor">{race.flavor}</div>
        <div className="race-card__mechanics">
          {race.mechanics.map((m, i) => (
            <span key={i} className="mechanic-tag">{m}</span>
          ))}
        </div>
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
