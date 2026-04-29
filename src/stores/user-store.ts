import { create } from 'zustand';
import { User } from '@/types';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  dailyCount: number;
  setDailyCount: (count: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  dailyCount: 0,
  setDailyCount: (count) => set({ dailyCount: count }),
}));
