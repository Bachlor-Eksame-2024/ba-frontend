import { useState } from 'react';
import { Card, CardBody, Image } from '@nextui-org/react';
import { CircleCheck } from 'lucide-react';

export default function PaymentMethod() {
  const [selected, setSelected] = useState(0);

  return (
    <Card shadow='none'>
      <CardBody className='grid md:grid-cols-2 justify-items-center items-center gap-2 p-4'>
        <div className='flex flex-col items-center gap-2' onClick={() => setSelected(1)}>
          <Card
            className={`relative border-2 border-white ${selected === 1 && 'border-secondary'} rounded-md max-w-80 aspect-video hover:bg-default-100 cursor-pointer`}
          >
            {selected === 1 && <CircleCheck className='absolute top-3 right-3 stroke-secondary' />}
            <CardBody className='flex flex-col items-center justify-center'>
              <Image className={'grayscale'} src={'./public/mobilepay-logo.png'} alt='image' />
            </CardBody>
          </Card>
          <span className='order-3'>MobilePay</span>
        </div>
        <div className='flex flex-col items-center gap-2' onClick={() => setSelected(2)}>
          <Card
            className={`relative border-2 border-white ${selected === 2 && 'border-secondary'} rounded-md max-w-80 aspect-video hover:bg-default-100 cursor-pointer`}
          >
            {selected === 2 && <CircleCheck className='absolute top-3 right-3 stroke-secondary' />}
            <CardBody className='flex flex-col items-center justify-center p-16'>
              <Image className={'invert w-fit'} src={'./public/credit-card-icon.svg'} alt='image' />
            </CardBody>
          </Card>
          <span>Kredit Kort</span>
        </div>
      </CardBody>
    </Card>
  );
}
