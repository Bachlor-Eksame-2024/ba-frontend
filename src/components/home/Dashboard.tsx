import { lazy, Suspense } from 'react';
import AdminCardStats from './AdminCardStats';
import useSWR from 'swr';
import useUserStore from '../../stores/UserStore';

// Dynamically import the AdminBarChart component
const AdminBarChart = lazy(() => import('./AdminBarChart'));
const AdminAreaChart = lazy(() => import('./AdminAreaChart'));
// Get the API URL from the .env file
const ApiUrl = import.meta.env.VITE_API_URL;

function Dashboard() {
  const currentHour = String(new Date().getHours()).padStart(2, '0');
  const currentMinutes = String(new Date().getMinutes()).padStart(2, '0');
  const currentTime = `${currentHour}${currentMinutes}`;
  const currentDate = new Date().toISOString().split('T')[0];
  const { userInfo } = useUserStore();

  // replace fitness_center_id with the id from the logged in user
  const { data, error } = useSWR(ApiUrl + '/admin/stats/' + userInfo?.fitness_center_id);
  // /api/admin/stats/{fitness_center_id}

  // /api/admin/box-availability/{fitness_center_id}/{date}/{current_time}/{duration}
  const { data: boxes, error: error2 } = useSWR(
    ApiUrl +
      `/admin/box-availability/${userInfo?.fitness_center_id}/${currentDate}/${currentTime}/1`
  );
  if (error) return <div>Failed to load fetch data</div>;
  if (!data) return <div>Loading...</div>;
  if (error2) return <div>Failed to load fetch data</div>;
  if (!boxes) return <div>Loading...</div>;
  let boxAvailabilityLength = 24;
  if (boxes.message) {
    boxAvailabilityLength = 25;
  } else {
    boxAvailabilityLength = Object.keys(boxes.box_availability).length;
  }

  return (
    <div className='grid gap-4 w-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminBarChart monthlyVisitors={data.daily_bookings} />
      </Suspense>

      <div className='grid lg:grid-cols-2 gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <AdminCardStats>
            <div className='flex  gap-1'>
              <h3 className='text-lg'>{data.new_members_today}</h3>
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
              <h3 className='text-lg'>{data.checked_in_today}</h3>
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
                <h3 className='text-lg'>{data.total_members * 299}</h3>
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
              <p>Fortjeneste - Denne Måned</p>
            </AdminCardStats>
          </div>
          <AdminCardStats>
            <div className='flex gap-1'>
              <h3 className='text-lg'>
                {boxAvailabilityLength}/{data.total_boks}
              </h3>
            </div>
            <p>Ledige Rum</p>
          </AdminCardStats>
          <AdminCardStats>
            <div className='flex gap-1'>
              <h3 className='text-lg'>{data.total_members}</h3>
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
