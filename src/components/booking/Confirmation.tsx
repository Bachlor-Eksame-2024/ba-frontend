function Confirmation() {
  // If payment is successful, display the following:
  // Else, redirect to the previous page or Homepage

  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-full flex-grow pt-16'>
      <p className='success confp'>Du har successfuldt booket boks 4</p>
      <div className='max-h-72 max-w-72 h-40 w-40 min-h-32 min-w-32'>
        <svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130.2 130.2'>
          <circle
            className='path circle confsvg'
            fill='none'
            stroke='#7828C8'
            strokeWidth='6'
            strokeMiterlimit='10'
            cx='65.1'
            cy='65.1'
            r='62.1'
          />
          <polyline
            className='path check'
            fill='none'
            stroke='#7828C8'
            strokeWidth='6'
            strokeLinecap='round'
            strokeMiterlimit='10'
            points='100.2,40.2 51.5,88.8 29.8,67.5 '
          />
        </svg>
      </div>
      <p className='success confp'>Din kode er: 1234</p>
    </div>
  );
}

export default Confirmation;
