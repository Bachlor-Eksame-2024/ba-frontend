import { Button } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import useUserStore from '../stores/UserStore';
import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { validateEmail } from '../modules/validate';
import { validateFirstName } from '../modules/validate';
import { validateLastName } from '../modules/validate';
import { validatePassword } from '../modules/validate';
import { validatePhoneNumer } from '../modules/validate';

export default function Signup() {
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  // API Key and URL
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { setUser } = useUserStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_location, navigate] = useLocation();

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validateEmail(value)) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validatePhoneNumer(value)) {
      setPhoneError('Invalid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validatePassword(value)) {
      setPasswordError('Invalid password');
    } else {
      setPasswordError('');
    }
  };

  const handleFirstNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validateFirstName(value)) {
      setFirstNameError('Invalid first name');
    } else {
      setFirstNameError('');
    }
  };

  const handleLastNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!validateLastName(value)) {
      setLastNameError('Invalid last name');
    } else {
      setLastNameError('');
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const fitness_center = formData.get('fitness_center') as string;
    const password = formData.get('password') as string;
    const phone = formData.get('phone') as string;

    const response = await fetch(apiUrl + '/auth/signup', {
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

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      navigate('/home');
    } else {
      const errorData = await response.json();
      if (errorData.detail) {
        switch (errorData.detail) {
          case 'Invalid email':
            setEmailError('Invalid email');
            break;
          case 'Invalid phone number':
            setPhoneError('Invalid phone number');
            break;
          case 'Invalid password':
            setPasswordError('Invalid password');
            break;
          case 'Invalid first name':
            setFirstNameError('Invalid first name');
            break;
          case 'Invalid last name':
            setLastNameError('Invalid last name');
            break;
          case 'User email already exists':
            setEmailError('User email already exists');
            break;
          case 'User phone number already exists':
            setPhoneError('User phone number already exists');
            break;
          default:
            // Handle other errors
            break;
        }
      }
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
    <div className="relative min-h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center flex items-center justify-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 flex items-center justify-center h-full px-4'>
        <div className='bg-zinc-900 p-6 sm:p-10 md:p-20 w-full min-w-40 rounded'>
          <h1 className='text-lg pb-8'>Opret en bruger</h1>
          <form onSubmit={handleSignUp} className='flex flex-col space-y-4'>
            <div className='flex sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0 pb-4 gap-2'>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='email' className='text-sm'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  onBlur={handleEmailBlur}
                  required
                />
                {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
              </div>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='phone' className='text-sm'>
                  Telefon nummer
                </label>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  onBlur={handlePhoneBlur}
                  required
                />
                {phoneError && <p className='text-red-500 text-sm'>{phoneError}</p>}
              </div>
            </div>
            <div className='flex sm:flex-row sm:justify-between sm:space-x-4 gap-2 sm:space-y-0 pb-8'>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='first_name' className='text-sm'>
                  Fornavn
                </label>
                <input
                  type='text'
                  id='first_name'
                  name='first_name'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  onBlur={handleFirstNameBlur}
                  required
                />
                {firstNameError && <p className='text-red-500 text-sm'>{firstNameError}</p>}
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
                  onBlur={handleLastNameBlur}
                  required
                />
                {lastNameError && <p className='text-red-500 text-sm'>{lastNameError}</p>}
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
              className='max-w-full pb-4'
            >
              {centers.map((center) => (
                <SelectItem key={center.key}>{center.label}</SelectItem>
              ))}
            </Select>
            <div className='flex  sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0 pb-4 gap-2'>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='password' className='text-sm'>
                  Kodeord
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  onBlur={handlePasswordBlur}
                  required
                />
                {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
              </div>
              <div className='flex flex-col w-full sm:w-1/2'>
                <label htmlFor='repassword' className='text-sm'>
                  Gentag kodeord
                </label>
                <input
                  type='password'
                  id='repassword'
                  name='repassword'
                  className='p-2 rounded bg-zinc-800 text-white w-full'
                  required
                />
              </div>
            </div>
            <Checkbox defaultSelected color='secondary' className='my-2' size='sm'>
              Jeg godkender x y og x betingelser.
            </Checkbox>
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
              <Button type='submit' color='secondary' className='px-8'>
                Opret bruger
              </Button>
              <p className='py-2 text-center sm:text-left text-sm'>
                Har du allerede en konto?
                <Link href='/login' className='text-indigo-500 underline text-sm ml-1'>
                  Login her
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
