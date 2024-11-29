import { useState } from 'react';
import TimeSlotSelector from '../components/booking/TimeSlotSelector';
import Payment from '../components/booking/Payment';

function BookingProcess() {
  const [showPayment, setShowPayment] = useState(false);
  return (
    <div>{showPayment ? <Payment /> : <TimeSlotSelector setShowPayment={setShowPayment} />}</div>
  );
}

export default BookingProcess;
