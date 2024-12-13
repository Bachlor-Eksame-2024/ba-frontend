import { FC, lazy, Suspense } from 'react';
import { Workouts } from '../../types/workouts';
import LatestBooking from './LatestBooking';
import { Link } from 'wouter';
import Card from '../Card';
import UserInfoCard from './UserInfoCard';
import WorkoutCard from '../workouts/WorkoutCard';

interface HomeTabletAndMobileProps {
  error: boolean;
  workoutPrograms: Workouts[];
  normalCards: { title: string }[];
  userCards: { title: string }[];
  lastestBooking: boolean;
}

const HomeTabletAndMobile: FC<HomeTabletAndMobileProps> = ({
  error,
  workoutPrograms,
  normalCards,
  userCards,
  lastestBooking,
}) => {
  const UserChartMobile = lazy(() => import('./UserChartMobile'));
  return (
    <div className='flex flex-col gap-4'>
      {lastestBooking && <LatestBooking />}
      <div className='grid sm:grid-cols-2 gap-4'>
        <Link href='/booking' className='flex flex-col gap-2'>
          <span>{normalCards[0].title}</span>
          <Card {...normalCards[0]} />
        </Link>
        <div className='sm:hidden'>
          <UserInfoCard />
        </div>
        <div className='flex flex-col gap-2'>
          <span>{normalCards[1].title}</span>
          <Link href='/home/udforsk-boksene'>
            <Card {...normalCards[1]} />
          </Link>
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
      <div className='max-sm:hidden grid sm:grid-cols-2 gap-4'>
        <UserInfoCard />
        {userCards.map((card, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <span>{card.title}</span>
            <Card {...card} />
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-2'>
        <span>Activity</span>
        <Suspense fallback={<div>Loading...</div>}>
          <UserChartMobile />
        </Suspense>
      </div>
    </div>
  );
};

export default HomeTabletAndMobile;
