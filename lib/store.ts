import { create } from 'zustand'
import { AssessmentData, PartnerProgram, ROIData } from './types'

interface AssessmentStore {
  // Assessment data
  assessmentData: Partial<AssessmentData>
  currentStep: number
  totalSteps: number
  scenario: 'non-competing' | 'benchmark' | null
  
  // Results
  matches: PartnerProgram[]
  selectedPrograms: string[]
  roiData: Partial<ROIData>
  
  // Actions
  updateAssessmentData: (data: Partial<AssessmentData>) => void
  setScenario: (scenario: 'non-competing' | 'benchmark') => void
  setCurrentStep: (step: number) => void
  setTotalSteps: (steps: number) => void
  setMatches: (matches: PartnerProgram[]) => void
  toggleProgramSelection: (programId: string) => void
  updateROIData: (data: Partial<ROIData>) => void
  resetAssessment: () => void
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  // Initial state
  assessmentData: {},
  currentStep: 0,
  totalSteps: 0,
  scenario: null,
  matches: [],
  selectedPrograms: [],
  roiData: {},
  
  // Actions
  updateAssessmentData: (data) =>
    set((state) => ({
      assessmentData: { ...state.assessmentData, ...data }
    })),
    
  setScenario: (scenario) => set({ scenario }),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setTotalSteps: (steps) => set({ totalSteps: steps }),
  
  setMatches: (matches) => set({ matches }),
  
  toggleProgramSelection: (programId) =>
    set((state) => ({
      selectedPrograms: state.selectedPrograms.includes(programId)
        ? state.selectedPrograms.filter(id => id !== programId)
        : [...state.selectedPrograms, programId]
    })),
    
  updateROIData: (data) =>
    set((state) => ({
      roiData: { ...state.roiData, ...data }
    })),
    
  resetAssessment: () =>
    set({
      assessmentData: {},
      currentStep: 0,
      totalSteps: 0,
      scenario: null,
      matches: [],
      selectedPrograms: [],
      roiData: {}
    })
}))
