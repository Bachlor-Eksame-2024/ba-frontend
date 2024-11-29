import { create } from 'zustand';
import { Workouts } from '../types/workouts';

interface WorkoutStore {
  workoutPrograms: Workouts[] | null;
  setWorkoutPrograms: (workouts: Workouts[]) => void;
  clearWorkoutPrograms: () => void;
}

const useWorkoutStore = create<WorkoutStore>((set) => ({
  workoutPrograms: null,
  setWorkoutPrograms: (workouts: Workouts[]) => set({ workoutPrograms: workouts }),
  clearWorkoutPrograms: () => set({ workoutPrograms: null }),
}));

export default useWorkoutStore;
