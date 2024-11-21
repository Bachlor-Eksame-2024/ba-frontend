import { Link } from 'wouter';
import EditProfile from './EditProfile';
import { useDisclosure } from '@nextui-org/modal';

interface AdminSidebarProps {
  setSelectedMenu: (menu: string) => void;
  selectedMenu: string;
}

function AdminSidebar({ setSelectedMenu, selectedMenu }: AdminSidebarProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const sidebarMenu = [
    { name: 'Dashboard', link: '/admin/dashboard' },
    { name: 'Brugere', link: '/admin/users' },
    { name: 'Bokse', link: '/admin/bokse' },
    { name: 'Workout Programmer', link: '/admin/workout-programmer' },
  ];

  return (
    <aside>
      <section className='grid gap-8 bg-default-100 w-[17rem] px-4 pt-6 pb-8 rounded-xl cursor-pointer'>
        {/* Replace with admin Profil */}
        <div className='flex gap-2 items-center' onClick={onOpen}>
          <img
            className='w-14 h-14 object-cover rounded-full'
            src='https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
          <div>
            <h3>Junior Garcia</h3>
            <p className='text-xs text-gray-300'>Admin - Østerbrogade</p>
          </div>
        </div>
        {/* Sidebar Menu options */}
        <ul className='grid gap-4'>
          {sidebarMenu.map((menu, index) => (
            <li
              key={index}
              className={`${menu.name === selectedMenu && 'bg-secondary-500'} hover:bg-secondary-500 rounded-xl py-2 pl-2 w-full cursor-pointer text-base`}
              onClick={() => setSelectedMenu(menu.name)}
            >
              <Link href=''>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </section>
      <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
    </aside>
  );
}

export default AdminSidebar;
