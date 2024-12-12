import { useState, useEffect } from 'react';
import Calendar from './Calendar';
import DesktopCalendar from './DesktopCalendar';
import MobileNavigation from '../navigation/MobileNavigation';
import DesktopNavigation from '../navigation/DesktopNavigation';
import useUserStore from '../../stores/UserStore';
import useCollectedBooking from '../../stores/CollectedBookingStore';
interface TimeSlotSelectorProps {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Slot {
  start_hour: string;
  end_hour: string;
}
interface BoxAvailability {
  box_availability: {
    [key: string]: Slot[];
  };
}
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const TimeSlotSelector = ({ setShowPayment }: TimeSlotSelectorProps) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const [availableBoxes, setAvailableBoxes] = useState<BoxAvailability>({ box_availability: {} });
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>('1');
  const [selectedDate, setSelectedDate] = useState('');
  const { userInfo } = useUserStore();
  const { setCollectedBooking } = useCollectedBooking();

  const timeAmount = ['1', '2', '3', '4'];

  // Function get available time slots

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY/MM/DD format

  useEffect(() => {
    const getAvailableTimeSlots = async () => {
      const response = await fetch(apiUrl + '/booking/get-available-time-slots', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          fitness_center_id: userInfo?.fitness_center_id,
          booking_date: selectedDate,
          current_time:
            selectedDate === today
              ? new Date(new Date().getTime())
                  .toLocaleTimeString('da-DK', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })
                  .replace('.', ':')
              : '05:00',
          duration_hours: selectedAmount ? parseInt(selectedAmount) : 1,
        }),
      });
      const data = await response.json();
      // Process the data to get unique time slots
      const uniqueTimeSlots = new Set<string>();
      Object.values(data.box_availability).forEach((box) => {
        const boxAvailability = box as Slot[];
        boxAvailability.forEach((slot: Slot) => {
          const timeSlot = `${slot.start_hour}-${slot.end_hour}`;
          uniqueTimeSlots.add(timeSlot);
        });
      });

      setAvailableTimeSlots(Array.from(uniqueTimeSlots));
      setAvailableBoxes(data);
    };
    if (selectedDate) {
      getAvailableTimeSlots();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedAmount]);

  // When done with selection, the user will be redirected to the payment page
  const handleConfirm = () => {
    if (selectedSlot && selectedAmount) {
      // alert(`Booked for ${selectedSlot}`);

      // use the availableBoxes and the selectedSlot to find a box that has the selected slot
      // divide the selectedSlot into start and end hour and find the box that has the same start and end hour
      const [startHour, endHour] = selectedSlot.split('-');
      let selectedBoxId = null;

      Object.entries(availableBoxes.box_availability).forEach(([boxId, slots]) => {
        const boxSlots = slots as Slot[];
        boxSlots.forEach((slot) => {
          if (slot.start_hour.toString() === startHour && slot.end_hour.toString() === endHour) {
            selectedBoxId = boxId;
          }
        });
      });

      if (selectedBoxId) {
        // Proceed with booking logic
        console.log(`Booking box ID: ${selectedBoxId}`);
        if (
          userInfo?.user_id &&
          selectedBoxId &&
          selectedDate &&
          startHour &&
          endHour &&
          selectedAmount
        ) {
          const bookingData = {
            user_id: userInfo.user_id,
            booking_box_id_fk: parseInt(selectedBoxId),
            booking_date: selectedDate,
            booking_start_hour: parseInt(startHour),
            booking_duration_hours: parseInt(selectedAmount),
            booking_end_hour: parseInt(endHour),
          };
          setCollectedBooking(bookingData);
          setShowPayment(true);
        }
      } else {
        console.error('No available box found for the selected time slot');
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-default-50 flex items-top md:items-center justify-center z-50 overflow-auto transition-colors'>
      <MobileNavigation />
      <DesktopNavigation />
      <div className='md:flex md:gap-40'>
        <div className='hidden md:inline-block w-96'>
          <h2 className='text-md font-medium mb-4'>Vælg antal timer</h2>
          <div className='gap-2 p-2 rounded bg-default-800 bg-opacity-10 md:flex hidden'>
            {timeAmount.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`h-16 w-1/4 rounded text-base font-medium ${
                  selectedAmount === amount
                    ? 'bg-secondary text-text-default-800'
                    : 'text-default-800 hover:bg-default-800 hover:bg-opacity-15'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
          <h2 className='text-md font-medium mb-4 md:mt-8'>Vælg dato</h2>
          <DesktopCalendar setSelectedDate={setSelectedDate} />
          {selectedSlot && selectedAmount && (
            <button
              onClick={handleConfirm}
              className='md:w-96 md:place-self-left left-2 right-2 bg-secondary flex justify-around py-5 mt-8 rounded-full z-50 text-base font-medium'
            >
              Videre
            </button>
          )}
        </div>
        <div className='px-6 md:px-0 w-96'>
          <h2 className='text-md font-medium mb-4 md:hidden'>Vælg dato</h2>
          <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
          <h2 className='text-md font-medium mb-4 mt-8 md:mt-0 md:hidden'>Vælg antal timer</h2>
          <div className='flex gap-2 p-2 rounded bg-default-800 bg-opacity-10 md:hidden'>
            {timeAmount.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`h-16 w-1/4 rounded ${
                  selectedAmount === amount
                    ? 'bg-secondary text-default-800'
                    : 'text-default-800 hover:bg-default-800 hover:bg-opacity-15'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
          <h2 className='text-md font-medium mb-4 mt-8 md:mt-0'>Ledige periode</h2>
          <div className='flex flex-col gap-2 text-base font-medium md:h-[80vh] md:overflow-auto'>
            {availableTimeSlots.length > 0 ? (
              availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`h-16 py-5 rounded ${
                    selectedSlot === slot
                      ? 'bg-secondary text-default-800'
                      : 'bg-default-800 bg-opacity-10 text-default-800 hover:bg-default-800 hover:bg-opacity-15'
                  }`}
                >
                  {slot}
                </button>
              ))
            ) : (
              <p>Vælg antal timer</p>
            )}
            <div className='hidden md:block absolute bottom-10 h-16 w-96 bg-gradient-to-t from-default-50 to-transparent pointer-events-none'></div>
          </div>
          {selectedSlot && selectedAmount && (
            <button
              onClick={handleConfirm}
              className='fixed md:hidden bottom-20 md:w-96 left-2 right-2 bg-secondary flex justify-around py-5 rounded-full z-50 font-medium'
            >
              Videre
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
