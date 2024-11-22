import { useState } from 'react';
import Dashboard from './Dashboard';
import AdminUsers from './AdminUsers';
import AdminSidebar from './AdminSidebar';
import WorkoutPrograms from '../../pages/WorkoutPrograms';
import AdminBokse from './AdminBokse';

function HomeAdmin() {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  return (
    <div className='md:flex  gap-4'>
      <div className='max-md:hidden basis-1/5'>
        <AdminSidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>
      {selectedMenu === 'Dashboard' && <Dashboard />}
      {selectedMenu === 'Brugere' && <AdminUsers />}
      {selectedMenu === 'Bokse' && <AdminBokse />}
      {selectedMenu === 'Workout Programmer' && <WorkoutPrograms />}
    </div>
  );
}

export default HomeAdmin;
