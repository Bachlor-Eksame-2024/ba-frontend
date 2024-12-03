import HomeAdmin from '../components/home/HomeAdmin';
import HomeUser from '../components/home/HomeUser';
import useUserStore from '../stores/UserStore';

export default function Home() {
  const { userInfo } = useUserStore();
  console.log(userInfo);
  return (
    <div className='flex flex-col gap-4 md:p-8 max-md:p-4 max-w-7xl mx-auto mt-14'>
      {userInfo?.user_role_name === 'user' ? <HomeUser /> : <HomeAdmin />}
    </div>
  );
}
