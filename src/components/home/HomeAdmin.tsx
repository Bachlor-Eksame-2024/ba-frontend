import { useState } from 'react';
import Dashboard from './Dashboard';

function HomeAdmin() {
  const [selectedMenu, setSelectedMenu] = useState('Dashboard');
  return <Dashboard setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />;
}

export default HomeAdmin;
