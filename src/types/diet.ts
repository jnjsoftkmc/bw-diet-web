export interface Food {
  id: string;
  name: string;
  nameKr: string;
  brand?: string;
  category: FoodCategory;
  nutritionPer100g: NutritionInfo;
  servingSize?: number; // grams
  barcode?: string;
  verified: boolean;
}

export interface NutritionInfo {
  calories: number; // kcal per 100g
  protein: number; // g per 100g
  carbohydrates: number; // g per 100g
  fat: number; // g per 100g
  fiber?: number; // g per 100g
  sugar?: number; // g per 100g
  sodium?: number; // mg per 100g
  cholesterol?: number; // mg per 100g
}

export type FoodCategory = 
  | 'grains'
  | 'vegetables'
  | 'fruits'
  | 'dairy'
  | 'meat'
  | 'fish'
  | 'nuts'
  | 'beverages'
  | 'snacks'
  | 'condiments'
  | 'other';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface DietEntry {
  id: string;
  userId: string;
  foodId: string;
  food: Food;
  quantity: number; // grams
  mealType: MealType;
  date: string; // ISO date string
  calories: number; // calculated
  protein: number; // calculated grams
  carbohydrates: number; // calculated grams
  fat: number; // calculated grams
  note?: string;
}

export interface DailyIntake {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  mealBreakdown: {
    breakfast: MealSummary;
    lunch: MealSummary;
    dinner: MealSummary;
    snack: MealSummary;
  };
  waterIntake?: number; // ml
}

export interface MealSummary {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  entries: DietEntry[];
}

export interface FoodSearchParams {
  query: string;
  category?: FoodCategory;
  limit?: number;
  offset?: number;
}