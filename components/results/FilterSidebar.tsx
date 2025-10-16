'use client'

import { useState } from 'react'
import { X, Check } from 'lucide-react'

interface FilterSidebarProps {
  onClose: () => void
  onApplyFilters: (filters: any) => void
}

export default function FilterSidebar({ onClose, onApplyFilters }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    maturity: [] as string[],
    partnerTypes: [] as string[],
    geography: [] as string[],
    compliance: [] as string[],
    scoreRange: [0, 100] as [number, number],
    commissionRange: [0, 50] as [number, number]
  })

  const maturityOptions = ['Startup', 'Scaleup', 'Enterprise']
  const partnerTypeOptions = ['Reseller', 'System Integrator (SI)', 'Independent Software Vendor (ISV)', 'Technology Partner', 'Channel Partner', 'Solution Provider', 'Consulting Partner', 'Referral Partner']
  const geographyOptions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa']
  const complianceOptions = ['GDPR', 'SOC2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'FedRAMP', 'CCPA', 'SOX', 'ITAR', 'FISMA']

  const toggleArrayFilter = (key: keyof typeof filters, value: string) => {
    if (key === 'scoreRange' || key === 'commissionRange') return
    
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    
    setFilters(prev => ({ ...prev, [key]: newArray }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
  }

  const handleReset = () => {
    setFilters({
      maturity: [],
      partnerTypes: [],
      geography: [],
      compliance: [],
      scoreRange: [0, 100],
      commissionRange: [0, 50]
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-light-gray">
            <h2 className="text-xl font-semibold text-dark-gray">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Maturity Level */}
            <div>
              <h3 className="text-sm font-semibold text-dark-gray mb-3">Maturity Level</h3>
              <div className="space-y-2">
                {maturityOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.maturity.includes(option)}
                        onChange={() => toggleArrayFilter('maturity', option)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        filters.maturity.includes(option)
                          ? 'border-theme-blue bg-theme-blue'
                          : 'border-gray-300'
                      }`}>
                        {filters.maturity.includes(option) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-dark-gray">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Partner Types */}
            <div>
              <h3 className="text-sm font-semibold text-dark-gray mb-3">Partner Types</h3>
              <div className="space-y-2">
                {partnerTypeOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.partnerTypes.includes(option)}
                        onChange={() => toggleArrayFilter('partnerTypes', option)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        filters.partnerTypes.includes(option)
                          ? 'border-theme-blue bg-theme-blue'
                          : 'border-gray-300'
                      }`}>
                        {filters.partnerTypes.includes(option) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-dark-gray">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Geography */}
            <div>
              <h3 className="text-sm font-semibold text-dark-gray mb-3">Geography</h3>
              <div className="space-y-2">
                {geographyOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.geography.includes(option)}
                        onChange={() => toggleArrayFilter('geography', option)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        filters.geography.includes(option)
                          ? 'border-theme-blue bg-theme-blue'
                          : 'border-gray-300'
                      }`}>
                        {filters.geography.includes(option) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-dark-gray">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div>
              <h3 className="text-sm font-semibold text-dark-gray mb-3">Compliance</h3>
              <div className="space-y-2">
                {complianceOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={filters.compliance.includes(option)}
                        onChange={() => toggleArrayFilter('compliance', option)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                        filters.compliance.includes(option)
                          ? 'border-theme-blue bg-theme-blue'
                          : 'border-gray-300'
                      }`}>
                        {filters.compliance.includes(option) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-dark-gray">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Score Range */}
            <div>
              <h3 className="text-sm font-semibold text-dark-gray mb-3">
                Fit Score: {filters.scoreRange[0]}% - {filters.scoreRange[1]}%
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.scoreRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    scoreRange: [prev.scoreRange[0], parseInt(e.target.value)]
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Commission Range */}
            <div>
              <h3 className="text-sm font-semibold text-dark-gray mb-3">
                Commission: {filters.commissionRange[0]}% - {filters.commissionRange[1]}%
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filters.commissionRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    commissionRange: [prev.commissionRange[0], parseInt(e.target.value)]
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-light-gray space-y-3">
            <button
              onClick={handleReset}
              className="w-full btn-secondary"
            >
              Reset Filters
            </button>
            <button
              onClick={handleApply}
              className="w-full btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
