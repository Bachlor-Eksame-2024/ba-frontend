import logo from '../assets/logo/logo.svg';

function Footer() {
  return (
    <footer className='flex justify-between p-10 mx-10'>
      <div>
        <img src={logo} alt='Company Logo' className='h-8 mt-4' />
      </div>
      <div className='flex gap-20'>
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
