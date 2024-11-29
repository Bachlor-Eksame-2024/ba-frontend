import { useEffect, useState } from 'react';
import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const mobileData = [
  {
    name: 'Uge 1',
    pv: 4,
  },
  {
    name: 'Uge 2',
    pv: 3,
  },
  {
    name: 'Uge 3',
    pv: 4,
  },
  {
    name: 'Uge 4',
    pv: 2,
  },
];
const desktopData = [
  {
    name: 'Jan',
    pv: 4,
  },
  {
    name: 'Feb',
    pv: 3,
  },
  {
    name: 'Mar',
    pv: 4,
  },
  {
    name: 'Apr',
    pv: 2,
  },
  {
    name: 'Maj',
    pv: 2,
  },
  {
    name: 'Jun',
    pv: 2,
  },
  {
    name: 'Jul',
    pv: 2,
  },
  {
    name: 'Aug',
    pv: 2,
  },
  {
    name: 'Sep',
    pv: 2,
  },
  {
    name: 'Okt',
    pv: 2,
  },
  {
    name: 'Nov',
    pv: 2,
  },
  {
    name: 'Dec',
    pv: 2,
  },
];

import { TooltipProps } from 'recharts';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip bg-default-200 p-2 rounded-lg'>
        <p className='label'>{`${label} : ${payload[0].value}`}</p>
        <p className='desc'>Workouts</p>
      </div>
    );
  }
  return null;
};

function UserChartMobile() {
  const [chatData, setChatData] = useState(mobileData);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(false);

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
      setChatData(desktopData);
      setMobile(false);
    } else {
      setChatData(mobileData);
      setMobile(true);
    }
  }, [screenWidth]);

  return (
    <div className='relative bg-default-100 min-w-72 min-h-40 aspect-video rounded-lg flex justify-center items-center p-2 cursor-pointer'>
      {mobile && (
        <div className='absolute bg-black/40 top-0 left-0 flex flex-col justify-center h-full w-full items-center z-[2]'>
          <h4 className='text-lg text-center'>Workout</h4>
        </div>
      )}
      <ResponsiveContainer height='90%' width={'95%'}>
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
          <YAxis tick={{ fill: '#FFFFFF' }} />
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
