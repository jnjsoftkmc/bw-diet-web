import type { UserProfile } from '@/types/user'

/**
 * Calculate Body Mass Index (BMI)
 * @param weight Weight in kg
 * @param height Height in cm
 * @returns BMI value
 */
export const calculateBMI = (weight: number, height: number): number => {
  if (weight <= 0 || height <= 0) return 0
  const heightInMeters = height / 100
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

/**
 * Get BMI category based on BMI value
 * @param bmi BMI value
 * @returns BMI category
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return '저체중'
  if (bmi < 23) return '정상'
  if (bmi < 25) return '과체중'
  if (bmi < 30) return '비만 1단계'
  if (bmi < 35) return '비만 2단계'
  return '고도비만'
}

/**
 * Calculate Basal Metabolic Rate (BMR) using Harris-Benedict Equation
 * @param weight Weight in kg
 * @param height Height in cm
 * @param age Age in years
 * @param gender Gender
 * @returns BMR in calories
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  if (weight <= 0 || height <= 0 || age <= 0) return 0

  if (gender === 'male') {
    return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age))
  } else {
    return Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age))
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * @param bmr Basal Metabolic Rate
 * @param activityLevel Activity level
 * @returns TDEE in calories
 */
export const calculateTDEE = (
  bmr: number,
  activityLevel: UserProfile['activityLevel']
): number => {
  if (bmr <= 0) return 0

  const activityMultipliers = {
    sedentary: 1.2,      // Little to no exercise
    light: 1.375,        // Light exercise 1-3 days/week
    moderate: 1.55,      // Moderate exercise 3-5 days/week
    active: 1.725,       // Heavy exercise 6-7 days/week
    very_active: 1.9     // Very heavy exercise, physical job
  }

  return Math.round(bmr * activityMultipliers[activityLevel])
}

/**
 * Calculate daily calorie target based on goal
 * @param tdee Total Daily Energy Expenditure
 * @param goalType Goal type (lose, maintain, gain)
 * @param weeklyGoal Weekly weight change goal in kg
 * @returns Daily calorie target
 */
export const calculateDailyCalorieTarget = (
  tdee: number,
  goalType: 'lose' | 'maintain' | 'gain',
  weeklyGoal: number
): number => {
  if (tdee <= 0) return 0

  if (goalType === 'maintain') {
    return tdee
  }

  // 1 kg = 7700 calories (approximately)
  const dailyCalorieAdjustment = (weeklyGoal * 7700) / 7

  if (goalType === 'lose') {
    return Math.max(1200, Math.round(tdee - dailyCalorieAdjustment))
  } else { // gain
    return Math.round(tdee + dailyCalorieAdjustment)
  }
}

/**
 * Calculate calories burned during exercise
 * @param metValue MET value of the exercise
 * @param weight Weight in kg
 * @param duration Duration in minutes
 * @returns Calories burned
 */
export const calculateCaloriesBurned = (
  metValue: number,
  weight: number,
  duration: number
): number => {
  if (metValue <= 0 || weight <= 0 || duration <= 0) return 0
  
  // Calories burned = MET × weight (kg) × time (hours)
  const hours = duration / 60
  return Math.round(metValue * weight * hours)
}

/**
 * Calculate nutrition per serving
 * @param nutritionPer100g Nutrition per 100g
 * @param servingSize Serving size in grams
 * @returns Nutrition per serving
 */
export const calculateNutritionPerServing = (
  nutritionPer100g: {
    calories: number
    protein: number
    carbohydrates: number
    fat: number
  },
  servingSize: number
) => {
  if (servingSize <= 0) return nutritionPer100g

  const multiplier = servingSize / 100

  return {
    calories: Math.round(nutritionPer100g.calories * multiplier),
    protein: Number((nutritionPer100g.protein * multiplier).toFixed(1)),
    carbohydrates: Number((nutritionPer100g.carbohydrates * multiplier).toFixed(1)),
    fat: Number((nutritionPer100g.fat * multiplier).toFixed(1)),
  }
}

/**
 * Calculate days remaining to reach target
 * @param currentWeight Current weight
 * @param targetWeight Target weight
 * @param weeklyGoal Weekly weight change goal
 * @returns Days remaining (-1 if goal is already reached)
 */
export const calculateDaysToTarget = (
  currentWeight: number,
  targetWeight: number,
  weeklyGoal: number
): number => {
  if (weeklyGoal <= 0) return -1

  const weightDifference = Math.abs(targetWeight - currentWeight)
  
  if (weightDifference <= 0.1) return 0 // Already at target (within 100g)

  const weeksNeeded = weightDifference / weeklyGoal
  return Math.ceil(weeksNeeded * 7)
}

/**
 * Calculate estimated target date
 * @param startDate Start date
 * @param currentWeight Current weight
 * @param targetWeight Target weight
 * @param weeklyGoal Weekly weight change goal
 * @returns Estimated target date
 */
export const calculateTargetDate = (
  startDate: string,
  currentWeight: number,
  targetWeight: number,
  weeklyGoal: number
): string => {
  const daysToTarget = calculateDaysToTarget(currentWeight, targetWeight, weeklyGoal)
  
  if (daysToTarget <= 0) return new Date().toISOString()

  const targetDate = new Date(startDate)
  targetDate.setDate(targetDate.getDate() + daysToTarget)
  
  return targetDate.toISOString()
}