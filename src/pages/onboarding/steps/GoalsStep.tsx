import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'

interface GoalsStepProps {
  onNext: () => void
  onBack: () => void
}

const GoalsStep = ({ onNext, onBack }: GoalsStepProps) => {
  const { profile, setProfile, setGoals } = useUserStore()
  
  const [formData, setFormData] = useState({
    goalType: 'lose' as 'lose' | 'maintain' | 'gain',
    targetWeight: profile?.currentWeight?.toString() || '',
    weeklyGoal: '0.5',
    targetDate: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.targetWeight || parseInt(formData.targetWeight) < 30 || parseInt(formData.targetWeight) > 300) {
      newErrors.targetWeight = '30-300kg 사이의 목표 체중을 입력해주세요'
    }
    
    const weeklyGoal = parseFloat(formData.weeklyGoal)
    if (!formData.weeklyGoal || weeklyGoal < 0.1 || weeklyGoal > 2) {
      newErrors.weeklyGoal = '0.1-2kg 사이의 주간 목표를 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Update profile with goal information
      setProfile({
        goalType: formData.goalType,
        targetWeight: parseInt(formData.targetWeight),
        weeklyGoal: parseFloat(formData.weeklyGoal),
        targetDate: formData.targetDate || undefined
      })

      // Set diet goals (will be calculated based on profile)
      if (profile) {
        // This would normally be calculated based on TDEE
        const estimatedCalories = 1800 // Placeholder
        setGoals({
          dailyCalorieTarget: estimatedCalories,
          proteinTarget: Math.round(estimatedCalories * 0.25 / 4), // 25% protein
          carbTarget: Math.round(estimatedCalories * 0.45 / 4), // 45% carbs
          fatTarget: Math.round(estimatedCalories * 0.30 / 9), // 30% fat
          waterTarget: 2000 // 2L
        })
      }

      onNext()
    }
  }

  const goalTypes = [
    {
      value: 'lose',
      label: '체중 감량',
      description: '건강하게 체중을 줄이고 싶어요',
      icon: '📉'
    },
    {
      value: 'maintain',
      label: '체중 유지',
      description: '현재 체중을 유지하고 싶어요',
      icon: '⚖️'
    },
    {
      value: 'gain',
      label: '체중 증량',
      description: '건강하게 체중을 늘리고 싶어요',
      icon: '📈'
    }
  ]

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">목표 설정</h2>
        <p className="text-gray-600 mt-2">
          다이어트 목표를 설정해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Goal Type */}
        <div>
          <label className="label">다이어트 목표</label>
          <div className="grid gap-3">
            {goalTypes.map((goal) => (
              <div key={goal.value}>
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="goalType"
                    value={goal.value}
                    checked={formData.goalType === goal.value}
                    onChange={(e) => setFormData({ ...formData, goalType: e.target.value as any })}
                    className="sr-only"
                  />
                  <div className={`flex items-center space-x-3 ${
                    formData.goalType === goal.value ? 'text-primary-600' : 'text-gray-700'
                  }`}>
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <div className="font-medium">{goal.label}</div>
                      <div className="text-sm text-gray-500">{goal.description}</div>
                    </div>
                  </div>
                  {formData.goalType === goal.value && (
                    <div className="ml-auto">
                      <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                          <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Target Weight */}
        <div>
          <label className="label">목표 체중 (kg)</label>
          <input
            type="number"
            value={formData.targetWeight}
            onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
            className={`input-field ${errors.targetWeight ? 'border-red-500' : ''}`}
            placeholder="55"
            min="30"
            max="300"
          />
          {errors.targetWeight && <p className="text-red-500 text-sm mt-1">{errors.targetWeight}</p>}
        </div>

        {/* Weekly Goal */}
        <div>
          <label className="label">주간 목표 ({formData.goalType === 'lose' ? '감량' : formData.goalType === 'gain' ? '증량' : '유지'})</label>
          <select
            value={formData.weeklyGoal}
            onChange={(e) => setFormData({ ...formData, weeklyGoal: e.target.value })}
            className="input-field"
          >
            <option value="0.25">0.25kg (느린 속도)</option>
            <option value="0.5">0.5kg (권장)</option>
            <option value="0.75">0.75kg (빠른 속도)</option>
            <option value="1">1kg (매우 빠름)</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            건강한 다이어트를 위해 주 0.5kg 이하의 목표를 권장합니다
          </p>
        </div>

        {/* Target Date (Optional) */}
        <div>
          <label className="label">목표 달성 희망일 (선택사항)</label>
          <input
            type="date"
            value={formData.targetDate}
            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 btn-secondary"
          >
            이전
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary"
          >
            완료
          </button>
        </div>
      </form>
    </div>
  )
}

export default GoalsStep