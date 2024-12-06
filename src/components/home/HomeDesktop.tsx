import { lazy, Suspense } from 'react';
import LatestBooking from './LatestBooking';
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
  LastedBooking: boolean;
}

const HomeDesktop: FC<HomeDesktopProps> = ({
  error,
  workoutPrograms,
  normalCards,
  userCards,
  LastedBooking,
}) => {
  const UserChartMobile = lazy(() => import('./UserChartMobile'));
  return (
    <div className='flex flex-col gap-4'>
      {LastedBooking && (
        <div className='grid grid-cols-2'>
          <LatestBooking />
        </div>
      )}
      <div className='grid grid-cols-2 gap-4'>
        <UserInfoCard />
        <div className='flex flex-col gap-2'>
          <span>Activity</span>
          <Suspense fallback={<div>Loading...</div>}>
            <UserChartMobile />
          </Suspense>
        </div>
      </div>

      <div className='grid sm:grid-cols-2 gap-4'>
        <Link href='/booking' className='flex flex-col gap-2'>
          <span>{normalCards[0].title}</span>
          <Card {...normalCards[0]} />
        </Link>
        <div className='flex flex-col gap-2'>
          <span>{normalCards[1].title}</span>
          <Card {...normalCards[1]} />
        </div>
      </div>

      <div className='flex flex-col gap-2 overflow-x-auto w-full'>
        <span>Workouts</span>
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
            <span>{card.title}</span>
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDesktop;
