import { DatePicker } from '@nextui-org/react';

export default function Calendar() {
  const variant = 'bordered';
  return (
    <div>
      <h2 className='text-xl font-bold mb-4 mt-8'>Vælg dato</h2>
      <DatePicker variant={variant} color='secondary' className='max-w-[100%]' />
    </div>
  );
}
