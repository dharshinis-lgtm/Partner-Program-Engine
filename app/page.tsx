'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search, BarChart3, Clock, Users, Target, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-dark-gray rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">22</span>
                </div>
                <span className="text-xl font-bold text-dark-gray">SaaS</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/projects" className="text-dark-gray hover:text-theme-blue transition-colors">
                Projects
              </Link>
              <Link href="/events" className="text-dark-gray hover:text-theme-blue transition-colors">
                Events
              </Link>
              <div className="relative group">
                <button className="text-dark-gray hover:text-theme-blue transition-colors flex items-center">
                  Grow with us
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </nav>

            {/* Sign In Button */}
            <button className="btn-primary">
              Sign In
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-dark-gray"></div>
                <div className="w-full h-0.5 bg-dark-gray"></div>
                <div className="w-full h-0.5 bg-dark-gray"></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-dark-gray mb-6">
            The Partner Program Engine
          </h1>
          <h2 className="text-4xl md:text-4xl font-bold text-dark-gray mb-6">
             Find, Compare, and Connect
          </h2>
          <p className="text-xl text-steel-gray mb-12 max-w-3xl mx-auto">
            Discover new partnership opportunities, and calculate ROI instantly--connect with the right partner and elevate your buisness in minutes, not months.                       
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/assessment" className="btn-primary text-lg px-8 py-4">
              Find My Winning Program
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/browse" className="btn-secondary text-lg px-8 py-4">
              Check Out All Listings
              <Search className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* How it works section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-dark-gray mb-12">The Journey</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-theme-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">01</span>
                </div>
                <h3 className="text-xl font-bold text-theme-blue mb-3">Fit Assessment</h3>
                <p className="text-steel-gray">
                  Pinpoint your needs and get matched to the right opportunities instantly.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-theme-red rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">02</span>
                </div>
                <h3 className="text-xl font-bold text-theme-red mb-3">Smart Partnership Match</h3>
                <p className="text-steel-gray">
                  Powered by AI, get instant recommendations for your top partnership opportunities globally.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-theme-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">03</span>
                </div>
                <h3 className="text-xl font-bold text-theme-yellow mb-3">Growth & ROI Timeline</h3>
                <p className="text-steel-gray">
                  Project your partnership ROI and key milestones before you commit --make every choice data-driven.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-gray mb-4">Why Choose the Partner Program Engine</h2>
            <p className="text-xl text-steel-gray max-w-3xl mx-auto">
             Accelerate your next partnership with instant insights and comparisons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-theme-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-theme-blue" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">Smart Matching</h3>
              <p className="text-steel-gray">
                AI-powered algorithm matches you with partner programs based on your specific needs and goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-theme-green/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-theme-green" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">ROI Analysis</h3>
              <p className="text-steel-gray">
                Get detailed ROI projections and break-even analysis for each potential partnership.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-theme-yellow/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-theme-yellow" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">Timeline Planning</h3>
              <p className="text-steel-gray">
                Visualize program milestones and expected growth timeline for better planning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-theme-red/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-theme-red" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">Comprehensive Database</h3>
              <p className="text-steel-gray">
                Access detailed profiles of hundreds of SaaS partner programs with real-time data.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-royal-blue/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-royal-blue" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">Benchmark Analysis</h3>
              <p className="text-steel-gray">
                Compare programs side-by-side and benchmark against industry standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm card-hover">
              <div className="w-12 h-12 bg-midnight-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-midnight-blue" />
              </div>
              <h3 className="text-lg font-semibold text-dark-gray mb-2">Advanced Filtering</h3>
              <p className="text-steel-gray">
                Filter programs by geography, partner type, compliance requirements, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-midnight-blue font-bold text-sm">22</span>
                </div>
                <span className="text-xl font-bold">SaaS</span>
              </div>
              <p className="text-gray-300 mb-4">Follow us on</p>
              <div className="flex space-x-4">
                {/* Social icons would go here */}
                <div className="w-6 h-6 border border-gray-300 rounded"></div>
                <div className="w-6 h-6 border border-gray-300 rounded"></div>
                <div className="w-6 h-6 border border-gray-300 rounded"></div>
                <div className="w-6 h-6 border border-gray-300 rounded"></div>
                <div className="w-6 h-6 border border-gray-300 rounded"></div>
              </div>
              <p className="text-gray-300 mt-4 text-sm">
                8 The Green Dover, Delaware 19901, United States
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About us</Link></li>
                <li><Link href="/vendors" className="text-gray-300 hover:text-white transition-colors">For Software Vendors</Link></li>
                <li><Link href="/partners" className="text-gray-300 hover:text-white transition-colors">For Channel Partners</Link></li>
                <li><Link href="/events" className="text-gray-300 hover:text-white transition-colors">Events</Link></li>
                <li><Link href="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/wall-of-love" className="text-gray-300 hover:text-white transition-colors">Wall of love</Link></li>
              </ul>
            </div>

            {/* Help & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact us</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms and conditions</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              Copyright © SaaS22 Inc. 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
