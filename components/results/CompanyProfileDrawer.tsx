'use client'

import { useState, useEffect } from 'react'
import { X, Star, TrendingUp, Users, Clock, CheckCircle, ExternalLink, BarChart3, Download, Share2 } from 'lucide-react'
import { PartnerProgram } from '@/lib/types'
import ROICalculator from './ROICalculator'
import ProgramTimeline from './ProgramTimeline'

interface CompanyProfileDrawerProps {
  programId: string
  onClose: () => void
}

export default function CompanyProfileDrawer({ programId, onClose }: CompanyProfileDrawerProps) {
  const [program, setProgram] = useState<PartnerProgram | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'roi' | 'timeline'>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch program details
    const fetchProgram = async () => {
      try {
        const response = await fetch(`/api/program-details/${programId}`)
        if (response.ok) {
          const data = await response.json()
          setProgram(data)
        }
      } catch (error) {
        console.error('Error fetching program details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgram()
  }, [programId])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-blue mx-auto mb-4"></div>
              <p className="text-steel-gray">Loading program details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-steel-gray">Program not found</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-theme-green'
    if (score >= 0.6) return 'text-theme-yellow'
    return 'text-theme-red'
  }

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'Enterprise': return 'text-theme-blue bg-theme-blue/10'
      case 'Scaleup': return 'text-theme-green bg-theme-green/10'
      case 'Startup': return 'text-theme-yellow bg-theme-yellow/10'
      default: return 'text-steel-gray bg-gray-100'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-light-gray">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-dark-gray">
                  {program.vendor.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-dark-gray">{program.vendor}</h2>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getMaturityColor(program.maturity)}`}>
                  {program.maturity}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-steel-gray" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-steel-gray" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-light-gray">
            {[
              { id: 'overview', label: 'Overview', icon: ExternalLink },
              { id: 'roi', label: 'ROI Calculator', icon: BarChart3 },
              { id: 'timeline', label: 'Timeline', icon: Clock }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'text-theme-blue border-b-2 border-theme-blue'
                    : 'text-steel-gray hover:text-dark-gray'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="p-6 space-y-6">
                {/* Fit Score */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-dark-gray">Fit Score</span>
                    <span className={`text-2xl font-bold ${getScoreColor(program.score)}`}>
                      {Math.round(program.score * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        program.score >= 0.8 ? 'bg-theme-green' : 
                        program.score >= 0.6 ? 'bg-theme-yellow' : 'bg-theme-red'
                      }`}
                      style={{ width: `${program.score * 100}%` }}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Program Summary</h3>
                  <p className="text-steel-gray leading-relaxed">{program.summary}</p>
                </div>

                {/* Key Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-light-gray rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-theme-yellow mr-2" />
                        <span className="text-sm font-medium text-dark-gray">Reputation Index</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < program.health ? 'text-theme-yellow fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white border border-light-gray rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-4 h-4 text-theme-blue mr-2" />
                        <span className="text-sm font-medium text-dark-gray">Market Presence</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < program.marketPresence ? 'text-theme-blue fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Program Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-light-gray">
                      <span className="text-steel-gray">Category</span>
                      <span className="font-medium text-dark-gray">{program.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-light-gray">
                      <span className="text-steel-gray">Commission Model</span>
                      <span className="font-medium text-dark-gray">{program.commissionModel}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-light-gray">
                      <span className="text-steel-gray">Onboarding Time</span>
                      <span className="font-medium text-dark-gray">{program.onboardingTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-light-gray">
                      <span className="text-steel-gray">Support Level</span>
                      <span className="font-medium text-dark-gray">{program.supportLevel}</span>
                    </div>
                  </div>
                </div>

                {/* Partner Types */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Partner Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.partnerTypes.map((type) => (
                      <span key={type} className="px-3 py-1 bg-theme-blue/10 text-theme-blue text-sm rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Geography */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Available Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.geography.map((region) => (
                      <span key={region} className="px-3 py-1 bg-theme-green/10 text-theme-green text-sm rounded-full">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Compliance */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">Compliance Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.compliance.map((cert) => (
                      <span key={cert} className="px-3 py-1 bg-theme-yellow/10 text-theme-yellow text-sm rounded-full flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-6 border-t border-light-gray">
                  <button className="flex-1 btn-primary">
                    Apply to Program
                  </button>
                  <button className="btn-secondary">
                    Save for Later
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'roi' && (
              <div className="p-6">
                <ROICalculator programId={program.id} />
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="p-6">
                <ProgramTimeline programId={program.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
