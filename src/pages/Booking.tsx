import { useState } from 'react';
import { Link } from 'wouter';

const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>
);

const BookingInterface = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const bookings = [
    { date: '24. Nov', room: '7', period: '11-13' },
    { date: '27. Nov', room: '4', period: '14-16' },
    { date: '2. Dec', room: '6', period: '18-20' },
    { date: '9. Dec', room: '4', period: '9-16' },
  ];

  const handleSelection = (date: string) => {
    setSelectedDates((prev) => {
      if (prev.includes(date)) {
        return prev.filter((d) => d !== date);
      } else {
        return [...prev, date];
      }
    });
  };

  return (
    <div>
      <div className='h-screen bg-default-50'>
        <div className='px-6 w-96'>
          <h2 className='text-md font-medium mb-4 mt-3'>Mine bookinger</h2>
          <div className='bg-default-800 bg-opacity-10 p-3 rounded text-center'>
            {/* Header */}
            <div className='grid grid-cols-4 mb-2 text-gray-300'>
              <div className='col-start-2'>Dato</div>
              <div>Rum</div>
              <div>Periode</div>
            </div>
            <div className='h-px w-full bg-default-200'></div>

            {/* Booking rows */}
            {bookings.map((booking) => (
              <div
                key={booking.date}
                className={`grid grid-cols-4 items-center text-center py-2 rounded-full cursor-pointer transition-colors ${
                  selectedDates.includes(booking.date) ? 'bg-default-300' : 'hover:bg-default-200'
                }`}
                onClick={() => handleSelection(booking.date)}
              >
                <div className='flex justify-center'>
                  <div className='w-5 h-5 rounded border border-gray-500 flex items-center justify-center'>
                    {selectedDates.includes(booking.date) && <CheckIcon />}
                  </div>
                </div>
                <div>{booking.date}</div>
                <div>{booking.room}</div>
                <div>{booking.period}</div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className='mt-6'>
            <Link href='/booking/select-time-slot' className=''>
              <button className='w-full py-4 bg-secondary hover:bg-secondary-500 text-white rounded transition-colors'>
                Book tid
              </button>
            </Link>
            {selectedDates.length > 0 && (
              <button
                className='w-full py-4 bg-danger-500 bg-opacity-10 border-1 border-danger-500 text-danger-500 rounded hover:bg-opacity-15 transition-colors'
                onClick={() => setSelectedDates([])}
              >
                Slet valgte
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;
