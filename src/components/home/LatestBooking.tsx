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
     border-secondary border-2 rounded cursor-pointer'
    >
      <CardHeader
        onClick={() => {
          setLocation('/booking');
        }}
        className='flex justify-between items-center py-2 px-6'
      >
        <div className='flex w-full justify-between items-center'>
          <div className='flex flex-col items-start justify-center'>
            <p className='text-base'>
              {userBookings[0].booking_start_hour}:00 - {userBookings[0].booking_end_hour}:00
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
