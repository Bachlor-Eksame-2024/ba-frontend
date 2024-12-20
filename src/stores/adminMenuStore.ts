import { create } from 'zustand';

interface AdminMenuState {
  adminMenu: string;
  setAdminMenu: (newAdminMenu: string) => void;
}

const useAdminMenuStore = create<AdminMenuState>((set) => ({
  adminMenu: 'Dashboard',
  setAdminMenu: (newAdminMenu: string) => set({ adminMenu: newAdminMenu }),
}));

export default useAdminMenuStore;
