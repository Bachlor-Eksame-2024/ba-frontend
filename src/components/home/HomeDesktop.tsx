import { lazy, memo, Suspense } from 'react';
import { Link } from 'wouter';
import UserInfoCard from './UserInfoCard';
import Card from '../Card';
import { Workouts } from '../../types/workouts';
import WorkoutCard from '../workouts/WorkoutCard';
import { FC } from 'react';

type ActiveComponent = 'Betalingshistorik' | 'Betalingmetode' | 'Kontakt Support' | null;
interface HomeDesktopProps {
  error: boolean;
  workoutPrograms: Workouts[];
  normalCards: { title: string }[];
  userCards: { title: string }[];
  lastestBooking: boolean;
  handleCardClick: (component: ActiveComponent) => void;
}

interface WorkoutSectionProps {
  error: boolean;
  workoutPrograms: Workouts[];
}

const WorkoutSection: FC<WorkoutSectionProps> = memo(({ error, workoutPrograms }) => (
  <div className='flex flex-col gap-2 overflow-x-auto w-full'>
    <div className='flex flex-row gap-4 w-full h-full'>
      {error ? (
        <div>Failed To Load Workouts</div>
      ) : (
        workoutPrograms?.map((workout: Workouts) => (
          <WorkoutCard key={workout.workout_id} {...workout} />
        ))
      )}
    </div>
  </div>
));

interface BookingSectionProps {
  normalCards: { title: string }[];
}

const BookingSection: FC<BookingSectionProps> = memo(({ normalCards }) => (
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
));
const HomeDesktop: FC<HomeDesktopProps> = ({
  error,
  workoutPrograms,
  normalCards,
  userCards,
  lastestBooking,
  handleCardClick,
}) => {
  const UserChartMobile = lazy(() => import('./UserChartMobile'));

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid md:grid-cols-2 gap-4'>
        <UserInfoCard data-testid='user-info-card' lastestBooking={lastestBooking} />
        <div className='flex flex-col gap-2'>
          <Suspense fallback={<div>Loading...</div>}>
            <UserChartMobile data-testid='user-chart' />
          </Suspense>
        </div>
      </div>

      <BookingSection normalCards={normalCards} />
      <WorkoutSection error={error} workoutPrograms={workoutPrograms} />
      <div className='grid sm:grid-cols-3 gap-4'>
        {userCards.map((card) => (
          <div
            key={card.title}
            className='flex flex-col gap-2'
            onClick={() => {
              handleCardClick(card.title as ActiveComponent);
            }}
          >
            <Card {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDesktop;
