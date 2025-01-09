import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import Logo from '../../assets/logo/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@nextui-org/button';
import { useLogout } from '../../hooks/useLogout';

const loggedInNavItems = [
  {
    name: 'Booking',
    path: '/booking',
  },
  {
    name: 'Programmer',
    path: '/workout-programs',
  },
  {
    name: 'Profil',
    path: '/user/profile',
  },
];
const loggedOutNavItems = [
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Opret bruger',
    path: '/signup',
  },
];

const DesktopNavigation = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(location);
  const { isAuthenticated } = useAuth();
  const { logout, isLoading } = useLogout();
  const [navItems, setNavItems] = useState(loggedInNavItems);

  useEffect(() => {
    if (!isAuthenticated) {
      setNavItems(loggedOutNavItems);
    }
    if (isAuthenticated) {
      setNavItems(loggedInNavItems);
    }
  }, [isAuthenticated]);

  return (
    <div className='fixed top-0 left-0 right-0 bg-default-50 bg-opacity-85 backdrop-blur-md justify-between items-center px-14 h-14 z-50 hidden md:flex'>
      <div className='flex items-center'>
        <Link href={isAuthenticated ? '/home' : '/'} onClick={() => setActiveTab('')}>
          <img src={Logo} alt='fitboks logo' className='h-8 cursor-pointer' />
        </Link>
      </div>
      <div className='flex space-x-4'>
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            onClick={() => setActiveTab(item.path)}
            className={`flex items-center justify-center px-4 h-10 border-b-2 w-fit border-b-transparent ${
              activeTab === item.path ? 'border-b-[#7828c8] ' : 'hover:border-b-secondary'
            } transition-colors duration-200`}
          >
            {item.name}
          </Link>
        ))}
        {isAuthenticated && (
          <Button
            className='bg-transparent p-0 rounded-none border-b-2 w-fit border-b-transparent hover:border-b-danger text-danger h-10'
            onClick={logout}
            isLoading={isLoading}
          >
            LOG UD
          </Button>
        )}
      </div>
    </div>
  );
};

export default DesktopNavigation;
