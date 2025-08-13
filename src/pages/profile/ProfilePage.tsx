const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
        <p className="text-gray-600">개인 정보와 목표를 관리하세요</p>
      </div>

      <div className="card">
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p>프로필 관리 기능을 준비 중입니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage