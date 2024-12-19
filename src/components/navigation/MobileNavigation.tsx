import { Drawer, DrawerContent, DrawerBody, Button, useDisclosure } from '@nextui-org/react';
import { Link } from 'wouter';

export default function MobileNavigation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex justify-end md:hidden absolute top-4 right-7'>
        <Button isIconOnly className='' onPress={onOpen}>
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
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </Button>
      </div>
      <Drawer className='dark text-white' size='xs' isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody>
                <nav className='flex flex-col gap-10 pt-8'>
                  <Link
                    href='/'
                    className='text-lg hover:text-primary transition-colors'
                    onClick={onClose}
                  >
                    Hjem
                  </Link>
                  <Link
                    href='/booking'
                    className='text-lg hover:text-primary transition-colors'
                    onClick={onClose}
                  >
                    Booking
                  </Link>
                  <Link
                    href='/workout-programs'
                    className='text-lg hover:text-primary transition-colors'
                    onClick={onClose}
                  >
                    Programmer
                  </Link>
                  <Link
                    href='/profile/user'
                    className='text-lg hover:text-primary transition-colors'
                    onClick={onClose}
                  >
                    Profil
                  </Link>
                </nav>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
