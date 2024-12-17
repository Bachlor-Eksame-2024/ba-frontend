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

interface MonthlyVisitor {
  name: string;
  pv: number;
}
function AdminBarChart({ monthlyVisitors }: { monthlyVisitors: MonthlyVisitor[] }) {
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip bg-default-200 p-2 rounded'>
          <p className='label'>{`${label} : ${payload[0].value}`}</p>
          <p className='desc'>Antal Besøgende</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='grid gap-2'>
      <h2 className='text-md bg-default-100 rounded p-4 w-fit'>Besøgende Sidste 30 Dage.</h2>
      <div className='relative bg-default-100 min-w-72 min-h-40 w-full max-h-[350px] aspect-video rounded flex justify-center items-center p-2 cursor-pointer'>
        <ResponsiveContainer height='90%' width={'95%'}>
          <BarChart
            width={400}
            height={200}
            data={monthlyVisitors}
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
