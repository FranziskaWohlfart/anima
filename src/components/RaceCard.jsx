import React, { useRef, useEffect, useState } from 'react'

export default function RaceCard({ race, isSelected, onSelect }) {
  const videoRef = useRef(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isSelected && !reducedMotion) {
      video.currentTime = 0
      video.play().catch(() => {
        // Autoplay may be blocked — silently fail
      })
    }
  }, [isSelected, reducedMotion])

  const showVideo = isSelected && !reducedMotion && race.animatedImage

  return (
    <div
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
            onEnded={() => {
              // Video ends — stay on last frame (no loop)
            }}
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
      </div>
    </div>
  )
}
