import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import HomeIcon from '../../assets/icons/home.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import GraphIcon from '../../assets/icons/graph.svg';
import UserIcon from '../../assets/icons/user.svg';

const MobileNavigation = () => {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(location);

  const navItems = [
    {
      icon: HomeIcon,
      name: 'home',
      path: '/home',
    },
    {
      icon: CalendarIcon,
      name: 'booking',
      path: '/booking',
    },
    {
      icon: GraphIcon,
      name: 'workout-programs',
      path: '/workout-programs',
    },
    {
      icon: UserIcon,
      name: 'user',
      path: '/profile/user',
    },
  ];

  return (
    <div className='fixed bottom-2 left-2 right-2 bg-default-100 flex justify-around py-2 rounded-full z-50 border-1 border-default-800 md:hidden'>
      {navItems.map((item) => (
        <Link
          href={item.path}
          key={item.name}
          onClick={() => setActiveTab(item.path)}
          className='flex items-center justify-center rounded-full'
        >
          <button
            className={`flex items-center justify-center p-2 rounded-full ${
              activeTab === item.path ? 'bg-default-300' : 'hover:bg-default-200'
            } transition-colors duration-200`}
          >
            <img
              src={item.icon}
              alt={`${item.name} icon`}
              className={`w-8 h-8 ${
                activeTab === item.name ? 'opacity-70' : 'opacity-100 filter brightness-0 invert'
              }`}
            />
          </button>
        </Link>
      ))}
    </div>
  );
};

export default MobileNavigation;
