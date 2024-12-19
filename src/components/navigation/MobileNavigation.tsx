import { Drawer, DrawerContent, DrawerBody, Button, useDisclosure } from '@nextui-org/react';
import { Link } from 'wouter';

export default function MobileNavigation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex justify-end md:hidden absolute top-4 right-7'>
        <Button onPress={onOpen}>Menu</Button>
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