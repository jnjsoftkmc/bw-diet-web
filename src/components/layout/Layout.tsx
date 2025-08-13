import { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative overflow-hidden focus:outline-none">
          <div className="py-6">
            <div className="container">
              {children}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default Layout