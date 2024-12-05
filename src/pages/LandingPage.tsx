import { Button } from '@nextui-org/react';
import { Link } from 'wouter';
import logo from '../assets/logo/logo.svg';

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 p-4'>
        <img src={logo} alt='Company Logo' className='h-8 md:hidden' />
      </div>
      <div className='relative z-10 flex items-center justify-center sm:justify-start h-full px-4 sm:pl-28 w-full sm:w-6/12'>
        <div className='text-center sm:text-left'>
          <h1 className='text-3xl pb-4 sm:pb-8'>FÅ 50% DE FØRSTE 2 MDR. + FRI OPRETTELSE</h1>
          <p className='text-lg sm:text-xl pb-4 sm:pb-8'>Prøv 2 Bokse gratis, herefter 299,- md.</p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link href='/login' className='w-full sm:w-auto'>
              <Button type='submit' color='secondary' className='w-full' size='lg'>
                Login
              </Button>
            </Link>
            <Link href='/signup' className='w-full sm:w-auto'>
              <Button type='submit' color='default' variant='bordered' className='w-full' size='lg'>
                Opret bruger
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
