import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Tab, Tabs } from '@nextui-org/tabs';
import { BoksData } from '../../types/AdminBoks';

interface AdminBoksPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedBoks: BoksData | null;
}

function AdminBoksPopup({ isOpen, onOpenChange, selectedBoks }: AdminBoksPopupProps) {
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
                            <ul>
                              {Object.entries(selectedBoks.dates[date]).map(([time, timeData]) => (
                                <li
                                  key={time}
                                  className={`p-2 rounded flex justify-between items-center ${
                                    timeData.available
                                      ? 'bg-success-100 text-success-700'
                                      : 'bg-danger-100 text-danger-700'
                                  }`}
                                >
                                  <span>{time}:00</span>
                                  {timeData.booking && (
                                    <span>
                                      {timeData.booking?.start_hour} - {timeData.booking?.end_hour}:{' '}
                                      {timeData.booking?.duration}{' '}
                                      {timeData.booking?.duration > 1 ? 'Timer' : 'Time'}
                                    </span>
                                  )}
                                  <span>{timeData.available ? 'Available' : 'Unavailable'}</span>
                                </li>
                              ))}
                            </ul>
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
