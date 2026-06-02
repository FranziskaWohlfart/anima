import React, { useState } from 'react'
import Step0Welcome from './components/steps/Step0Welcome.jsx'
import Step1World from './components/steps/Step1World.jsx'
import Step2Race from './components/steps/Step2Race.jsx'
import Step3Origin from './components/steps/Step3Origin.jsx'
import Step4Faith from './components/steps/Step4Faith.jsx'
import Step5Class from './components/steps/Step5Class.jsx'
import Step6Background from './components/steps/Step6Background.jsx'
import Step7Equipment from './components/steps/Step7Equipment.jsx'
import Step8Details from './components/steps/Step8Details.jsx'
import Step9Review from './components/steps/Step9Review.jsx'

const initialCharacter = {
  name: '',
  gender: '',
  age: '',
  alignment: '',
  appearance: '',
  portraitImage: null,
  portraitCleared: false,
  race: 'bashet',
  origin: null,
  animalForm: '',
  wildlingRacialTrait: '',
  abilityBonusPlusTwo: '',
  abilityBonusPlusOne: '',
  faith: null,
  classGroup: null,
  characterClass: null,
  background: null,
  customBackgroundName: '',
  customBackgroundDescription: '',
  originSkills: [],
  classSkills: [],
  selectedEquipmentPacks: [],
  equipmentItems: [],
  curseAnswer: '',
  leftHomeAnswer: '',
  memoryAnswer: '',
}

export default function App() {
  const [step, setStep] = useState(0)
  const [character, setCharacter] = useState(initialCharacter)

  function updateCharacter(updates) {
    setCharacter(prev => ({ ...prev, ...updates }))
  }

  function onContinue() {
    setStep(s => Math.min(s + 1, 9))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onBack() {
    setStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function jumpToStep(targetStep) {
    setStep(targetStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const commonProps = {
    step,
    character,
    updateCharacter,
    onContinue,
    onBack,
    jumpToStep,
  }

  return (
    <div className="app">
      {step === 0 && <Step0Welcome onContinue={onContinue} />}
      {step === 1 && <Step1World {...commonProps} />}
      {step === 2 && <Step2Race {...commonProps} />}
      {step === 3 && <Step3Origin {...commonProps} />}
      {step === 4 && <Step4Faith {...commonProps} />}
      {step === 5 && <Step5Class {...commonProps} />}
      {step === 6 && <Step6Background {...commonProps} />}
      {step === 7 && <Step7Equipment {...commonProps} />}
      {step === 8 && <Step8Details {...commonProps} />}
      {step === 9 && (
        <Step9Review
          step={step}
          character={character}
          onBack={onBack}
          jumpToStep={jumpToStep}
        />
      )}
    </div>
  )
}
