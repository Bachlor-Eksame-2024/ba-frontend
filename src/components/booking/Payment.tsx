import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

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

function Payment() {
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

  const CheckoutForm = () => {
    return (
      <form className='w-full bg-default-50 p-4 rounded-lg flex flex-col gap-4'>
        <PaymentElement />
        <Button className='bg-secondary w-fit'>Submit</Button>
      </form>
    );
  };

  return (
    <div className='max-auto max-w-2xl flex flex-col gap-4 items-center justify-center p-4'>
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
}

export default Payment;
