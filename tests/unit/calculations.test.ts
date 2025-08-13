import { describe, it, expect } from 'vitest'
import { 
  calculateBMI, 
  getBMICategory, 
  calculateBMR, 
  calculateTDEE,
  calculateDailyCalorieTarget,
  calculateCaloriesBurned,
  calculateDaysToTarget
} from '@/utils/calculations'

describe('calculations', () => {
  describe('calculateBMI', () => {
    it('should calculate BMI correctly', () => {
      expect(calculateBMI(70, 170)).toBe(24.2)
      expect(calculateBMI(60, 160)).toBe(23.4)
      expect(calculateBMI(80, 180)).toBe(24.7)
    })

    it('should handle edge cases', () => {
      expect(calculateBMI(0, 170)).toBe(0)
      expect(calculateBMI(70, 0)).toBe(0)
      expect(calculateBMI(-70, 170)).toBe(0)
    })
  })

  describe('getBMICategory', () => {
    it('should categorize BMI correctly', () => {
      expect(getBMICategory(18)).toBe('저체중')
      expect(getBMICategory(22)).toBe('정상')
      expect(getBMICategory(24)).toBe('과체중')
      expect(getBMICategory(26)).toBe('비만 1단계')
      expect(getBMICategory(32)).toBe('비만 2단계')
      expect(getBMICategory(36)).toBe('고도비만')
    })
  })

  describe('calculateBMR', () => {
    it('should calculate BMR for females', () => {
      const bmr = calculateBMR(60, 160, 25, 'female')
      expect(bmr).toBe(1434) // Harris-Benedict formula result
    })

    it('should calculate BMR for males', () => {
      const bmr = calculateBMR(70, 170, 25, 'male')
      expect(bmr).toBe(1707) // Harris-Benedict formula result
    })

    it('should handle edge cases', () => {
      expect(calculateBMR(0, 160, 25, 'female')).toBe(0)
      expect(calculateBMR(60, 0, 25, 'female')).toBe(0)
      expect(calculateBMR(60, 160, 0, 'female')).toBe(0)
    })
  })

  describe('calculateTDEE', () => {
    it('should calculate TDEE correctly', () => {
      const bmr = 1500
      expect(calculateTDEE(bmr, 'sedentary')).toBe(1800) // 1500 * 1.2
      expect(calculateTDEE(bmr, 'light')).toBe(2063) // 1500 * 1.375
      expect(calculateTDEE(bmr, 'moderate')).toBe(2325) // 1500 * 1.55
      expect(calculateTDEE(bmr, 'active')).toBe(2588) // 1500 * 1.725
      expect(calculateTDEE(bmr, 'very_active')).toBe(2850) // 1500 * 1.9
    })

    it('should handle edge cases', () => {
      expect(calculateTDEE(0, 'moderate')).toBe(0)
      expect(calculateTDEE(-1500, 'moderate')).toBe(0)
    })
  })

  describe('calculateDailyCalorieTarget', () => {
    it('should calculate calorie target for weight loss', () => {
      const tdee = 2000
      const target = calculateDailyCalorieTarget(tdee, 'lose', 0.5)
      expect(target).toBe(1450) // 2000 - (0.5 * 7700 / 7), but min 1200
    })

    it('should calculate calorie target for weight gain', () => {
      const tdee = 2000
      const target = calculateDailyCalorieTarget(tdee, 'gain', 0.5)
      expect(target).toBe(2550) // 2000 + (0.5 * 7700 / 7)
    })

    it('should maintain TDEE for weight maintenance', () => {
      const tdee = 2000
      const target = calculateDailyCalorieTarget(tdee, 'maintain', 0)
      expect(target).toBe(2000)
    })

    it('should not go below 1200 calories for weight loss', () => {
      const tdee = 1300
      const target = calculateDailyCalorieTarget(tdee, 'lose', 1)
      expect(target).toBe(1200) // Should not go below 1200
    })
  })

  describe('calculateCaloriesBurned', () => {
    it('should calculate calories burned correctly', () => {
      // Running (MET 8.0), 70kg person, 30 minutes
      const calories = calculateCaloriesBurned(8.0, 70, 30)
      expect(calories).toBe(280) // 8.0 * 70 * 0.5
    })

    it('should handle edge cases', () => {
      expect(calculateCaloriesBurned(0, 70, 30)).toBe(0)
      expect(calculateCaloriesBurned(8.0, 0, 30)).toBe(0)
      expect(calculateCaloriesBurned(8.0, 70, 0)).toBe(0)
    })
  })

  describe('calculateDaysToTarget', () => {
    it('should calculate days to reach target', () => {
      const days = calculateDaysToTarget(70, 65, 0.5) // Lose 5kg at 0.5kg/week
      expect(days).toBe(70) // 10 weeks * 7 days
    })

    it('should return 0 if already at target', () => {
      const days = calculateDaysToTarget(65, 65, 0.5)
      expect(days).toBe(0)
    })

    it('should handle edge cases', () => {
      expect(calculateDaysToTarget(70, 65, 0)).toBe(-1)
      expect(calculateDaysToTarget(70, 65, -0.5)).toBe(-1)
    })
  })
})