import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/select';
import { useState } from 'react';

interface AdminNewWorkoutProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function AdminNewWorkout({ isOpen, onOpenChange }: AdminNewWorkoutProps) {
  const [weeks, setWeeks] = useState(1);
  const AddExercise = () => {
    return (
      <div>
        <Input label='Titel' />
        <Input label='Beskrivelse' />
      </div>
    );
  };
  const AddWeek = ({ index }: { index: number }) => {
    return (
      <div className='grid gap-2'>
        <h4>Uge {index + 1}</h4>
        <Input label='Titel' />
        <Input label='Beskrivelse' />
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
            <ModalBody className='max-h-[80vh]'>
              <form action='' className='overflow-auto p-1 grid gap-2'>
                <Input label='Titel' />
                <Input label='Beskrivelse' />
                <Select label='Træningsniveau'>
                  <SelectItem key='Beginner' value='Beginner'>
                    Beginner
                  </SelectItem>
                  <SelectItem key='Advanced' value='Advanced'>
                    Advanced
                  </SelectItem>
                  <SelectItem key='Intermediate' value='Intermediate'>
                    Intermediate
                  </SelectItem>
                </Select>
                {[...Array(weeks)].map((_, index) => {
                  return (
                    <div key={index}>
                      <AddWeek index={index} />
                      <AddExercise />
                    </div>
                  );
                })}
                <div className='flex justify-between items-center'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setWeeks(weeks + 1);
                    }}
                    className='flex gap-2 items-center'
                  >
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
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                    Tilføj Uge
                  </button>
                  {weeks > 1 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (weeks > 1) setWeeks(weeks - 1);
                      }}
                      className='flex gap-2 items-center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                      </svg>
                      Fjern Uge
                    </button>
                  )}
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AdminNewWorkout;
