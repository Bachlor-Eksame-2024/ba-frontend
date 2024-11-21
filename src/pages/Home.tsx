import HomeAdmin from '../components/home/HomeAdmin';
import HomeUser from '../components/home/HomeUser';

export default function Home() {
  return (
    <div className='flex flex-col gap-4 md:p-8 max-md:p-4 max-w-7xl mx-auto'>
      <HomeUser />
      <h1 className='w-full text-center text-4xl text-red-400'>ADMIN HOMEPAGE</h1>
      <HomeAdmin />
    </div>
  );
}
