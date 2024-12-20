import { Button } from '@nextui-org/react';
import { Link } from 'wouter';
import logo from '../assets/logo/logo.svg';
import WhoAreWe from '../components/landingPage/WhoAreWe';

export default function LandingPage() {
  return (
    <div className="relative w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='min-h-screen relative h-full w-full md:pt-16 flex flex-col items-center justify-center'>
        <div className='absolute top-0 h-full w-full bg-gray-800 opacity-50 backdrop-blur-sm'></div>
        <div className='max-w-7xl mx-auto'>
          <div className='md:hidden max-md:absolute top-0 z-10 p-4'>
            <img src={logo} alt='Company Logo' className='h-8 md:hidden' />
          </div>
          <div className='relative z-10 flex items-center justify-center  sm:justify-start h-full px-4 sm:pl-0 w-full sm:w-3/4'>
            <div className='text-center sm:text-left flex flex-col gap-4'>
              <h1 className='text-2xl pb-4 sm:pb-2'>FÅ 50% DE FØRSTE 2 MDR. + FRI OPRETTELSE</h1>
              <p className='text-xl sm:text-md pb-4 sm:pb-8'>
                Prøv 2 Bokse gratis, herefter 299,- md.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/login' className='w-full sm:w-auto'>
                  <Button type='submit' color='secondary' className='w-full' size='lg'>
                    Login
                  </Button>
                </Link>
                <Link href='/signup' className='w-full sm:w-auto'>
                  <Button
                    type='submit'
                    color='default'
                    variant='bordered'
                    className='w-full border-white bg-white bg-opacity-5'
                    size='lg'
                  >
                    Opret bruger
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhoAreWe />
    </div>
  );
}
