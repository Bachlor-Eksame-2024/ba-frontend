import HomeUser from '../components/home/HomeUser';

export default function Home() {
  return (
    <div className='flex flex-col gap-4 md:p-8 max-md:p-4 '>
      <h1 className='text-red-500'>Home</h1>
      <HomeUser />
    </div>
  );
}
