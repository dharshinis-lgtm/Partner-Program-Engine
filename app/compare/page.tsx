'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ArrowLeft, Check, Star, TrendingUp, Clock } from 'lucide-react'
import { PartnerProgram } from '@/lib/types'

export default function ComparePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [programs, setPrograms] = useState<PartnerProgram[]>([])
  const ids = useMemo(() => (searchParams.get('programs') || '').split(',').filter(Boolean), [searchParams])

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const fetched: PartnerProgram[] = []
        for (const id of ids) {
          const res = await fetch(`/api/program-details/${id}`)
          if (res.ok) {
            const data = await res.json()
            fetched.push(data as PartnerProgram)
          }
        }
        setPrograms(fetched)
      } catch (e) {
        console.error('Failed to fetch programs for comparison', e)
      }
    }
    if (ids.length >= 2) fetchPrograms()
  }, [ids])

  if (ids.length < 2) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark-gray mb-2">Select at least two programs</h2>
          <p className="text-steel-gray mb-6">Return to results and pick two or more programs to compare.</p>
          <button onClick={() => router.back()} className="btn-primary">Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => router.back()} className="flex items-center text-dark-gray hover:text-theme-blue transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />Back
            </button>
            <div className="text-sm text-steel-gray">Comparing {programs.length} programs</div>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-dark-gray mb-6">Side-by-Side Comparison</h1>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-light-gray rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-dark-gray w-56">Attribute</th>
                  {programs.map(p => (
                    <th key={p.id} className="text-left p-4 text-sm font-semibold text-dark-gray min-w-[240px]">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <span className="font-bold text-dark-gray">{p.vendor.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-base font-semibold text-dark-gray">{p.vendor}</div>
                          <div className="text-xs text-steel-gray">{p.category}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: 'maturity', label: 'Maturity' },
                  { key: 'commissionModel', label: 'Commission Model' },
                  { key: 'onboardingTime', label: 'Onboarding Time' },
                  { key: 'supportLevel', label: 'Support Level' },
                  { key: 'partnerTypes', label: 'Partner Types' },
                  { key: 'geography', label: 'Available Regions' },
                  { key: 'compliance', label: 'Compliance' },
                ].map(row => (
                  <tr key={row.key} className="border-t border-light-gray align-top">
                    <td className="p-4 text-sm font-medium text-dark-gray bg-gray-50">{row.label}</td>
                    {programs.map(p => (
                      <td key={p.id} className="p-4 text-sm text-dark-gray">
                        {Array.isArray((p as any)[row.key]) ? (
                          <div className="flex flex-wrap gap-2">
                            {(p as any)[row.key].map((v: string) => (
                              <span key={v} className="px-2 py-1 rounded-full bg-gray-100 text-steel-gray text-xs">{v}</span>
                            ))}
                          </div>
                        ) : (
                          <span>{(p as any)[row.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Ratings Row */}
                <tr className="border-t border-light-gray">
                  <td className="p-4 text-sm font-medium text-dark-gray bg-gray-50">Ratings</td>
                  {programs.map(p => (
                    <td key={p.id} className="p-4 text-sm text-dark-gray">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-theme-yellow" />
                          <span className="text-steel-gray">Reputation Index: {p.health}/5</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-theme-blue" />
                          <span className="text-steel-gray">Market Presence: {p.marketPresence}/5</span>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}


