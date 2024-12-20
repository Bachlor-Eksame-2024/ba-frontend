import { memo } from 'react';
import Dashboard from './Dashboard';
import AdminUsers from './AdminUsers';
import AdminSidebar from './AdminSidebar';
import AdminBokse from './AdminBokse';
import AdminWorkout from './admin-workout/AdminWorkout';
import useAdminMenuStore from '../../stores/adminMenuStore';

const HomeAdmin = memo(() => {
  const { adminMenu } = useAdminMenuStore();

  return (
    <div className='md:flex gap-4'>
      <div className=' basis-1/4'>
        <AdminSidebar />
      </div>

      {adminMenu === 'Dashboard' && <Dashboard />}
      {adminMenu === 'Brugere' && <AdminUsers />}
      {adminMenu === 'Bokse' && <AdminBokse />}
      {adminMenu === 'Workout Programmer' && <AdminWorkout />}
    </div>
  );
});

export default HomeAdmin;
