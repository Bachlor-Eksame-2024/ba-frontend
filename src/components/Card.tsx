import { Image } from '@nextui-org/react';

interface CardProps {
  image?: string | null;
  type?: 'regular' | 'workout' | 'workoutmini';
  title?: string;
  description?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | null;
}

function Card({ image, type = 'regular', title = 'Title', description = '' }: CardProps) {
  const RegularCard = () => {
    return (
      <div className='min-w-72 min-h-40 aspect-video bg-default-100 rounded flex flex-col justify-center items-center overflow-hidden p-4 relative cursor-pointer'>
        <div className='flex flex-col z-[2] items-center justify-center'>
          <h4 className='text-md text-center'>{title}</h4>
          <p className='text-center'>{description}</p>
        </div>

        {image && (
          <div className='absolute w-full h-full'>
            <div className='absolute top-0 w-full h-full bg-black/20 z-[1] pointer-events-none'></div>
            <Image
              removeWrapper
              isZoomed
              className='absolute top-0 object-cover w-full h-full z-0 rounded'
              src={image}
              alt=''
            />
          </div>
        )}
      </div>
    );
  };

  return <>{type === 'regular' && <RegularCard />}</>;
}

export default Card;
