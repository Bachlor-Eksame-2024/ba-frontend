import { Link } from 'wouter';
import EditProfile from './EditProfile';
import { useDisclosure } from '@nextui-org/modal';
import useUserStore from '../../stores/UserStore';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { useLogout } from '../../hooks/useLogout';

interface AdminSidebarProps {
  setSelectedMenu: (menu: string) => void;
  selectedMenu: string;
}

function AdminSidebar({ setSelectedMenu, selectedMenu }: AdminSidebarProps) {
  const { userInfo } = useUserStore();
  const { logout, isLoading } = useLogout();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const sidebarMenu = [
    { name: 'Dashboard', link: '/admin/dashboard' },
    { name: 'Brugere', link: '/admin/users' },
    { name: 'Bokse', link: '/admin/bokse' },
    { name: 'Workout Programmer', link: '/admin/workout-programmer' },
  ];

  const MobileManu = () => (
    <div className='md:hidden'>
      <Dropdown className='dark'>
        <DropdownTrigger>
          <Button color={'secondary'} size='lg' variant={'solid'} className='capitalize rounded'>
            {selectedMenu}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) => {
            if (key === 'Log ud') {
              logout();
              return;
            }
            setSelectedMenu(key as string);
          }}
          className='text-white'
          aria-label='Dropdown Variants'
          color={'secondary'}
          variant={'solid'}
        >
          <DropdownItem key='Dashboard'>Dashboard</DropdownItem>
          <DropdownItem key='Brugere'>Brugere</DropdownItem>
          <DropdownItem key='Bokse'>Bokse</DropdownItem>
          <DropdownItem key='Workout Programmer'>Workout Programmer</DropdownItem>
          <DropdownItem key='Log ud' color='danger' className='text-danger'>
            Log ud
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  return (
    <aside>
      <section className='md:grid max-md:flex max-md:items-center max-md:justify-between gap-8 bg-default-100 min-w-[17rem] md:w-80 md:min-h-[30rem] max-md:mb-4 max-md:p-4 md:px-6 md:pt-6 md:pb-8 rounded cursor-pointer'>
        {/* Replace with admin Profil */}
        <div className='flex gap-2 items-center' onClick={onOpen}>
          <img
            className='w-14 h-14 object-cover rounded-full'
            src='https://images.unsplash.com/photo-1521566652839-697aa473761a?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
          />
          <div>
            <h3>{userInfo ? userInfo.first_name + ' ' + userInfo.last_name : 'Junior Garcia'}</h3>
            <p className='text-xs text-gray-300'>
              {userInfo
                ? userInfo.user_role_name + ' - ' + userInfo.fitness_center
                : 'Admin - Østerbrogade'}
            </p>
          </div>
        </div>
        {/* Sidebar Menu options */}
        <ul className='max-md:hidden grid gap-4'>
          {sidebarMenu.map((menu, index) => (
            <li
              key={index}
              className={`${menu.name === selectedMenu && 'bg-secondary'} hover:bg-secondary flex items-center rounded py-2 pl-2 w-full cursor-pointer text-sm`}
              onClick={() => setSelectedMenu(menu.name)}
            >
              <Link href=''>{menu.name}</Link>
            </li>
          ))}
          <Button
            className={`hover:bg-danger hover:text-white text-danger flex items-center justify-start bg-transparent rounded py-2 pl-2 w-full cursor-pointer text-sm`}
            onClick={logout}
            spinner={isLoading}
            isLoading={isLoading}
          >
            LOGOUT
          </Button>
        </ul>
        <MobileManu />
      </section>
      <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
    </aside>
  );
}

export default AdminSidebar;
