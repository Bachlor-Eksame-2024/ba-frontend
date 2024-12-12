// AdminUsersStore.ts
import { create } from 'zustand';

interface Booking {
  user_id: number;
  booking_box_id_fk: number;
  booking_date: string;
  booking_start_hour: number;
  booking_duration_hours: number;
  booking_end_hour: number;
}

interface BookingsStore {
  collectedBooking: Booking | null;
  setCollectedBooking: (bookings: Booking) => void;
  clearCollectedBooking: () => void;
}

const useCollectedBooking = create<BookingsStore>((set) => ({
  collectedBooking: null,
  setCollectedBooking: (collectedBooking) => set({ collectedBooking }),
  clearCollectedBooking: () => set({ collectedBooking: null }),
}));

export default useCollectedBooking;
