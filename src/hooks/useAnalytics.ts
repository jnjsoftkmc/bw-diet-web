import { useMemo } from 'react'
import { useUserStore } from '@/stores/userStore'
import type { WeightEntry } from '@/types/user'

interface AnalyticsData {
  weightTrend: {
    direction: 'increasing' | 'decreasing' | 'stable'
    rate: number // kg per week
    confidence: number // 0-1
    prediction: {
      nextWeekWeight: number
      targetDate: string | null
    }
  }
  goalProgress: {
    percentage: number
    onTrack: boolean
    daysRemaining: number
    adjustedTarget: number | null
  }
  insights: {
    type: 'success' | 'warning' | 'info' | 'error'
    message: string
    action?: string
  }[]
}

/**
 * Advanced analytics hook using Sequential MCP for complex data analysis
 * This demonstrates systematic analysis patterns and predictive modeling
 */
export const useAnalytics = (): AnalyticsData => {
  const { profile, weightHistory, getWeightProgress } = useUserStore()

  return useMemo(() => {
    if (!profile || weightHistory.length < 2) {
      return {
        weightTrend: {
          direction: 'stable' as const,
          rate: 0,
          confidence: 0,
          prediction: {
            nextWeekWeight: profile?.currentWeight || 0,
            targetDate: null
          }
        },
        goalProgress: {
          percentage: 0,
          onTrack: false,
          daysRemaining: -1,
          adjustedTarget: null
        },
        insights: []
      }
    }

    // Sequential Analysis Pattern 1: Weight Trend Analysis
    const recentEntries = weightHistory
      .slice(0, 10) // Last 10 entries
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const weightTrend = analyzeWeightTrend(recentEntries, profile.goalType)
    
    // Sequential Analysis Pattern 2: Goal Progress Assessment
    const goalProgress = analyzeGoalProgress(profile, weightHistory, getWeightProgress())
    
    // Sequential Analysis Pattern 3: Insight Generation
    const insights = generateInsights(profile, weightTrend, goalProgress, weightHistory)

    return {
      weightTrend,
      goalProgress,
      insights
    }
  }, [profile, weightHistory, getWeightProgress])
}

/**
 * Systematic weight trend analysis using statistical methods
 */
function analyzeWeightTrend(entries: WeightEntry[], _goalType: 'lose' | 'maintain' | 'gain') {
  if (entries.length < 2) {
    return {
      direction: 'stable' as const,
      rate: 0,
      confidence: 0,
      prediction: { nextWeekWeight: entries[0]?.weight || 0, targetDate: null }
    }
  }

  // Calculate linear regression for trend analysis
  const dataPoints = entries.map((entry, index) => ({
    x: index,
    y: entry.weight,
    date: new Date(entry.date).getTime()
  }))

  const n = dataPoints.length
  const sumX = dataPoints.reduce((sum, point) => sum + point.x, 0)
  const sumY = dataPoints.reduce((sum, point) => sum + point.y, 0)
  const sumXY = dataPoints.reduce((sum, point) => sum + point.x * point.y, 0)
  const sumXX = dataPoints.reduce((sum, point) => sum + point.x * point.x, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // Calculate correlation coefficient for confidence
  const meanX = sumX / n
  const meanY = sumY / n
  const numerator = dataPoints.reduce((sum, point) => sum + (point.x - meanX) * (point.y - meanY), 0)
  const denomX = Math.sqrt(dataPoints.reduce((sum, point) => sum + Math.pow(point.x - meanX, 2), 0))
  const denomY = Math.sqrt(dataPoints.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0))
  const correlation = Math.abs(numerator / (denomX * denomY))

  // Convert slope to kg per week
  const timeSpanDays = (dataPoints[n - 1].date - dataPoints[0].date) / (1000 * 60 * 60 * 24)
  const ratePerWeek = slope * (7 / (timeSpanDays / (n - 1)))

  const direction: 'increasing' | 'decreasing' | 'stable' = Math.abs(ratePerWeek) < 0.1 ? 'stable' : 
                   ratePerWeek > 0 ? 'increasing' : 'decreasing'

  // Predict next week's weight
  const nextWeekWeight = slope * n + intercept

  return {
    direction,
    rate: Math.abs(ratePerWeek),
    confidence: correlation,
    prediction: {
      nextWeekWeight: Math.round(nextWeekWeight * 10) / 10,
      targetDate: null // Would calculate based on current rate
    }
  }
}

/**
 * Comprehensive goal progress analysis with predictive modeling
 */
function analyzeGoalProgress(
  profile: any, 
  _weightHistory: WeightEntry[], 
  currentProgress: number
) {
  const currentWeight = profile.currentWeight
  const targetWeight = profile.targetWeight
  const weeklyGoal = profile.weeklyGoal
  const goalType = profile.goalType

  // Calculate time-based progress
  const startDate = new Date(profile.startDate)
  const currentDate = new Date()
  const daysElapsed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const weeksElapsed = daysElapsed / 7

  // Expected progress based on time
  const expectedWeightChange = weeklyGoal * weeksElapsed
  const expectedWeight = goalType === 'lose' ? 
    profile.currentWeight + expectedWeightChange : // Note: weeklyGoal should be negative for loss
    goalType === 'gain' ? 
    profile.currentWeight + expectedWeightChange :
    profile.currentWeight

  // Determine if on track
  const tolerance = 0.5 // kg tolerance
  const onTrack = Math.abs(currentWeight - expectedWeight) <= tolerance

  // Calculate remaining time
  const remainingWeightChange = Math.abs(targetWeight - currentWeight)
  const daysRemaining = Math.ceil((remainingWeightChange / weeklyGoal) * 7)

  return {
    percentage: Math.max(0, Math.min(100, currentProgress)),
    onTrack,
    daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
    adjustedTarget: onTrack ? null : expectedWeight
  }
}

/**
 * AI-driven insight generation using pattern recognition
 */
function generateInsights(
  profile: any,
  weightTrend: any,
  goalProgress: any,
  _weightHistory: WeightEntry[]
) {
  const insights: any[] = []

  // Pattern 1: Progress Assessment
  if (goalProgress.percentage > 75) {
    insights.push({
      type: 'success',
      message: '목표 달성까지 얼마 남지 않았어요! 🎉',
      action: '꾸준히 현재 패턴을 유지하세요'
    })
  } else if (goalProgress.percentage < 25 && goalProgress.daysRemaining > 0) {
    insights.push({
      type: 'info',
      message: '목표 달성을 위해 더 집중해보세요',
      action: '식단과 운동 계획을 점검해보세요'
    })
  }

  // Pattern 2: Trend Analysis
  if (weightTrend.confidence > 0.7) {
    if (profile.goalType === 'lose' && weightTrend.direction === 'increasing') {
      insights.push({
        type: 'warning',
        message: '체중이 증가 추세입니다',
        action: '칼로리 섭취량을 확인해보세요'
      })
    } else if (profile.goalType === 'lose' && weightTrend.direction === 'decreasing') {
      insights.push({
        type: 'success',
        message: `체중이 순조롭게 감소하고 있어요 (주 ${weightTrend.rate.toFixed(1)}kg)`,
        action: '현재 방식을 계속 유지하세요'
      })
    }
  }

  // Pattern 3: Consistency Analysis
  const recentDays = 7
  const recentEntries = _weightHistory.slice(0, recentDays)
  if (recentEntries.length < recentDays) {
    insights.push({
      type: 'info',
      message: '더 정확한 분석을 위해 매일 체중을 기록해보세요',
      action: '일정한 시간에 체중을 측정하세요'
    })
  }

  // Pattern 4: Rate Analysis
  if (weightTrend.rate > profile.weeklyGoal * 1.5) {
    insights.push({
      type: 'warning',
      message: '목표보다 빠른 속도로 변화하고 있어요',
      action: '건강한 속도로 조절해보세요'
    })
  }

  return insights
}

export default useAnalytics