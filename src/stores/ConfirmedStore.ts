import { create } from 'zustand';
import { ConfirmedStoreResponse } from '../types/bookings';

interface ConfirmedStore {
  confirmedBooking: ConfirmedStoreResponse | null;
  setConfirmedBooking: (booking: ConfirmedStoreResponse) => void;
  clearConfirmedBooking: () => void;
}

const useConfirmedStore = create<ConfirmedStore>((set) => ({
  confirmedBooking: null,
  setConfirmedBooking: (confirmedBooking) => set({ confirmedBooking }),
  clearConfirmedBooking: () => set({ confirmedBooking: null }),
}));

export default useConfirmedStore;
