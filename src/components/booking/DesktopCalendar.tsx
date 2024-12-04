import { Calendar } from '@nextui-org/react';
import { today, getLocalTimeZone } from '@internationalized/date';

export default function DesktopCalendar() {
  return (
    <Calendar
      aria-label='Date (Min Date Value)'
      defaultValue={today(getLocalTimeZone())}
      minValue={today(getLocalTimeZone())}
      color='secondary'
      calendarWidth={300}
    />
  );
}
