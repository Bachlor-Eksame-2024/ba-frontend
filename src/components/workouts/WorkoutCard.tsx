import { Image } from '@nextui-org/react';
import { Link } from 'wouter';
import { Workouts } from '../../types/workouts';

function WorkoutCard({ ...workout }: Workouts) {
  const NormalCard = () => {
    return (
      <Link
        href={`/workout-programs/${workout.workout_name.replace(/\s+/g, '-').toLowerCase()}`}
        className='max-md:hidden min-w-72 min-h-64 aspect-video bg-default-100 rounded flex flex-col justify-center items-center overflow-hidden p-4 relative cursor-pointer'
      >
        <div className='absolute top-0 left-0 bg-secondary rounded-tl-lg rounded-br-lg z-[2]'>
          <span className='py-2 px-3 font-thin'>{workout.workout_level}</span>
        </div>
        <div className='flex flex-col justify-end h-full w-full items-start z-[2] pointer-events-none'>
          <h4 className='text-lg text-center'>{workout.workout_name}</h4>
        </div>
        {workout.workout_image && (
          <div className='absolute w-full h-full'>
            <div className='absolute top-0 w-full h-full bg-black/20 z-[1] pointer-events-none'></div>
            <Image
              removeWrapper
              isZoomed
              className='absolute top-0 object-cover w-full h-full z-0'
              src={workout.workout_image}
              alt=''
            />
          </div>
        )}
      </Link>
    );
  };
  const MiniCard = () => {
    return (
      <Link
        href={`/workout-programs/${workout.workout_name.replace(/\s+/g, '-').toLowerCase()}`}
        className='md:hidden min-w-40 w-full flex-nowrap min-h-40 max-sm:aspect-[4/3] sm:aspect-video bg-default-100 rounded flex flex-col justify-center items-center overflow-hidden p-2 relative cursor-pointer'
      >
        <div className='absolute top-0 left-0 bg-secondary rounded-tl-lg rounded-br-lg z-[2] '>
          <span className='py-2 px-3 font-thin'>{workout.workout_level}</span>
        </div>
        <div className='flex flex-col justify-end h-full w-full items-start z-[2] pointer-events-none'>
          <h4 className='text-base text-left'>{workout.workout_name}</h4>
        </div>
        {workout.workout_image && (
          <div className='absolute w-full h-full'>
            <div className='absolute top-0 w-full h-full bg-black/20 z-[1] pointer-events-none'></div>
            <Image
              removeWrapper
              isZoomed
              className='absolute top-0 object-cover w-full h-full z-0'
              src={workout.workout_image}
              alt=''
            />
          </div>
        )}
      </Link>
    );
  };
  return (
    <div>
      <NormalCard />
      <MiniCard />
    </div>
  );
}

export default WorkoutCard;
