import { useEffect, useState } from 'react';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mobileData = [
  {
    name: 'Uge 1',
    pv: 0,
  },
  {
    name: 'Uge 2',
    pv: 0,
  },
  {
    name: 'Uge 3',
    pv: 0,
  },
  {
    name: 'Uge 4',
    pv: 0,
  },
];
const desktopData = [
  {
    name: 'Jan',
    pv: 0,
  },
  {
    name: 'Feb',
    pv: 0,
  },
  {
    name: 'Mar',
    pv: 0,
  },
  {
    name: 'Apr',
    pv: 0,
  },
  {
    name: 'Maj',
    pv: 0,
  },
  {
    name: 'Jun',
    pv: 0,
  },
  {
    name: 'Jul',
    pv: 0,
  },
  {
    name: 'Aug',
    pv: 0,
  },
  {
    name: 'Sep',
    pv: 0,
  },
  {
    name: 'Okt',
    pv: 0,
  },
  {
    name: 'Nov',
    pv: 0,
  },
  {
    name: 'Dec',
    pv: 0,
  },
];

import { TooltipProps } from 'recharts';
import useUserStore from '../../stores/UserStore';
import { UserStats } from '../../types/workouts';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip bg-default-200 p-2 rounded'>
        <p className='label'>{`${label} : ${payload[0].value}`}</p>
        <p className='desc'>Workouts</p>
      </div>
    );
  }
  return null;
};

function UserChartMobile() {
  const [chatData, setChatData] = useState(mobileData);
  const [userCharData, setUserCharData] = useState<UserStats | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(false);
  const { userInfo } = useUserStore();
  useEffect(() => {
    const getStats = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + '/profile/get-user-stats', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ user_id: userInfo?.user_id.toString() }),
      });

      const data = await response.json();
      setUserCharData(data);
    };
    getStats();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 640) {
      if (userCharData?.monthly_stats) {
        setChatData(userCharData.monthly_stats);
      } else {
        setChatData(desktopData);
      }
      setMobile(false);
    } else {
      if (userCharData?.weekly_stats) {
        setChatData(userCharData.weekly_stats);
      } else {
        setChatData(mobileData);
      }
      setMobile(true);
    }
  }, [screenWidth, userCharData]);

  return (
    <div className='relative bg-default-100 min-w-72 min-h-40 aspect-video rounded flex justify-center items-center p-2 cursor-pointer'>
      {mobile && (
        <div className='absolute bg-black/40 top-0 left-0 flex flex-col justify-center h-full w-full items-center z-[2]'>
          <h4 className='text-lg text-center'>Workout</h4>
        </div>
      )}
      <ResponsiveContainer minHeight={100} minWidth={200} height='90%' width={'95%'}>
        <BarChart
          width={400}
          height={200}
          data={chatData}
          margin={{
            top: 0,
            right: 0,
            left: -35,
            bottom: -8,
          }}
        >
          <XAxis tick={{ fill: '#FFFFFF' }} dataKey='name' className='text-foreground-100' />
          <YAxis type='number' tick={{ fill: '#FFFFFF' }} allowDecimals={false} />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Bar
            dataKey='pv'
            radius={[5, 5, 0, 0]}
            fill='#e4e4e7'
            activeBar={<Rectangle fill='#7828C8' />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserChartMobile;
