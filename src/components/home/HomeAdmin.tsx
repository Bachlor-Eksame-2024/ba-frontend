import { useState } from 'react';
import Dashboard from './Dashboard';
import AdminUsers from './AdminUsers';
import AdminSidebar from './AdminSidebar';
import AdminBokse from './AdminBokse';
import AdminWorkout from './admin-workout/AdminWorkout';

function HomeAdmin() {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');

  return (
    <div className='md:flex gap-4'>
      <div className=' basis-1/4'>
        <AdminSidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>

      {selectedMenu === 'Dashboard' && <Dashboard />}
      {selectedMenu === 'Brugere' && <AdminUsers />}
      {selectedMenu === 'Bokse' && <AdminBokse />}
      {selectedMenu === 'Workout Programmer' && <AdminWorkout />}
    </div>
  );
}

export default HomeAdmin;
