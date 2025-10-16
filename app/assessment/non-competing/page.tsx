'use client'

import { useEffect } from 'react'
import { useAssessmentStore } from '@/lib/store'
import DynamicForm from '@/components/forms/DynamicForm'

export default function NonCompetingAssessment() {
  const { setScenario } = useAssessmentStore()

  useEffect(() => {
    setScenario('non-competing')
  }, [setScenario])

  return <DynamicForm scenario="non-competing" />
}
