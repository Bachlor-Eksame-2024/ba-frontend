import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Jul',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Aug',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Sept',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Okt',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Nov',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Dec',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Jan',
    uv: 3490,
    pv: 4300,
  },
];

function AdminAreaChart() {
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip bg-default-200 p-2 rounded'>
          <p className='label'>{`2023 : ${payload[0].value}`}</p>
          <p className='label'>{`2024 : ${payload[1].value}`}</p>
          <p className='desc'>Medlemskaber</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className='relative bg-default-100 min-w-72 min-h-40 w-full max-h-[350px] h-full aspect-video rounded flex justify-center items-center p-2 cursor-pointer'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis tick={{ fill: '#FFFFFF' }} dataKey='name' />
            <YAxis tick={{ fill: '#FFFFFF' }} />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Area type='monotone' dataKey='uv' stackId='1' stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='pv' stackId='1' stroke='#82ca9d' fill='#82ca9d' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminAreaChart;
