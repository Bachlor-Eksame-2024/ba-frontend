import { Button } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
//import useUserStore from '../stores/UserStore';
// Import {centers} from ./centers.tsx ?

export default function Signup() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  //const { setUser } = useUserStore();
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Opret bruger');

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const fitness_center = formData.get('fitness_center') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;

    console.log(email);
    console.log(first_name);
    console.log(last_name);
    console.log(fitness_center);
    console.log(password);
    console.log(phone);

    const response = await fetch(apiUrl + '/auth/signupp', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        email: email,
        first_name: first_name,
        last_name: last_name,
        fitness_center_id: fitness_center,
        password: password,
        repeat_password: password,
        phone: phone,
      }),
    });

    console.log('Response from backend', response);
    if (response.ok) {
      const data = await response.json();
      console.log('Signup successful:', data);
      // setUser(data.user);
      // setLocation('/home');
    } else {
      console.error('Signup failed:', response.status);
      // Handle signup error
    }
  };
  const centers = [
    { key: '1', label: 'Fitness X' },
    { key: '2', label: 'SATS' },
    { key: '3', label: 'Puregym' },
    { key: '4', label: 'Fit & Sund' },
    { key: '5', label: 'Loop Fitness' },
    { key: '6', label: 'Copenhagen Gym' },
    { key: '7', label: 'Power House' },
    { key: '8', label: 'Ground' },
  ]; // Evt. ryk de her ind i egen fil og importer dem oppe i toppen
  return (
    <div className="relative h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 flex items-center justify-center h-full px-4'>
        <div className='bg-zinc-900 p-6 sm:p-10 md:p-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-2xl rounded'>
          <h1 className='text-xl pb-8'>Opret en bruger</h1>
          <form onSubmit={handleSignUp} className='flex flex-col space-y-4'>
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
            <div className='flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4 sm:space-y-0 pb-6'>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='first_name' className='text-sm'>
                  Fornavn
                </label>
                <input
                  type='text'
                  id='first_name'
                  name='first_name'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  required
                />
              </div>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='last_name' className='text-sm'>
                  Efternavn
                </label>
                <input
                  type='text'
                  id='last_name'
                  name='last_name'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  required
                />
              </div>
            </div>
            <Select
              radius='sm'
              isRequired
              name='fitness_center'
              labelPlacement='outside'
              label='Nuværende center'
              placeholder='Vælg et fitness center'
              defaultSelectedKeys={['fitnessx']}
              className='max-w-full'
            >
              {centers.map((center) => (
                <SelectItem key={center.key}>{center.label}</SelectItem>
              ))}
            </Select>
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
            <label htmlFor='repassword' className='text-sm'>
              Re-Password
            </label>
            <input
              type='password'
              id='repassword'
              name='repassword'
              className='p-2 rounded bg-zinc-800 text-white w-full'
              required
            />
            <label htmlFor='phone' className='text-sm'>
              Telefon nummer
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              className='p-2 rounded bg-zinc-800 text-white w-full'
              required
            />
            <Checkbox defaultSelected color='secondary' className='my-2'>
              Jeg godkender x y og x betingelser.
            </Checkbox>
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
              <Button type='submit' color='secondary' className='px-8'>
                Opret bruger
              </Button>
              <p className='py-2 text-center sm:text-left text-sm'>
                Har du allerede en konto?
                <a href='/login' className='text-indigo-500 underline text-sm ml-1'>
                  Login her
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
