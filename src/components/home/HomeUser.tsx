import Card from '../Card';
import UserChartMobile from './UserChartMobile';
import UserInfoCard from './UserInfoCard';

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
    title: 'Udforsk Rummet',
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
const miniCards = [
  {
    type: 'workoutmini' as const,
    title: 'FULL BODY WORKOUT',
    description: '',
    level: 'Beginner' as const,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    type: 'workoutmini' as const,
    title: 'STRONG AND STEADY',
    description: '',
    level: 'Advanced' as const,
    image:
      'https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    type: 'workoutmini' as const,
    title: 'THREE DAY POWER',
    description: '',
    level: 'Intermediate' as const,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

function HomeUser() {
  const TabletAndMobile = () => (
    <div className='flex flex-col gap-4'>
      <div className='grid sm:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <span>{normalCards[0].title}</span>
          <Card {...normalCards[0]} />
        </div>
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
          {miniCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
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
        <UserChartMobile />
      </div>
    </div>
  );

  const Desktop = () => (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-4'>
        <UserInfoCard />
        <div className='flex flex-col gap-2'>
          <span>Activity</span>
          <UserChartMobile />
        </div>
      </div>

      <div className='grid sm:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <span>{normalCards[0].title}</span>
          <Card {...normalCards[0]} />
        </div>
        <div className='flex flex-col gap-2'>
          <span>{normalCards[1].title}</span>
          <Card {...normalCards[1]} />
        </div>
      </div>

      <div className='flex flex-col gap-2 overflow-x-auto w-full'>
        <span>Workouts</span>
        <div className='flex flex-row gap-4 w-full h-full'>
          {miniCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
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
}

export default HomeUser;
