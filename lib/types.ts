export interface AssessmentData {
  // Common fields
  existingPartners: string[]
  partnerStatus: Record<string, string>
  geography: string[]
  customerSegment: string[]
  businessFocus: string
  businessFocusOther?: string
  existingPartnersOther?: string
  partnerDuration?: string
  partnerType: string[]
  supportNeeds: string[]
  technicalIntegration: string
  complianceRequirements: string[]
  timeline: string
  
  // Scenario 1 specific
  avoidCompetition?: boolean
  newCategoryIdea?: string
  expansionGoal?: string
  expansionGoalOther?: string
  
  // Scenario 2 specific
  selectedVendor?: string
  benchmarkCompetitors?: boolean
  expectedIncentives?: number
  specificFeatures?: string[]
  commercialRequirements?: string[]
}

export interface PartnerProgram {
  id: string
  vendor: string
  logo?: string
  score: number
  maturity: string
  health: number
  productFunctionality: number
  customerFeedback: number
  employeeFeedback: number
  marketPresence: number
  adaptability: number
  summary: string
  category: string
  broaderCategory?: string
  partnerTypes: string[]
  geography: string[]
  compliance: string[]
  commissionModel: string
  onboardingTime: string
  supportLevel: string
}

export interface ROIData {
  averageDealSize: number
  partnerMargin: number
  monthlyDealVolume: number
  enablementCost: number
  onboardingCost: number
  mdfAllocation: number
  contractDuration: number
}

export interface ROICalculation {
  breakEvenPoint: number
  roi12Months: number
  netProfit: number
  monthlyRevenue: number
  monthlyCosts: number
  cumulativeData: Array<{
    month: number
    revenue: number
    costs: number
    profit: number
  }>
}

export interface ProgramMilestone {
  id: string
  title: string
  description: string
  timeEstimate: string
  kpi: string
  status: 'pending' | 'in-progress' | 'completed'
}

export interface ProgramTimeline {
  programId: string
  milestones: ProgramMilestone[]
  totalDuration: string
  expectedGrowth: string
}
