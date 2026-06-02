import React from 'react'

export default function ProgressDiamonds({ current, total = 9 }) {
  return (
    <div className="progress-diamonds" aria-label={`Step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1
        const isFilled = stepNum <= current
        const isCurrent = stepNum === current
        return (
          <span
            key={stepNum}
            className={`diamond${isFilled ? ' filled' : ''}${isCurrent ? ' current' : ''}`}
            title={`Step ${stepNum}`}
          >
            {isFilled ? '◆' : '◇'}
          </span>
        )
      })}
    </div>
  )
}
