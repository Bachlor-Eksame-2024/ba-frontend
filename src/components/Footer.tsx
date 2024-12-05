import logo from '../assets/logo/logo.svg';
import { useAuth } from '../hooks/useAuth';

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer
      className={`f${isAuthenticated ? 'bg-default-300' : 'hover:bg-default-200'} flex justify-between p-10`}
    >
      <div className='ml-8'>
        <img src={logo} alt='Company Logo' className='h-8 mt-4' />
      </div>
      <div className='flex gap-20 mr-8'>
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
        <div className='text-sm'>
          <h3 className='text-base mb-2'>Kontakt</h3>
          <p>+45 12 34 56 78</p>
          <p>ba-fitboks@outlook.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
