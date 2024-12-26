import {
  Drawer,
  DrawerContent,
  DrawerBody,
  Button,
  useDisclosure,
  Divider,
} from '@nextui-org/react';
import { Link } from 'wouter';
import useAdminMenuStore from '../../stores/adminMenuStore';
import { useLogout } from '../../hooks/useLogout';
import useUserStore from '../../stores/UserStore';

export default function MobileNavigation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { logout, isLoading } = useLogout();
  const { userInfo } = useUserStore();
  const { setAdminMenu } = useAdminMenuStore();

  console.log(userInfo);
  return (
    <>
      <div className='flex justify-end md:hidden absolute top-4 right-7'>
        <Button isIconOnly onPress={onOpen} className='rounded-full p-2 bg-default-100'>
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
                    className='text-lg hover:text-secondary transition-colors'
                    onClick={() => {
                      setAdminMenu('Dashboard');
                      onClose();
                    }}
                  >
                    Hjem
                  </Link>
                  <Link
                    href='/booking'
                    className='text-lg hover:text-secondary transition-colors'
                    onClick={onClose}
                  >
                    Booking
                  </Link>
                  <Link
                    href='/workout-programs'
                    className='text-lg hover:text-secondary transition-colors'
                    onClick={onClose}
                  >
                    Programmer
                  </Link>
                  <Link
                    href='/profile/user'
                    className='text-lg hover:text-secondary transition-colors'
                    onClick={onClose}
                  >
                    Profil
                  </Link>

                  {userInfo?.user_role_name === 'admin' && (
                    <div className='flex flex-col gap-4'>
                      <Divider className='border-default-800' />
                      <Link
                        href='/home'
                        className='text-md text-default-700 hover:text-secondary transition-colors w-fit'
                        onClick={() => {
                          setAdminMenu('Brugere');
                          onClose();
                        }}
                      >
                        Brugere
                      </Link>
                      <Link
                        href='/home'
                        className='text-md hover:text-secondary transition-colors w-fit'
                        onClick={() => {
                          setAdminMenu('Bokse');
                          onClose();
                        }}
                      >
                        Bokse
                      </Link>
                      <Link
                        href='/home'
                        className='text-md hover:text-secondary transition-colors w-fit'
                        onClick={() => {
                          setAdminMenu('Workout Programmer');
                          onClose();
                        }}
                      >
                        Workout Programmer
                      </Link>
                      <Button
                        spinner={isLoading}
                        isLoading={isLoading}
                        color='danger'
                        className='text-md hover:text-danger transition-colors text-danger w-fit bg-transparent p-0 text-left min-w-0'
                        onPress={() => {
                          setAdminMenu('Dashboard');
                          onClose();
                          logout();
                        }}
                      >
                        Log ud
                      </Button>
                    </div>
                  )}
                </nav>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}