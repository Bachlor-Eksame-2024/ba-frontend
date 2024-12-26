import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TimeSlotSelector from '../components/booking/TimeSlotSelector';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock NextUI components
vi.mock('@nextui-org/react', () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Spinner: () => <div>Loading...</div>,
  Calendar: ({
    onChange,
  }: {
    onChange: (date: { day: number; month: number; year: number }) => void;
  }) => (
    <div>
      <button
        onClick={() => onChange({ day: 1, month: 1, year: 2024 })}
        data-testid='calendar-button'
      >
        Select Date
      </button>
    </div>
  ),
  Input: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}));

// Mock date functions
vi.mock('@internationalized/date', () => ({
  today: () => ({ day: 1, month: 1, year: 2024 }),
  getLocalTimeZone: () => 'UTC',
}));

// Mock stores
vi.mock('../stores/UserStore', () => ({
  default: vi.fn(() => ({
    userInfo: { user_id: 1, fitness_center_id: 1 },
  })),
}));

// Mock fetch
window.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        box_availability: {
          '1': [
            { start_hour: '0900', end_hour: '1000' },
            { start_hour: '1000', end_hour: '1100' },
          ],
        },
      }),
  })
) as unknown as ReturnType<typeof vi.fn>;

describe('TimeSlotSelector', () => {
  const mockSetShowPayment = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows selecting date and time', async () => {
    render(<TimeSlotSelector setShowPayment={mockSetShowPayment} />);

    // Select amount
    const twoHoursButtons = screen.getAllByText('2');
    fireEvent.click(twoHoursButtons[0]);

    // Select date
    const calendarButton = screen.getByTestId('calendar-button');
    fireEvent.click(calendarButton);

    // Wait for time slots
    await waitFor(() => {
      expect(screen.getByText('0900-1000')).toBeInTheDocument();
    });

    // Select time
    const timeSlot = screen.getByText('0900-1000');
    fireEvent.click(timeSlot);

    // Check confirmation (get first button for desktop view)
    const confirmButtons = screen.getAllByText('Videre');
    fireEvent.click(confirmButtons[0]);
    expect(mockSetShowPayment).toHaveBeenCalledWith(true);
  });

  it('shows no time slots when date is not selected', () => {
    render(<TimeSlotSelector setShowPayment={mockSetShowPayment} />);
    const headers = screen.getAllByText('Vælg antal timer');
    expect(headers[0]).toBeInTheDocument();
  });

  it('fetches time slots when date and amount are selected', async () => {
    render(<TimeSlotSelector setShowPayment={mockSetShowPayment} />);

    const twoHoursButtons = screen.getAllByText('2');
    fireEvent.click(twoHoursButtons[0]);

    const calendarButton = screen.getByTestId('calendar-button');
    fireEvent.click(calendarButton);

    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalled();
    });
  });
});
