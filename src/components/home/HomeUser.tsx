import { Suspense, memo, useState, useEffect } from 'react';
import useSWR from 'swr';
import useWorkoutStore from '../../stores/WorkoutStore';
import HomeDesktop from './HomeDesktop';
import useBookingStore from '../../stores/BookingStore';
import useUserStore from '../../stores/UserStore';
import { Modal, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import PaymentHistory from './PaymentHistory';
import PaymentMethod from './PaymentMethod';
import Support from './Support';

type ActiveComponent = 'Betalingshistorik' | 'Betalingmetode' | 'Kontakt Support' | null;
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

const HomeUser = memo(() => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { workoutPrograms, setWorkoutPrograms } = useWorkoutStore();
  const { setUserBookings } = useBookingStore();
  const { userInfo } = useUserStore();
  const [lastestBooking, setLastestBooking] = useState(false);
  const { error } = useSWR(apiUrl + '/workout', {
    onSuccess: (data) => {
      setWorkoutPrograms(data.workouts);
    },
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiUrl}/booking/${userInfo?.user_id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
        });

        const data = await response.json();
        if (data.status === 'success') {
          setUserBookings(data.bookings);
          setLastestBooking(true);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>(null);

  const handleCardClick = (component: ActiveComponent) => {
    setActiveComponent(component);
    onOpen();
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Betalingshistorik':
        return <PaymentHistory />;
      case 'Betalingmetode':
        return <PaymentMethod />;
      case 'Kontakt Support':
        return <Support />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeDesktop
          error={error}
          userCards={userCards}
          workoutPrograms={workoutPrograms || []}
          normalCards={normalCards}
          lastestBooking={lastestBooking}
          handleCardClick={handleCardClick}
        />
      </Suspense>
      <Modal size='5xl' className='dark' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1 text-white'>{activeComponent}</ModalHeader>
          {renderComponent()}
        </ModalContent>
      </Modal>
    </div>
  );
});

export default HomeUser;
