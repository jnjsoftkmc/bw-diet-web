import { Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import Layout from '@/components/layout/Layout'
import OnboardingFlow from '@/pages/onboarding/OnboardingFlow'
import Dashboard from '@/pages/dashboard/Dashboard'
import DietPage from '@/pages/diet/DietPage'
import ExercisePage from '@/pages/exercise/ExercisePage'
import ProfilePage from '@/pages/profile/ProfilePage'

function App() {
  const { isOnboarded } = useUserStore()

  // If user hasn't completed onboarding, show onboarding flow
  if (!isOnboarded) {
    return <OnboardingFlow />
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/diet" element={<DietPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

export default App