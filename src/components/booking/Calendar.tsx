import { Input } from '@nextui-org/react';
import { Calendar as CalendarNext } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date';

export default function Calendar() {
  const [isOpen, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarDate, setCalendarDate] = useState(today(getLocalTimeZone()));
  const calendarRef = useRef<HTMLDivElement>(null);
  const handleDate = (value: { day: number; month: number; year: number }) => {
    const day = value.day;
    const month = value.month;
    const year = value.year;
    const dateStr = `${day}/${month}/${year}`;
    setSelectedDate(dateStr);
    setCalendarDate(new CalendarDate(value.year, value.month, value.day));
    setOpen(false);
  };

  const handleBlur = (event: React.FocusEvent<Element>) => {
    if (calendarRef.current && calendarRef.current.contains(event.relatedTarget)) {
      return;
    }
    setOpen(false);
  };
  const formatDate = (date: CalendarDate) => {
    const day = date.day;
    const month = date.month;
    const year = date.year;
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setSelectedDate(formatDate(calendarDate));
  }, [calendarDate]);

  return (
    <div className='relative'>
      <Input
        value={selectedDate}
        placeholder={'dd/mm/yyyy'}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={handleBlur}
        type='text'
        isReadOnly
      />
      <svg
        className='absolute pointer-events-none top-[3.4rem] right-3'
        height='21'
        viewBox='0 0 21 21'
        width='21'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g
          fill='none'
          fillRule='evenodd'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          transform='translate(2 2)'
        >
          <path d='m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z' />
          <path d='m.5 4.5h16' />
          <path d='m8.5 7.5v6.056' />
          <path d='m8.5 7.5v6' transform='matrix(0 1 -1 0 19 2)' />
        </g>
      </svg>

      {isOpen && (
        <div className='absolute w-fit left-1/2 transform -translate-x-1/2' ref={calendarRef}>
          <CalendarNext
            value={calendarDate}
            minValue={today(getLocalTimeZone())}
            onChange={handleDate}
            color='secondary'
            aria-label='Date (No Selection)'
          />
        </div>
      )}
    </div>
  );
}
