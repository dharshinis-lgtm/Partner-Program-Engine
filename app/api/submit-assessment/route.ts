import { NextRequest, NextResponse } from 'next/server'
import { AssessmentData, PartnerProgram } from '@/lib/types'

// Mock partner programs database
const mockPartnerPrograms: PartnerProgram[] = [
  {
    id: 'hubspot-1',
    vendor: 'HubSpot',
    score: 0.89,
    maturity: 'Scaleup',
    health: 4,
    productFunctionality: 4,
    customerFeedback: 5,
    employeeFeedback: 4,
    marketPresence: 5,
    adaptability: 4,
    summary: 'HubSpot\'s partner program aligns perfectly with your SMB SaaS goals, offering comprehensive marketing automation tools and strong co-selling opportunities.',
    category: 'CRM & Sales',
    partnerTypes: ['Reseller', 'ISV', 'Technology Partner'],
    geography: ['North America', 'Europe', 'Asia Pacific'],
    compliance: ['GDPR', 'SOC2'],
    commissionModel: '20-30%',
    onboardingTime: '3-6 months',
    supportLevel: 'High'
  },
  {
    id: 'salesforce-1',
    vendor: 'Salesforce',
    score: 0.85,
    maturity: 'Enterprise',
    health: 5,
    productFunctionality: 5,
    customerFeedback: 4,
    employeeFeedback: 4,
    marketPresence: 5,
    adaptability: 3,
    summary: 'Salesforce offers enterprise-grade CRM solutions with extensive partner ecosystem and strong market presence.',
    category: 'CRM & Sales',
    partnerTypes: ['Reseller', 'SI', 'ISV'],
    geography: ['North America', 'Europe', 'Asia Pacific', 'Latin America'],
    compliance: ['GDPR', 'SOC2', 'ISO 27001'],
    commissionModel: '15-25%',
    onboardingTime: '6-12 months',
    supportLevel: 'High'
  },
  {
    id: 'microsoft-1',
    vendor: 'Microsoft',
    score: 0.82,
    maturity: 'Enterprise',
    health: 4,
    productFunctionality: 4,
    customerFeedback: 4,
    employeeFeedback: 4,
    marketPresence: 5,
    adaptability: 4,
    summary: 'Microsoft\'s partner program provides access to a comprehensive suite of business applications and cloud services.',
    category: 'Communication & Collaboration',
    partnerTypes: ['Reseller', 'SI', 'Technology Partner'],
    geography: ['North America', 'Europe', 'Asia Pacific'],
    compliance: ['GDPR', 'SOC2', 'ISO 27001', 'FedRAMP'],
    commissionModel: '10-20%',
    onboardingTime: '3-6 months',
    supportLevel: 'Medium'
  },
  {
    id: 'slack-1',
    vendor: 'Slack',
    score: 0.78,
    maturity: 'Scaleup',
    health: 4,
    productFunctionality: 4,
    customerFeedback: 5,
    employeeFeedback: 4,
    marketPresence: 4,
    adaptability: 4,
    summary: 'Slack\'s partner program focuses on workplace communication and collaboration tools with strong integration capabilities.',
    category: 'Communication & Collaboration',
    partnerTypes: ['Technology Partner', 'ISV'],
    geography: ['North America', 'Europe'],
    compliance: ['GDPR', 'SOC2'],
    commissionModel: '15-25%',
    onboardingTime: '0-3 months',
    supportLevel: 'Medium'
  },
  {
    id: 'zoom-1',
    vendor: 'Zoom',
    score: 0.76,
    maturity: 'Scaleup',
    health: 4,
    productFunctionality: 4,
    customerFeedback: 4,
    employeeFeedback: 3,
    marketPresence: 4,
    adaptability: 4,
    summary: 'Zoom\'s partner program offers video conferencing and communication solutions with growing market presence.',
    category: 'Communication & Collaboration',
    partnerTypes: ['Reseller', 'Technology Partner'],
    geography: ['North America', 'Europe', 'Asia Pacific'],
    compliance: ['GDPR', 'SOC2'],
    commissionModel: '10-20%',
    onboardingTime: '0-3 months',
    supportLevel: 'Medium'
  },
  {
    id: 'stripe-1',
    vendor: 'Stripe',
    score: 0.74,
    maturity: 'Scaleup',
    health: 4,
    productFunctionality: 5,
    customerFeedback: 5,
    employeeFeedback: 4,
    marketPresence: 3,
    adaptability: 5,
    summary: 'Stripe\'s partner program provides payment processing solutions with excellent developer experience and API integration.',
    category: 'Finance & Accounting',
    partnerTypes: ['Technology Partner', 'ISV'],
    geography: ['North America', 'Europe'],
    compliance: ['PCI DSS', 'SOC2'],
    commissionModel: '5-15%',
    onboardingTime: '0-3 months',
    supportLevel: 'High'
  }
]

// AI matching logic (simplified)
function calculateMatchScore(assessment: AssessmentData, program: PartnerProgram): number {
  let score = 0.5 // Base score
  
  // Geography match
  if (assessment.geography && program.geography.some(geo => assessment.geography!.includes(geo))) {
    score += 0.1
  }
  
  // Partner type match
  if (assessment.partnerType && program.partnerTypes.some(type => assessment.partnerType!.includes(type))) {
    score += 0.1
  }
  
  // Compliance match
  if (assessment.complianceRequirements && program.compliance.some(comp => assessment.complianceRequirements!.includes(comp))) {
    score += 0.1
  }
  
  // Business focus match (simplified)
  if (assessment.businessFocus && program.category.toLowerCase().includes(assessment.businessFocus.toLowerCase())) {
    score += 0.15
  }
  
  // Customer segment match (enterprise programs get higher scores for enterprise segments)
  if (assessment.customerSegment?.includes('Enterprise') && program.maturity === 'Enterprise') {
    score += 0.1
  }
  
  // Timeline match
  if (assessment.timeline === '0-3 months' && program.onboardingTime === '0-3 months') {
    score += 0.05
  }
  
  return Math.min(score, 1.0)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scenario, ...assessmentData } = body as AssessmentData & { scenario: string }
    
    // Calculate match scores for all programs
    const matches = mockPartnerPrograms
      .map(program => ({
        ...program,
        score: calculateMatchScore(assessmentData, program)
      }))
      .filter(match => match.score > 0.3) // Filter out low matches
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 10) // Return top 10 matches
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      success: true, 
      matches,
      assessmentId: `assessment_${Date.now()}`,
      scenario 
    })
    
  } catch (error) {
    console.error('Error processing assessment:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process assessment' },
      { status: 500 }
    )
  }
}
