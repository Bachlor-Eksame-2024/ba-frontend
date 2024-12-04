import { useState } from 'react';
import Calendar from './Calendar';
import DesktopCalendar from './DesktopCalendar';
import MobileNavigation from '../navigation/MobileNavigation';
import DesktopNavigation from '../navigation/DesktopNavigation';

interface TimeSlotSelectorProps {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeSlotSelector = ({ setShowPayment }: TimeSlotSelectorProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  const timeAmount = ['1', '2', '3', '4'];

  const timeSlots = [
    '9:00 - 11.00',
    '10:00 - 12.00',
    '11:00 - 13.00',
    '12:00 - 14.00',
    '13:00 - 15.00',
    '14:00 - 16.00',
  ];

  const handleConfirm = () => {
    if (selectedSlot && selectedAmount) {
      // alert(`Booked for ${selectedSlot}`);
      setShowPayment(true);
    }
  };

  return (
    <div className='fixed inset-0 bg-default-50 flex items-center justify-center z-50 overflow-auto transition-colors'>
      <MobileNavigation />
      <DesktopNavigation />
      <div className='flex gap-40'>
        <div className='hidden md:inline-block w-96'>
          <h2 className='text-md font-medium mb-4'>Vælg antal timer</h2>
          <div className='gap-2 p-2 rounded bg-default-800 bg-opacity-10 md:flex hidden'>
            {timeAmount.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`h-16 w-1/4 rounded ${
                  selectedAmount === amount
                    ? 'bg-secondary text-secondary-900'
                    : 'text-default-800 hover:bg-default-800 hover:bg-opacity-15'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
          <h2 className='text-md font-medium mb-4 md:mt-8'>Vælg dato</h2>
          <DesktopCalendar />
        </div>
        <div className='px-6 md:px-0 w-96'>
          <h2 className='text-md font-medium mb-4 md:hidden'>Vælg dato</h2>
          <Calendar />
          <h2 className='text-md font-medium mb-4 mt-8 md:mt-0 md:hidden'>Vælg antal timer</h2>
          <div className='flex gap-2 p-2 rounded bg-default-800 bg-opacity-10 md:hidden'>
            {timeAmount.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`h-16 w-1/4 rounded ${
                  selectedAmount === amount
                    ? 'bg-secondary text-secondary-900'
                    : 'text-default-800 hover:bg-default-800 hover:bg-opacity-15'
                }`}
              >
                {amount}
              </button>
            ))}
          </div>
          <h2 className='text-md font-medium mb-4 mt-8 md:mt-0'>Ledige periode</h2>
          <div className='flex flex-col gap-2'>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`h-16 rounded ${
                  selectedSlot === slot
                    ? 'bg-secondary text-secondary-900'
                    : 'bg-default-800 bg-opacity-10 text-default-800 hover:bg-default-800 hover:bg-opacity-15'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {selectedSlot && selectedAmount && (
            <button
              onClick={handleConfirm}
              className='fixed bottom-20 md:bottom-4 md:w-96 md:place-self-left left-2 md:left-32 right-2 md:right-0 bg-secondary flex justify-around py-5 rounded-full z-50'
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
