import logo from '../assets/logo/logo.svg';
import { useAuth } from '../hooks/useAuth';

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className={`${isAuthenticated ? 'bg-default-100' : 'bg-default-50'} p-10`}>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center md:text-left text-center'>
        <div className='mb-4 md:mb-0'>
          <img src={logo} alt='Company Logo' className='h-8' />
        </div>
        <div className='flex flex-col md:flex-row gap-10 md:gap-20 mt-4'>
          <div className='text-sm'>
            <h3 className='text-base mb-2'>Firma</h3>
            <p>Fitboks A/S</p>
            <p>Adresse 32</p>
            <p>1550 København</p>
            <p>CVR: 12345678</p>
          </div>
          <div className='text-sm'>
            <h3 className='text-base mb-2'>Information</h3>
            <p>Standardbetingelser</p>
            <p>Cookie- og persondatapolitik</p>
          </div>
          <div className='text-sm mb-20'>
            <h3 className='text-base mb-2'>Kontakt</h3>
            <p>+45 12 34 56 78</p>
            <p>ba-fitboks@outlook.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
