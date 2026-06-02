export const SKILLS = [
  { id: 'acrobatics',      name: 'Acrobatics',      ability: 'DEX' },
  { id: 'animal-handling', name: 'Animal Handling',  ability: 'WIS' },
  { id: 'arcana',          name: 'Arcana',           ability: 'INT' },
  { id: 'athletics',       name: 'Athletics',        ability: 'STR' },
  { id: 'deception',       name: 'Deception',        ability: 'CHA' },
  { id: 'history',         name: 'History',          ability: 'INT' },
  { id: 'insight',         name: 'Insight',          ability: 'WIS' },
  { id: 'intimidation',    name: 'Intimidation',     ability: 'CHA' },
  { id: 'investigation',   name: 'Investigation',    ability: 'INT' },
  { id: 'medicine',        name: 'Medicine',         ability: 'WIS' },
  { id: 'nature',          name: 'Nature',           ability: 'INT' },
  { id: 'perception',      name: 'Perception',       ability: 'WIS' },
  { id: 'performance',     name: 'Performance',      ability: 'CHA' },
  { id: 'persuasion',      name: 'Persuasion',       ability: 'CHA' },
  { id: 'religion',        name: 'Religion',         ability: 'INT' },
  { id: 'sleight-of-hand', name: 'Sleight of Hand',  ability: 'DEX' },
  { id: 'stealth',         name: 'Stealth',          ability: 'DEX' },
  { id: 'survival',        name: 'Survival',         ability: 'WIS' },
]

export const SKILL_NAMES = SKILLS.map(s => s.name)
