import React from 'react'

export default function OptionCard({ title, subtitle, description, isSelected, onSelect, badge, icon }) {
  return (
    <div
      className={`option-card${isSelected ? ' selected' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      aria-pressed={isSelected}
      aria-label={`${isSelected ? 'Deselect' : 'Select'} ${title}`}
    >
      {badge && <span className="recommended-badge">{badge}</span>}
      {icon && <span className="option-card__icon">{icon}</span>}
      <div className="option-card__title">{title}</div>
      {subtitle && <div className="option-card__subtitle">{subtitle}</div>}
      {description && <div className="option-card__description">{description}</div>}
    </div>
  )
}
