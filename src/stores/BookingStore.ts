// AdminUsersStore.ts
import { create } from 'zustand';
import { CurrentBookings } from '../types/bookings';

interface BookingsStore {
  userBookings: CurrentBookings[] | null;
  setUserBookings: (bookings: CurrentBookings[]) => void;
  clearUserBookings: () => void;
}

const useBookingStore = create<BookingsStore>((set) => ({
  userBookings: null,
  setUserBookings: (userBookings) => set({ userBookings }),
  clearUserBookings: () => set({ userBookings: null }),
}));

export default useBookingStore;
