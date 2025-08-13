const ExercisePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">운동 관리</h1>
        <p className="text-gray-600">운동 기록을 추가하고 분석하세요</p>
      </div>

      <div className="card">
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p>운동 관리 기능을 준비 중입니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExercisePage