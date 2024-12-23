import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import HomeDesktop from '../components/home/HomeDesktop';
import { Workouts } from '../types/workouts';

// Mock child components
vi.mock('../components/home/UserInfoCard', () => ({
  default: () => <div data-testid='user-info-card'>UserInfoCard</div>,
}));

vi.mock('../components/home/UserChartMobile', () => ({
  default: () => <div data-testid='user-chart'>UserChartMobile</div>,
}));

vi.mock('../components/workouts/WorkoutCard', () => ({
  default: ({ workout_id }: { workout_id: string }) => (
    <div data-testid={`workout-card-${workout_id}`}>WorkoutCard</div>
  ),
}));

describe('HomeDesktop', () => {
  const mockProps = {
    error: false,
    workoutPrograms: [
      {
        workout_id: 1,
        workout_name: 'string',
        workout_description: 'string',
        workout_level: 'string',
        workout_image: 'string',
        workout_weeks: [
          {
            week_id: 1,
            week_name: 'string',
            week_description: 'string',
            exercises: [
              { exercise_id: 1, exercise_name: 'string', exercise_description: 'string' },
            ],
          },
        ],
        created_at: 'string',
        updated_at: 'string',
      } as Workouts,
      {
        workout_id: 2,
        workout_name: 'string',
        workout_description: 'string',
        workout_level: 'string',
        workout_image: 'string',
        workout_weeks: [
          {
            week_id: 2,
            week_name: 'string',
            week_description: 'string',
            exercises: [
              { exercise_id: 2, exercise_name: 'string', exercise_description: 'string' },
            ],
          },
        ],
        created_at: 'string',
        updated_at: 'string',
      } as Workouts,
    ],
    normalCards: [{ title: 'Book Training' }, { title: 'Explore Boxes' }],
    userCards: [
      { title: 'Betalingshistorik' },
      { title: 'Betalingmetode' },
      { title: 'Kontakt Support' },
    ],
    lastestBooking: true,
    handleCardClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all sections correctly', async () => {
    render(<HomeDesktop {...mockProps} />);
    expect(screen.getByTestId('user-info-card')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('user-chart')).toBeInTheDocument());
  });

  it('displays workout programs correctly', () => {
    render(<HomeDesktop {...mockProps} />);
    mockProps.workoutPrograms.forEach((workout) => {
      expect(screen.getByTestId(`workout-card-${workout.workout_id}`)).toBeInTheDocument();
    });
  });

  it('handles card clicks correctly', () => {
    render(<HomeDesktop {...mockProps} />);
    const paymentHistoryCard = screen.getByText('Betalingshistorik');
    fireEvent.click(paymentHistoryCard);
    expect(mockProps.handleCardClick).toHaveBeenCalledWith('Betalingshistorik');
  });

  it('shows error state when workout programs fail to load', () => {
    render(<HomeDesktop {...mockProps} error={true} />);
    expect(screen.getByText('Failed To Load Workouts')).toBeInTheDocument();
  });

  it('displays loading state for lazy-loaded components', () => {
    render(<HomeDesktop {...mockProps} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
