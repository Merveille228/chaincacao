import { create } from 'zustand';
import { Lot } from '../types/lot.types';

interface AppState {
  isOnline: boolean;
  pendingSync: Lot[];
  theme: 'light' | 'dark';
  setOnline: (isOnline: boolean) => void;
  addPendingLot: (lot: Lot) => void;
  clearPendingLots: () => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnline: true,
  pendingSync: [],
  theme: 'light',
  setOnline: (isOnline) => set({ isOnline }),
  addPendingLot: (lot) => set((state) => ({ pendingSync: [...state.pendingSync, lot] })),
  clearPendingLots: () => set({ pendingSync: [] }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));
