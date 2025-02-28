import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo, useEffect, useState } from 'react';
import useCollectedBooking from '../../stores/CollectedBookingStore';
import { useLocation } from 'wouter';
import useConfirmedStore from '../../stores/ConfirmedStore';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

/* interface PaymentResponse {
  payment_id: number;
  client_secret: string;
} */

const appearance = {
  theme: 'flat' as const,
  variables: {
    colorPrimary: '#0570de',
    colorBackground: 'white',
    colorText: 'black',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
  rules: {
    '.Label': { color: 'white' },
    '.Input': { color: 'black' },
    '.Input:focus': { borderColor: '#0570de' },
    '.Tab': { color: 'black' },
    '.Tab:hover': { color: '#0570de' },
    '.Tab--selected': { borderColor: '#0570de' },
    '.Tab--selected:focus': { borderColor: '#0570de' },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { collectedBooking } = useCollectedBooking();
  const { setConfirmedBooking } = useConfirmedStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  const handleBooking = async (paymentIntentId: string) => {
    try {
      const response = await fetch(`${apiUrl}/booking`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          ...collectedBooking,
          payment_intent_id: paymentIntentId,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setConfirmedBooking(data.message);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Booking error:', error);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment error:', error);
        setErrorMessage(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const bookingSuccess = await handleBooking(paymentIntent.id);
        if (bookingSuccess) {
          setLocation('/payment/success');
        } else {
          setErrorMessage('Booking failed after payment');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full bg-default-100 p-4 rounded flex flex-col gap-4'>
      <PaymentElement />
      {errorMessage && <div className='text-danger'>{errorMessage}</div>}
      <Button type='submit' className='bg-secondary w-fit' isLoading={isLoading} disabled={!stripe}>
        Betal nu
      </Button>
    </form>
  );
};

const Payment = memo(() => {
  const test_key = import.meta.env.VITE_STRIPE_TEST_KEY;
  const stripePromise = loadStripe(test_key);
  const [clientSecret, setClientSecret] = useState('');
  const { collectedBooking } = useCollectedBooking();
  /*   const [paymentResponse, setPaymentResponse] = useState<PaymentResponse>({
    payment_id: 0,
    client_secret: '',
  }); */

  useEffect(() => {
    const createPayment = async () => {
      if (!collectedBooking) return;

      try {
        const response = await fetch(`${apiUrl}/payment/create-payment`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
          body: JSON.stringify({
            amount: collectedBooking.booking_duration_hours * 50000,
            currency: 'dkk',
            user_id: collectedBooking.user_id,
            payment_method: 'card',
          }),
        });

        const data = await response.json();
        //setPaymentResponse(data);
        //console.log(paymentResponse);
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error('Error creating payment:', error);
      }
    };

    createPayment();
  }, [collectedBooking]);

  if (!collectedBooking) {
    return null;
  }

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='max-auto max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center p-4 pt-20'>
      <Card className='w-full bg-default-100 shadow-none mx-auto'>
        <CardHeader>
          <h3 className='text-md font-semibold text-center'>Bookingoversigt</h3>
        </CardHeader>
        <CardBody className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-box'
            >
              <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
              <path d='m3.3 7 8.7 5 8.7-5' />
              <path d='M12 22V12' />
            </svg>
            <span className='font-semibold'>Box:</span>
            <span>{collectedBooking.booking_box_id_fk}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-calendar'
            >
              <path d='M8 2v4' />
              <path d='M16 2v4' />
              <rect width='18' height='18' x='3' y='4' rx='2' />
              <path d='M3 10h18' />
            </svg>
            <span className='font-semibold'>Dato:</span>
            <span>{new Date(collectedBooking.booking_date).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <span className='font-semibold'>Tid:</span>
            <span>
              {collectedBooking.booking_start_hour} - {collectedBooking.booking_end_hour}
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>

            <span className='font-semibold'>Antal timer:</span>
            <span>{collectedBooking.booking_duration_hours} </span>
          </div>
          <div className='mt-6 pt-4 border-t border-gray-200'>
            <div className='flex items-center justify-between'>
              <span className='text-base font-bold'>Total Pris:</span>
              <div className='flex items-center space-x-2'>
                {/* <CreditCardIcon className='text-red-500' /> */}
                <span className='text-md font-semibold text-success'>
                  {collectedBooking.booking_duration_hours * 50},- DKK
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className='w-full bg-default-100'>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </Card>
    </div>
  );
});

export default Payment;
