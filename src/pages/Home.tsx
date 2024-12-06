import { useMemo } from 'react';
import HomeAdmin from '../components/home/HomeAdmin';
import HomeUser from '../components/home/HomeUser';
import useUserStore from '../stores/UserStore';

export default function Home() {
  const { userInfo } = useUserStore();

  const Component = useMemo(() => {
    return userInfo?.user_role_name === 'user' ? HomeUser : HomeAdmin;
  }, [userInfo?.user_role_name]);

  return (
    <div className='flex flex-col gap-4 md:p-8 max-md:p-4 w-full max-w-7xl mx-auto mt-14'>
      <Component />
    </div>
  );
}
