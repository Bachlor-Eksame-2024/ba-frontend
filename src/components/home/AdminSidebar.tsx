import { Link } from 'wouter';
import EditProfile from './EditProfile';
import { useDisclosure } from '@nextui-org/modal';
import useUserStore from '../../stores/UserStore';
import { Button } from '@nextui-org/button';
import { useLogout } from '../../hooks/useLogout';
import useAdminMenuStore from '../../stores/adminMenuStore';

function AdminSidebar() {
  const { userInfo } = useUserStore();
  const { logout, isLoading } = useLogout();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { adminMenu, setAdminMenu } = useAdminMenuStore();
  const sidebarMenu = [
    { name: 'Dashboard', link: '/admin/dashboard' },
    { name: 'Brugere', link: '/admin/users' },
    { name: 'Bokse', link: '/admin/bokse' },
    { name: 'Workout Programmer', link: '/admin/workout-programmer' },
  ];

  return (
    <aside>
      <section className='md:grid max-md:flex max-md:items-center max-md:justify-between gap-8 bg-default-100 min-w-[17rem] md:w-80 md:min-h-[30rem] max-md:mb-4 max-md:p-4 md:px-6 md:pt-6 md:pb-8 rounded cursor-pointer'>
        {/* Replace with admin Profil */}
        <div className='flex gap-2 items-center' onClick={onOpen}>
          <div>
            <h3 className='text-base'>
              {userInfo ? userInfo.first_name + ' ' + userInfo.last_name : 'Junior Garcia'}
            </h3>
            <p className='text-sm text-gray-300'>
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
              className={`${menu.name === adminMenu && 'bg-secondary'} hover:bg-secondary flex items-center rounded py-2 pl-2 w-full cursor-pointer text-sm`}
              onClick={() => setAdminMenu(menu.name)}
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
      </section>
      <EditProfile isOpen={isOpen} onOpenChange={onOpenChange} />
    </aside>
  );
}

export default AdminSidebar;
