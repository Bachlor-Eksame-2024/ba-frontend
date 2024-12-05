import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo, useEffect, useState } from 'react';

const appearance: {
  theme: 'flat' | 'stripe' | 'night' | undefined;
  variables: { [key: string]: string };
  rules: { [key: string]: { [key: string]: string } };
} = {
  theme: 'flat', // You can use 'stripe', 'flat', 'night'
  variables: {
    colorPrimary: '#0570de',
    colorBackground: '#27272a',
    colorText: '#30313d',
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
      color: '#30313d',
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    } catch (e) {
      console.error(e);
      setErrorMessage('Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full bg-default-50 p-4 rounded flex flex-col gap-4'>
      <PaymentElement />
      {errorMessage && <div className='text-danger'>{errorMessage}</div>}
      <Button type='submit' className='bg-secondary w-fit' isLoading={isLoading} disabled={!stripe}>
        Pay Now
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

  useEffect(() => {
    // Fetch the client secret from the server
    fetch(api_url + '/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': api_key,
      },
      body: JSON.stringify({
        amount: 250,
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
    <div className='max-auto max-w-2xl flex flex-col gap-4 items-center justify-center p-4 pt-20'>
      <Card className='w-full'>
        <CardBody>
          <p>Boks 16, 08:00-09:00 50,00 kr.</p>
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
