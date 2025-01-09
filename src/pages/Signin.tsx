import { Button } from '@nextui-org/react';
import useUserStore from '../stores/UserStore';
import { Link } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export default function Signin() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { setUser } = useUserStore();
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Login function
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    // Faa email og Password
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // email validate
    // kald vores login API
    const response = await fetch(apiUrl + '/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
      setIsAuthenticated(true); // Immediate auth state update
      window.location.href = '/home';
    } else {
      setError(data.detail || 'Login failed');
      console.error('Login failed:', response.status);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center flex-1 w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 flex items-center justify-center h-full px-4'>
        <div className='bg-zinc-900 md:p-24 rounded p-8'>
          <h1 className='text-lg pb-6'>Login</h1>
          <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
            {error && (
              <div className='text-red-500 text-sm' data-testid='error-message'>
                {error}
              </div>
            )}
            <label htmlFor='email' className='text-sm'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='p-2 rounded bg-zinc-800 text-white w-full'
              required
              data-testid='email-input'
            />
            <label htmlFor='password' className='text-sm'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='p-2 rounded bg-zinc-800 text-white w-full'
              required
              data-testid='password-input'
            />
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-4 pt-4'>
              <Button
                type='submit'
                color='secondary'
                className='w-full sm:w-auto'
                data-testid='submit-button'
              >
                Login
              </Button>
              <p className='py-2 text-center sm:text-left text-sm flex gap-2 flex-wrap'>
                Mangler du en konto?
                <Link href='/signup' className='text-indigo-500 underline ml-1 text-sm'>
                  Opret en konto her
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
