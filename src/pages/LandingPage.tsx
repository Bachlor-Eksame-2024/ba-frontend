export default function LandingPage() {
  return (
    <div className="relative h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10'>Logo</div>
      <div className='relative z-10 flex items-center justify-start h-full pl-8 w-5/12'>
        <div>
          <h1 className='text-6xl pb-8'>FÅ 50% DE FØRSTE 2 MDR. + FRI OPRETTELSE</h1>
          <p className='pb-8'>Prøv 2 Bokse gratis, herefter 299,- md.</p>
          <button className='bg-violet-700 text-white font-bold py-2 px-4 rounded'>Login</button>
          <button className='bg-transparent text-white font-bold py-2 px-4 rounded border border-white ml-4'>
            Opret bruger
          </button>
        </div>
      </div>
    </div>
  );
}
