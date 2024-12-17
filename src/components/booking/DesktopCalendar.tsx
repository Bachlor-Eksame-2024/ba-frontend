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
    <Calendar
      aria-label='Date (Min Date Value)'
      defaultValue={today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
      color='secondary'
      onChange={(date) => handleDate(date)}
      calendarWidth={500}
      classNames={{
        gridBodyRow: '!gap-4',
        gridHeaderRow: '!gap-4',
        grid: '!max-w-sm',
        headerWrapper: '!max-w-sm !bg-[#2e2e31] !text-zinc-100 !text-base',
        title: '!text-base',
        base: '!bg-[#2e2e31] !rounded-md',
        gridHeader: '!bg-[#2e2e31] !shadow-none !text-zinc-100',
        gridHeaderCell: '!text-zinc-100 !text-base',
      }}
    />
  );
}
