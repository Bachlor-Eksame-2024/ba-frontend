import { Button } from '@nextui-org/react';

export default function LandingPage() {
  return (
    <div className="relative h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 p-4'>Logo</div>
      <div className='relative z-10 flex items-center justify-center sm:justify-start h-full px-4 sm:pl-28 w-full sm:w-6/12'>
        <div className='text-center sm:text-left'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-4 sm:pb-8'>
            FÅ 50% DE FØRSTE 2 MDR. + FRI OPRETTELSE
          </h1>
          <p className='text-lg sm:text-xl pb-4 sm:pb-8'>Prøv 2 Bokse gratis, herefter 299,- md.</p>
          <div className='flex flex-col sm:flex-row gap-4'>
            <a href='/login' className='w-full sm:w-auto'>
              <Button type='submit' color='secondary' className='w-full' size='lg'>
                Login
              </Button>
            </a>
            <a href='/signup' className='w-full sm:w-auto'>
              <Button type='submit' color='default' variant='bordered' className='w-full' size='lg'>
                Opret bruger
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
