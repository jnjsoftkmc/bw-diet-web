# BW Diet Web - API 명세서

## 📋 API 개요

현재 버전은 **클라이언트 사이드 전용**으로 구현되며, 모든 데이터는 브라우저의 Local Storage에 저장됩니다.
향후 백엔드 서버 구현시 이 명세를 기반으로 REST API를 개발할 예정입니다.

## 🔧 데이터 구조

### 사용자 프로필 (UserProfile)
```typescript
interface UserProfile {
  id: string;                    // UUID
  name: string;                  // 사용자 이름
  email?: string;                // 이메일 (선택)
  age: number;                   // 나이
  gender: 'male' | 'female';     // 성별
  height: number;                // 키 (cm)
  currentWeight: number;         // 현재 체중 (kg)
  targetWeight: number;          // 목표 체중 (kg)
  activityLevel: ActivityLevel;   // 활동 수준
  goalType: 'lose' | 'maintain' | 'gain'; // 목표 타입
  weeklyGoal: number;            // 주간 목표 (kg/week)
  createdAt: string;             // 생성일
  updatedAt: string;             // 수정일
}

type ActivityLevel = 
  | 'sedentary'    // 앉아서 생활 (1.2)
  | 'light'        // 가벼운 활동 (1.375)
  | 'moderate'     // 보통 활동 (1.55)
  | 'active'       // 활발한 활동 (1.725)
  | 'very_active'; // 매우 활발함 (1.9)
```

### 체중 기록 (WeightEntry)
```typescript
interface WeightEntry {
  id: string;           // UUID
  userId: string;       // 사용자 ID
  weight: number;       // 체중 (kg)
  date: string;         // 측정일 (YYYY-MM-DD)
  time?: string;        // 측정 시간 (HH:mm)
  note?: string;        // 메모
  createdAt: string;    // 생성일
}
```

### 식단 기록 (DietEntry)
```typescript
interface DietEntry {
  id: string;           // UUID
  userId: string;       // 사용자 ID
  foodId: string;       // 음식 ID
  foodName: string;     // 음식명
  amount: number;       // 섭취량 (g)
  mealType: MealType;   // 식사 타입
  date: string;         // 섭취일 (YYYY-MM-DD)
  time?: string;        // 섭취 시간 (HH:mm)
  calories: number;     // 칼로리 (kcal)
  protein: number;      // 단백질 (g)
  carbs: number;        // 탄수화물 (g)
  fat: number;          // 지방 (g)
  createdAt: string;    // 생성일
}

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
```

### 음식 정보 (Food)
```typescript
interface Food {
  id: string;                 // UUID
  name: string;               // 음식명
  nameEn?: string;            // 영문명
  brand?: string;             // 브랜드
  category: string;           // 분류 (과일, 채소, 육류 등)
  servingSize: number;        // 1회 제공량 (g)
  nutrition: NutritionInfo;   // 영양 정보
  barcode?: string;           // 바코드
  verified: boolean;          // 검증된 정보 여부
}

interface NutritionInfo {
  calories: number;     // 칼로리 (kcal/100g)
  protein: number;      // 단백질 (g/100g)
  carbs: number;        // 탄수화물 (g/100g)
  fat: number;          // 지방 (g/100g)
  fiber?: number;       // 식이섬유 (g/100g)
  sugar?: number;       // 당류 (g/100g)
  sodium?: number;      // 나트륨 (mg/100g)
}
```

### 운동 기록 (ExerciseEntry)
```typescript
interface ExerciseEntry {
  id: string;               // UUID
  userId: string;           // 사용자 ID
  exerciseId: string;       // 운동 ID
  exerciseName: string;     // 운동명
  type: ExerciseType;       // 운동 타입
  duration: number;         // 운동 시간 (분)
  intensity: 'low' | 'moderate' | 'high'; // 강도
  caloriesBurned: number;   // 소모 칼로리 (kcal)
  date: string;             // 운동일 (YYYY-MM-DD)
  time?: string;            // 운동 시간 (HH:mm)
  note?: string;            // 메모
  createdAt: string;        // 생성일
}

type ExerciseType = 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
```

### 운동 정보 (Exercise)
```typescript
interface Exercise {
  id: string;                     // UUID
  name: string;                   // 운동명
  nameEn?: string;                // 영문명
  type: ExerciseType;             // 운동 타입
  category: string;               // 세부 분류
  met: number;                    // MET 값 (Metabolic Equivalent)
  description?: string;           // 설명
  instructions?: string[];        // 운동 방법
  muscleGroups?: string[];        // 주요 근육군
}
```

## 🗃️ Local Storage 키 구조

### 저장 키 명세
```typescript
const STORAGE_KEYS = {
  // 사용자 데이터
  USER_PROFILE: 'bw-diet-user-profile',
  USER_PREFERENCES: 'bw-diet-user-preferences',
  
  // 기록 데이터
  WEIGHT_ENTRIES: 'bw-diet-weight-entries',
  DIET_ENTRIES: 'bw-diet-diet-entries',
  EXERCISE_ENTRIES: 'bw-diet-exercise-entries',
  
  // 마스터 데이터
  FOODS_DATABASE: 'bw-diet-foods-database',
  EXERCISES_DATABASE: 'bw-diet-exercises-database',
  
  // 임시 데이터
  TEMP_DATA: 'bw-diet-temp-data',
  
  // 설정 데이터
  APP_SETTINGS: 'bw-diet-app-settings'
} as const;
```

### 데이터 저장 형식
```typescript
// 배열 형태로 저장
localStorage.setItem(STORAGE_KEYS.WEIGHT_ENTRIES, JSON.stringify(weightEntries));
localStorage.setItem(STORAGE_KEYS.DIET_ENTRIES, JSON.stringify(dietEntries));

// 객체 형태로 저장  
localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(userProfile));
```

## 🔄 데이터 API 함수

### 사용자 프로필 API
```typescript
class UserProfileAPI {
  // 프로필 저장
  static async saveProfile(profile: UserProfile): Promise<void> {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }
  
  // 프로필 조회
  static async getProfile(): Promise<UserProfile | null> {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  }
  
  // 프로필 업데이트
  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.getProfile();
    if (!current) throw new Error('Profile not found');
    
    const updated = { ...current, ...updates, updatedAt: new Date().toISOString() };
    await this.saveProfile(updated);
    return updated;
  }
  
  // BMI 계산
  static calculateBMI(weight: number, height: number): number {
    return Number((weight / Math.pow(height / 100, 2)).toFixed(1));
  }
  
  // 기초대사율 계산 (Harris-Benedict)
  static calculateBMR(profile: UserProfile): number {
    const { currentWeight, height, age, gender } = profile;
    
    if (gender === 'male') {
      return Math.round(88.362 + (13.397 * currentWeight) + (4.799 * height) - (5.677 * age));
    } else {
      return Math.round(447.593 + (9.247 * currentWeight) + (3.098 * height) - (4.330 * age));
    }
  }
  
  // 일일 권장 칼로리 계산
  static calculateDailyCalories(profile: UserProfile): number {
    const bmr = this.calculateBMR(profile);
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * activityMultipliers[profile.activityLevel];
    
    // 목표에 따른 칼로리 조정
    switch (profile.goalType) {
      case 'lose':
        return Math.round(tdee - (profile.weeklyGoal * 1100)); // 1kg = 약 7700kcal
      case 'gain':
        return Math.round(tdee + (profile.weeklyGoal * 1100));
      default:
        return Math.round(tdee);
    }
  }
}
```

### 체중 기록 API
```typescript
class WeightAPI {
  // 체중 기록 저장
  static async addEntry(entry: Omit<WeightEntry, 'id' | 'createdAt'>): Promise<WeightEntry> {
    const newEntry: WeightEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    const entries = await this.getEntries();
    entries.push(newEntry);
    entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    localStorage.setItem(STORAGE_KEYS.WEIGHT_ENTRIES, JSON.stringify(entries));
    return newEntry;
  }
  
  // 체중 기록 조회
  static async getEntries(userId?: string): Promise<WeightEntry[]> {
    const data = localStorage.getItem(STORAGE_KEYS.WEIGHT_ENTRIES);
    const entries = data ? JSON.parse(data) : [];
    return userId ? entries.filter((e: WeightEntry) => e.userId === userId) : entries;
  }
  
  // 특정 날짜 체중 조회
  static async getEntryByDate(date: string, userId: string): Promise<WeightEntry | null> {
    const entries = await this.getEntries(userId);
    return entries.find(e => e.date === date) || null;
  }
  
  // 최신 체중 조회
  static async getLatestEntry(userId: string): Promise<WeightEntry | null> {
    const entries = await this.getEntries(userId);
    return entries.length > 0 ? entries[0] : null;
  }
  
  // 체중 변화 계산
  static async getWeightProgress(userId: string, days: number = 30): Promise<{
    entries: WeightEntry[];
    totalChange: number;
    weeklyAverage: number;
  }> {
    const entries = await this.getEntries(userId);
    const recentEntries = entries.slice(0, days);
    
    if (recentEntries.length < 2) {
      return { entries: recentEntries, totalChange: 0, weeklyAverage: 0 };
    }
    
    const latest = recentEntries[0];
    const oldest = recentEntries[recentEntries.length - 1];
    const totalChange = latest.weight - oldest.weight;
    const totalDays = Math.abs(new Date(latest.date).getTime() - new Date(oldest.date).getTime()) / (1000 * 60 * 60 * 24);
    const weeklyAverage = (totalChange / totalDays) * 7;
    
    return {
      entries: recentEntries,
      totalChange: Number(totalChange.toFixed(1)),
      weeklyAverage: Number(weeklyAverage.toFixed(2))
    };
  }
}
```

### 식단 관리 API
```typescript
class DietAPI {
  // 식단 기록 추가
  static async addEntry(entry: Omit<DietEntry, 'id' | 'createdAt'>): Promise<DietEntry> {
    const newEntry: DietEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    const entries = await this.getEntries();
    entries.push(newEntry);
    
    localStorage.setItem(STORAGE_KEYS.DIET_ENTRIES, JSON.stringify(entries));
    return newEntry;
  }
  
  // 특정 날짜 식단 조회
  static async getEntriesByDate(date: string, userId: string): Promise<DietEntry[]> {
    const entries = await this.getEntries(userId);
    return entries.filter(e => e.date === date);
  }
  
  // 일일 영양소 합계 계산
  static async getDailyNutrition(date: string, userId: string): Promise<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    byMealType: Record<MealType, {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }>;
  }> {
    const entries = await this.getEntriesByDate(date, userId);
    
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      byMealType: {
        breakfast: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        lunch: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        dinner: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        snack: { calories: 0, protein: 0, carbs: 0, fat: 0 }
      }
    };
    
    entries.forEach(entry => {
      totals.calories += entry.calories;
      totals.protein += entry.protein;
      totals.carbs += entry.carbs;
      totals.fat += entry.fat;
      
      totals.byMealType[entry.mealType].calories += entry.calories;
      totals.byMealType[entry.mealType].protein += entry.protein;
      totals.byMealType[entry.mealType].carbs += entry.carbs;
      totals.byMealType[entry.mealType].fat += entry.fat;
    });
    
    return totals;
  }
}
```

### 음식 데이터베이스 API
```typescript
class FoodAPI {
  // 음식 검색
  static async searchFoods(query: string): Promise<Food[]> {
    const foods = await this.getAllFoods();
    const normalizedQuery = query.toLowerCase().trim();
    
    return foods.filter(food => 
      food.name.toLowerCase().includes(normalizedQuery) ||
      food.nameEn?.toLowerCase().includes(normalizedQuery) ||
      food.brand?.toLowerCase().includes(normalizedQuery)
    ).slice(0, 20); // 최대 20개 결과
  }
  
  // 전체 음식 목록 조회
  static async getAllFoods(): Promise<Food[]> {
    const data = localStorage.getItem(STORAGE_KEYS.FOODS_DATABASE);
    return data ? JSON.parse(data) : DEFAULT_FOODS;
  }
  
  // 칼로리 계산
  static calculateNutrition(food: Food, amount: number): {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } {
    const ratio = amount / 100; // 100g 기준 영양정보를 실제 섭취량으로 환산
    
    return {
      calories: Math.round(food.nutrition.calories * ratio),
      protein: Math.round(food.nutrition.protein * ratio * 10) / 10,
      carbs: Math.round(food.nutrition.carbs * ratio * 10) / 10,
      fat: Math.round(food.nutrition.fat * ratio * 10) / 10
    };
  }
}
```

## 📊 데이터 내보내기/가져오기

### 백업 데이터 형식
```typescript
interface BackupData {
  version: string;              // 백업 버전
  exportDate: string;           // 내보내기 날짜
  userData: {
    profile: UserProfile;
    preferences: UserPreferences;
  };
  records: {
    weight: WeightEntry[];
    diet: DietEntry[];
    exercise: ExerciseEntry[];
  };
}

// 데이터 내보내기
const exportData = (): BackupData => {
  return {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    userData: {
      profile: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || 'null'),
      preferences: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES) || '{}')
    },
    records: {
      weight: JSON.parse(localStorage.getItem(STORAGE_KEYS.WEIGHT_ENTRIES) || '[]'),
      diet: JSON.parse(localStorage.getItem(STORAGE_KEYS.DIET_ENTRIES) || '[]'),
      exercise: JSON.parse(localStorage.getItem(STORAGE_KEYS.EXERCISE_ENTRIES) || '[]')
    }
  };
};
```

## 🚀 향후 확장 계획

### Phase 2: REST API 서버 구현시 엔드포인트
```
POST   /api/auth/register        # 회원가입
POST   /api/auth/login           # 로그인
GET    /api/users/profile        # 프로필 조회
PUT    /api/users/profile        # 프로필 수정

GET    /api/weight               # 체중 기록 조회
POST   /api/weight               # 체중 기록 추가
PUT    /api/weight/:id           # 체중 기록 수정
DELETE /api/weight/:id           # 체중 기록 삭제

GET    /api/diet                 # 식단 기록 조회
POST   /api/diet                 # 식단 기록 추가
PUT    /api/diet/:id             # 식단 기록 수정
DELETE /api/diet/:id             # 식단 기록 삭제

GET    /api/foods/search         # 음식 검색
GET    /api/foods/:id            # 음식 상세 정보

GET    /api/exercise             # 운동 기록 조회
POST   /api/exercise             # 운동 기록 추가
PUT    /api/exercise/:id         # 운동 기록 수정
DELETE /api/exercise/:id         # 운동 기록 삭제

GET    /api/analytics/dashboard  # 대시보드 데이터
GET    /api/analytics/report     # 리포트 생성
```