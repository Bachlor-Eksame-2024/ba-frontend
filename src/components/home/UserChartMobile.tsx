import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const data = [
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
  return (
    <div className='relative bg-default-100 min-w-72 min-h-40 aspect-video rounded-lg flex justify-center items-center p-2 cursor-pointer'>
      <div className='absolute top-0 left-0 flex flex-col justify-center h-full w-full items-center z-[2]'>
        <h4 className='text-3xl text-center'>Workout</h4>
      </div>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: -8,
          }}
        >
          <XAxis tick={{ fill: '#FFFFFF' }} dataKey='name' className='text-foreground-100' />
          {/*      <YAxis tick={{ fill: '#FFFFFF' }} /> */}
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Bar
            dataKey='pv'
            radius={[5, 5, 0, 0]}
            fill='#9353D3'
            activeBar={<Rectangle fill='#7828C8' />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserChartMobile;
