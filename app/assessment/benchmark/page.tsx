'use client'

import { useEffect } from 'react'
import { useAssessmentStore } from '@/lib/store'
import DynamicForm from '@/components/forms/DynamicForm'

export default function BenchmarkAssessment() {
  const { setScenario } = useAssessmentStore()

  useEffect(() => {
    setScenario('benchmark')
  }, [setScenario])

  return <DynamicForm scenario="benchmark" />
}
