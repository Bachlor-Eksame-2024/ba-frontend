import { Workouts } from '../types/workouts';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { Link } from 'wouter';
import useSWR from 'swr';
import useWorkoutStore from '../stores/WorkoutStore';

export default function WorkoutPrograms() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { workoutPrograms, setWorkoutPrograms } = useWorkoutStore();

  // Fetch data with SWR hook for fetching "GET" data
  const { data, error } = useSWR(apiUrl + '/workout/get-workouts', {
    onSuccess: (data) => {
      setWorkoutPrograms(data.workouts);
    },
  });
  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center gap-4 w-full max-w-7xl mx-auto p-4 pt-20'>
      {workoutPrograms?.map((workout: Workouts) => (
        <Card
          key={workout.workout_id + 34}
          isFooterBlurred
          className='w-full max-w-3xl h-[300px] col-span-12 sm:col-span-7'
        >
          <CardHeader className='absolute z-10 top-1 flex-col items-start'>
            <p className='text-tiny text-white/60 uppercase font-bold'>{workout.workout_level}</p>
            <h4 className='text-white/90 font-medium text-lg'>{workout.workout_name}</h4>
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
            <Link
              className={`link-btn-sm`}
              href={`/workout-programs/${workout.workout_name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              Træn Nu
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
