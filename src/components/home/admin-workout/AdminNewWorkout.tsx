import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { useState } from 'react';
import { CreateExercise, CreateWorkoutPayload } from '../../../types/workouts';
import AddWeek from './AddWeek';
import useWorkoutStore from '../../../stores/WorkoutStore';

interface AdminNewWorkoutProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function AdminNewWorkout({ isOpen, onOpenChange }: AdminNewWorkoutProps) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [weeks, setWeeks] = useState(1);
  const [weekExercises, setWeekExercises] = useState<Record<number, CreateExercise[]>>({});
  const { setWorkoutPrograms } = useWorkoutStore();

  const handleAddExercise = (weekIndex: number, exercise: CreateExercise) => {
    setWeekExercises((prev) => ({
      ...prev,
      [weekIndex]: [...(prev[weekIndex] || []), exercise],
    }));
  };

  const handleNewWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const fieldNames = Array.from(formData.keys());

    const weekIndices = [
      ...new Set(
        fieldNames
          .filter((name) => name.startsWith('weekTitle'))
          .map((name) => name.replace('weekTitle', ''))
      ),
    ];

    const workoutData: CreateWorkoutPayload = [
      {
        workout_name: formData.get('workoutTitle') as string,
        workout_description: formData.get('workoutDescription') as string,
        workout_level: formData.get('workoutLevel') as string,
        workout_image: formData.get('workoutImageUrl') as string,
        workout_weeks: weekIndices.map((weekIndex, idx) => {
          const exerciseIndices = fieldNames
            .filter((name) => name.includes(`exerciseTitle${weekIndex}`))
            .map((name) => name.replace(`exerciseTitle`, '').replace(weekIndex, ''));

          return {
            week_id: (idx + 1).toString(),
            week_name: formData.get(`weekTitle${weekIndex}`) as string,
            week_description: formData.get(`weekDescription${weekIndex}`) as string,
            exercises: exerciseIndices.map((exerciseIndex) => ({
              exercise_name: formData.get(`exerciseTitle${exerciseIndex}${weekIndex}`) as string,
              exercise_description: formData.get(
                `exerciseDescription${exerciseIndex}${weekIndex}`
              ) as string,
            })),
          };
        }),
      },
    ];

    postWorkout(workoutData);
  };

  const postWorkout = async (workoutData: CreateWorkoutPayload) => {
    try {
      const response = await fetch(apiUrl + '/workout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.message === 'Workout created successfully') {
        console.log('Workout created:', data.workout);
        const getNewWorkout = await fetch(apiUrl + '/workout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
        });
        const newWorkoutData = await getNewWorkout.json();
        setWorkoutPrograms(newWorkoutData.workouts);
        onOpenChange(false);
        return true;
      } else {
        throw new Error(data.message || 'Failed to create workout');
      }
    } catch (error) {
      console.error('Error creating workout:', error);
      return false;
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className='bg-default-800 text-background'>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Opret Ny Workout</ModalHeader>
            <ModalBody className='max-h-[80vh]'>
              <form onSubmit={handleNewWorkout} className='overflow-auto p-1 grid gap-2'>
                <input
                  required
                  name='workoutTitle'
                  type='text'
                  className='p-4 w-full bg-default-700 rounded text-background'
                  placeholder='Titel'
                />
                <textarea
                  required
                  name='workoutDescription'
                  className='p-4 min-h-16 w-full bg-default-700 rounded text-background'
                  rows={4}
                  placeholder='Beskrivelse'
                />
                <select
                  name='workoutLevel'
                  className='p-4 w-full bg-default-700 rounded text-background'
                >
                  <option value='Beginner'>Beginner</option>
                  <option value='Advanced'>Advanced</option>
                  <option value='Intermediate'>Intermediate</option>
                </select>
                <input
                  required
                  name='workoutImageUrl'
                  type='text'
                  className='p-4 w-full bg-default-700 rounded text-background'
                  placeholder='Billede URL'
                />
                {[...Array(weeks)].map((_, index) => (
                  <div key={index}>
                    <AddWeek
                      index={index}
                      exercises={weekExercises[index] || []}
                      onAddExercise={handleAddExercise}
                    />
                  </div>
                ))}
                <div className='flex justify-between items-center'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setWeeks(weeks + 1);
                    }}
                    className='flex gap-2 items-center'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6 text-green-400'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                    Tilføj Uge
                  </button>
                  {weeks > 1 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (weeks > 1) setWeeks(weeks - 1);
                      }}
                      className='flex gap-2 items-center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6 text-red-400'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                      </svg>
                      Fjern Uge
                    </button>
                  )}
                </div>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button type='submit' color='primary'>
                    Action
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AdminNewWorkout;
