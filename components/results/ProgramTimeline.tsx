'use client'

import { useState, useEffect } from 'react'
import { ProgramTimeline, ProgramMilestone } from '@/lib/types'
import { CheckCircle, Clock, Play, Calendar, Target, Users, Award, TrendingUp } from 'lucide-react'

interface ProgramTimelineProps {
  programId: string
}

export default function ProgramTimeline({ programId }: ProgramTimelineProps) {
  const [timeline, setTimeline] = useState<ProgramTimeline | null>(null)
  const [viewMode, setViewMode] = useState<'timeline' | 'ladder'>('timeline')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock timeline data - in real app, this would come from API
    const mockTimeline: ProgramTimeline = {
      programId,
      totalDuration: '6-12 months',
      expectedGrowth: '25-40%',
      milestones: [
        {
          id: '1',
          title: 'Initial Application',
          description: 'Submit partner application and required documentation',
          timeEstimate: '1-2 weeks',
          kpi: 'Application approved',
          status: 'completed'
        },
        {
          id: '2',
          title: 'NDA & Legal Review',
          description: 'Sign non-disclosure agreement and complete legal review process',
          timeEstimate: '2-3 weeks',
          kpi: 'Legal documents signed',
          status: 'completed'
        },
        {
          id: '3',
          title: 'Technical Assessment',
          description: 'Complete technical evaluation and integration requirements review',
          timeEstimate: '3-4 weeks',
          kpi: 'Technical approval',
          status: 'in-progress'
        },
        {
          id: '4',
          title: 'Training & Certification',
          description: 'Complete required training modules and obtain partner certification',
          timeEstimate: '4-6 weeks',
          kpi: 'Certification achieved',
          status: 'pending'
        },
        {
          id: '5',
          title: 'First Co-Sell Opportunity',
          description: 'Identify and pursue first joint sales opportunity',
          timeEstimate: '2-3 months',
          kpi: 'First deal closed',
          status: 'pending'
        },
        {
          id: '6',
          title: 'Market Expansion',
          description: 'Scale partnership and expand into new market segments',
          timeEstimate: '6-12 months',
          kpi: 'Revenue target achieved',
          status: 'pending'
        }
      ]
    }

    setTimeout(() => {
      setTimeline(mockTimeline)
      setLoading(false)
    }, 1000)
  }, [programId])

  const getStatusIcon = (status: ProgramMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-theme-green" />
      case 'in-progress':
        return <Play className="w-5 h-5 text-theme-blue" />
      case 'pending':
        return <Clock className="w-5 h-5 text-steel-gray" />
    }
  }

  const getStatusColor = (status: ProgramMilestone['status']) => {
    switch (status) {
      case 'completed':
        return 'border-theme-green bg-theme-green/10'
      case 'in-progress':
        return 'border-theme-blue bg-theme-blue/10'
      case 'pending':
        return 'border-light-gray bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-blue mx-auto mb-4"></div>
          <p className="text-steel-gray">Loading timeline...</p>
        </div>
      </div>
    )
  }

  if (!timeline) {
    return (
      <div className="text-center py-12">
        <p className="text-steel-gray">Timeline not available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-dark-gray mb-2">Program Timeline</h3>
        <p className="text-steel-gray text-sm">
          Track your progress through the partner program milestones and expected growth timeline.
        </p>
      </div>

      {/* Timeline Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-theme-blue/10 border border-theme-blue/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-theme-blue mr-2" />
            <span className="text-sm font-medium text-theme-blue">Total Duration</span>
          </div>
          <p className="text-xl font-bold text-theme-blue">{timeline.totalDuration}</p>
        </div>

        <div className="bg-theme-green/10 border border-theme-green/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-5 h-5 text-theme-green mr-2" />
            <span className="text-sm font-medium text-theme-green">Expected Growth</span>
          </div>
          <p className="text-xl font-bold text-theme-green">{timeline.expectedGrowth}</p>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex space-x-2">
        <button
          onClick={() => setViewMode('timeline')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'timeline'
              ? 'bg-theme-blue text-white'
              : 'bg-gray-100 text-steel-gray hover:bg-gray-200'
          }`}
        >
          Timeline View
        </button>
        <button
          onClick={() => setViewMode('ladder')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'ladder'
              ? 'bg-theme-blue text-white'
              : 'bg-gray-100 text-steel-gray hover:bg-gray-200'
          }`}
        >
          Ladder View
        </button>
      </div>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-light-gray"></div>
          
          <div className="space-y-6">
            {timeline.milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative flex items-start space-x-4">
                {/* Milestone Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(milestone.status)}`}>
                  {getStatusIcon(milestone.status)}
                </div>

                {/* Milestone Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-light-gray rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-dark-gray">{milestone.title}</h4>
                      <span className="text-sm text-steel-gray bg-gray-100 px-2 py-1 rounded">
                        {milestone.timeEstimate}
                      </span>
                    </div>
                    
                    <p className="text-steel-gray mb-3">{milestone.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-theme-blue" />
                      <span className="text-sm font-medium text-theme-blue">{milestone.kpi}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ladder View */}
      {viewMode === 'ladder' && (
        <div className="space-y-4">
          {timeline.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Ladder Rung */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-theme-blue text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1 bg-white border border-light-gray rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-dark-gray">{milestone.title}</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(milestone.status)}
                      <span className="text-sm text-steel-gray">{milestone.timeEstimate}</span>
                    </div>
                  </div>
                  
                  <p className="text-steel-gray mb-2">{milestone.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-theme-blue" />
                    <span className="text-sm font-medium text-theme-blue">{milestone.kpi}</span>
                  </div>
                </div>
              </div>

              {/* Ladder Connector */}
              {index < timeline.milestones.length - 1 && (
                <div className="absolute left-4 top-12 w-0.5 h-4 bg-light-gray"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Progress Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-dark-gray mb-4">Progress Summary</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-theme-green mb-1">
              {timeline.milestones.filter(m => m.status === 'completed').length}
            </div>
            <div className="text-sm text-steel-gray">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-theme-blue mb-1">
              {timeline.milestones.filter(m => m.status === 'in-progress').length}
            </div>
            <div className="text-sm text-steel-gray">In Progress</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-steel-gray mb-1">
              {timeline.milestones.filter(m => m.status === 'pending').length}
            </div>
            <div className="text-sm text-steel-gray">Pending</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-steel-gray mb-2">
            <span>Overall Progress</span>
            <span>
              {Math.round((timeline.milestones.filter(m => m.status === 'completed').length / timeline.milestones.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-theme-blue h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(timeline.milestones.filter(m => m.status === 'completed').length / timeline.milestones.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
