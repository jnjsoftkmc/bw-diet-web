import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'

interface ProfileStepProps {
  onNext: () => void
  onBack: () => void
}

const ProfileStep = ({ onNext, onBack }: ProfileStepProps) => {
  const { setProfile } = useUserStore()
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'female' as 'male' | 'female',
    height: '',
    currentWeight: '',
    activityLevel: 'moderate' as const
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요'
    if (!formData.age || parseInt(formData.age) < 15 || parseInt(formData.age) > 100) {
      newErrors.age = '15-100세 사이의 나이를 입력해주세요'
    }
    if (!formData.height || parseInt(formData.height) < 100 || parseInt(formData.height) > 250) {
      newErrors.height = '100-250cm 사이의 키를 입력해주세요'
    }
    if (!formData.currentWeight || parseInt(formData.currentWeight) < 30 || parseInt(formData.currentWeight) > 300) {
      newErrors.currentWeight = '30-300kg 사이의 체중을 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setProfile({
        name: formData.name.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        height: parseInt(formData.height),
        currentWeight: parseInt(formData.currentWeight),
        activityLevel: formData.activityLevel,
      })
      onNext()
    }
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">기본 정보 입력</h2>
        <p className="text-gray-600 mt-2">
          정확한 계산을 위해 개인 정보를 입력해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label">이름</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="이름을 입력하세요"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Age & Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">나이</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className={`input-field ${errors.age ? 'border-red-500' : ''}`}
              placeholder="25"
              min="15"
              max="100"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          <div>
            <label className="label">성별</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              className="input-field"
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </div>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">키 (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              className={`input-field ${errors.height ? 'border-red-500' : ''}`}
              placeholder="160"
              min="100"
              max="250"
            />
            {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
          </div>

          <div>
            <label className="label">현재 체중 (kg)</label>
            <input
              type="number"
              value={formData.currentWeight}
              onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
              className={`input-field ${errors.currentWeight ? 'border-red-500' : ''}`}
              placeholder="60"
              min="30"
              max="300"
            />
            {errors.currentWeight && <p className="text-red-500 text-sm mt-1">{errors.currentWeight}</p>}
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="label">활동 수준</label>
          <select
            value={formData.activityLevel}
            onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
            className="input-field"
          >
            <option value="sedentary">거의 운동하지 않음</option>
            <option value="light">가벼운 운동 (주 1-3회)</option>
            <option value="moderate">보통 운동 (주 3-5회)</option>
            <option value="active">활발한 운동 (주 6-7회)</option>
            <option value="very_active">매우 활발함 (하루 2회 이상)</option>
          </select>
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
            다음
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileStep