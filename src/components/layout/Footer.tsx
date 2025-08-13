const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container">
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">BW</span>
              </div>
              <span className="text-sm text-gray-600">
                © 2024 BW Diet Web. 건강한 다이어트를 위한 최고의 파트너
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="#" 
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                개인정보처리방침
              </a>
              <a 
                href="#" 
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                이용약관
              </a>
              <a 
                href="#" 
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                고객지원
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer