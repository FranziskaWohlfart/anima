export const ORIGINS = {
  bashet: [
    {
      id: 'cityfolk',
      name: 'Cityfolk',
      subtitle: 'Child of Rem, shaped by music, memory, beauty, and clever words.',
      stillImage: '/Origin_Bashet_Cityfolk_Still.png',
      animatedImage: '/Origin_Bashet_Cityfolk_Selected.mp4',
      description:
        'Cityfolk Bashet come from Rem\'s streets, courts, schools, temples, markets, gardens, and performance halls. They are often surrounded by art, politics, fashion, scholarship, music, gossip, poetry, and sacred celebrations of Khazar and the Thirteen Muses.\n\nCityfolk Bashet are usually graceful, expressive, socially aware, and proud of their culture. Some are diplomats, artists, merchants, scholars, performers, temple attendants, or clever survivors of city intrigue. To them, memory is not only history; it is identity, family, beauty, and resistance against the Curse.',
      skills: ['Persuasion', 'Acrobatics', 'Performance', 'History', 'Perception'],
      suggestedPack: 'cityfolk',
    },
    {
      id: 'sandstrider',
      name: 'Sandstrider',
      subtitle: 'Child of Rivarin, shaped by dunes, hunting paths, and old desert freedoms.',
      stillImage: '/Origin_Bashet_Sandstrider_Still.png',
      animatedImage: '/Origin_Bashet_Sandstrider_Selected.mp4',
      description:
        'Sandstrider Bashet come from the Rivarin Desert: golden dunes, red stone, dry riverbeds, hidden oases, buried ruins, and ancient hunting paths. They may belong to prides, clans, wandering tribes, or independent families who live far from Rem\'s walls.\n\nSandstriders are often practical, proud, territorial, and difficult to command. Some guard sacred wells, hunt across the dunes, guide travelers, raid tombs, protect family routes, or live by rules older than kings. To them, survival is a form of memory, and freedom is not easily surrendered.',
      skills: ['Survival', 'Athletics', 'Stealth', 'Nature', 'Perception'],
      suggestedPack: 'sandstrider',
    },
  ],
  nald: [
    {
      id: 'atlantean',
      name: 'Atlantean',
      subtitle: 'Child of Atlantis, shaped by ceremony, secrecy, and the Deep.',
      stillImage: '/Origin_Nald_Atlantean_Still.png',
      animatedImage: '/Origin_Nald_Atlantean_Selected.mp4',
      description:
        'Atlantean Nald come from the great underwater city of Atlantis and its surrounding courts, temples, and noble houses. Their lives are often shaped by ritual, wealth, politics, priesthoods, guarded knowledge, and the mysterious influence of the Ancients of the Deep.\n\nAtlanteans are often refined, educated, and careful with their words. Some are heirs to old families, temple servants, scholars, diplomats, engineers, or quiet keepers of secrets. To outsiders, they may seem graceful and privileged. To those who know Atlantis well, privilege and danger are often difficult to separate.',
      skills: ['Deception', 'Religion', 'History', 'Arcana', 'Investigation'],
      suggestedPack: 'atlantean',
    },
    {
      id: 'oceanic',
      name: 'Oceanic',
      subtitle: 'Child of open water, reefs, tides, and hidden currents.',
      stillImage: '/Origin_Nald_Oceanic_Still.png',
      animatedImage: '/Origin_Nald_Oceanic_Selected.mp4',
      description:
        'Oceanic Nald are shaped less by the courts of Atlantis and more by the living sea: reefs, islands, trenches, ships, storms, fishing routes, sea caves, and dangerous crossings. They may come from coastal settlements, wandering families, reef communities, or deep-water lineages that spend more time beneath the waves than above them.\n\nOceanic Nald are often practical, perceptive, and difficult to surprise. Some are sailors, scouts, pearl-divers, hunters, smugglers, guides, healers, or watchers of places most landfolk will never see. Where Atlanteans may trust temples and hierarchy, Oceanic Nald often trust tides, instincts, and the old rules of survival.',
      skills: ['Insight', 'Nature', 'Arcana', 'Stealth', 'Perception'],
      suggestedPack: 'oceanic',
    },
  ],
  drakanis: [
    {
      id: 'ruby',
      name: 'Ruby Lineage',
      subtitle: 'Child of Varkhaz, the Red Dragonlord.',
      stillImage: '/Origin_Drakanis_Ruby_Still.png',
      animatedImage: '/Origin_Drakanis_Animated.mp4',
      description:
        'Ruby Drakanis carry the heat of volcanic wrath, survival, conquest, and physical dominance. They are often bold, intense, proud, and difficult to command. Their communities may be tied to warriors, forge-servants, raiders, mountain champions, harsh training halls, or Dragonlords who rule through strength.\n\nA Ruby Drakanis may be admired for courage and feared for temper. Some embrace the expectations placed on them. Others struggle against the idea that their blood must make them a weapon.',
      skills: ['Athletics', 'Survival', 'Intimidation', 'Sleight of Hand', 'Perception'],
      suggestedPack: 'ruby-drakanis',
      resistance: 'Fire',
      breathWeapon: { damageType: 'Fire', shape: '15 ft cone', savingThrow: 'Dexterity' },
    },
    {
      id: 'sapphire',
      name: 'Sapphire Lineage',
      subtitle: 'Child of Thalryss, the Blue Dragonlady.',
      stillImage: '/Origin_Drakanis_Sapphire_Still.png',
      animatedImage: '/Origin_Drakanis_Sapphire_Animated.mp4',
      description:
        'Sapphire Drakanis are associated with storms, precision, memory, patience, and control. Their lineages often value observation, discipline, healing, history, technical knowledge, and the handling of powerful animals or dangerous terrain.\n\nThey may seem calm, distant, calculating, or deeply loyal once trust is earned. Many are raised to watch before acting and to remember what others overlook.',
      skills: ['Insight', 'Medicine', 'History', 'Animal Handling', 'Investigation'],
      suggestedPack: 'sapphire-drakanis',
      resistance: 'Lightning',
      breathWeapon: { damageType: 'Lightning', shape: '30 ft line', savingThrow: 'Dexterity' },
    },
    {
      id: 'emerald',
      name: 'Emerald Lineage',
      subtitle: 'Child of Vaelthura, the Green Dragonlady.',
      stillImage: '/Origin_Drakanis_Emerald_Still.png',
      animatedImage: '/Origin_Drakanis_Emerald_Animated.mp4',
      description:
        'Emerald Drakanis are tied to forests, poison, beasts, hidden paths, and old magic. They are often seen as adaptable, watchful, instinctive, and difficult to read. Some serve as scouts, beast-keepers, herbalists, poisoners, wilderness guides, or quiet intermediaries between dragon rule and the living land.\n\nAn Emerald Drakanis may feel more at home in dangerous wild places than in halls of stone. They often understand that survival is not always about strength; sometimes it is about patience, camouflage, and knowing what not to touch.',
      skills: ['Nature', 'Animal Handling', 'Arcana', 'Survival', 'Acrobatics'],
      suggestedPack: 'emerald-drakanis',
      resistance: 'Poison',
      breathWeapon: { damageType: 'Poison', shape: '15 ft cone', savingThrow: 'Constitution' },
    },
    {
      id: 'silver',
      name: 'Silver Lineage',
      subtitle: 'Child of Sorynth, the Silver Dragonlord.',
      stillImage: '/Origin_Drakanis_Silver_Still.png',
      animatedImage: '/Origin_Drakanis_Silver_Animated.mp4',
      description:
        'Silver Drakanis are associated with cold, hidden histories, exile, endurance, and quiet survival. Their lineages may be connected to mountain scouts, spies, lost houses, oathkeepers, wanderers, or Drakanis who learned to survive by keeping secrets.\n\nThey may be graceful but guarded, polite but evasive, loyal but slow to trust. Many Silver Drakanis learn early that survival depends on knowing when to speak, when to hide, and when to leave.',
      skills: ['History', 'Deception', 'Sleight of Hand', 'Survival', 'Investigation'],
      suggestedPack: 'silver-drakanis',
      resistance: 'Cold',
      breathWeapon: { damageType: 'Cold', shape: '15 ft cone', savingThrow: 'Constitution' },
    },
    {
      id: 'golden',
      name: 'Golden Lineage',
      subtitle: 'Child of Aurelion, the Gold Dragonlord.',
      stillImage: '/Origin_Drakanis_Gold_Still.png',
      animatedImage: '/Origin_Drakanis_Gold_Animated.mp4',
      description:
        'Golden Drakanis carry the weight of beauty, ceremony, command, and radiant legacy. Their bloodlines are often associated with champions, diplomats, noble servants, priestly warriors, public symbols, or Drakanis expected to inspire others.\n\nA Golden Drakanis may be admired before they are understood. Their presence can open doors, but it can also make them visible to those who want to use them. Some carry their legacy proudly; others wonder whether glory is another kind of chain.',
      skills: ['Performance', 'Persuasion', 'Arcana', 'Perception', 'Athletics'],
      suggestedPack: 'golden-drakanis',
      resistance: 'Radiant',
      breathWeapon: { damageType: 'Radiant', shape: '30 ft line', savingThrow: 'Dexterity' },
    },
  ],
  wildling: [
    {
      id: 'circleborn',
      name: 'Circleborn',
      subtitle: 'Raised among the tribes, packs, groves, and spirit circles of the Wilds.',
      stillImage: '/Origin_Wildling_Circleborn_Still.png',
      animatedImage: '/Origin_Wildling_Circleborn_Selected.mp4',
      description:
        'Circleborn Wildlings grow up surrounded by shared rituals, oral memory, seasonal gatherings, animal masks, hunting paths, and the guidance of elders or spirit-speakers. Their identity is shaped by belonging: to a people, a place, a migration route, a sacred animal, or a living tradition.',
      skills: [], // wildlings choose from all skills
      suggestedPack: 'wildling',
      isWildling: true,
      sheetLabel: 'Wildling Origin: Circleborn',
    },
    {
      id: 'wildstray',
      name: 'Wildstray',
      subtitle: 'A solitary wanderer of the wilderness, shaped by instinct, distance, and survival.',
      stillImage: '/Origin_Wildling_Wildstray_Still.png',
      animatedImage: '/Origin_Wildling_Wildstray_Selected.mp4',
      description:
        'Wildstray Wildlings may be exiles, scouts, wanderers, lost children, oathbreakers, messengers, performers, hermits, or survivors of a vanished clan. Some travel alone by choice. Others are searching for a new place to belong. They know the Wilds not as a homeland shared with many, but as a voice that speaks directly to them.',
      skills: [], // wildlings choose from all skills
      suggestedPack: 'wildling',
      isWildling: true,
      sheetLabel: 'Wildling Origin: Wildstray',
    },
  ],
}
