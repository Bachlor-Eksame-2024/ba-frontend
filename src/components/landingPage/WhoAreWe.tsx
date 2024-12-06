import React from 'react';

function WhoAreWe() {
  return (
    <div className='bg-neutral-900'>
      <div className='max-w-7xl px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20 mx-auto'>
        <div className='max-w-3xl mb-10 lg:mb-14'>
          <h2 className='text-white text-2xl  md:leading-tight'>Vores tilgang</h2>
          <p className='mt-1 text-neutral-400'>
            Med Fitboks får du en personlig træningsoplevelse — fra enkel booking og fleksibel
            planlægning til enestående faciliteter i moderne bokse udstyret med alt, du behøver til
            din træning.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center'>
          <div className='aspect-w-16 aspect-h-9 lg:aspect-none'>
            <img
              className='w-full object-cover rounded-xl'
              src='https://images.pexels.com/photos/3577288/pexels-photo-3577288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='Features Image'
            />
          </div>

          <div>
            <div className='mb-4'>
              <h3 className='text-secondary text-xs font-medium uppercase'>Steps</h3>
            </div>
            <div className='flex gap-x-5 ms-1'>
              <div className='relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-600'>
                <div className='relative z-10 size-8 flex justify-center items-center'>
                  <span className='flex shrink-0 justify-center items-center size-8 border border-neutral-600 text-secondary font-semibold text-xs uppercase rounded-full'>
                    1
                  </span>
                </div>
              </div>

              <div className='grow pt-0.5 pb-8 sm:pb-12'>
                <p className='text-sm lg:text-base text-neutral-400'>
                  <span className='text-white'>Opret en profil: </span>
                  Tilmeld dig med din e-mailadresse, og få adgang til din personlige Fitboks-konto.
                </p>
              </div>
            </div>
            <div className='flex gap-x-5 ms-1'>
              <div className='relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-600'>
                <div className='relative z-10 size-8 flex justify-center items-center'>
                  <span className='flex shrink-0 justify-center items-center size-8 border border-neutral-600 text-secondary font-semibold text-xs uppercase rounded-full'>
                    2
                  </span>
                </div>
              </div>

              <div className='grow pt-0.5 pb-8 sm:pb-12'>
                <p className='text-sm lg:text-base text-neutral-400'>
                  <span className='text-white'>Book din boks: </span>
                  Vælg en ledig tid, og reserver en boks med alt det udstyr, du skal bruge.
                </p>
              </div>
            </div>
            <div className='flex gap-x-5 ms-1'>
              <div className='relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-600'>
                <div className='relative z-10 size-8 flex justify-center items-center'>
                  <span className='flex shrink-0 justify-center items-center size-8 border border-neutral-600 text-secondary font-semibold text-xs uppercase rounded-full'>
                    3
                  </span>
                </div>
              </div>
              <div className='grow pt-0.5 pb-8 sm:pb-12'>
                <p className='text-sm md:text-base text-neutral-400'>
                  <span className='text-white'>Træn og nyd: </span>
                  Mød op, brug boksen i dit eget tempo, og få det meste ud af din træning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhoAreWe;
