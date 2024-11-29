import { useState } from 'react';
import { useLocation } from 'wouter';
import Calendar from './Calendar';

const TimeSlotSelector: React.FC = () => {
  const [, setLocation] = useLocation();
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

  const handleClose = () => {
    setLocation('/booking');
  };

  const handleConfirm = () => {
    if (selectedSlot && selectedAmount) {
      alert(`Booked for ${selectedSlot}`);
      handleClose();
    }
  };

  return (
    <div className='fixed inset-0 bg-default-50 flex items-center justify-center z-50 overflow-auto transition-colors'>
      <div className='px-6 w-96'>
        <Calendar />
        <h2 className='text-md font-bold mb-4 mt-8'>Vælg antal timer</h2>
        <div className='flex gap-2 p-2 rounded bg-default-800 bg-opacity-10'>
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
        <h2 className='text-md font-bold mb-4 mt-8'>Vælg periode</h2>
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
        <div className='mt-4 flex justify-between'>
          <button onClick={handleClose} className='bg-gray-300 text-black px-4 py-2 rounded'>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className='bg-green-500 text-white px-4 py-2 rounded'
            disabled={!selectedSlot && !selectedAmount}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
