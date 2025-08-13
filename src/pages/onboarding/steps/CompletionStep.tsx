import { useUserStore } from '@/stores/userStore'

interface CompletionStepProps {
  onComplete: () => void
}

const CompletionStep = ({ onComplete }: CompletionStepProps) => {
  const { profile, goals, getBMI } = useUserStore()

  const bmi = getBMI()

  return (
    <div className="card text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Completion Message */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">설정 완료! 🎉</h2>
        <p className="text-gray-600 mt-2">
          {profile?.name}님만의 개인 맞춤 다이어트 계획이 준비되었습니다.
        </p>
      </div>

      {/* Summary */}
      {profile && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">나의 다이어트 정보</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-left">
              <span className="text-gray-500">현재 체중</span>
              <p className="font-medium text-gray-900">{profile.currentWeight}kg</p>
            </div>
            <div className="text-left">
              <span className="text-gray-500">목표 체중</span>
              <p className="font-medium text-gray-900">{profile.targetWeight}kg</p>
            </div>
            <div className="text-left">
              <span className="text-gray-500">BMI</span>
              <p className="font-medium text-gray-900">{bmi?.toFixed(1) || '-'}</p>
            </div>
            <div className="text-left">
              <span className="text-gray-500">주간 목표</span>
              <p className="font-medium text-gray-900">
                {profile.goalType === 'lose' ? '-' : profile.goalType === 'gain' ? '+' : '±'}{profile.weeklyGoal}kg
              </p>
            </div>
          </div>

          {goals && (
            <div className="border-t border-gray-200 pt-4">
              <div className="text-left">
                <span className="text-gray-500">일일 권장 칼로리</span>
                <p className="font-medium text-gray-900">{goals.dailyCalorieTarget}kcal</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-primary-50 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-3">이제 시작해보세요!</h3>
        <div className="space-y-2 text-sm text-primary-800">
          <div className="flex items-center space-x-2">
            <span>📊</span>
            <span>대시보드에서 진행률을 확인하세요</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⚖️</span>
            <span>매일 체중을 기록해보세요</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🍽️</span>
            <span>식단을 기록하여 칼로리를 관리하세요</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>💪</span>
            <span>운동을 기록하여 목표를 달성하세요</span>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={onComplete}
        className="w-full btn-primary py-3 text-lg font-medium"
      >
        대시보드로 이동
      </button>

      <p className="text-xs text-gray-500">
        언제든지 프로필에서 목표를 수정할 수 있습니다.
      </p>
    </div>
  )
}

export default CompletionStep