import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
  Font,
} from '@react-pdf/renderer'
import { RACES } from '../data/races.js'
import { ORIGINS } from '../data/origins.js'
import { FAITHS } from '../data/faiths.js'
import { findClassById, CLASS_GROUPS } from '../data/classes.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SKILLS } from '../data/skills.js'

// ─── Theme system ─────────────────────────────────────────────────────────────

function getRaceTheme(raceId, originId) {
  if (raceId === 'bashet') {
    return {
      accent:      '#b8832a',
      accentLight: '#e8c97a',
      border:      '#c9a44a',
      headerBg:    '#fdf4e3',
      motif:       '◈',
    }
  }
  if (raceId === 'nald') {
    return {
      accent:      '#2a6e8a',
      accentLight: '#7ac4d8',
      border:      '#3a8faa',
      headerBg:    '#eaf6fa',
      motif:       '◈',
    }
  }
  if (raceId === 'drakanis') {
    const lineage = {
      ruby:     { accent: '#a02828', accentLight: '#e07070', border: '#c03030', headerBg: '#fdf0f0' },
      sapphire: { accent: '#2040a8', accentLight: '#7090e0', border: '#3050c0', headerBg: '#f0f0fd' },
      emerald:  { accent: '#1a6830', accentLight: '#60b870', border: '#2a8840', headerBg: '#f0fdf2' },
      silver:   { accent: '#506080', accentLight: '#90b0c8', border: '#607090', headerBg: '#f4f6fa' },
      golden:   { accent: '#b8832a', accentLight: '#e8c060', border: '#c8a030', headerBg: '#fdf8e8' },
    }
    const t = lineage[originId] || lineage.ruby
    return { ...t, motif: '◈' }
  }
  if (raceId === 'wildling') {
    return {
      accent:      '#3a6820',
      accentLight: '#80b050',
      border:      '#508030',
      headerBg:    '#f4faea',
      motif:       '◈',
    }
  }
  return {
    accent:      '#8b6030',
    accentLight: '#c9a060',
    border:      '#a07840',
    headerBg:    '#fdf8f0',
    motif:       '◈',
  }
}

// ─── Shared constants ─────────────────────────────────────────────────────────

const ink    = '#1a1008'
const inkMid = '#3a2818'
const sepia  = '#7a5838'
const muted  = '#a08060'
const white  = '#ffffff'
const nearWhite = '#fafaf8'

// ─── Base styles ──────────────────────────────────────────────────────────────

const S = StyleSheet.create({
  page: {
    backgroundColor: white,
    paddingTop: 24,
    paddingBottom: 28,
    paddingHorizontal: 28,
    fontFamily: 'Helvetica',
    fontSize: 8,
    color: ink,
  },
  // Layout
  row:   { flexDirection: 'row' },
  col:   { flexDirection: 'column' },
  flex1: { flex: 1 },
  // Typography
  nameTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: ink,
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: sepia,
    marginBottom: 2,
  },
  fieldLabel: {
    fontSize: 6,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: muted,
    marginBottom: 1,
  },
  value: {
    fontSize: 8.5,
    color: ink,
    fontFamily: 'Helvetica-Bold',
  },
  bodyText: {
    fontSize: 7.5,
    color: inkMid,
    lineHeight: 1.55,
  },
  smallText: {
    fontSize: 6.5,
    color: sepia,
  },
  italic: {
    fontSize: 7.5,
    color: sepia,
    fontFamily: 'Helvetica-Oblique',
    lineHeight: 1.5,
  },
  // Write lines
  writeLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#c8b88a',
    height: 14,
    marginBottom: 4,
  },
  writeLineShort: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#c8b88a',
    height: 11,
    marginBottom: 3,
  },
  // Dividers
  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#c8b88a',
    marginVertical: 4,
  },
  thinDivider: {
    borderBottomWidth: 0.4,
    borderBottomColor: '#ddd0b0',
    marginVertical: 3,
  },
})

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Divider({ color, thick }) {
  return (
    <View style={{ borderBottomWidth: thick ? 1 : 0.5, borderBottomColor: color || '#c8b88a', marginVertical: 3 }} />
  )
}

function OrnamentDivider({ theme }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
      <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: theme.border }} />
      <Text style={{ fontSize: 6, color: theme.accent, marginHorizontal: 4 }}>◆</Text>
      <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: theme.border }} />
    </View>
  )
}

function SectionHeader({ children, theme }) {
  return (
    <View style={{ marginBottom: 5, marginTop: 7 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 2 }}>
        <View style={{ width: 3, height: 8, backgroundColor: theme.accent, borderRadius: 1 }} />
        <Text style={{ ...S.sectionLabel, color: theme.accent }}>{children}</Text>
      </View>
      <View style={{ borderBottomWidth: 0.75, borderBottomColor: theme.border }} />
    </View>
  )
}

function FieldBlock({ label, value, theme, flex }) {
  return (
    <View style={{ flex: flex || 1, marginBottom: 4 }}>
      <Text style={{ ...S.fieldLabel, color: theme.accent }}>{label}</Text>
      {value
        ? <Text style={S.value}>{value}</Text>
        : <View style={S.writeLine} />
      }
    </View>
  )
}

function WriteLines({ count, short }) {
  return (
    <View>
      {Array.from({ length: count }, (_, i) => (
        <View key={i} style={short ? S.writeLineShort : S.writeLine} />
      ))}
    </View>
  )
}

function PortraitFrame({ src, width, height, theme }) {
  return (
    <View style={{
      width, height,
      borderWidth: 1.5,
      borderColor: theme.border,
      backgroundColor: nearWhite,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Corner ornaments */}
      {[
        { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, borderRightWidth: 0, borderBottomWidth: 0 },
        { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2, borderLeftWidth: 0, borderBottomWidth: 0 },
        { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 0, borderTopWidth: 0 },
        { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, borderLeftWidth: 0, borderTopWidth: 0 },
      ].map((pos, i) => (
        <View key={i} style={{
          position: 'absolute', width: 8, height: 8,
          borderColor: theme.accent, ...pos,
        }} />
      ))}
      {src && (
        <Image
          src={src}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </View>
  )
}

// ─── Ability Score Medallion ──────────────────────────────────────────────────

function AbilityMedallion({ abbr, full, theme }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      {/* Arched card */}
      <View style={{
        width: '100%',
        borderWidth: 1, borderColor: theme.border,
        borderRadius: 6,
        backgroundColor: nearWhite,
        alignItems: 'center',
        paddingTop: 5, paddingBottom: 5,
      }}>
        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: theme.accent, letterSpacing: 0.5 }}>{abbr}</Text>
        <Text style={{ fontSize: 5, color: muted, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4 }}>{full}</Text>
        {/* Score circle */}
        <View style={{
          width: 28, height: 28, borderRadius: 14,
          borderWidth: 1, borderColor: theme.border,
          backgroundColor: white,
          marginBottom: 4,
        }} />
        {/* Mod box */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Text style={{ fontSize: 5, color: muted }}>MOD</Text>
          <View style={{ width: 20, height: 12, borderWidth: 0.75, borderColor: theme.border, borderRadius: 1, backgroundColor: white }} />
        </View>
      </View>
    </View>
  )
}

// ─── Stat Box ─────────────────────────────────────────────────────────────────

function StatBox({ label, sublabel, theme }) {
  return (
    <View style={{
      flex: 1,
      borderWidth: 1, borderColor: theme.border,
      borderRadius: 3,
      backgroundColor: nearWhite,
      alignItems: 'center',
      paddingTop: 4, paddingBottom: 5, paddingHorizontal: 3,
    }}>
      <Text style={{ fontSize: 5.5, fontFamily: 'Helvetica-Bold', color: theme.accent, textTransform: 'uppercase', letterSpacing: 0.4, textAlign: 'center' }}>{label}</Text>
      {sublabel && <Text style={{ fontSize: 4.5, color: muted, textAlign: 'center', marginBottom: 3 }}>{sublabel}</Text>}
      {!sublabel && <View style={{ height: 3 }} />}
      {/* Write box */}
      <View style={{ width: '80%', height: 18, borderWidth: 0.75, borderColor: theme.border, borderRadius: 2, backgroundColor: white }} />
    </View>
  )
}

// ─── Skill row ────────────────────────────────────────────────────────────────

function SkillRow({ skill, proficient, theme }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2, paddingBottom: 1, borderBottomWidth: 0.3, borderBottomColor: '#e8dcc8' }}>
      <Text style={{ width: 58, fontSize: 6.5, color: proficient ? ink : inkMid, fontFamily: proficient ? 'Helvetica-Bold' : 'Helvetica' }}>
        {skill.name}
        <Text style={{ fontSize: 5.5, color: muted, fontFamily: 'Helvetica' }}> ({skill.ability})</Text>
      </Text>
      <Text style={{ width: 10, fontSize: 7, color: proficient ? theme.accent : '#c8b88a', textAlign: 'center', fontFamily: proficient ? 'Helvetica-Bold' : 'Helvetica' }}>
        {proficient ? '◆' : '◇'}
      </Text>
    </View>
  )
}

// ─── Saving throw row ─────────────────────────────────────────────────────────

function SaveRow({ label, theme }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3, paddingBottom: 1, borderBottomWidth: 0.3, borderBottomColor: '#e8dcc8' }}>
      <Text style={{ flex: 1, fontSize: 7, color: inkMid }}>{label}</Text>
      <Text style={{ fontSize: 7, color: '#c8b88a', width: 10, textAlign: 'center' }}>◇</Text>
    </View>
  )
}

// ─── Page footer ──────────────────────────────────────────────────────────────

function PageFooter({ label, name, page, theme }) {
  return (
    <View style={{ position: 'absolute', bottom: 12, left: 28, right: 28, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: theme.border, paddingTop: 3 }}>
      <Text style={{ fontSize: 5.5, color: muted }}>ANIMA — {label}</Text>
      <Text style={{ fontSize: 5.5, color: muted }}>{name || ''}</Text>
      <Text style={{ fontSize: 5.5, color: muted }}>Page {page}</Text>
    </View>
  )
}

// ─── Framed section box ───────────────────────────────────────────────────────

function FramedSection({ children, theme, style }) {
  return (
    <View style={{
      borderWidth: 1, borderColor: theme.border,
      borderRadius: 3, padding: 6,
      backgroundColor: nearWhite,
      marginBottom: 6,
      ...style,
    }}>
      {children}
    </View>
  )
}

// ─── Centered section title (ornamental) ─────────────────────────────────────

function CenteredTitle({ children, theme }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: theme.border }} />
      <Text style={{ fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: theme.accent, textTransform: 'uppercase', letterSpacing: 1, marginHorizontal: 6 }}>
        {children}
      </Text>
      <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: theme.border }} />
    </View>
  )
}

// ─── Identity line (label + underline value) ──────────────────────────────────

function IdentityLine({ label, value, flex }) {
  return (
    <View style={{ flex: flex || 1, marginRight: 10 }}>
      <Text style={{ fontSize: 5.5, color: muted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 1 }}>{label}</Text>
      <View style={{ borderBottomWidth: 0.75, borderBottomColor: '#c8b88a', paddingBottom: 1 }}>
        {value
          ? <Text style={{ fontSize: 8, color: ink, fontFamily: 'Helvetica-Bold' }}>{value}</Text>
          : <Text style={{ fontSize: 8, color: white }}>{'  '}</Text>
        }
      </View>
    </View>
  )
}

// ─── Page 1 — Mechanical Overview ────────────────────────────────────────────

function PageOne({ character, theme, race, origin, cls, classGroup, faith, background, portraitSrc }) {
  const proficient = new Set([
    ...character.originSkills,
    ...character.classSkills.filter(Boolean),
  ])
  const isRogue = character.characterClass === 'rogue'

  function raceTraits() {
    const t = []
    if (character.race === 'bashet') {
      t.push('Darkvision — see clearly in darkness up to 60 ft.')
      t.push('+2 Dexterity, +1 Charisma')
    }
    if (character.race === 'nald') {
      t.push('Amphibious — breathe air and water.')
      t.push('+2 Intelligence, +1 Wisdom')
    }
    if (character.race === 'drakanis') {
      t.push('+1 Constitution, +1 Strength')
      if (origin?.resistance) t.push(`${origin.resistance} Resistance`)
      if (origin?.breathWeapon) {
        const bw = origin.breathWeapon
        t.push(`Breath Weapon: ${bw.damageType} (${bw.shape}). ${bw.savingThrow} save, 1d10 damage. Once per long rest.`)
      }
    }
    if (character.race === 'wildling') {
      if (character.abilityBonusPlusTwo) t.push(`+2 ${character.abilityBonusPlusTwo}, +1 ${character.abilityBonusPlusOne || '___'}`)
      t.push(`Animal Form: ${character.animalForm || '_______________'}`)
    }
    if (isRogue) t.push('Expertise: choose two skills or one skill + thieves\' tools.')
    return t
  }

  // Split 18 skills into 3 columns of 6
  const skillCols = [SKILLS.slice(0, 6), SKILLS.slice(6, 12), SKILLS.slice(12)]

  const abilities = [
    { abbr: 'STR', full: 'Strength' },
    { abbr: 'DEX', full: 'Dexterity' },
    { abbr: 'CON', full: 'Constitution' },
    { abbr: 'INT', full: 'Intelligence' },
    { abbr: 'WIS', full: 'Wisdom' },
    { abbr: 'CHA', full: 'Charisma' },
  ]

  return (
    <Page size="A4" style={S.page}>

      {/* ── Header: identity fields + portrait ── */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 6 }}>

        {/* Identity fields */}
        <View style={{ flex: 1 }}>
          {/* Row 1: Name */}
          <View style={{ marginBottom: 5 }}>
            <IdentityLine label="Name" value={character.name} flex={1} />
          </View>
          {/* Row 2: People · Origin · Calling + Class */}
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <IdentityLine label="People" value={race?.name} />
            <IdentityLine label="Origin" value={origin?.name} />
            <IdentityLine label="Calling + Class" value={cls ? `${classGroup?.name} — ${cls.name}` : null} flex={1.4} />
          </View>
          {/* Row 3: Background · Faith */}
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <IdentityLine label="Background" value={background?.name} />
            <IdentityLine label="Faith" value={faith?.name} />
          </View>
          {/* Row 4: Level · Alignment · Subclass */}
          <View style={{ flexDirection: 'row' }}>
            <IdentityLine label="Level" value={null} flex={0.4} />
            <IdentityLine label="Alignment" value={character.alignment} flex={0.8} />
            <IdentityLine label="Subclass / Path" value={null} flex={1.2} />
          </View>
        </View>

        {/* Portrait */}
        <PortraitFrame src={portraitSrc} width={72} height={90} theme={theme} />
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 6 }} />

      {/* ── Ability Scores ── */}
      <View style={{ flexDirection: 'row', gap: 5, marginBottom: 6 }}>
        {abilities.map(ab => (
          <AbilityMedallion key={ab.abbr} abbr={ab.abbr} full={ab.full} theme={theme} />
        ))}
      </View>

      {/* ── Combat Stats ── */}
      <FramedSection theme={theme} style={{ marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <StatBox label="HP" sublabel="Hit Points" theme={theme} />
          <StatBox label="AC" sublabel="Armor Class" theme={theme} />
          <StatBox label="Initiative" theme={theme} />
          <StatBox label="Speed" theme={theme} />
          <StatBox label="Proficiency Bonus" theme={theme} />
          <StatBox label="Passive Perception" theme={theme} />
        </View>
      </FramedSection>

      {/* ── Saving Throws + Skills side by side ── */}
      <FramedSection theme={theme} style={{ marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>

          {/* Saving Throws */}
          <View style={{ width: 90 }}>
            <CenteredTitle theme={theme}>Saving Throws</CenteredTitle>
            {['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'].map(s => (
              <SaveRow key={s} label={s} theme={theme} />
            ))}
          </View>

          {/* Vertical divider */}
          <View style={{ width: 0.5, backgroundColor: theme.border, marginHorizontal: 2 }} />

          {/* Skills — 3 columns */}
          <View style={{ flex: 1 }}>
            <CenteredTitle theme={theme}>Skills</CenteredTitle>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {skillCols.map((col, ci) => (
                <View key={ci} style={{ flex: 1 }}>
                  {/* PROF. header */}
                  <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                    <View style={{ flex: 1 }} />
                    <Text style={{ width: 10, fontSize: 5, color: muted, textAlign: 'center', textTransform: 'uppercase' }}>Prof.</Text>
                  </View>
                  {col.map(skill => (
                    <SkillRow
                      key={skill.id}
                      skill={skill}
                      proficient={proficient.has(skill.name)}
                      theme={theme}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </FramedSection>

      {/* ── Attacks & Weapons ── */}
      <FramedSection theme={theme} style={{ marginBottom: 6 }}>
        <CenteredTitle theme={theme}>Attacks & Weapons</CenteredTitle>
        {/* Header row */}
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={{ width: 8, fontSize: 5, color: muted }} />
          <Text style={{ flex: 2, fontSize: 5.5, fontFamily: 'Helvetica-Bold', color: theme.accent, textTransform: 'uppercase', letterSpacing: 0.5 }}>Name</Text>
          <Text style={{ flex: 1, fontSize: 5.5, fontFamily: 'Helvetica-Bold', color: theme.accent, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>Bonus</Text>
          <Text style={{ flex: 1, fontSize: 5.5, fontFamily: 'Helvetica-Bold', color: theme.accent, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>Damage</Text>
          <Text style={{ flex: 1.5, fontSize: 5.5, fontFamily: 'Helvetica-Bold', color: theme.accent, textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'right' }}>Type / Notes</Text>
        </View>
        {[1, 2, 3, 4, 5].map(i => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
            <Text style={{ width: 8, fontSize: 6, color: muted }}>-</Text>
            <View style={{ flex: 2, borderBottomWidth: 0.5, borderBottomColor: '#c8b88a', height: 11, marginRight: 8 }} />
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: '#c8b88a', height: 11, marginRight: 8 }} />
            <View style={{ flex: 1, borderBottomWidth: 0.5, borderBottomColor: '#c8b88a', height: 11, marginRight: 8 }} />
            <View style={{ flex: 1.5, borderBottomWidth: 0.5, borderBottomColor: '#c8b88a', height: 11 }} />
          </View>
        ))}
      </FramedSection>

      {/* ── Features & Traits ── */}
      <FramedSection theme={theme} style={{ flex: 1 }}>
        <CenteredTitle theme={theme}>Features & Traits</CenteredTitle>
        {raceTraits().map((t, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 3, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 6.5, color: theme.accent, marginRight: 4, marginTop: 0.5 }}>-</Text>
            <Text style={{ ...S.bodyText, flex: 1 }}>{t}</Text>
          </View>
        ))}
        <WriteLines count={5} short />
      </FramedSection>

      <PageFooter label="Play Sheet" name={character.name} page={1} theme={theme} />
    </Page>
  )
}

// ─── Page 2 — Character Profile ───────────────────────────────────────────────

function PageTwo({ character, theme, race, origin, cls, classGroup, faith, background, portraitSrc }) {
  function ancestryTraits() {
    const t = []
    if (character.race === 'bashet') {
      t.push('Darkvision — see clearly in darkness up to 60 ft.')
      t.push('+2 Dexterity, +1 Charisma')
    }
    if (character.race === 'nald') {
      t.push('Amphibious — breathe air and water.')
      t.push('+2 Intelligence, +1 Wisdom')
    }
    if (character.race === 'drakanis') {
      t.push('+1 Constitution, +1 Strength')
      if (origin?.resistance) t.push(`${origin.resistance} Resistance`)
      if (origin?.breathWeapon) {
        const bw = origin.breathWeapon
        t.push(`Breath Weapon: ${bw.damageType} (${bw.shape}). ${bw.savingThrow} save, 1d10 damage. Once per long rest. DC: 8 + CON mod + proficiency bonus.`)
      }
    }
    if (character.race === 'wildling') {
      if (character.abilityBonusPlusTwo) t.push(`+2 ${character.abilityBonusPlusTwo}, +1 ${character.abilityBonusPlusOne || '___'}`)
      if (character.animalForm) t.push(`Animal Form: ${character.animalForm}`)
    }
    return t
  }

  const prompts = [
    { q: 'How has the Curse shaped your life?', a: character.curseAnswer },
    { q: 'Why have you left home?', a: character.leftHomeAnswer },
    { q: 'What memory do you never want to forget?', a: character.memoryAnswer },
  ]

  const descCards = [
    { label: 'People', value: race?.name, summary: race?.flavor },
    { label: 'Origin', value: origin?.name, summary: origin?.subtitle },
    { label: 'Calling & Class', value: cls ? `${classGroup?.name} — ${cls.name}` : null, summary: cls?.cardDescription },
    { label: 'Background', value: background?.name, summary: background?.description?.split('.')[0] + '.' },
    { label: 'Faith', value: faith?.name, summary: faith?.id !== 'none' ? faith?.description?.split('\n')[0] : faith?.description },
  ]

  return (
    <Page size="A4" style={S.page}>

      {/* ── Header ── */}
      <View style={{ flexDirection: 'row', gap: 14, marginBottom: 6 }}>

        {/* Large portrait */}
        <PortraitFrame src={portraitSrc} width={100} height={128} theme={theme} />

        {/* Identity */}
        <View style={{ flex: 1 }}>
          <Text style={{ ...S.nameTitle, fontSize: 22, color: theme.accent }}>{character.name || 'Character Name'}</Text>
          <OrnamentDivider theme={theme} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
            {[
              { l: 'People', v: race?.name },
              { l: 'Origin', v: origin?.name },
              { l: 'Calling & Class', v: cls ? `${classGroup?.name} — ${cls.name}` : null },
              { l: 'Background', v: background?.name },
              { l: 'Faith', v: faith?.name },
              { l: 'Gender', v: character.gender },
              { l: 'Age', v: character.age },
              { l: 'Alignment', v: character.alignment },
            ].map(({ l, v }) => (
              <View key={l} style={{ minWidth: 80 }}>
                <Text style={{ ...S.fieldLabel, color: theme.accent }}>{l}</Text>
                {v
                  ? <Text style={{ fontSize: 8, color: ink, fontFamily: 'Helvetica-Bold' }}>{v}</Text>
                  : <View style={{ ...S.writeLineShort, width: 70 }} />
                }
              </View>
            ))}
          </View>
        </View>
      </View>

      <OrnamentDivider theme={theme} />

      {/* ── Two-column main ── */}
      <View style={{ flexDirection: 'row', gap: 14 }}>

        {/* LEFT */}
        <View style={{ flex: 1.1 }}>

          {/* Appearance */}
          <SectionHeader theme={theme}>Appearance</SectionHeader>
          {character.appearance
            ? <Text style={S.bodyText}>{character.appearance}</Text>
            : <WriteLines count={3} short />
          }

          {/* Description cards */}
          <SectionHeader theme={theme}>Background & Faith</SectionHeader>
          {descCards.slice(2).map(({ label, value, summary }) => (
            <View key={label} style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: theme.accent, marginBottom: 1 }}>
                {label}{value ? ` — ${value}` : ''}
              </Text>
              {summary
                ? <Text style={S.bodyText}>{summary}</Text>
                : <View style={{ ...S.writeLineShort }} />
              }
            </View>
          ))}

          {/* People & Origin */}
          <SectionHeader theme={theme}>People & Origin</SectionHeader>
          {descCards.slice(0, 2).map(({ label, value, summary }) => (
            <View key={label} style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: theme.accent, marginBottom: 1 }}>
                {label}{value ? ` — ${value}` : ''}
              </Text>
              {summary
                ? <Text style={S.bodyText}>{summary}</Text>
                : <View style={S.writeLineShort} />
              }
            </View>
          ))}

        </View>

        {/* RIGHT */}
        <View style={{ flex: 0.9 }}>

          {/* Ancestry Traits */}
          <SectionHeader theme={theme}>Ancestry Traits</SectionHeader>
          {ancestryTraits().map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 3, alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 7, color: theme.accent, marginRight: 4, marginTop: 1 }}>-</Text>
              <Text style={{ ...S.bodyText, flex: 1 }}>{t}</Text>
            </View>
          ))}
          <WriteLines count={2} short />

          {/* Equipment */}
          <SectionHeader theme={theme}>Equipment</SectionHeader>
          {character.equipmentItems.length > 0
            ? character.equipmentItems.map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 2 }}>
                  <Text style={{ fontSize: 7, color: theme.accent, marginRight: 4 }}>-</Text>
                  <Text style={{ fontSize: 7.5, color: inkMid }}>{item}</Text>
                </View>
              ))
            : null
          }
          <WriteLines count={character.equipmentItems.length > 0 ? 2 : 5} short />

          {/* Story Prompts */}
          <SectionHeader theme={theme}>Story Prompts</SectionHeader>
          {prompts.map(({ q, a }) => (
            <View key={q} style={{ marginBottom: 7 }}>
              <Text style={{ fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: theme.accent, marginBottom: 3 }}>{q}</Text>
              {a
                ? <Text style={{ ...S.bodyText }}>{a}</Text>
                : <WriteLines count={2} short />
              }
            </View>
          ))}

          {/* Notes */}
          <SectionHeader theme={theme}>Notes</SectionHeader>
          <WriteLines count={3} short />
        </View>
      </View>

      <PageFooter label="Character Profile" name={character.name} page={2} theme={theme} />
    </Page>
  )
}

// ─── Page 3 — Spell Sheet ────────────────────────────────────────────────────

function SpellSection({ level, lines, slots, theme }) {
  const isCantrip = level === 0
  return (
    <View style={{ marginBottom: 6 }}>
      {/* Header: level badge + banner */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
        <View style={{
          width: 16, height: 16, borderRadius: 8,
          borderWidth: 1, borderColor: theme.accent,
          alignItems: 'center', justifyContent: 'center',
          marginRight: 4, flexShrink: 0,
        }}>
          <Text style={{ fontSize: 7, color: theme.accent, fontFamily: 'Helvetica-Bold' }}>{level}</Text>
        </View>
        <View style={{
          flex: 1, backgroundColor: theme.accent,
          paddingHorizontal: 5, paddingVertical: 2,
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <Text style={{ fontSize: 6, color: white, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {isCantrip ? 'Cantrips' : 'Total Slots:'}
          </Text>
          {!isCantrip && (
            <View style={{ width: 20, borderBottomWidth: 0.5, borderBottomColor: white }} />
          )}
        </View>
      </View>

      {/* Spell name label */}
      <Text style={{ fontSize: 6, color: sepia, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2, marginLeft: 20 }}>
        Spell Name:
      </Text>

      {/* Write lines */}
      {Array.from({ length: lines }, (_, i) => (
        <View key={i} style={{ ...S.writeLineShort, marginLeft: 20 }} />
      ))}

      {/* Slot circles */}
      {!isCantrip && slots > 0 && (
        <View style={{ flexDirection: 'row', gap: 4, marginTop: 3, marginLeft: 20 }}>
          {Array.from({ length: slots }, (_, i) => (
            <View key={i} style={{
              width: 9, height: 9, borderRadius: 5,
              borderWidth: 1, borderColor: theme.accent,
            }} />
          ))}
        </View>
      )}
    </View>
  )
}

function PageThree({ character, theme, cls }) {
  const levels = [
    { level: 0, lines: 6,  slots: 0 },
    { level: 1, lines: 8,  slots: 4 },
    { level: 2, lines: 6,  slots: 3 },
    { level: 3, lines: 6,  slots: 3 },
    { level: 4, lines: 5,  slots: 3 },
    { level: 5, lines: 5,  slots: 3 },
    { level: 6, lines: 4,  slots: 2 },
    { level: 7, lines: 4,  slots: 2 },
    { level: 8, lines: 3,  slots: 1 },
    { level: 9, lines: 3,  slots: 1 },
  ]

  return (
    <Page size="A4" style={S.page}>
      {/* Header */}
      <View style={{ marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
          <Text style={{ ...S.nameTitle, color: theme.accent }}>{character.name || 'Character Name'}</Text>
          <Text style={{ fontSize: 9, color: inkMid }}>— Spell Sheet —</Text>
          <Text style={{ fontSize: 9, color: inkMid }}>{cls?.name || 'Spellcaster'}</Text>
        </View>
        <View style={{ ...S.divider, marginTop: 4 }} />
      </View>

      {/* Spellcasting info */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        {['Spellcasting Ability', 'Spell Save DC', 'Spell Attack Bonus'].map(label => (
          <View key={label} style={{ flex: 1 }}>
            <Text style={{ ...S.fieldLabel, color: theme.accent }}>{label}</Text>
            <View style={{ borderWidth: 1, borderColor: theme.border, height: 20, borderRadius: 2, backgroundColor: nearWhite }} />
          </View>
        ))}
      </View>

      {/* Three-column spell grid */}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          {levels.slice(0, 3).map(l => <SpellSection key={l.level} theme={theme} {...l} />)}
        </View>
        <View style={{ flex: 1 }}>
          {levels.slice(3, 6).map(l => <SpellSection key={l.level} theme={theme} {...l} />)}
        </View>
        <View style={{ flex: 1 }}>
          {levels.slice(6).map(l => <SpellSection key={l.level} theme={theme} {...l} />)}
        </View>
      </View>

      <PageFooter label="Spell Sheet" name={character.name} page={3} theme={theme} />
    </Page>
  )
}

// ─── Main PDF Document ────────────────────────────────────────────────────────

export function AnimaPDFDocument({ character }) {
  const theme      = getRaceTheme(character.race, character.origin)
  const race       = RACES.find(r => r.id === character.race)
  const originList = ORIGINS[character.race] || []
  const origin     = originList.find(o => o.id === character.origin)
  const faith      = FAITHS.find(f => f.id === character.faith)
  const cls        = findClassById(character.characterClass)
  const classGroup = CLASS_GROUPS.find(g => g.id === character.classGroup)
  const background = character.background === 'custom'
    ? {
        name: character.customBackgroundName || 'Custom Background',
        description: character.customBackgroundDescription || '',
      }
    : BACKGROUNDS.find(b => b.id === character.background)
  const isSpellcaster = cls?.isSpellcaster === true
  const portraitSrc = character.portraitImage
    || (!character.portraitCleared && cls?.stillImage)
    || null
    || (!character.portraitCleared && cls?.stillImage)
    || null

  const shared = { character, theme, race, origin, cls, classGroup, faith, background, portraitSrc }

  return (
    <Document
      title={`ANIMA — ${character.name || 'Character Sheet'}`}
      author="ANIMA Character Creator"
    >
      <PageOne {...shared} />
      <PageTwo {...shared} />
      {isSpellcaster && <PageThree character={character} theme={theme} cls={cls} />}
    </Document>
  )
}

// ─── Download trigger ─────────────────────────────────────────────────────────

export async function downloadPDF(character) {
  const doc  = <AnimaPDFDocument character={character} />
  const blob = await pdf(doc).toBlob()
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  const safeName = (character.name || 'character').replace(/[^a-z0-9]/gi, '_').toLowerCase()
  a.download = `ANIMA_${safeName}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
