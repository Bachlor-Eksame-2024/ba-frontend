import useSWR from 'swr';
import { useRoute } from 'wouter';
import { Workouts, WorkoutWeeks } from '../types/workouts';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Card, CardBody } from '@nextui-org/card';

function SelectedWorkout() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, error } = useSWR(apiUrl + '/workout/get-workouts');
  const [match, params] = useRoute('/workout-programs/:workout');

  if (!match) return;
  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;
  const filterWorkout = data?.workouts?.find(
    (workout: Workouts) =>
      workout.workout_name.replace(/\s+/g, '-').toLowerCase() === params?.workout
  );

  if (!filterWorkout) return <div>Workout not found</div>;

  return (
    <div className='grid gap-4 max-w-7xl mx-auto p-4'>
      <div className='relative min-h-96 max-h-[30vh] overflow-hidden flex items-center justify-center rounded-lg'>
        <img
          className='object-center object-cover h-full w-full'
          src={filterWorkout.workout_image}
          alt=''
        />
      </div>
      <div className='basis-3/4'>
        <div className='grid gap-4'>
          <h1 className='text-3xl font-bold'>{filterWorkout.workout_name}</h1>
          <div className='flex w-full flex-col'>
            <Tabs aria-label='Options'>
              {filterWorkout.workout_weeks.map((week: WorkoutWeeks) => (
                <Tab key={week.week_id} title={week.week_name}>
                  <Card>
                    <CardBody className='p-4'>
                      <h3 className='mb-4 text-lg'>{week.week_description}</h3>

                      <ol className='flex flex-col gap-4 list-decimal ml-4'>
                        {week.exercises.map((exercise) => (
                          <li key={exercise.exercise_id}>
                            <h4 className='font-semibold'>{exercise.exercise_name}</h4>
                            <p className='text-zinc-200'>{exercise.exercise_description}</p>
                          </li>
                        ))}
                      </ol>
                    </CardBody>
                  </Card>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedWorkout;
