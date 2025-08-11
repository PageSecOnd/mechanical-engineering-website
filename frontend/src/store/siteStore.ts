import { create } from 'zustand';
import { SiteSettings } from '@/shared/types';
import api from '@/lib/api';

interface SiteState {
  settings: SiteSettings | null;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
}

export const useSiteStore = create<SiteState>((set, get) => ({
  settings: null,
  isLoading: false,

  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get<{ success: boolean; data: SiteSettings }>('/site/settings');
      set({ settings: response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateSettings: async (newSettings) => {
    set({ isLoading: true });
    try {
      const response = await api.put<{ success: boolean; data: SiteSettings }>('/site/settings', newSettings);
      set({ settings: response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));