import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'wouter';
import useBookingStore from '../stores/BookingStore';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { CurrentBookings } from '../types/bookings';
import useUserStore from '../stores/UserStore';
// BACKEND_URL and API_KEY are defined in .env files
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const TrashIcon = () => (
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
      d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
    />
  </svg>
);

const BookingInterface = () => {
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const { userBookings, setUserBookings } = useBookingStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userInfo } = useUserStore();

  const handleSelection = (id: number) => {
    if (selectedBooking === id) {
      setSelectedBooking(null);
      return;
    }
    setSelectedBooking(id);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiUrl}/booking/get-bookings`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
          body: JSON.stringify({
            user_id: userInfo?.user_id,
          }),
        });

        const data = await response.json();
        if (data.status === 'success') {
          setUserBookings(data.bookings);
        }
        console.log('Bookings:', data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
    // [] MÅ IKKE SLETTES!! Skaber Infinite loop hvis den slettes
  }, []);

  function formatDateToDanishShort(dateString: string): string {
    const date = new Date(dateString);

    // Array of Danish month abbreviations
    const monthsShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Maj',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dec',
    ];

    const day = date.getDate();
    const monthAbbrev = monthsShort[date.getMonth()];

    return `${day}. ${monthAbbrev}`;
  }

  const handelDeleteBooking = async () => {
    try {
      const response = await fetch(`${apiUrl}/booking/delete-booking`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          booking_id: selectedBooking,
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        if (userBookings)
          setUserBookings(
            userBookings?.filter((booking) => booking.booking_id !== selectedBooking)
          );
        setSelectedBooking(null);
      }
      console.log('Bookings:', data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className='max-w-7xl w-full mx-auto'>
      <div className='h-screen  bg-default-50'>
        <div className='px-4 w-96 md:w-full md:mt-24 md:px-32 place-self-center'>
          <h2 className='text-md font-medium mb-4 mt-3'>Mine bookinger</h2>
          <div className='bg-default-800 bg-opacity-10 p-3 rounded text-center'>
            {/* Header */}
            <div className='grid grid-cols-5 mb-2 text-gray-300'>
              <div>Dato</div>
              <div>Rum</div>
              <div>Periode</div>
              <div>Kode</div>
            </div>
            <div className='h-px w-full bg-default-200'></div>

            {/* Booking rows */}
            {userBookings?.map((booking: CurrentBookings) => (
              <div
                key={booking.booking_id}
                className={`grid grid-cols-5 gap-2 justify-items-center text-center py-3 my-2 rounded-full transition-colors`}
              >
                <div>{formatDateToDanishShort(booking.booking_date)}</div>
                <div>{booking.booking_box_id_fk}</div>
                <div>
                  {booking.booking_start_hour} - {booking.booking_end_hour}
                </div>
                <div>{booking.booking_code}</div>

                <div
                  onClick={() => {
                    onOpen();
                    handleSelection(booking.booking_id);
                  }}
                  className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer ${
                    selectedBooking === booking.booking_id ? 'text-danger' : 'hover:text-danger'
                  }`}
                >
                  <TrashIcon />
                </div>
              </div>
            ))}

            <Modal
              placement='center'
              className='dark text-white'
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className='flex flex-col gap-1'>Slet denne booking</ModalHeader>
                    <ModalBody>
                      <p>
                        Er du sikker på, at du vil slette denne booking? Handlingen kan ikke
                        fortrydes.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='secondary' variant='light' onPress={onClose}>
                        Fortryd
                      </Button>
                      <Button
                        onClick={() => handelDeleteBooking()}
                        color='danger'
                        onPress={onClose}
                      >
                        Slet
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          {/* Action buttons */}
          <div className='mt-6 md:flex md:gap-6'>
            <Link href='/booking/select-time-slot' className='md:w-1/3'>
              <button className='w-full py-4 bg-secondary hover:bg-secondary-500 text-white rounded transition-colors'>
                Book ny tid
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInterface;
