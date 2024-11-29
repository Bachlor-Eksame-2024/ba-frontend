import { Link } from 'wouter';

function PageNotFound() {
  return (
    <div className='flex-1 flex items-center h-full place-content-center px-4'>
      <div className='text-center'>
        <h1 className='text-3xl font-black text-gray-200'>Page Not Found</h1>

        <p className='text-xl font-bold tracking-tight text-gray-200 sm:text-4xl'>Uh-oh!</p>

        <p className='mt-4 text-gray-300'>We can't find that page.</p>

        <Link
          href='/'
          className='mt-6 inline-block rounded bg-secondary px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
