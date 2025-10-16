'use client'

import { useState, useEffect } from 'react'
import { useAssessmentStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Filter, BarChart3, TrendingUp, Users, Clock, CheckCircle, Star, ExternalLink } from 'lucide-react'
import MatchCard from '@/components/results/MatchCard'
import FilterSidebar from '@/components/results/FilterSidebar'
import CompanyProfileDrawer from '@/components/results/CompanyProfileDrawer'

export default function ResultsPage() {
  const router = useRouter()
  const { matches, selectedPrograms, toggleProgramSelection } = useAssessmentStore()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'score' | 'maturity' | 'health' | 'marketPresence'>('score')
  const [filteredMatches, setFilteredMatches] = useState(matches)

  useEffect(() => {
    if (matches.length === 0) {
      router.push('/assessment')
    }
  }, [matches, router])

  useEffect(() => {
    // Apply sorting
    const sorted = [...matches].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score
        case 'maturity':
          const maturityOrder = { 'Startup': 1, 'Scaleup': 2, 'Enterprise': 3 }
          return maturityOrder[b.maturity as keyof typeof maturityOrder] - maturityOrder[a.maturity as keyof typeof maturityOrder]
        case 'health':
          return b.health - a.health
        case 'marketPresence':
          return b.marketPresence - a.marketPresence
        default:
          return 0
      }
    })
    setFilteredMatches(sorted)
  }, [matches, sortBy])

  const handleProgramClick = (programId: string) => {
    setSelectedProgram(programId)
  }

  const handleCompare = () => {
    if (selectedPrograms.length >= 2) {
      router.push(`/compare?programs=${selectedPrograms.join(',')}`)
    }
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-gray mb-4">No Results Found</h2>
          <p className="text-steel-gray mb-8">Please complete an assessment to see your matches.</p>
          <button
            onClick={() => router.push('/assessment')}
            className="btn-primary"
          >
            Start Assessment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-dark-gray hover:text-theme-blue transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
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
              {filteredMatches.length} matches found
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-gray mb-2">
              Your Partner Program Matches
            </h1>
            <p className="text-steel-gray">
              Based on your assessment, we've found {filteredMatches.length} partner programs that align with your goals.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-field"
              >
                <option value="score">Sort by Fit Score</option>
                <option value="maturity">Sort by Maturity</option>
                <option value="health">Sort by Health</option>
                <option value="marketPresence">Sort by Market Presence</option>
              </select>
            </div>

            {selectedPrograms.length >= 2 && (
              <button
                onClick={handleCompare}
                className="btn-primary flex items-center"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare Selected ({selectedPrograms.length})
              </button>
            )}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((program) => (
              <MatchCard
                key={program.id}
                program={program}
                isSelected={selectedPrograms.includes(program.id)}
                onSelect={() => toggleProgramSelection(program.id)}
                onClick={() => handleProgramClick(program.id)}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">No matches found</h3>
              <p className="text-steel-gray mb-4">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="btn-primary"
              >
                Adjust Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Filter Sidebar */}
      {showFilters && (
        <FilterSidebar
          onClose={() => setShowFilters(false)}
          onApplyFilters={(filters) => {
            // Apply filters logic here
            setShowFilters(false)
          }}
        />
      )}

      {/* Company Profile Drawer */}
      {selectedProgram && (
        <CompanyProfileDrawer
          programId={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  )
}
