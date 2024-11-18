import Card from '../components/Card';
import UserChartMobile from '../components/home/UserChartMobile';

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

export default function Home() {
  return (
    <div className='flex flex-col gap-4 md:p-8 max-md:p-4'>
      <h1 className='text-red-500'>Home</h1>
      <div className='flex flex-col gap-4'>
        {normalCards.map((card, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <span>{card.title}</span>
            <Card {...card} />
          </div>
        ))}
        <div className='flex flex-col gap-2'>
          <span>Workouts</span>
          <div className='flex gap-4 overflow-x-scroll min-w-72 '>
            {miniCards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span>Activity</span>
          <UserChartMobile />
        </div>
      </div>
    </div>
  );
}
