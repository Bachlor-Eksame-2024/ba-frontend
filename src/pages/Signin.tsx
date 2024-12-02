import { Button } from '@nextui-org/react';
import useUserStore from '../stores/UserStore';
import { useLocation } from 'wouter';

export default function Signin() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const { setUser } = useUserStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, setLocation] = useLocation();

  // Login function
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('log bruger ind');
    // Faa email og Password
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log(email);
    // email validate
    console.log(password);
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
        fitness_center_id: 's',
      }),
    });

    console.log('Respose from backend', response);
    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);
      // gem brugens data i vores zustand store
      setUser(data.user);

      // redirect til /home
      setLocation('/home');
    } else {
      console.error('Login failed:', response.status);
      // Handle login error
    }

    // Faa status 200 tilbage
  };

  const handleLogout = async () => {
    const response = await fetch(apiUrl + '/auth/logout', {
      method: 'GET',
      credentials: 'include', // INCLUDES THE JWT TOKEN/COOKIE SO IT CAN BE DELETED (Even for cross-origin requiests)
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    });
    setUser(null);
    console.log(response);
  };

  return (
    <div className="relative h-screen flex items-center justify-center flex-1 w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 flex items-center justify-center h-full px-4'>
        <div className='bg-zinc-900 p-24 min-w-[24rem] max-w-[48rem] rounded'>
          <h1 className='text-lg pb-8'>Login</h1>
          <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
            <label htmlFor='email' className='text-sm'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='p-2 rounded bg-zinc-800 text-white w-full'
              required
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
            />
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pb-4 pt-4'>
              <Button type='submit' color='secondary' className='w-full sm:w-auto'>
                Login
              </Button>
              <p className='py-2 text-center sm:text-left text-sm flex gap-2 flex-wrap'>
                Mangler du en konto?
                <a href='/signup' className='text-indigo-500 underline ml-1 text-sm'>
                  Opret en konto her
                </a>
              </p>
            </div>
          </form>
          <button onClick={handleLogout}>LOGOUT NUU!!!!</button>
        </div>
      </div>
    </div>
  );
}
