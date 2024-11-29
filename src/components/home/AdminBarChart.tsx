import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';

const desktopData = [
  {
    name: '1',
    pv: 208,
  },
  {
    name: '2',
    pv: 309,
  },
  {
    name: '3',
    pv: 239,
  },
  {
    name: '4',
    pv: 256,
  },
  {
    name: '5',
    pv: 179,
  },
  {
    name: '6',
    pv: 109,
  },
  {
    name: '7',
    pv: 274,
  },
  {
    name: '8',
    pv: 398,
  },
  {
    name: '9',
    pv: 400,
  },
  {
    name: '10',
    pv: 243,
  },
  {
    name: '11',
    pv: 189,
  },
  {
    name: '12',
    pv: 158,
  },
  {
    name: '13',
    pv: 263,
  },
  {
    name: '14',
    pv: 245,
  },
  {
    name: '15',
    pv: 378,
  },
  {
    name: '16',
    pv: 296,
  },
  {
    name: '17',
    pv: 145,
  },
  {
    name: '18',
    pv: 198,
  },
  {
    name: '19',
    pv: 278,
  },
  {
    name: '20',
    pv: 308,
  },
  {
    name: '21',
    pv: 165,
  },
  {
    name: '22',
    pv: 271,
  },
  {
    name: '23',
    pv: 208,
  },
  {
    name: '24',
    pv: 301,
  },
  {
    name: '25',
    pv: 324,
  },
  {
    name: '26',
    pv: 265,
  },
  {
    name: '27',
    pv: 194,
  },
  {
    name: '28',
    pv: 310,
  },
  {
    name: '29',
    pv: 233,
  },
  {
    name: '30',
    pv: 120,
  },
];
function AdminBarChart() {
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip bg-default-200 p-2 rounded-lg'>
          <p className='label'>{`${label} : ${payload[0].value}`}</p>
          <p className='desc'>Antal Besøgende</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='grid gap-2'>
      <h2 className='text-md bg-default-100 rounded-md p-4 w-fit'>Besøgende Sidste 30 Dage.</h2>
      <div className='relative bg-default-100 min-w-72 min-h-40 w-full max-h-[350px] aspect-video rounded-lg flex justify-center items-center p-2 cursor-pointer'>
        <ResponsiveContainer height='90%' width={'95%'}>
          <BarChart
            width={400}
            height={200}
            data={desktopData}
            margin={{
              top: 0,
              right: 0,
              left: -20,
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
    </div>
  );
}

export default AdminBarChart;
