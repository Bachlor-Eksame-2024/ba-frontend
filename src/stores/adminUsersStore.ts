// AdminUsersStore.ts
import { create } from 'zustand';
import { AdminUsersResponse } from '../types/user';

interface AdminUsersStore {
  adminUsers: AdminUsersResponse | null;
  setAdminUsers: (users: AdminUsersResponse) => void;
  clearAdminUsers: () => void;
}

const useAdminUsersStore = create<AdminUsersStore>((set) => ({
  adminUsers: null,
  setAdminUsers: (adminUsers) => set({ adminUsers }),
  clearAdminUsers: () => set({ adminUsers: null }),
}));

export default useAdminUsersStore;
