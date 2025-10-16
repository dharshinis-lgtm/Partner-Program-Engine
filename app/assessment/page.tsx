'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AssessmentPage() {
  const router = useRouter()
  useEffect(() => {
    // Skip this intermediate page and go directly to non-competing assessment
    router.replace('/assessment/non-competing')
  }, [router])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-dark-gray hover:text-theme-blue transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-light-gray"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dark-gray rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">22</span>
                </div>
                <span className="text-xl font-bold text-dark-gray">SaaS</span>
              </div>
            </div>
            <div className="text-sm text-steel-gray">
              Matchmaker AI Assessment
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark-gray mb-4">
              Partnership Assessment
            </h1>
            <p className="text-xl text-steel-gray max-w-2xl mx-auto">
              Answer a few questions to personalize partner program recommendations.
            </p>
          </div>

            <div className="text-center text-steel-gray">Redirecting to assessment...</div>
        </div>
      </main>
    </div>
  )
}
