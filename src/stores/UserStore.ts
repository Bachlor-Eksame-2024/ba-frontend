import { create } from 'zustand';
import { User } from '../types/user';

interface UserStore {
  userInfo: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  setUser: (userInfo: User | null) => set({ userInfo }),
  clearUser: () => set({ userInfo: null }),
}));

export default useUserStore;
