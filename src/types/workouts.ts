export interface Workouts {
  workout_id: number;
  workout_name: string;
  workout_description: string;
  workout_level: string;
  workout_image: string;
  workout_weeks: WorkoutWeeks[];
  created_at: string;
  updated_at: string;
}

export interface WorkoutWeeks {
  week_id: number;
  week_name: string;
  week_description: string;
  exercises: Exercises[];
}
export interface Exercises {
  exercise_id: number;
  exercise_name: string;
  exercise_description: string;
}

export interface CreateExercise {
  exercise_name: string;
  exercise_description: string;
}
export interface CreateWeek {
  week_id: string;
  week_name: string;
  week_description: string;
  exercises: CreateExercise[];
}

export interface CreateWorkout {
  workout_name: string;
  workout_description: string;
  workout_level: string;
  workout_image: string;
  workout_weeks: CreateWeek[];
}

export type CreateWorkoutPayload = CreateWorkout[];
