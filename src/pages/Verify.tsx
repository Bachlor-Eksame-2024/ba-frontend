import { Spinner } from '@nextui-org/spinner';
import { useEffect, useState } from 'react';
import { useLocation, useSearch } from 'wouter';

function Verify() {
  const apiURL = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [message, setMessage] = useState('Bekræfter email...');
  const [isVerifying, setIsVerifying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, navigate] = useLocation();
  const searchString = useSearch();

  useEffect(() => {
    const verifyEmail = async () => {
      if (isVerifying) return;
      setIsVerifying(true);

      const params = new URLSearchParams(searchString);
      const token = params.get('token');
      const email = params.get('email');

      if (!token || !email) {
        console.log('Missing token or email');
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`${apiURL}/auth/verify-email?token=${token}&email=${email}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.message) {
          console.log('Email verified');
          setMessage('Email Bekræftet. Videre stiller til login...');
          setTimeout(() => {
            navigate('/login');
          }, 4000);
        } else {
          console.log('Email not verified');
          setMessage('Email Kunne ikke bekræftets eller er allerede bekræftet...');
          setTimeout(() => {
            navigate('/');
          }, 4000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setMessage('Der opstod en fejl ved verificering');
        setTimeout(() => {
          navigate('/');
        }, 4000);
      }
    };

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifying, searchString, navigate]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <Spinner size='lg' color='secondary' />
      <h1 className='text-xl font-bold text-center mt-4'>{message}</h1>
    </div>
  );
}

export default Verify;
