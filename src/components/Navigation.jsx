import React from 'react'
import ProgressDiamonds from './ProgressDiamonds.jsx'

export default function Navigation({ step, onBack }) {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__left">
        {step > 0 && (
          <button className="btn-back" onClick={onBack} aria-label="Go back">
            ← Back
          </button>
        )}
      </div>
      <div className="nav-bar__center">
        {step >= 1 && step <= 9 && (
          <ProgressDiamonds current={step} total={9} />
        )}
      </div>
      <div className="nav-bar__right" />
    </nav>
  )
}
