import { useState } from 'react';

interface AddExerciseProps {
  weekIndex: number;
}

const AddExercise = ({ weekIndex }: AddExerciseProps) => {
  const [exercises, setExercises] = useState(1);

  const addNewExerciseField = () => {
    setExercises((prev) => prev + 1);
  };
  const removeExerciseField = () => {
    setExercises((prev) => prev - 1);
  };

  return (
    <div className='space-y-4'>
      {[...Array(exercises)].map((_, i) => (
        <div key={i} className='space-y-2 p-4 bg-default-700 rounded relative'>
          <div className='absolute right-1 top-1'>
            {exercises > 1 && (
              <button
                onClick={() => removeExerciseField()}
                className='p-1 hover:bg-danger-100 rounded-full text-danger'
                type='button'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            )}
          </div>
          <input
            required
            name={'exerciseTitle' + i + weekIndex}
            type='text'
            className='p-4 w-full bg-default-800 rounded text-background'
            placeholder='Øvelse Navn'
          />
          <textarea
            required
            name={'exerciseDescription' + i + weekIndex}
            className='p-4 w-full bg-default-800 rounded text-background'
            placeholder='Øvelse Beskrivelse'
          />
        </div>
      ))}

      <div className='flex gap-2'>
        <button
          onClick={addNewExerciseField}
          type='button'
          className='bg-default-600 text-background px-4 py-2 rounded hover:bg-default-500 transition-colors'
        >
          Add Another Exercise
        </button>
      </div>
    </div>
  );
};

export default AddExercise;
