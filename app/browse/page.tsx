'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Search, Filter, Grid, List, Star, TrendingUp, Users, Clock } from 'lucide-react'
import { PartnerProgram } from '@/lib/types'
import CompanyProfileDrawer from '@/components/results/CompanyProfileDrawer'

export default function BrowseProgramsPage() {
  const router = useRouter()
  const [programs, setPrograms] = useState<PartnerProgram[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<PartnerProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    category: '',
    maturity: '',
    geography: '',
    partnerType: ''
  })

  useEffect(() => {
    fetchPrograms()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [programs, searchTerm, filters])

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs')
      if (response.ok) {
        const data = await response.json()
        setPrograms(data.programs)
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...programs]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(program => program.category === filters.category)
    }

    // Maturity filter
    if (filters.maturity) {
      filtered = filtered.filter(program => program.maturity === filters.maturity)
    }

    // Geography filter
    if (filters.geography) {
      filtered = filtered.filter(program => program.geography.includes(filters.geography))
    }

    // Partner type filter
    if (filters.partnerType) {
      filtered = filtered.filter(program => program.partnerTypes.includes(filters.partnerType))
    }

    setFilteredPrograms(filtered)
  }

  const handleProgramClick = (programId: string) => {
    setSelectedProgram(programId)
  }

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'Enterprise': return 'text-theme-blue bg-theme-blue/10'
      case 'Scaleup': return 'text-theme-green bg-theme-green/10'
      case 'Startup': return 'text-theme-yellow bg-theme-yellow/10'
      default: return 'text-steel-gray bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-blue mx-auto mb-4"></div>
          <p className="text-steel-gray">Loading programs...</p>
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
              {filteredPrograms.length} programs available
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dark-gray mb-2">
              Browse Partner Programs
            </h1>
            <p className="text-steel-gray">
              Explore our comprehensive database of SaaS partner programs and find the perfect fit for your business.
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-steel-gray" />
              <input
                type="text"
                placeholder="Search programs by vendor, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field w-full pl-10"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>

              <div className="flex border border-light-gray rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-theme-blue text-white' : 'text-steel-gray hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-theme-blue text-white' : 'text-steel-gray hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Sidebar */}
          {showFilters && (
            <div className="mb-8 bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Categories</option>
                    <option value="Marketing and Advertising">Marketing and Advertising</option>
                    <option value="AI and Machine Learning">AI and Machine Learning</option>
                    <option value="Business Intelligence & Analytics">Business Intelligence & Analytics</option>
                    <option value="CRM and Sales Tools">CRM and Sales Tools</option>
                    <option value="Cloud Solutions & Storage">Cloud Solutions & Storage</option>
                    <option value="Customer Service & Support">Customer Service & Support</option>
                    <option value="eCommerce">eCommerce</option>
                    <option value="Finance & Accounting">Finance & Accounting</option>
                    <option value="Human Resources (HR)">Human Resources (HR)</option>
                    <option value="Project & Task Management">Project & Task Management</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Security & Identity Management">Security & Identity Management</option>
                    <option value="Media & Design">Media & Design</option>
                    <option value="Specialized Software">Specialized Software</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">Maturity</label>
                  <select
                    value={filters.maturity}
                    onChange={(e) => setFilters(prev => ({ ...prev, maturity: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Maturity Levels</option>
                    <option value="Startup">Startup</option>
                    <option value="Scaleup">Scaleup</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">Geography</label>
                  <select
                    value={filters.geography}
                    onChange={(e) => setFilters(prev => ({ ...prev, geography: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Regions</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Latin America">Latin America</option>
                    <option value="Middle East & Africa">Middle East & Africa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-gray mb-2">Partner Type</label>
                  <select
                    value={filters.partnerType}
                    onChange={(e) => setFilters(prev => ({ ...prev, partnerType: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Partner Types</option>
                    <option value="Reseller">Reseller</option>
                    <option value="System Integrator (SI)">System Integrator (SI)</option>
                    <option value="Independent Software Vendor (ISV)">Independent Software Vendor (ISV)</option>
                    <option value="Technology Partner">Technology Partner</option>
                    <option value="Channel Partner">Channel Partner</option>
                    <option value="Solution Provider">Solution Provider</option>
                    <option value="Consulting Partner">Consulting Partner</option>
                    <option value="Referral Partner">Referral Partner</option>
                  </select>
                </div>

                
              </div>
            </div>
          )}

          {/* Programs Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  onClick={() => handleProgramClick(program.id)}
                  className="bg-white border border-light-gray rounded-lg p-6 cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  {/* Header */}
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

                  

                  {/* Summary */}
                  <p className="text-sm text-steel-gray mb-4 line-clamp-3">
                    {program.summary}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-steel-gray">Category</span>
                      <span className="font-medium text-dark-gray">{program.category}</span>
                    </div>
                    {program.broaderCategory && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-steel-gray">Broader Category</span>
                        <span className="font-medium text-dark-gray">{program.broaderCategory}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-steel-gray">Commission</span>
                      <span className="font-medium text-dark-gray">{program.commissionModel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-steel-gray">Onboarding</span>
                      <span className="font-medium text-dark-gray">{program.onboardingTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  onClick={() => handleProgramClick(program.id)}
                  className="bg-white border border-light-gray rounded-lg p-6 cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-dark-gray">
                        {program.vendor.charAt(0)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-dark-gray">{program.vendor}</h3>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getMaturityColor(program.maturity)}`}>
                          {program.maturity}
                        </span>
                      </div>
                      
                      <p className="text-steel-gray mb-3">{program.summary}</p>
                      
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-theme-yellow" />
                          <span className="text-steel-gray">Reputation Index: {program.health}/5</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-theme-blue" />
                          <span className="text-steel-gray">Market Presence: {program.marketPresence}/5</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-theme-green" />
                          <span className="text-steel-gray">{program.onboardingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">No programs found</h3>
              <p className="text-steel-gray mb-4">
                Try adjusting your search terms or filters to find more programs.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilters({
                    category: '',
                    maturity: '',
                    geography: '',
                    partnerType: ''
                  })
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

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
