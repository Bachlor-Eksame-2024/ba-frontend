import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Workouts } from '../../types/workouts';
import { Button, Image, useDisclosure } from '@nextui-org/react';
import { Link } from 'wouter';
import useWorkoutStore from '../../stores/WorkoutStore';
import useSWR from 'swr';
import { useState } from 'react';
import AdminNewWorkout from './AdminNewWorkout';

function AdminWorkout() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [deleteWorkout, setDeleteWorkout] = useState<null | number>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { workoutPrograms, setWorkoutPrograms } = useWorkoutStore();

  // Fetch data with SWR hook for fetching "GET" data
  const { data, error } = useSWR(apiUrl + '/workout/get-workouts', {
    onSuccess: (data) => {
      setWorkoutPrograms(data.workouts);
    },
  });
  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;

  const handelDeleteWorkout = async (workoutId: number) => {
    const response = await fetch(apiUrl + '/workout/delete-workout/' + workoutId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.message === 'Workout deleted successfully') {
        const newWorkoutPrograms = workoutPrograms?.filter(
          (workout) => workout.workout_id !== workoutId
        );
        if (newWorkoutPrograms) {
          setWorkoutPrograms(newWorkoutPrograms);
        }
      }
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 w-full mx-auto '>
      <div className='w-full flex items-start'>
        <Button onClick={onOpen} className='bg-secondary'>
          Opret ny Workout
        </Button>
      </div>
      <AdminNewWorkout isOpen={isOpen} onOpenChange={onOpenChange} />
      {workoutPrograms?.map((workout: Workouts) => (
        <Card
          key={workout.workout_id + 34}
          isFooterBlurred
          className='w-full h-[300px] col-span-12 sm:col-span-7'
        >
          <CardHeader className='absolute z-10 top-1 flex-col items-start'>
            <p className='text-tiny text-white/60 uppercase font-bold'>{workout.workout_level}</p>
            <h4 className='text-white/90 font-medium text-sm'>{workout.workout_name}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt='Relaxing app background'
            className='z-0 w-full h-full object-cover'
            src={workout.workout_image}
          />
          <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
            <div className='flex flex-grow gap-2 items-center'>
              <p className='text-base text-white/60'>{workout.workout_description}</p>
            </div>
            <div className='flex gap-4'>
              {deleteWorkout === workout.workout_id ? (
                <div className='flex gap-2'>
                  <Button
                    onClick={() => handelDeleteWorkout(workout.workout_id)}
                    size='sm'
                    color='danger'
                  >
                    Ja
                  </Button>
                  <Button size='sm' color='default' onClick={() => setDeleteWorkout(null)}>
                    Nej
                  </Button>
                </div>
              ) : (
                <Button
                  color='danger'
                  size='sm'
                  onClick={() => setDeleteWorkout(workout.workout_id)}
                  href={`/workout-programs/${workout.workout_name.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  Slet
                </Button>
              )}
              <Link
                className={`link-btn-sm`}
                href={`/workout-programs/${workout.workout_name.replace(/\s+/g, '-').toLowerCase()}`}
              >
                Træn Nu
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default AdminWorkout;
