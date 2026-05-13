import { create } from 'zustand';
import { Lot } from '../types/lot.types';
import { useAppStore } from './app.store';

interface LotState {
  lots: Lot[];
  isLoading: boolean;
  error: string | null;
  fetchLots: () => Promise<void>;
  addLot: (lot: Lot) => Promise<void>;
  updateLot: (id: string, updates: Partial<Lot>) => Promise<void>;
}

export const useLotStore = create<LotState>((set, get) => ({
  lots: [],
  isLoading: false,
  error: null,

  fetchLots: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulation d'un fetch depuis Firestore/local SQLite
      // Dans le futur : const data = await Firebase.firestore().collection('lots').get()
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addLot: async (lot) => {
    set({ isLoading: true, error: null });
    try {
      const isOnline = useAppStore.getState().isOnline;
      if (!isOnline) {
        // Logique offline-first : Sauver en local et taguer pour synchro
        // lot.syncStatus = 'pending'
      }

      set((state) => ({ lots: [lot, ...state.lots], isLoading: false }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateLot: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      set((state) => ({
        lots: state.lots.map(l => (l.id === id ? { ...l, ...updates } : l)),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));
