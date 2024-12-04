import { lazy, Suspense, memo } from 'react';
import Card from '../Card';
import UserInfoCard from './UserInfoCard';
import useSWR from 'swr';
import { Workouts } from '../../types/workouts';
import WorkoutCard from '../workouts/WorkoutCard';
import LatestBooking from './LatestBooking';
import useWorkoutStore from '../../stores/WorkoutStore';
import { Link } from 'wouter';

const normalCards = [
  {
    type: 'regular' as const,
    title: 'Book en Boks',
    description: '',
    level: null,
    image:
      'https://images.unsplash.com/photo-1597076537061-a6b58163aa45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    type: 'regular' as const,
    title: 'Udforsk Boksene',
    description: '',
    level: null,
    image:
      'https://images.unsplash.com/photo-1513351974182-1f36b4d965d8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
const userCards = [
  {
    type: 'regular' as const,
    title: 'Kontakt Support',
    description: 'Opret en ticket og få svar på dine spørgsmål',
    level: null,
    image: null,
  },
  {
    type: 'regular' as const,
    title: 'Betalingmetode',
    description: 'Mobilepay',
    level: null,
    image: null,
  },
  {
    type: 'regular' as const,
    title: 'Betalingshistorik',
    description: 'Se Tidligere Betalinger',
    level: null,
    image: null,
  },
];

// Dynamically import the AdminBarChart component
const UserChartMobile = lazy(() => import('./UserChartMobile'));

const HomeUser = memo(() => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { workoutPrograms, setWorkoutPrograms } = useWorkoutStore();
  const { data, error } = useSWR(apiUrl + '/workout/get-workouts', {
    onSuccess: (data) => {
      setWorkoutPrograms(data.workouts);
    },
  });

  const LastedBooking = false;

  const TabletAndMobile = () => (
    <div className='flex flex-col gap-4'>
      {LastedBooking && <LatestBooking />}
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
          <Card {...normalCards[1]} />
        </div>
      </div>

      <div className='flex flex-col gap-2 overflow-x-auto w-full'>
        <span>Workouts</span>
        <div className='flex flex-row gap-4 w-full h-full'>
          {error && data ? (
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

  const Desktop = () => (
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

  return (
    <div>
      <div className='md:hidden'>
        <TabletAndMobile />
      </div>
      <div className='max-md:hidden'>
        <Desktop />
      </div>
    </div>
  );
});

export default HomeUser;

/*  miniCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}  */
