import { Input } from '@nextui-org/react';
import { Calendar as CalendarNext } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { today, getLocalTimeZone, CalendarDate } from '@internationalized/date';
import CalendarIcon from '../../assets/icons/calendar2.svg';

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
    <div className='relative md:hidden'>
      <Input
        value={selectedDate}
        placeholder={'dd/mm/yyyy'}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={handleBlur}
        type='text'
        isReadOnly
      />
      <img
        src={CalendarIcon}
        alt='Calendar'
        className='absolute pointer-events-none top-[0.7rem] right-[1rem]'
        width='21'
        height='21'
      />

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
