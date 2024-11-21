import { create } from 'zustand';
import { User } from '../types/user';

interface UserStore {
  userInfo: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  setUser: (userInfo: User) => set({ userInfo }),
  clearUser: () => set({ userInfo: null }),
}));

export default useUserStore;
