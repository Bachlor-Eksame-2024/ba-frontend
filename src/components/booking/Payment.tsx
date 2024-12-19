import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo, useEffect, useState } from 'react';
import useCollectedBooking from '../../stores/CollectedBookingStore';
import { useLocation } from 'wouter';
import useConfirmedStore from '../../stores/ConfirmedStore';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

interface PaymentResponse {
  payment_id: number;
  client_secret: string;
}

const appearance = {
  theme: 'flat' as const,
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
    '.Label': { color: 'white' },
    '.Input': { color: 'white' },
    '.Input:focus': { borderColor: '#0570de' },
    '.Tab': { color: '#ffffff' },
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
  const stripePromise = loadStripe(test_key);
  const [clientSecret, setClientSecret] = useState('');
  const { collectedBooking } = useCollectedBooking();
  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse>({
    payment_id: 0,
    client_secret: '',
  });

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
        setPaymentResponse(data);
        console.log(paymentResponse);
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
      <Card className='w-full'>
        <CardBody>
          <p>Boks: {collectedBooking.booking_box_id_fk}</p>
          <p>Dato: {collectedBooking.booking_date}</p>
          <p>Fra kl: {collectedBooking.booking_start_hour}</p>
          <p>Til kl: {collectedBooking.booking_end_hour}</p>
          <p>Pris: {collectedBooking.booking_duration_hours * 50},-</p>
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