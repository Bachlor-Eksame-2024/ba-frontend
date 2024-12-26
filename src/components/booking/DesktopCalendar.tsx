import { Calendar } from '@nextui-org/react';
import { today, getLocalTimeZone } from '@internationalized/date';

interface DesktopCalendarProps {
  setSelectedDate: (date: string) => void;
}

export default function DesktopCalendar({ setSelectedDate }: DesktopCalendarProps): JSX.Element {
  const handleDate = (value: { day: number; month: number; year: number }) => {
    const day = value.day;
    const month = value.month;
    const year = value.year;
    const dateStr = `${year}-${month}-${day}`;
    setSelectedDate(dateStr);
  };

  return (
    <div className='w-full max-w-sm overflow-hidden'>
      <Calendar
        aria-label='Date (Min Date Value)'
        defaultValue={today(getLocalTimeZone())}
        minValue={today(getLocalTimeZone())}
        color='secondary'
        onChange={(date) => handleDate(date)}
        calendarWidth='100%'
        classNames={{
          gridBodyRow: '!gap-2',
          gridHeaderRow: '!gap-2',
          grid: '!w-full',
          headerWrapper: '!w-full !bg-[#2e2e31] !text-zinc-100 !text-base',
          title: '!text-base',
          base: '!bg-[#2e2e31] !rounded-md !w-full',
          gridHeader: '!bg-[#2e2e31] !shadow-none !text-zinc-100',
          gridHeaderCell: '!text-zinc-100 !text-base',
        }}
      />
    </div>
  );
}
