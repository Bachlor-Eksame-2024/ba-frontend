import { lazy, Suspense } from 'react';
import AdminCardStats from './AdminCardStats';

// Dynamically import the AdminBarChart component
const AdminBarChart = lazy(() => import('./AdminBarChart'));
const AdminAreaChart = lazy(() => import('./AdminAreaChart'));

function Dashboard() {
  return (
    <div className='grid gap-4 w-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminBarChart />
      </Suspense>

      <div className='grid lg:grid-cols-2 gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <AdminCardStats>
            <div className='flex gap-1'>
              <h3 className='text-2xl'>21</h3>
              <span className='flex items-center text-green-400 text-xs'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18'
                  />
                </svg>{' '}
                10%
              </span>
            </div>
            <p>Nye Medlemer i Jan</p>
          </AdminCardStats>
          <AdminCardStats>
            <div className='flex gap-1'>
              <h3 className='text-2xl'>54</h3>
              <span className='flex items-center text-red-400 text-xs'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3'
                  />
                </svg>
                10%
              </span>
            </div>
            <p>Antal Besøgende i Dag</p>
          </AdminCardStats>
          <div className='col-span-2'>
            <AdminCardStats>
              <div className='flex gap-1'>
                <h3 className='text-2xl'>123.660</h3>
                <span className='flex items-center text-green-400 text-xs'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-4'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18'
                    />
                  </svg>
                  10%
                </span>
              </div>
              <p>Fortjeneste - Januar</p>
            </AdminCardStats>
          </div>
          <AdminCardStats>
            <div className='flex gap-1'>
              <h3 className='text-2xl'>8/25</h3>
            </div>
            <p>Ledige Rum</p>
          </AdminCardStats>
          <AdminCardStats>
            <div className='flex gap-1'>
              <h3 className='text-2xl'>2748</h3>
            </div>
            <p>Antal Medlemer</p>
          </AdminCardStats>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AdminAreaChart />
        </Suspense>
      </div>
    </div>
  );
}

export default Dashboard;
