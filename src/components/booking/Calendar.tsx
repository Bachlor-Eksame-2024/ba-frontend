import { useState } from 'react';

const Calendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const getDanishDayName = (date: Date) => {
    const days = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
    if (date.toDateString() != today.toDateString()) {
      return days[date.getDay()];
    }
  };

  const handleDateChange = (date: Date) => {
    if (date >= today) {
      setSelectedDate(date);
      setSelectedDates([date]);
    }
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const getCalendarDates = () => {
    const dates = [];
    const daysToShow = 35;

    for (let i = 0; i < daysToShow; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return 'I dag';
    }
    return date.getDate().toString();
  };

  const currentMonth = selectedDate.toLocaleString('default', { month: 'long' });
  const currentYear = selectedDate.getFullYear();

  return (
    <div className='mb-'>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-xl font-bold'>
          {currentMonth} {currentYear}
        </div>
        <div className='flex items-center'>
          <button
            className='text-gray-400 hover:text-white mr-2'
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                  selectedDate.getDate()
                )
              )
            }
          >
            &lt;
          </button>
          <button
            className='text-gray-400 hover:text-white ml-2'
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                  selectedDate.getDate()
                )
              )
            }
          >
            &gt;
          </button>
        </div>
      </div>
      <div className='whitespace-nowrap overflow-x-auto flex items-center transition-colors'>
        {getCalendarDates().map((date, index) => (
          <div
            key={index}
            className={`inline-flex flex-col items-center justify-center px-3 py-2 mx-1 cursor-pointer rounded-full 
              ${
                selectedDates.some((d) => d.toDateString() === date.toDateString())
                  ? 'text-secondary-400'
                  : date.toDateString() === today.toDateString()
                    ? ''
                    : date >= today
                      ? 'hover:text-secondary-600'
                      : ''
              }`}
            onClick={() => handleDateChange(date)}
          >
            <div className=''>{formatDate(date)}</div>
            <div className='text-xs text-default-500'>{getDanishDayName(date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
