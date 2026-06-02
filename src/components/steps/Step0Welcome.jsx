import React from 'react'

export default function Step0Welcome({ onContinue }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-panel">
        <span className="welcome-ornament">✦</span>
        <div className="welcome-title">ANIMA</div>
        <div className="welcome-subtitle">Character Creator</div>
        <div className="welcome-divider" />
        <p className="welcome-description">
          Discover the fantastic continent of Lemuria, learn about its peoples and mysteries,
          create your first level character step by step, and receive a printable character sheet at the end.
        </p>
        <button className="btn-continue" onClick={onContinue}>
          Build your character
        </button>
        <p className="welcome-note">
          No account required. Export your PDF when you are done.
        </p>
      </div>
    </div>
  )
}
