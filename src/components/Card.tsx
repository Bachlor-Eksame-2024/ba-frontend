interface CardProps {
  image?: string | null;
  type?: 'regular' | 'workout' | 'workoutmini';
  title?: string;
  description?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | null;
}

function Card({ image, type = 'regular', title = 'Title', description = '', level }: CardProps) {
  const RegularCard = () => {
    return (
      <div className='min-w-72 min-h-40 aspect-video bg-default-200 rounded-lg flex flex-col justify-center items-center overflow-hidden p-4 relative cursor-pointer'>
        <div className='flex flex-col z-[2]'>
          <h4 className='text-3xl text-center'>{title}</h4>
          <p>{description}</p>
        </div>

        {image && (
          <div className='absolute w-full h-full'>
            <div className='absolute top-0 w-full h-full bg-black/20 z-[1]'></div>
            <img className='absolute top-0 object-cover w-full h-full' src={image} alt='' />
          </div>
        )}
      </div>
    );
  };

  const WorkoutCard = () => {
    return (
      <div className='min-w-72 min-h-40 aspect-video bg-default-200 rounded-lg flex flex-col justify-center items-center overflow-hidden p-4 relative cursor-pointer'>
        <div className='absolute top-0 left-0 bg-purple-400 rounded-tl-lg rounded-br-lg'>
          <span className='py-2 px-3 font-thin'>{level}</span>
        </div>
        <div className='flex flex-col justify-end h-full w-full items-start z-[2]'>
          <h4 className='text-lg text-center'>{title}</h4>
        </div>
        {image && (
          <div className='absolute w-full h-full'>
            <div className='absolute top-0 w-full h-full bg-black/20 z-[1]'></div>
            <img className='absolute top-0 object-cover w-full h-full' src={image} alt='' />
          </div>
        )}
      </div>
    );
  };
  const WorkoutCardMini = () => {
    return (
      <div className='min-w-40 w-full flex-nowrap min-h-40 max-sm:aspect-[4/3] sm:aspect-video bg-default-200 rounded-lg flex flex-col justify-center items-center overflow-hidden p-2 relative cursor-pointer'>
        <div className='absolute top-0 left-0 bg-purple-400 rounded-tl-lg rounded-br-lg z-[2]'>
          <span className='py-2 px-3 font-thin'>{level}</span>
        </div>
        <div className='flex flex-col justify-end h-full w-full items-start z-[2]'>
          <h4 className='text-base text-left'>{title}</h4>
        </div>
        {image && (
          <div className='absolute w-full h-full'>
            <div className='absolute top-0 w-full h-full bg-black/20 z-[1]'></div>
            <img className='absolute top-0 object-cover w-full h-full' src={image} alt='' />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {type === 'regular' && <RegularCard />}
      {type === 'workout' && <WorkoutCard />}
      {type === 'workoutmini' && <WorkoutCardMini />}
    </>
  );
}

export default Card;
