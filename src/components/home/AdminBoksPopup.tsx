import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Tab, Tabs } from '@nextui-org/tabs';
import { BoksData, BookingByID } from '../../types/AdminBoks';
import { Accordion, AccordionItem, Selection } from '@nextui-org/react';
import { useState } from 'react';

interface AdminBoksPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBoks: BoksData | null;
}

function AdminBoksPopup({ isOpen, onOpenChange, selectedBoks }: AdminBoksPopupProps) {
  const [booking, setBooking] = useState<BookingByID | null>(null);

  const getBooking = async (key: Selection) => {
    const getBookingID = Array.from(key)[0];
    const booking_id = getBookingID.toString().split('-')[0];
    const response = await fetch(import.meta.env.VITE_API_URL + '/admin/booking/' + booking_id, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': import.meta.env.VITE_API_KEY as string,
      },
    });
    const data = await response.json();
    setBooking(data);
  };

  return (
    <Modal
      size='5xl'
      className='bg-default-800 text-white'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={'inside'}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Boks {selectedBoks?.box_id} - Tider
            </ModalHeader>
            <ModalBody>
              <div className='flex w-full flex-col overflow-scroll'>
                <Tabs className='dark' aria-label='Options'>
                  {selectedBoks?.dates &&
                    Object.keys(selectedBoks.dates).map((date, index) => (
                      <Tab key={index} title={date}>
                        <Card className='dark'>
                          <CardBody>
                            <Accordion className='' onSelectionChange={(key) => getBooking(key)}>
                              {Object.entries(selectedBoks.dates[date]).map(([time, timeData]) => {
                                return (
                                  <AccordionItem
                                    key={
                                      timeData.booking
                                        ? timeData.booking.booking_id + '-' + time
                                        : time
                                    }
                                    isCompact={true}
                                    isDisabled={timeData.available}
                                    className={`px-2 mb-2 rounded opacity-100  ${
                                      timeData.available
                                        ? 'bg-success-100 text-success-700'
                                        : 'bg-danger-100 text-danger-700'
                                    }`}
                                    aria-label='Accordion 1'
                                    title={
                                      <div className='flex justify-between'>
                                        <span>{time + ':00'}</span>
                                        {timeData.booking && (
                                          <span>
                                            {timeData.booking?.start_hour} -{' '}
                                            {timeData.booking?.end_hour}:{' '}
                                            {timeData.booking?.duration}{' '}
                                            {timeData.booking?.duration > 1 ? 'Timer' : 'Time'}
                                          </span>
                                        )}
                                        <span>
                                          {timeData.available ? 'Available' : 'Unavailable'}
                                        </span>
                                      </div>
                                    }
                                  >
                                    <div className='grid sm:grid-cols-2 gap-2'>
                                      <p>Fitness Center: {booking?.fitness_center_name}</p>
                                      <p>
                                        Booket Af:{' '}
                                        {`${booking?.user_first_name} ${booking?.user_last_name}`}
                                      </p>
                                      <p>Booking Kode: {booking?.booking_code}</p>
                                      <p>Booking Dato: {booking?.booking_date}</p>
                                      <Button
                                        color='danger'
                                        size='sm'
                                        onClick={() => alert('Det vel en "Nice to have".')}
                                      >
                                        Slet Booking
                                      </Button>
                                    </div>
                                  </AccordionItem>
                                );
                              })}
                            </Accordion>
                          </CardBody>
                        </Card>
                      </Tab>
                    ))}
                </Tabs>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onPress={onClose}>
                Luk
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AdminBoksPopup;
