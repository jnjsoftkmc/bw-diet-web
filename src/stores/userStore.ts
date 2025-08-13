import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { UserProfile, DietGoals, UserPreferences, WeightEntry } from '@/types/user'
import { calculateBMI, calculateBMR, calculateTDEE } from '@/utils/calculations'

interface UserState {
  // State
  profile: UserProfile | null
  goals: DietGoals | null
  preferences: UserPreferences
  weightHistory: WeightEntry[]
  isOnboarded: boolean

  // Actions
  setProfile: (profile: Partial<UserProfile>) => void
  setGoals: (goals: DietGoals) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  addWeightEntry: (weight: number, note?: string, bodyFat?: number) => void
  removeWeightEntry: (entryId: string) => void
  updateWeightEntry: (entryId: string, updates: Partial<WeightEntry>) => void
  completeOnboarding: () => void
  resetUser: () => void

  // Computed
  getCurrentWeight: () => number | null
  getLatestWeightEntry: () => WeightEntry | null
  getWeightProgress: () => number
  getBMI: () => number | null
  getBMR: () => number | null
  getTDEE: () => number | null
}

const defaultPreferences: UserPreferences = {
  units: 'metric',
  language: 'ko',
  theme: 'light',
  notifications: {
    weightReminder: true,
    mealReminder: true,
    exerciseReminder: false,
    weeklyReport: true,
  },
  privacy: {
    shareProgress: false,
    publicProfile: false,
  },
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      goals: null,
      preferences: defaultPreferences,
      weightHistory: [],
      isOnboarded: false,

      // Actions
      setProfile: (profileData) => {
        set((state) => {
          const updatedProfile = state.profile
            ? { ...state.profile, ...profileData }
            : {
                id: crypto.randomUUID(),
                name: '',
                age: 25,
                gender: 'female' as const,
                height: 160,
                currentWeight: 60,
                targetWeight: 55,
                activityLevel: 'moderate' as const,
                goalType: 'lose' as const,
                weeklyGoal: 0.5,
                startDate: new Date().toISOString(),
                ...profileData,
              }

          // Calculate derived values
          if (updatedProfile.height && updatedProfile.currentWeight) {
            updatedProfile.bmi = calculateBMI(updatedProfile.currentWeight, updatedProfile.height)
            updatedProfile.bmr = calculateBMR(
              updatedProfile.currentWeight,
              updatedProfile.height,
              updatedProfile.age,
              updatedProfile.gender
            )
            updatedProfile.tdee = calculateTDEE(updatedProfile.bmr, updatedProfile.activityLevel)
          }

          return { profile: updatedProfile }
        })
      },

      setGoals: (goals) => {
        set({ goals })
      },

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        }))
      },

      addWeightEntry: (weight, note, bodyFat) => {
        const entry: WeightEntry = {
          id: crypto.randomUUID(),
          userId: get().profile?.id || '',
          weight,
          date: new Date().toISOString(),
          note,
          bodyFat,
        }

        set((state) => ({
          weightHistory: [entry, ...state.weightHistory],
          profile: state.profile ? { ...state.profile, currentWeight: weight } : null
        }))
      },

      removeWeightEntry: (entryId) => {
        set((state) => ({
          weightHistory: state.weightHistory.filter(entry => entry.id !== entryId)
        }))
      },

      updateWeightEntry: (entryId, updates) => {
        set((state) => ({
          weightHistory: state.weightHistory.map(entry =>
            entry.id === entryId ? { ...entry, ...updates } : entry
          )
        }))
      },

      completeOnboarding: () => {
        set({ isOnboarded: true })
      },

      resetUser: () => {
        set({
          profile: null,
          goals: null,
          preferences: defaultPreferences,
          weightHistory: [],
          isOnboarded: false,
        })
      },

      // Computed values
      getCurrentWeight: () => {
        const state = get()
        return state.profile?.currentWeight || null
      },

      getLatestWeightEntry: () => {
        const state = get()
        return state.weightHistory[0] || null
      },

      getWeightProgress: () => {
        const state = get()
        if (!state.profile) return 0

        const { currentWeight, targetWeight, goalType } = state.profile
        const startWeight = state.weightHistory[state.weightHistory.length - 1]?.weight || currentWeight
        
        if (goalType === 'lose') {
          const totalToLose = startWeight - targetWeight
          const lostSoFar = startWeight - currentWeight
          return totalToLose > 0 ? (lostSoFar / totalToLose) * 100 : 0
        } else if (goalType === 'gain') {
          const totalToGain = targetWeight - startWeight
          const gainedSoFar = currentWeight - startWeight
          return totalToGain > 0 ? (gainedSoFar / totalToGain) * 100 : 0
        }
        
        return 100 // maintain goal
      },

      getBMI: () => {
        const state = get()
        return state.profile?.bmi || null
      },

      getBMR: () => {
        const state = get()
        return state.profile?.bmr || null
      },

      getTDEE: () => {
        const state = get()
        return state.profile?.tdee || null
      },
    }),
    {
      name: 'bw-diet-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        goals: state.goals,
        preferences: state.preferences,
        weightHistory: state.weightHistory,
        isOnboarded: state.isOnboarded,
      }),
    }
  )
)