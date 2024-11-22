import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const DesktopNavigation = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(location);

  const navItems = [
    {
      name: 'Login',
      path: '/login',
    },
    {
      name: 'Signup',
      path: '/signup',
    },
    {
      name: 'Booking',
      path: '/booking',
    },
    {
      name: 'Workouts',
      path: '/workout-programs',
    },
    {
      name: 'User',
      path: '/user/profile',
    },
    {
      name: 'Admin',
      path: '/admin/profile',
    },
  ];

  return (
    <div className='fixed top-0 left-0 right-0 bg-default-50 bg-opacity-95 backdrop-blur-md justify-between items-center px-14 h-14 z-50 hidden md:flex'>
      <div className='flex items-center'>
        <Link href='/home' onClick={() => setActiveTab('')}>
          <span className='text-xl font-bold cursor-pointer'>fitboks</span>
        </Link>
      </div>
      <div className='flex space-x-4'>
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            onClick={() => setActiveTab(item.path)}
            className={`flex items-center justify-center p-2 rounded-full ${
              activeTab === item.path ? 'bg-default-300' : 'hover:bg-default-200'
            } transition-colors duration-200`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopNavigation;
