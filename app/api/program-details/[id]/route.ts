import { NextRequest, NextResponse } from 'next/server'
import { PartnerProgram } from '@/lib/types'

// Mock partner programs database (same as in programs route)
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const programId = params.id
    
    // Find the program by ID
    const program = mockPartnerPrograms.find(p => p.id === programId)
    
    if (!program) {
      return NextResponse.json(
        { success: false, error: 'Program not found' },
        { status: 404 }
      )
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return NextResponse.json({ 
      success: true, 
      ...program
    })
    
  } catch (error) {
    console.error('Error fetching program details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch program details' },
      { status: 500 }
    )
  }
}
