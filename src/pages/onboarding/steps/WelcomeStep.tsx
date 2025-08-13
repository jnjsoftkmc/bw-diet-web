interface WelcomeStepProps {
  onNext: () => void
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="card text-center space-y-6">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-2xl">BW</span>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          BW Diet Web에 오신 것을 환영합니다!
        </h1>
        <p className="text-lg text-gray-600">
          건강한 다이어트 목표 달성을 위한 
          <br />
          개인 맞춤형 관리 시스템입니다.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4 text-left">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">체중 & 진행률 추적</h3>
            <p className="text-sm text-gray-600">일일 체중 기록과 목표 달성률을 시각적으로 확인하세요</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">스마트 식단 관리</h3>
            <p className="text-sm text-gray-600">칼로리와 영양소를 자동으로 계산하여 관리하세요</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">운동 기록 & 분석</h3>
            <p className="text-sm text-gray-600">운동량과 소모 칼로리를 기록하고 분석하세요</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="pt-4">
        <button
          onClick={onNext}
          className="w-full btn-primary py-3 text-lg font-medium"
        >
          시작하기
        </button>
        <p className="text-xs text-gray-500 mt-3">
          개인정보는 안전하게 보호되며, 언제든지 삭제할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

export default WelcomeStep