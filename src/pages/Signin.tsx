import { Button } from '@nextui-org/react';

export default function Signin() {
  return (
    <div className="relative h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 flex items-center justify-center h-full px-4'>
        <div className='bg-zinc-900 p-6 sm:p-10 md:p-20 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-2xl rounded-md'>
          <h1 className='text-3xl md:text-4xl pb-8'>Login</h1>
          <form className='flex flex-col space-y-4'>
            <label htmlFor='email' className='text-base'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='p-2 rounded-md bg-zinc-800 text-white w-full'
              required
            />
            <label htmlFor='password' className='text-base'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='p-2 rounded-md bg-zinc-800 text-white w-full'
              required
            />
            <div className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4'>
              <Button type='submit' color='secondary' className='w-full sm:w-auto'>
                Login
              </Button>
              <p className='py-2 text-center sm:text-left'>
                Mangler du en konto?
                <a href='/signup' className='text-indigo-500 underline ml-1'>
                  Opret en konto her
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
