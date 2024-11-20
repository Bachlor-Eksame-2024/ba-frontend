import { useLocation } from 'wouter';
import TimeSlotSelector from '../components/booking/TimeSlotSelector';

const Booking: React.FC = () => {
  const [location] = useLocation();

  return (
    <div>
      <h1>Booking Page</h1>
      <button
        onClick={() => {
          history.pushState(null, '', '/booking/select-time-slot');
        }}
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Book Now
      </button>

      {location === '/booking/select-time-slot' && <TimeSlotSelector />}
    </div>
  );
};

export default Booking;
