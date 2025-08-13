import { test, expect } from '@playwright/test'

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to ensure fresh onboarding experience
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should complete full onboarding flow', async ({ page }) => {
    // Should start with welcome step
    await expect(page.locator('h1')).toContainText('BW Diet Web에 오신 것을 환영합니다!')
    
    // Click start button
    await page.click('button:has-text("시작하기")')
    
    // Profile step - fill out form
    await expect(page.locator('h2')).toContainText('기본 정보 입력')
    
    await page.fill('input[placeholder="이름을 입력하세요"]', '테스트 사용자')
    await page.fill('input[placeholder="25"]', '30')
    await page.selectOption('select', 'female')
    await page.fill('input[placeholder="160"]', '165')
    await page.fill('input[placeholder="60"]', '70')
    await page.selectOption('select', 'moderate')
    
    await page.click('button:has-text("다음")')
    
    // Goals step
    await expect(page.locator('h2')).toContainText('목표 설정')
    
    // Select weight loss goal
    await page.click('input[value="lose"]')
    await page.fill('input[placeholder="55"]', '65')
    await page.selectOption('select', '0.5')
    
    await page.click('button:has-text("완료")')
    
    // Completion step
    await expect(page.locator('h2')).toContainText('설정 완료!')
    await expect(page.locator('text=테스트 사용자님만의')).toBeVisible()
    
    // Complete onboarding
    await page.click('button:has-text("대시보드로 이동")')
    
    // Should be redirected to dashboard
    await expect(page.locator('h1')).toContainText('안녕하세요, 테스트 사용자님!')
    await expect(page.url()).toContain('/dashboard')
  })

  test('should validate required fields in profile step', async ({ page }) => {
    await page.click('button:has-text("시작하기")')
    
    // Try to proceed without filling required fields
    await page.click('button:has-text("다음")')
    
    // Should see validation errors
    await expect(page.locator('text=이름을 입력해주세요')).toBeVisible()
    await expect(page.locator('text=15-100세 사이의 나이를 입력해주세요')).toBeVisible()
  })

  test('should allow navigation between steps', async ({ page }) => {
    await page.click('button:has-text("시작하기")')
    
    // Fill profile form
    await page.fill('input[placeholder="이름을 입력하세요"]', '테스트')
    await page.fill('input[placeholder="25"]', '25')
    await page.fill('input[placeholder="160"]', '160')
    await page.fill('input[placeholder="60"]', '60')
    
    await page.click('button:has-text("다음")')
    
    // Go back to profile step
    await page.click('button:has-text("이전")')
    await expect(page.locator('h2')).toContainText('기본 정보 입력')
    
    // Form should retain values
    await expect(page.locator('input[placeholder="이름을 입력하세요"]')).toHaveValue('테스트')
  })
})

test.describe('Dashboard after onboarding', () => {
  test.beforeEach(async ({ page }) => {
    // Set up a completed onboarding state
    await page.goto('/')
    await page.evaluate(() => {
      const userData = {
        state: {
          profile: {
            id: 'test-user',
            name: '테스트 사용자',
            age: 30,
            gender: 'female',
            height: 165,
            currentWeight: 70,
            targetWeight: 65,
            activityLevel: 'moderate',
            goalType: 'lose',
            weeklyGoal: 0.5,
            startDate: new Date().toISOString(),
            bmi: 25.7,
            bmr: 1400,
            tdee: 2170
          },
          goals: {
            dailyCalorieTarget: 1670,
            proteinTarget: 104,
            carbTarget: 188,
            fatTarget: 56,
            waterTarget: 2000
          },
          isOnboarded: true,
          preferences: {
            units: 'metric',
            language: 'ko',
            theme: 'light',
            notifications: {
              weightReminder: true,
              mealReminder: true,
              exerciseReminder: false,
              weeklyReport: true
            },
            privacy: {
              shareProgress: false,
              publicProfile: false
            }
          },
          weightHistory: []
        },
        version: 0
      }
      localStorage.setItem('bw-diet-user-storage', JSON.stringify(userData))
    })
    await page.reload()
  })

  test('should display user stats correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('안녕하세요, 테스트 사용자님!')
    
    // Check stats cards
    await expect(page.locator('text=70kg')).toBeVisible() // Current weight
    await expect(page.locator('text=65kg')).toBeVisible() // Target weight
    await expect(page.locator('text=25.7')).toBeVisible() // BMI
  })

  test('should have working navigation', async ({ page }) => {
    // Test sidebar navigation
    await page.click('a[href="/diet"]')
    await expect(page.locator('h1')).toContainText('식단 관리')
    
    await page.click('a[href="/exercise"]')
    await expect(page.locator('h1')).toContainText('운동 관리')
    
    await page.click('a[href="/profile"]')
    await expect(page.locator('h1')).toContainText('프로필')
    
    await page.click('a[href="/dashboard"]')
    await expect(page.locator('h1')).toContainText('안녕하세요, 테스트 사용자님!')
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Mobile menu should be present
    await expect(page.locator('button[aria-label="메뉴 열기"]')).toBeVisible()
    
    // Desktop sidebar should be hidden
    await expect(page.locator('aside')).toBeHidden()
  })
})