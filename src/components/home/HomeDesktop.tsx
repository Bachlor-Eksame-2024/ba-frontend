import { lazy, Suspense } from 'react';
import { Link } from 'wouter';
import UserInfoCard from './UserInfoCard';
import Card from '../Card';
import { Workouts } from '../../types/workouts';
import WorkoutCard from '../workouts/WorkoutCard';
import { FC } from 'react';

interface HomeDesktopProps {
  error: boolean;
  workoutPrograms: Workouts[];
  normalCards: { title: string }[];
  userCards: { title: string }[];
  lastestBooking: boolean;
}

const HomeDesktop: FC<HomeDesktopProps> = ({
  error,
  workoutPrograms,
  normalCards,
  userCards,
  lastestBooking,
}) => {
  const UserChartMobile = lazy(() => import('./UserChartMobile'));
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        <UserInfoCard lastestBooking={lastestBooking} />
        <div className='flex flex-col gap-2'>
          <Suspense fallback={<div>Loading...</div>}>
            <UserChartMobile />
          </Suspense>
        </div>
      </div>

      <div className='grid sm:grid-cols-2 gap-4'>
        <Link href='/booking' className='flex flex-col gap-2'>
          <Card {...normalCards[0]} />
        </Link>
        <div className='flex flex-col gap-2'>
          <Link href='/home/udforsk-boksene'>
            <Card {...normalCards[1]} />
          </Link>
        </div>
      </div>

      <div className='flex flex-col gap-2 overflow-x-auto w-full'>
        <div className='flex flex-row gap-4 w-full h-full'>
          {error ? (
            <div>Faild To Load Workouts</div>
          ) : (
            workoutPrograms?.map((workout: Workouts) => (
              <WorkoutCard key={workout.workout_id} {...workout} />
            ))
          )}
        </div>
      </div>
      <div className='max-sm:hidden grid sm:grid-cols-3 gap-4'>
        {userCards.map((card, index) => (
          <div key={index} className='flex flex-col gap-2'>
            {/*  <span>{card.title}</span> */}
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDesktop;
