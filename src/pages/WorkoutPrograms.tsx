import { useEffect, useState } from 'react';
import { Workouts } from '../types/workouts';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Button, Image } from '@nextui-org/react';

export default function WorkoutPrograms() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [workoutPrograms, setWorkoutPrograms] = useState<Workouts[]>([]);

  useEffect(() => {
    const fetchWorkoutPrograms = async () => {
      const response = await fetch(apiUrl + '/workout/get-workouts');
      const data = await response.json();
      setWorkoutPrograms(data.workouts);
    };
    fetchWorkoutPrograms();
  }, []);

  console.log(workoutPrograms);

  return (
    <div className='flex flex-col items-center gap-4 w-full max-w-7xl mx-auto p-4'>
      {workoutPrograms?.map((workout) => (
        <Card
          key={workout.workout_id + 34}
          isFooterBlurred
          className='md:w-3/4 max-md:w-full h-[300px] col-span-12 sm:col-span-7'
        >
          <CardHeader className='absolute z-10 top-1 flex-col items-start'>
            <p className='text-tiny text-white/60 uppercase font-bold'>{workout.workout_level}</p>
            <h4 className='text-white/90 font-medium text-xl'>{workout.workout_name}</h4>
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
            <Button color='secondary' size='sm'>
              Træn Nu
            </Button>
          </CardFooter>
        </Card>
      ))}
      {/* {workoutPrograms?.map((workout) => (
        <div key={workout.workout_id + 34}>
          <h1>{workout.workout_name}</h1>
          <p>{workout.workout_level}</p>
          <p>{workout.workout_description}</p>
          <div>
            {workout.workout_weeks.map((week) => (
              <div key={week.week_id}>
                <h3>{week.week_name}</h3>
                <h3>{week.week_description}</h3>
                <div>
                  {week.exercises.map((exercise) => (
                    <p>{exercise.exercise_name}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
}
