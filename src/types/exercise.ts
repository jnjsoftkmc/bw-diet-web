export interface Exercise {
  id: string;
  name: string;
  nameKr: string;
  category: ExerciseCategory;
  type: ExerciseType;
  metValue: number; // Metabolic Equivalent of Task
  description?: string;
  instructions?: string[];
  muscleGroups: MuscleGroup[];
  equipment?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export type ExerciseCategory = 
  | 'cardio'
  | 'strength'
  | 'flexibility'
  | 'sports'
  | 'daily_activity'
  | 'yoga'
  | 'pilates'
  | 'martial_arts'
  | 'dance'
  | 'other';

export type ExerciseType = 'aerobic' | 'anaerobic' | 'flexibility' | 'balance';

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'legs'
  | 'glutes'
  | 'full_body'
  | 'cardio';

export interface ExerciseEntry {
  id: string;
  userId: string;
  exerciseId: string;
  exercise: Exercise;
  date: string; // ISO date string
  duration: number; // minutes
  intensity: 'low' | 'moderate' | 'high' | 'very_high';
  caloriesBurned: number; // calculated
  notes?: string;
  // For strength training
  sets?: ExerciseSet[];
  // For cardio
  distance?: number; // km
  avgHeartRate?: number; // bpm
  maxHeartRate?: number; // bpm
}

export interface ExerciseSet {
  reps: number;
  weight?: number; // kg
  restTime?: number; // seconds
  completed: boolean;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  name: string;
  date: string;
  duration: number; // total minutes
  exercises: ExerciseEntry[];
  totalCaloriesBurned: number;
  notes?: string;
  completed: boolean;
}

export interface DailyExercise {
  date: string;
  totalDuration: number;
  totalCaloriesBurned: number;
  workoutSessions: WorkoutSession[];
  exercises: ExerciseEntry[];
  stepCount?: number;
  activeMinutes?: number;
}

export interface ExerciseStats {
  totalWorkouts: number;
  totalDuration: number; // minutes
  totalCaloriesBurned: number;
  averageWorkoutDuration: number;
  favoriteExercises: {
    exercise: Exercise;
    count: number;
  }[];
  weeklyProgress: {
    week: string;
    workouts: number;
    duration: number;
    calories: number;
  }[];
}