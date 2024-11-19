import HomeUser from '../components/home/HomeUser';

export default function Home() {
  return (
    <div className='flex flex-col gap-4 md:p-8 max-md:p-4 max-w-6xl mx-auto'>
      <h1 className='text-red-500'>Home</h1>
      <HomeUser />
    </div>
  );
}
