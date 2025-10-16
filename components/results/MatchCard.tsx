'use client'

import { useState } from 'react'
import { PartnerProgram } from '@/lib/types'
import { Check, Star, TrendingUp, Users, Clock, ExternalLink, BarChart3 } from 'lucide-react'

interface MatchCardProps {
  program: PartnerProgram
  isSelected: boolean
  onSelect: () => void
  onClick: () => void
}

export default function MatchCard({ program, isSelected, onSelect, onClick }: MatchCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-theme-green'
    if (score >= 0.6) return 'text-theme-yellow'
    return 'text-theme-red'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 0.8) return 'bg-theme-green/10'
    if (score >= 0.6) return 'bg-theme-yellow/10'
    return 'bg-theme-red/10'
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
    <div
      className={`relative bg-white border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-theme-blue shadow-lg' 
          : 'border-light-gray hover:border-gray-300 hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Selection Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        className={`absolute top-4 right-4 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
          isSelected
            ? 'bg-theme-blue border-theme-blue text-white'
            : 'border-gray-300 hover:border-theme-blue'
        }`}
      >
        {isSelected && <Check className="w-4 h-4" />}
      </button>

      {/* Compare Label */}
      <div className="absolute top-4 right-14 text-xs font-medium text-steel-gray select-none">Compare</div>

      {/* Vendor Logo and Name */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-lg font-bold text-dark-gray">
            {program.vendor.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-dark-gray">{program.vendor}</h3>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getMaturityColor(program.maturity)}`}>
            {program.maturity}
          </span>
        </div>
      </div>

      {/* Fit Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-dark-gray">Fit Score</span>
          <span className={`text-lg font-bold ${getScoreColor(program.score)}`}>
            {Math.round(program.score * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              program.score >= 0.8 ? 'bg-theme-green' : 
              program.score >= 0.6 ? 'bg-theme-yellow' : 'bg-theme-red'
            }`}
            style={{ width: `${program.score * 100}%` }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Star className="w-4 h-4 text-theme-yellow mr-1" />
            <span className="text-sm font-medium text-dark-gray">Reputation Index</span>
          </div>
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < program.health ? 'text-theme-yellow fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-theme-blue mr-1" />
            <span className="text-sm font-medium text-dark-gray">Market Presence</span>
          </div>
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < program.marketPresence ? 'text-theme-blue fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-steel-gray mb-4 line-clamp-3">
        {program.summary}
      </p>

      {/* Quick Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-steel-gray">Commission</span>
          <span className="font-medium text-dark-gray">{program.commissionModel}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-steel-gray">Onboarding</span>
          <span className="font-medium text-dark-gray">{program.onboardingTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-steel-gray">Support</span>
          <span className="font-medium text-dark-gray">{program.supportLevel}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          className="flex-1 btn-primary text-sm py-2 flex items-center justify-center"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            // Navigate to ROI calculator
          }}
          className="btn-secondary text-sm py-2 flex items-center justify-center"
        >
          <BarChart3 className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-theme-blue/5 rounded-lg pointer-events-none" />
      )}
    </div>
  )
}
