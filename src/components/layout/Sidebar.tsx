import { Link, useLocation } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'

const Sidebar = () => {
  const location = useLocation()
  const { profile, getWeightProgress, getCurrentWeight } = useUserStore()

  const navigation = [
    {
      name: '대시보드',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
        </svg>
      ),
    },
    {
      name: '식단 관리',
      href: '/diet',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      name: '운동 관리',
      href: '/exercise',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      name: '프로필',
      href: '/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  const currentWeight = getCurrentWeight()
  const progress = getWeightProgress()

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Quick Stats */}
      {profile && (
        <div className="p-6 border-b border-gray-200">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">현재 체중</h3>
              <p className="text-2xl font-bold text-gray-900">
                {currentWeight ? `${currentWeight}kg` : '-'}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">목표까지</h3>
              <p className="text-lg font-semibold text-primary-600">
                {Math.abs(profile.targetWeight - (currentWeight || 0)).toFixed(1)}kg
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">진행률</h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round(progress)}% 완료
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <span className={`mr-3 flex-shrink-0 ${
                isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500'
              }`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <button className="w-full btn-primary text-sm py-2">
            체중 기록
          </button>
          <button className="w-full btn-secondary text-sm py-2">
            식단 추가
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar