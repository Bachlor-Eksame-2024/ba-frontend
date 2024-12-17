import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import Logo from '../../assets/logo/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@nextui-org/button';
import { useLogout } from '../../hooks/useLogout';

const DesktopNavigation = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(location);
  const { isAuthenticated } = useAuth();
  const { logout, isLoading } = useLogout();
  const navItems = [
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
            className={`flex items-center justify-center px-4 rounded-full ${
              activeTab === item.path ? 'bg-default-300' : 'hover:bg-default-200'
            } transition-colors duration-200`}
          >
            {item.name}
          </Link>
        ))}
        <Button className='bg-transparent' onClick={logout} isLoading={isLoading}>
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default DesktopNavigation;
