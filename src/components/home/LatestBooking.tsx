import { Card, CardHeader } from '@nextui-org/card';

import useBookingStore from '../../stores/BookingStore';
import { useLocation } from 'wouter';

function LatestBooking() {
  const { userBookings } = useBookingStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();
  // Fetch the lastest booking from the API
  if (userBookings?.length === 0 || !userBookings) {
    return null;
  }
  return (
    <Card
      className='min-w-72 min-h- w-full col-span-2
     border-secondary border-2 rounded cursor-pointer bg-default-100 shadow-none'
    >
      <CardHeader
        onClick={() => {
          setLocation('/booking');
        }}
        className='flex justify-between items-center py-2 px-6'
      >
        <div className='flex w-full justify-between items-center'>
          <div className='flex flex-col items-start justify-center'>
            <p className='text-base flex gap-2 items-center'>
              {userBookings[0].booking_start_hour}:00 - {userBookings[0].booking_end_hour}:00{' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
            </p>
            <p className='text-small text-default-500 bg-se'>
              Boks {userBookings[0].booking_box_id_fk}
            </p>
          </div>
          <h3 className='text-base'>Kode: {userBookings[0].booking_code}</h3>
        </div>
      </CardHeader>
    </Card>
  );
}

export default LatestBooking;
