import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo, useEffect, useState } from 'react';
import useCollectedBooking from '../../stores/CollectedBookingStore';
import { useLocation } from 'wouter';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const appearance: {
  theme: 'flat' | 'stripe' | 'night' | undefined;
  variables: { [key: string]: string };
  rules: { [key: string]: { [key: string]: string } };
} = {
  theme: 'flat', // You can use 'stripe', 'flat', 'night'
  variables: {
    colorPrimary: '#0570de',
    colorBackground: '#27272a',
    colorText: '#ffffff',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px',
  },
  rules: {
    '.Label': {
      color: 'white',
    },
    '.Input': {
      color: 'white',
    },
    '.Input:focus': {
      borderColor: '#0570de',
    },
    '.Tab': {
      color: '#ffffff',
    },
    '.Tab:hover': {
      color: '#0570de',
    },
    '.Tab--selected': {
      borderColor: '#0570de',
    },
    '.Tab--selected:focus': {
      borderColor: '#0570de',
    },
  },
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { collectedBooking } = useCollectedBooking();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

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
        console.error(error);
        // handleError();
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded');
        const bookingSuccess = await handleBooking();
        if (bookingSuccess) {
          setLocation('/payment/success');
        }
        // handleSuccess();
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('Payment failed');
    } finally {
      console.log('Payment completed');
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    const response = await fetch(apiUrl + '/booking/create-booking', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(collectedBooking),
    });
    const data = await response.json();
    if (data.status === 'success') {
      return true;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full bg-default-50 p-4 rounded flex flex-col gap-4'>
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
  const api_url = import.meta.env.VITE_API_URL;
  const api_key = import.meta.env.VITE_API_KEY;
  const stripePromise = loadStripe(test_key);
  const [clientSecret, setClientSecret] = useState('');
  const { collectedBooking } = useCollectedBooking();

  useEffect(() => {
    // Fetch the client secret from the server
    fetch(api_url + '/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': api_key,
      },
      body: JSON.stringify({
        amount: collectedBooking && collectedBooking.booking_duration_hours * 50000,
        currency: 'dkk',
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.client_secret);
      });
  }, []);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
    appearance,
  };

  return (
    <div className='max-auto max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center p-4 pt-20'>
      <Card className='w-full'>
        <CardBody>
          <p>Boks: {collectedBooking?.booking_box_id_fk}</p>
          <p>Dato: {collectedBooking?.booking_date}</p>
          <p>Fra kl: {collectedBooking?.booking_start_hour}</p>
          <p>Til kl: {collectedBooking?.booking_end_hour}</p>
          <p>Pris: {collectedBooking && collectedBooking.booking_duration_hours * 50},-</p>
        </CardBody>
      </Card>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
});

export default Payment;
