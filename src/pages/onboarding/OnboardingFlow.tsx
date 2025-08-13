import { useState } from 'react'
import { useUserStore } from '@/stores/userStore'
import WelcomeStep from './steps/WelcomeStep'
import ProfileStep from './steps/ProfileStep'
import GoalsStep from './steps/GoalsStep'
import CompletionStep from './steps/CompletionStep'

type OnboardingStep = 'welcome' | 'profile' | 'goals' | 'completion'

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const { completeOnboarding } = useUserStore()

  const handleStepComplete = (nextStep: OnboardingStep) => {
    if (nextStep === 'completion') {
      completeOnboarding()
    } else {
      setCurrentStep(nextStep)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onNext={() => handleStepComplete('profile')} />
      case 'profile':
        return (
          <ProfileStep
            onNext={() => handleStepComplete('goals')}
            onBack={() => setCurrentStep('welcome')}
          />
        )
      case 'goals':
        return (
          <GoalsStep
            onNext={() => handleStepComplete('completion')}
            onBack={() => setCurrentStep('profile')}
          />
        )
      case 'completion':
        return <CompletionStep onComplete={completeOnboarding} />
      default:
        return <WelcomeStep onNext={() => handleStepComplete('profile')} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2">
            {['welcome', 'profile', 'goals', 'completion'].map((step, index) => {
              const isActive = step === currentStep
              const isCompleted = ['welcome', 'profile', 'goals', 'completion'].indexOf(currentStep) > index
              
              return (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500 scale-125'
                      : isCompleted
                      ? 'bg-primary-300'
                      : 'bg-gray-300'
                  }`}
                />
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="animate-fade-in">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow