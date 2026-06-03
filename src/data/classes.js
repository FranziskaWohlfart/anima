export const CLASS_GROUPS = [
  {
    id: 'martial',
    name: 'Martial',
    icon: '⚔️',
    description: 'Discipline, fury, body mastery, and survival through strength.',
    classes: [
      {
        id: 'fighter',
        name: 'Fighter',
        icon: '🗡️',
        cardDescription: 'A trained warrior who survives through discipline, tactics, and mastery of arms.',
        stillImage: '/Class_fighter.png',
        description:
          'Disciplined, versatile, and relentless. Fighters are trained warriors found among city guards, mercenary companies, noble houses, caravan escorts, Dragonlord armies, and rebel bands. In ANIMA, a Fighter is someone who has turned survival into craft.',
        skillCount: 2,
        skills: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Persuasion', 'Perception', 'Survival'],
        foundAmong: 'All peoples, especially Drakanis and Bashet',
        isSpellcaster: false,
      },
      {
        id: 'barbarian',
        name: 'Barbarian',
        icon: '🪓',
        cardDescription: 'A force of instinct and fury, turning rage, grief, or wild spirit into power.',
        stillImage: '/Class_Barbarian.png',
        description:
          'Rage given form. Barbarians draw power from fury, instinct, grief, spirit, bloodline, or the raw violence of the changing world. Many come from the Wilds, borderlands, deserts, warbands, or communities where civilization\'s laws have little reach.',
        skillCount: 2,
        skills: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
        foundAmong: 'Wildlings, Bashet Sandstriders, Ruby or Emerald Drakanis',
        isSpellcaster: false,
      },
      {
        id: 'monk',
        name: 'Monk',
        icon: '🥋',
        cardDescription: 'A disciplined wanderer who transforms body, breath, and focus into living weapons.',
        stillImage: '/Class_monk.png',
        description:
          'The body as weapon, the mind as armor. Monks turn breath, discipline, pain, and motion into supernatural precision. In ANIMA, they may belong to hidden temples, wandering schools, ascetic orders, or traditions created to resist the Curse through mastery of the self.',
        skillCount: 2,
        skills: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
        foundAmong: 'Bashet, Wildlings, Drakanis',
        isSpellcaster: false,
      },
    ],
  },
  {
    id: 'divine',
    name: 'Divine',
    icon: '✨',
    description: 'Faith, oath, miracle, duty, and sacred power.',
    classes: [
      {
        id: 'cleric',
        name: 'Cleric',
        icon: '🕯️',
        cardDescription: 'A sacred vessel of faith, memory, ritual, and divine mystery.',
        stillImage: '/class_cleric.png',
        description:
          'A vessel of faith, memory, and miracle. Clerics serve gods, heroes, Ancients, spirits, Dragonlords, or sacred mysteries. Their power may come from devotion, ritual, inherited duty, or something watching from beyond mortal understanding.',
        skillCount: 2,
        skills: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
        foundAmong: 'Nald, Drakanis, Wildlings',
        isSpellcaster: true,
      },
      {
        id: 'paladin',
        name: 'Paladin',
        icon: '🛡️',
        cardDescription: 'An oathbound champion whose conviction becomes strength, protection, and judgment.',
        stillImage: '/class_paladin.png',
        description:
          'An oath made flesh. Paladins are champions bound by conviction, whether sworn to a temple, a Dragonlord, a royal line, a spirit, a lost cause, or a personal vow. In ANIMA, a Paladin\'s strength comes from believing so deeply that the world bends around the promise.',
        skillCount: 2,
        skills: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
        foundAmong: 'Nald, Drakanis, Bashet',
        isSpellcaster: true,
      },
    ],
  },
  {
    id: 'arcane',
    name: 'Arcane',
    icon: '🔮',
    description: 'Forbidden knowledge, inherited magic, old bargains, and hidden laws.',
    classes: [
      {
        id: 'wizard',
        name: 'Wizard',
        icon: '📜',
        cardDescription: 'A scholar of impossible truths, studying ruins, curses, magic, and forgotten laws.',
        stillImage: '/Class_wizard.png',
        description:
          'A scholar of impossible truths. Wizards study the structures beneath magic: old languages, curse patterns, elemental theory, forbidden ruins, divine remnants, and the failures of vanished civilizations. They are often respected, feared, or watched very closely.',
        skillCount: 2,
        skills: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Nature', 'Religion'],
        foundAmong: 'Bashet, Nald',
        isSpellcaster: true,
      },
      {
        id: 'sorcerer',
        name: 'Sorcerer',
        icon: '⚡',
        cardDescription: 'A bearer of inherited magic, surviving power that awakens from within.',
        stillImage: '/class_socerer.png',
        description:
          'Magic in the blood. Sorcerers do not learn power so much as survive it. Their gifts may come from dragon ancestry, ancient spirits, deep-sea influence, divine bloodlines, or a family secret that finally awakened.',
        skillCount: 2,
        skills: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
        foundAmong: 'Drakanis, Wildlings, Nald',
        isSpellcaster: true,
      },
      {
        id: 'warlock',
        name: 'Warlock',
        icon: '👁️',
        cardDescription: 'A marked soul bound by pact, debt, bargain, or forbidden promise.',
        stillImage: '/Class_warlock.png',
        description:
          'Power through pact, debt, or bargain. Warlocks are marked by an agreement with something greater, stranger, older, or more desperate than themselves. In ANIMA, that patron might be an Ancient of the Deep, a Dragonlord, a Muse, a forgotten elemental, or a voice within the Curse.',
        skillCount: 2,
        skills: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'],
        foundAmong: 'Drakanis, Nald, Wildlings',
        isSpellcaster: true,
      },
    ],
  },
  {
    id: 'wilds',
    name: 'Nature',
    icon: '🌿',
    description: 'Hunters, spirit-speakers, shapekeepers, and guardians of living places.',
    classes: [
      {
        id: 'ranger',
        name: 'Ranger',
        icon: '🏹',
        cardDescription: 'A hunter and guide who reads tracks, weather, beasts, ruins, and danger.',
        stillImage: '/class_ranger.png',
        description:
          'Hunter, scout, guide, and survivor. Rangers move between civilization and wilderness, reading tracks, weather, beasts, ruins, and people with equal care. In ANIMA, they are often the first to notice when the land changes — and the last to abandon those lost within it.',
        skillCount: 3,
        skills: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
        foundAmong: 'Wildlings, Bashet Sandstriders, Oceanic Nald',
        isSpellcaster: true,
      },
      {
        id: 'druid',
        name: 'Druid',
        icon: '🌀',
        cardDescription: 'A keeper of living change, listening to spirits, roots, storms, and beasts.',
        stillImage: '/Class_Druid.png',
        description:
          'Keeper of living change. Druids listen to beasts, roots, storms, rivers, bones, and the old spirits beneath the world. Some see the Curse as a wound. Others see it as a natural way of things. Either way, they know the world is alive.',
        skillCount: 2,
        skills: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
        foundAmong: 'Wildlings, Oceanic Nald, Emerald Drakanis',
        isSpellcaster: true,
      },
    ],
  },
  {
    id: 'cunning',
    name: 'Cunning',
    icon: '🎭',
    description: 'Wit, art, secrecy, charm, precision, and survival by cleverness.',
    classes: [
      {
        id: 'bard',
        name: 'Bard',
        icon: '🎵',
        cardDescription: 'A keeper of songs, secrets, stories, and charm, wielding memory like a blade.',
        stillImage: '/Class_bard.png',
        description:
          'Memory with a blade hidden inside it. Bards carry songs, stories, scandals, rituals, histories, and forbidden names from place to place. In ANIMA, they are entertainers, spies, diplomats, chroniclers, seducers, or sacred keepers of what must not be forgotten.',
        skillCount: 3,
        skills: null, // Bard chooses any 3 skills
        foundAmong: 'Bashet Cityfolk, Wildlings, Golden Drakanis',
        isSpellcaster: true,
      },
      {
        id: 'rogue',
        name: 'Rogue',
        icon: '🗝️',
        cardDescription: 'A clever survivor who relies on stealth, precision, lies, and perfect timing.',
        stillImage: '/class_rogue.png',
        description:
          'A specialist in survival. Rogues thrive in alleys, courts, ruins, temples, ships, and border roads by noticing what others miss. Some steal gold. Some steal secrets. Some steal lives. Some simply refuse to be owned.',
        skillCount: 4,
        skills: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Persuasion', 'Sleight of Hand', 'Stealth'],
        foundAmong: 'Bashet Cityfolk, Nald Atlanteans, Silver Drakanis',
        isSpellcaster: false,
      },
    ],
  },
]

// Flat lookup of all classes
export const ALL_CLASSES = CLASS_GROUPS.flatMap(g => g.classes)

export function findClassById(classId) {
  return ALL_CLASSES.find(c => c.id === classId) || null
}

export function findGroupByClassId(classId) {
  return CLASS_GROUPS.find(g => g.classes.some(c => c.id === classId)) || null
}
