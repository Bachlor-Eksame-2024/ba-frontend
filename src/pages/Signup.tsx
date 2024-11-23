import { Button } from '@nextui-org/react';
import { Checkbox } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
// Import {centers} from ./centers.tsx ?

export default function Signup() {
  const centers = [
    { key: 'fitnessx', label: 'Fitness X' },
    { key: 'sats', label: 'SATS' },
    { key: 'puregym', label: 'Puregym' },
    { key: 'fitogsund', label: 'Fit & Sund' },
    { key: 'loopfitness', label: 'Loop Fitness' },
    { key: 'copenhagengym', label: 'Copenhagen Gym' },
    { key: 'powerhouse', label: 'Power House' },
    { key: 'ground', label: 'Ground' },
  ]; // Evt. ryk de her ind i egen fil og importer dem oppe i toppen
  return (
    <div className="relative h-screen w-full bg-[url('./assets/HealthFitness1.jpeg')] bg-cover bg-center">
      <div className='absolute inset-0 bg-gray-800 opacity-50 backdrop-blur-sm'></div>
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className='bg-zinc-900 p-20 w-1/3 rounded-md	'>
          <h1 className='text-4xl pb-8'>Opret en bruger</h1>
          <form className='flex flex-col space-y-4'>
            <label htmlFor='email' className='text-base'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='p-2 rounded-md bg-zinc-800 text-white'
              required
            />
            <div className='flex justify-between space-x-4 pb-6'>
              <div className='flex flex-col w-1/2'>
                <label htmlFor='fornavn' className='text-base'>
                  Fornavn
                </label>
                <input
                  type='text'
                  id='fornavn'
                  name='fornavn'
                  className='p-2 rounded-md bg-zinc-800 text-white'
                  required
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor='efternavn' className='text-base'>
                  Efternavn
                </label>
                <input
                  type='text'
                  id='efternavn'
                  name='efternavn'
                  className='p-2 rounded-md bg-zinc-800 text-white'
                  required
                />
              </div>
            </div>
            <Select
              radius='sm'
              isRequired
              labelPlacement='outside'
              label='Nuværende center'
              placeholder='Vælg et fitness center'
              defaultSelectedKeys={['fitnessx']}
              className='max-w'
            >
              {centers.map((center) => (
                <SelectItem key={center.key}>{center.label}</SelectItem>
              ))}
            </Select>
            <label htmlFor='password' className='text-base'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='p-2 rounded-md bg-zinc-800 text-white'
              required
            />
            <label htmlFor='repassword' className='text-base'>
              Re-Password
            </label>
            <input
              type='password'
              id='repassword'
              name='repassword'
              className='p-2 rounded-md bg-zinc-800 text-white'
              required
            />
            <Checkbox defaultSelected color='secondary' className='my-2'>
              Jeg godkender x y og x betingelser.
            </Checkbox>
            <div className='flex items-center space-x-4'>
              <Button type='submit' color='secondary'>
                Opret bruger
              </Button>
              <p className='py-2'>
                Har du allerede en konto?
                <a href='/login' className='text-indigo-500 underline ml-1'>
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
