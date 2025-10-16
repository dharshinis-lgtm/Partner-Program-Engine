'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAssessmentStore } from '@/lib/store'
import { AssessmentData } from '@/lib/types'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

interface FormField {
  id: keyof AssessmentData
  type: 'multi-select' | 'dropdown' | 'multi-select-buttons' | 'toggle' | 'text' | 'slider' | 'checkbox-group' | 'ranking'
  label: string
  placeholder?: string
  options?: string[]
  required?: boolean
  conditional?: {
    field: keyof AssessmentData
    value: any
  }
}

interface DynamicFormProps {
  scenario: 'non-competing' | 'benchmark'
}

const formFields: Record<string, FormField[]> = {
  'non-competing': [
    // 1. What is your business’s core focus or solution category?
    {
      id: 'businessFocus',
      type: 'dropdown',
      label: 'What is your business\'s core focus or solution category?',
      options: ['CRM & Sales', 'Marketing and Advertising', 'AI and Machine Learning', 'Business Intelligence & Analytics', 'Cloud Solutions & Storage', 'Customer Service & Support', 'eCommerce', 'Finance & Accounting', 'Human Resources (HR)', 'Project & Task Management', 'Software Development', 'Security & Identity Management', 'Media & Design', 'Specialized Software', 'Other'],
      required: true
    },
    // 2. Which SaaS vendors are you already partnered with? (multi select chips) + other
    {
      id: 'existingPartners',
      type: 'multi-select-buttons',
      label: 'Which SaaS vendors are you already partnered with?',
      options: ['HubSpot', 'Salesforce', 'Microsoft', 'Google', 'Adobe', 'Oracle', 'SAP', 'ServiceNow', 'Workday', 'Atlassian', 'Slack', 'Zoom', 'Dropbox', 'Box', 'DocuSign', 'Mailchimp', 'Zendesk', 'Intercom', 'Stripe', 'PayPal', 'Other'],
      required: true
    },
    // 3. How long associated with vendor? dropdown 1-10 years
    {
      id: 'partnerDuration',
      type: 'slider',
      label: 'How long have you been associated with the vendor?',
      options: ['< 1 year', '1-3 years', '4-6 years', '< 6 years'],
      required: true
    },
    // 4. Geography multi select chips
    {
      id: 'geography',
      type: 'multi-select-buttons',
      label: 'Which geography/countries do you operate in?',
      options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa', 'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'India', 'Brazil', 'Mexico'],
      required: true
    },
    // 5. Customer segment
    {
      id: 'customerSegment',
      type: 'multi-select-buttons',
      label: 'What customer segment do you target?',
      options: ['SMB (Small & Medium Business)', 'Enterprise', 'Mid-Market', 'Startups', 'Government', 'Non-Profit', 'Education'],
      required: true
    },
    // 6. Are you looking for similar solutions, or avoid competition (yes/no)
    {
      id: 'avoidCompetition',
      type: 'toggle',
      label: 'Are you looking for similar solutions?',
      //required: true,
    },
    
    // 7. Expansion/partnership goal (radio + other)
    {
      id: 'expansionGoal',
      type: 'slider',
      label: 'What is your expansion/partnership goal?',
      options: ['Market expansion', 'Product integration', 'Co-sell opportunities', 'Channel development', 'Technology partnership', 'Strategic alliance', 'Revenue growth', 'Geographic expansion', 'Other'],
      required: true
    },
    // 8. What type of partner program do you prefer (no changes)
    {
      id: 'partnerType',
      type: 'multi-select',
      label: 'What type of partner program do you prefer (reseller, SI, etc.)?',
      options: ['Reseller', 'System Integrator (SI)', 'Independent Software Vendor (ISV)', 'Technology Partner', 'Channel Partner', 'Solution Provider', 'Consulting Partner', 'Referral Partner'],
      required: true
    },
    // 9. Incentives (no changes)
    {
      id: 'expectedIncentives',
      type: 'slider',
      label: 'What incentives/commissions/revenue share do you expect?',
      options: ['0-10%', '10-20%', '20-30%', '30-40%', '40%+'],
      required: true
    },
    // 10. Support/training (no changes)
    {
      id: 'supportNeeds',
      type: 'checkbox-group',
      label: 'What support, training, or enablement do you need?',
      options: ['Sales training', 'Technical training', 'Marketing support', 'Co-marketing funds', 'Lead generation', 'Certification programs', 'Dedicated support', 'Partner portal access', 'API documentation', 'Integration support'],
      required: true
    },
    // 11. Technical integration needs (no changes)
    {
      id: 'technicalIntegration',
      type: 'text',
      label: 'Any technical integration needs (API, compatibility)?',
      placeholder: 'Describe your technical requirements...'
    },
    // 12. Compliance requirements (no changes)
    {
      id: 'complianceRequirements',
      type: 'checkbox-group',
      label: 'Any must-have compliance requirements (GDPR, SOC2)?',
      options: ['GDPR', 'SOC2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'FedRAMP', 'CCPA', 'SOX', 'ITAR', 'FISMA']
    },
    // 13. Timeline (no changes)
    {
      id: 'timeline',
      type: 'slider',
      label: 'What is your expected timeline for a new partnership?',
      options: ['0-3 months', '3-6 months', '6-12 months', '12+ months'],
      required: true
    }
  ],
  'benchmark': [
    {
      id: 'existingPartners',
      type: 'multi-select',
      label: 'Which SaaS vendors are you already partnered with?',
      options: ['HubSpot', 'Salesforce', 'Microsoft', 'Google', 'Adobe', 'Oracle', 'SAP', 'ServiceNow', 'Workday', 'Atlassian', 'Slack', 'Zoom', 'Dropbox', 'Box', 'DocuSign', 'Mailchimp', 'Zendesk', 'Intercom', 'Stripe', 'PayPal'],
      required: true
    },
    {
      id: 'partnerStatus',
      type: 'slider',
      label: 'What is your partner status/level with each vendor?',
      options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite'],
      required: true
    },
    {
      id: 'geography',
      type: 'multi-select',
      label: 'Which geography/countries do you operate in?',
      options: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa', 'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'India', 'Brazil', 'Mexico'],
      required: true
    },
    {
      id: 'customerSegment',
      type: 'multi-select-buttons',
      label: 'What customer segment do you target?',
      options: ['SMB (Small & Medium Business)', 'Enterprise', 'Mid-Market', 'Startups', 'Government', 'Non-Profit', 'Education'],
      required: true
    },
    {
      id: 'selectedVendor',
      type: 'slider',
      label: 'Have you already selected your next partner vendor? Which one?',
      options: ['Odoo', 'HubSpot', 'Salesforce', 'Microsoft', 'Google', 'Adobe', 'Oracle', 'SAP', 'ServiceNow', 'Workday', 'Atlassian', 'Slack', 'Zoom', 'Dropbox', 'Box', 'DocuSign', 'Mailchimp', 'Zendesk', 'Intercom', 'Stripe', 'PayPal'],
      required: true
    },
    {
      id: 'benchmarkCompetitors',
      type: 'toggle',
      label: 'Do you want to benchmark your selected vendor vs. direct competitors before signing?',
      required: true
    },
    {
      id: 'partnerType',
      type: 'multi-select',
      label: 'What type of partner program do you prefer?',
      options: ['Reseller', 'System Integrator (SI)', 'Independent Software Vendor (ISV)', 'Technology Partner', 'Channel Partner', 'Solution Provider', 'Consulting Partner', 'Referral Partner'],
      required: true
    },
    {
      id: 'expectedIncentives',
      type: 'slider',
      label: 'What incentives/commissions/revenue share do you expect?',
      options: ['0-10%', '10-20%', '20-30%', '30-40%', '40%+'],
      required: true
    },
    {
      id: 'specificFeatures',
      type: 'multi-select',
      label: 'Which specific features/modules should the benchmark focus on?',
      options: ['CRM', 'Marketing Automation', 'Project Management', 'HR Management', 'Accounting', 'Inventory', 'E-commerce', 'Analytics', 'Reporting', 'API Integration', 'Mobile App', 'Custom Development'],
      required: true
    },
    {
      id: 'commercialRequirements',
      type: 'ranking',
      label: 'What commercial and operational requirements matter most?',
      options: ['Pricing flexibility', 'Contract terms', 'Support quality', 'Training availability', 'Marketing support', 'Technical resources', 'Partner portal', 'Certification process'],
      required: true
    },
    {
      id: 'complianceRequirements',
      type: 'checkbox-group',
      label: 'Any critical technical/compliance needs?',
      options: ['GDPR', 'SOC2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'FedRAMP', 'CCPA', 'SOX', 'ITAR', 'FISMA'],
      required: false
    },
    {
      id: 'timeline',
      type: 'slider',
      label: 'Expected onboarding timeline',
      options: ['0-3 months', '3-6 months', '6-12 months', '12+ months'],
      required: true
    }
  ]
}

export default function DynamicForm({ scenario }: DynamicFormProps) {
  const router = useRouter()
  const { assessmentData, updateAssessmentData, setCurrentStep, setTotalSteps, currentStep } = useAssessmentStore()
  const [formData, setFormData] = useState<Partial<AssessmentData>>(assessmentData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const fields = formFields[scenario]
  const totalSteps = fields.length

  useEffect(() => {
    setTotalSteps(totalSteps)
  }, [totalSteps, setTotalSteps])

  const handleFieldChange = (fieldId: keyof AssessmentData, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }))
    }
  }

  const validateStep = () => {
    const currentField = fields[currentStep]
    const fieldValue = formData[currentField.id] as any
    if (currentField.required && (
        fieldValue === undefined || fieldValue === null || fieldValue === '' ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      )) {
      setErrors(prev => ({ ...prev, [currentField.id]: 'This field is required' }))
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      updateAssessmentData(formData)
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        // Submit assessment
        handleSubmit()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, scenario })
      })
      
      if (response.ok) {
        const { matches } = await response.json()
        useAssessmentStore.getState().setMatches(matches)
        router.push('/results')
      }
    } catch (error) {
      console.error('Error submitting assessment:', error)
    }
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id]
    const error = errors[field.id]

    switch (field.type) {
      case 'multi-select':
        return (
          <MultiSelectField
            options={field.options || []}
            value={value as string[] || []}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      case 'dropdown':
        // Prefer compact buttons/sliders for most questions; keep dropdown for the first only
        if (field.id === 'businessFocus' || (scenario === 'benchmark' && field.id === 'selectedVendor')) {
          return (
            <DropdownField
              options={field.options || []}
              value={value as string || ''}
              onChange={(val) => handleFieldChange(field.id, val)}
              placeholder={field.placeholder}
              error={error}
            />
          )
        }
        return (
          <SliderField
            options={field.options || []}
            value={value as string || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      case 'multi-select-buttons':
        return (
          <MultiSelectButtonsField
            options={field.options || []}
            value={value as string[] || []}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      case 'toggle':
        return (
          <ToggleField
            value={Boolean(value)}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      case 'text':
        return (
          <TextField
            value={value as string || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            placeholder={field.placeholder}
            error={error}
          />
        )
      case 'slider':
        return (
          <SliderField
            options={field.options || []}
            value={value as string || ''}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      case 'checkbox-group':
        return (
          <CheckboxGroupField
            options={field.options || []}
            value={value as string[] || []}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      case 'ranking':
        return (
          <RankingField
            options={field.options || []}
            value={value as string[] || []}
            onChange={(val) => handleFieldChange(field.id, val)}
            error={error}
          />
        )
      default:
        return null
    }
  }

  const currentField = fields[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-dark-gray hover:text-theme-blue transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div className="h-6 w-px bg-light-gray"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dark-gray rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">22</span>
                </div>
                <span className="text-xl font-bold text-dark-gray">SaaS</span>
              </div>
            </div>
            <div className="text-sm text-steel-gray">
              Step {currentStep + 1} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-light-gray rounded-full h-2">
            <div
              className="bg-theme-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-gray mb-4">
              {currentField.label}
            </h1>
            {currentField.required && (
              <p className="text-sm text-steel-gray">* Required field</p>
            )}
          </div>

          <div className="mb-8">
            {renderField(currentField)}
            {/* Inline "Other" inputs on the same step */}
            {currentField.id === 'businessFocus' && (formData.businessFocus === 'Other') && (
              <div className="mt-4">
                <TextField
                  value={(formData.businessFocusOther as string) || ''}
                  onChange={(val) => handleFieldChange('businessFocusOther', val)}
                  placeholder="Enter your focus/category..."
                />
              </div>
            )}
            {currentField.id === 'existingPartners' && Array.isArray(formData.existingPartners) && formData.existingPartners.includes('Other') && (
              <div className="mt-4">
                <TextField
                  value={(formData.existingPartnersOther as string) || ''}
                  onChange={(val) => handleFieldChange('existingPartnersOther', val)}
                  placeholder="Add other vendors separated by commas"
                />
              </div>
            )}
            {currentField.id === 'expansionGoal' && (formData.expansionGoal === 'Other') && (
              <div className="mt-4">
                <TextField
                  value={(formData.expansionGoalOther as string) || ''}
                  onChange={(val) => handleFieldChange('expansionGoalOther', val)}
                  placeholder="Describe your goal"
                />
              </div>
            )}
            {errors[currentField.id] && (
              <p className="text-red-500 text-sm mt-2">{errors[currentField.id]}</p>
            )}
            {currentField.id === 'avoidCompetition' && (formData.avoidCompetition === false) && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-dark-gray mb-2">Which new category do you have in mind?</h2>
                <TextField
                  value={(formData.newCategoryIdea as string) || ''}
                  onChange={(val) => handleFieldChange('newCategoryIdea', val)}
                  placeholder="Type the category you want to explore"
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <button
              onClick={handleNext}
              className="btn-primary"
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  Find My Winning Program
                  <Check className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

// Field Components
function MultiSelectField({ options, value, onChange, error }: {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
            className="w-4 h-4 text-theme-blue border-gray-300 rounded focus:ring-theme-blue"
          />
          <span className="text-dark-gray">{option}</span>
        </label>
      ))}
    </div>
  )
}

function DropdownField({ options, value, onChange, placeholder, error }: {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input-field w-full ${error ? 'border-red-500' : ''}`}
    >
      <option value="">{placeholder || 'Select an option...'}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  )
}

function MultiSelectButtonsField({ options, value, onChange, error }: {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => toggleOption(option)}
          className={`p-3 text-left border rounded-lg transition-all ${
            value.includes(option)
              ? 'border-theme-blue bg-theme-blue/10 text-theme-blue'
              : 'border-light-gray hover:border-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function ToggleField({ value, onChange, error }: {
  value: boolean
  onChange: (value: boolean) => void
  error?: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
      <button
        onClick={() => onChange(true)}
        className={`p-3 text-center border rounded-lg transition-all ${
          value === true
            ? 'border-theme-blue bg-theme-blue/10 text-theme-blue'
            : 'border-light-gray hover:border-gray-300'
        }`}
      >
        Yes
      </button>
      <button
        onClick={() => onChange(false)}
        className={`p-3 text-center border rounded-lg transition-all ${
          value === false
            ? 'border-theme-blue bg-theme-blue/10 text-theme-blue'
            : 'border-light-gray hover:border-gray-300'
        }`}
      >
        No
      </button>
    </div>
  )
}

function TextField({ value, onChange, placeholder, error }: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={`input-field w-full resize-none ${error ? 'border-red-500' : ''}`}
    />
  )
}

function SliderField({ options, value, onChange, error }: {
  options: string[]
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`p-3 text-center border rounded-lg transition-all ${
              value === option
                ? 'border-theme-blue bg-theme-blue/10 text-theme-blue'
                : 'border-light-gray hover:border-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckboxGroupField({ options, value, onChange, error }: {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-3 cursor-pointer p-3 border border-light-gray rounded-lg hover:border-gray-300">
          <input
            type="checkbox"
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
            className="w-4 h-4 text-theme-blue border-gray-300 rounded focus:ring-theme-blue"
          />
          <span className="text-dark-gray">{option}</span>
        </label>
      ))}
    </div>
  )
}

function RankingField({ options, value, onChange, error }: {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  error?: string
}) {
  const moveItem = (fromIndex: number, toIndex: number) => {
    const newValue = [...value]
    const [movedItem] = newValue.splice(fromIndex, 1)
    newValue.splice(toIndex, 0, movedItem)
    onChange(newValue)
  }

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-steel-gray mb-4">
        Drag to reorder or click to add/remove items
      </div>
      
      {/* Selected items in order */}
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={item} className="flex items-center space-x-3 p-3 bg-theme-blue/10 border border-theme-blue rounded-lg">
            <span className="text-theme-blue font-semibold">{index + 1}</span>
            <span className="flex-1 text-dark-gray">{item}</span>
            <button
              onClick={() => toggleOption(item)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Available options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.filter(option => !value.includes(option)).map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className="p-2 text-left border border-light-gray rounded hover:border-gray-300 text-dark-gray"
          >
            + {option}
          </button>
        ))}
      </div>
    </div>
  )
}
