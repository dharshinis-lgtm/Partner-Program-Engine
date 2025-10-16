'use client'

import { useState, useEffect } from 'react'
import { useAssessmentStore } from '@/lib/store'
import { ROIData, ROICalculation } from '@/lib/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { DollarSign, TrendingUp, Calendar, Target } from 'lucide-react'

interface ROICalculatorProps {
  programId: string
}

export default function ROICalculator({ programId }: ROICalculatorProps) {
  const { roiData, updateROIData } = useAssessmentStore()
  const [data, setData] = useState<ROIData>({
    averageDealSize: 10000,
    partnerMargin: 20,
    monthlyDealVolume: 5,
    enablementCost: 5000,
    onboardingCost: 2000,
    mdfAllocation: 10000,
    contractDuration: 12,
    ...roiData
  })
  
  const [calculation, setCalculation] = useState<ROICalculation | null>(null)

  useEffect(() => {
    calculateROI()
  }, [data])

  const calculateROI = () => {
    const monthlyRevenue = (data.averageDealSize * data.partnerMargin / 100) * data.monthlyDealVolume
    const monthlyCosts = (data.enablementCost + data.onboardingCost) / data.contractDuration
    const monthlyProfit = monthlyRevenue - monthlyCosts
    
    // Calculate break-even point
    const totalInitialCosts = data.enablementCost + data.onboardingCost
    const breakEvenPoint = totalInitialCosts / monthlyProfit
    
    // Calculate 12-month ROI
    const total12MonthRevenue = monthlyRevenue * 12
    const total12MonthCosts = data.enablementCost + data.onboardingCost + (monthlyCosts * 12)
    const roi12Months = ((total12MonthRevenue - total12MonthCosts) / total12MonthCosts) * 100
    
    // Generate cumulative data for chart
    const cumulativeData = []
    let cumulativeRevenue = 0
    let cumulativeCosts = data.enablementCost + data.onboardingCost
    
    for (let month = 1; month <= data.contractDuration; month++) {
      cumulativeRevenue += monthlyRevenue
      cumulativeCosts += monthlyCosts
      cumulativeData.push({
        month,
        revenue: cumulativeRevenue,
        costs: cumulativeCosts,
        profit: cumulativeRevenue - cumulativeCosts
      })
    }
    
    const result: ROICalculation = {
      breakEvenPoint: Math.ceil(breakEvenPoint),
      roi12Months: Math.round(roi12Months * 100) / 100,
      netProfit: Math.round((monthlyRevenue - monthlyCosts) * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
      monthlyCosts: Math.round(monthlyCosts * 100) / 100,
      cumulativeData
    }
    
    setCalculation(result)
    updateROIData(data)
  }

  const handleInputChange = (field: keyof ROIData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-dark-gray mb-2">ROI Calculator</h3>
        <p className="text-steel-gray text-sm">
          Adjust the inputs below to calculate your potential return on investment for this partner program.
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Average Deal Size ($)
          </label>
          <input
            type="number"
            value={data.averageDealSize}
            onChange={(e) => handleInputChange('averageDealSize', Number(e.target.value))}
            className="input-field w-full"
            min="0"
            step="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Partner Margin (%)
          </label>
          <input
            type="number"
            value={data.partnerMargin}
            onChange={(e) => handleInputChange('partnerMargin', Number(e.target.value))}
            className="input-field w-full"
            min="0"
            max="100"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Monthly Deal Volume
          </label>
          <input
            type="number"
            value={data.monthlyDealVolume}
            onChange={(e) => handleInputChange('monthlyDealVolume', Number(e.target.value))}
            className="input-field w-full"
            min="0"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Enablement Cost ($)
          </label>
          <input
            type="number"
            value={data.enablementCost}
            onChange={(e) => handleInputChange('enablementCost', Number(e.target.value))}
            className="input-field w-full"
            min="0"
            step="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Onboarding Cost ($)
          </label>
          <input
            type="number"
            value={data.onboardingCost}
            onChange={(e) => handleInputChange('onboardingCost', Number(e.target.value))}
            className="input-field w-full"
            min="0"
            step="1000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-gray mb-2">
            MDF Allocation ($)
          </label>
          <input
            type="number"
            value={data.mdfAllocation}
            onChange={(e) => handleInputChange('mdfAllocation', Number(e.target.value))}
            className="input-field w-full"
            min="0"
            step="1000"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-dark-gray mb-2">
            Contract Duration (months)
          </label>
          <input
            type="number"
            value={data.contractDuration}
            onChange={(e) => handleInputChange('contractDuration', Number(e.target.value))}
            className="input-field w-full"
            min="1"
            step="1"
          />
        </div>
      </div>

      {/* Results */}
      {calculation && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-theme-green/10 border border-theme-green/20 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-theme-green mr-2" />
                <span className="text-sm font-medium text-theme-green">Break-Even Point</span>
              </div>
              <p className="text-2xl font-bold text-theme-green">
                {calculation.breakEvenPoint} months
              </p>
            </div>

            <div className="bg-theme-blue/10 border border-theme-blue/20 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-theme-blue mr-2" />
                <span className="text-sm font-medium text-theme-blue">12-Month ROI</span>
              </div>
              <p className="text-2xl font-bold text-theme-blue">
                {formatPercentage(calculation.roi12Months)}
              </p>
            </div>

            <div className="bg-theme-yellow/10 border border-theme-yellow/20 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-theme-yellow mr-2" />
                <span className="text-sm font-medium text-theme-yellow">Monthly Profit</span>
              </div>
              <p className="text-2xl font-bold text-theme-yellow">
                {formatCurrency(calculation.netProfit)}
              </p>
            </div>
          </div>

          {/* Revenue vs Costs Chart */}
          <div className="bg-white border border-light-gray rounded-lg p-6">
            <h4 className="text-lg font-semibold text-dark-gray mb-4">Revenue vs Costs Over Time</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={calculation.cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    tickFormatter={(value) => `Month ${value}`}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value), 
                      name === 'revenue' ? 'Revenue' : name === 'costs' ? 'Costs' : 'Profit'
                    ]}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#55af68" 
                    strokeWidth={3}
                    dot={{ fill: '#55af68', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="costs" 
                    stroke="#ea5a54" 
                    strokeWidth={3}
                    dot={{ fill: '#ea5a54', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#5d5ff3" 
                    strokeWidth={3}
                    dot={{ fill: '#5d5ff3', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-white border border-light-gray rounded-lg p-6">
            <h4 className="text-lg font-semibold text-dark-gray mb-4">Monthly Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-dark-gray mb-2">Revenue</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-steel-gray">Monthly Revenue:</span>
                    <span className="font-medium">{formatCurrency(calculation.monthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel-gray">Annual Revenue:</span>
                    <span className="font-medium">{formatCurrency(calculation.monthlyRevenue * 12)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-dark-gray mb-2">Costs</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-steel-gray">Monthly Costs:</span>
                    <span className="font-medium">{formatCurrency(calculation.monthlyCosts)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel-gray">Annual Costs:</span>
                    <span className="font-medium">{formatCurrency(calculation.monthlyCosts * 12)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
