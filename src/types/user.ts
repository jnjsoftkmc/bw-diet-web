export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  currentWeight: number; // kg
  targetWeight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goalType: 'lose' | 'maintain' | 'gain';
  weeklyGoal: number; // kg per week
  startDate: string; // ISO date string
  targetDate?: string; // ISO date string
  bmi?: number;
  bmr?: number; // Basal Metabolic Rate
  tdee?: number; // Total Daily Energy Expenditure
}

export interface DietGoals {
  dailyCalorieTarget: number;
  proteinTarget: number; // grams
  carbTarget: number; // grams
  fatTarget: number; // grams
  waterTarget: number; // ml
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  language: 'ko' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    weightReminder: boolean;
    mealReminder: boolean;
    exerciseReminder: boolean;
    weeklyReport: boolean;
  };
  privacy: {
    shareProgress: boolean;
    publicProfile: boolean;
  };
}

export interface WeightEntry {
  id: string;
  userId: string;
  weight: number; // kg
  date: string; // ISO date string
  note?: string;
  bodyFat?: number; // percentage
  muscleMass?: number; // kg
}