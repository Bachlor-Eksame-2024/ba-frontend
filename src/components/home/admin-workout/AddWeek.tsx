import { CreateExercise } from '../../../types/workouts';
import AddExercise from './AddExercise';

interface AddWeekProps {
  index: number;
  exercises: CreateExercise[];
  onAddExercise: (weekIndex: number, exercise: CreateExercise) => void;
}

const AddWeek = ({ index }: AddWeekProps) => {
  return (
    <div className='border p-4 rounded space-y-4'>
      <h3>Uge {index + 1}</h3>
      <div className='space-y-2'>
        <input
          required
          name={'weekTitle' + index}
          type='text'
          className='p-4 w-full bg-default-800 rounded text-background'
          placeholder='Uge Titel'
        />
        <input
          required
          name={'weekDescription' + index}
          type='text'
          className='p-4 w-full bg-default-800 rounded text-background'
          placeholder='Uge Beskrivelse'
        />
      </div>
      <AddExercise weekIndex={index} />
    </div>
  );
};

export default AddWeek;
