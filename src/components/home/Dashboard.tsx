import AdminAreaChart from './AdminAreaChart';
import AdminBarChart from './AdminBarChart';
import AdminCardStats from './AdminCardStats';
import AdminSidebar from './AdminSidebar';

interface AdminSidebarProps {
  setSelectedMenu: (menu: string) => void;
  selectedMenu: string;
}

function Dashboard({ setSelectedMenu, selectedMenu }: AdminSidebarProps) {
  return (
    <div className='md:flex  gap-4'>
      <div className='max-md:hidden basis-1/5'>
        <AdminSidebar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      </div>
      <div className='basis-4/5 grid gap-4'>
        <AdminBarChart />

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
          <AdminAreaChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
