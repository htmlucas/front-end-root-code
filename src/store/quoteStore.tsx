import { create } from 'zustand';
import { api } from '../services/api';

import type { QuoteResponse, Traveler } from '../types/quote';

interface QuoteRequest {
    destino: string;
    data_inicio: string;
    data_fim: string;
    viajantes: Traveler[];
}

interface QuoteStore {
  loading: boolean;
  quote: QuoteResponse | null;
  errors: Record<string, string[]>;

  fetchQuote: (payload: QuoteRequest) => Promise<void>;

  setLoading: (loading: boolean) => void;
  setQuote: (quote: QuoteResponse | null) => void;
}

export const useQuoteStore = create<QuoteStore>(
  (set) => ({
    loading: false,
    quote: null,
    errors: {},

    fetchQuote: async (payload) => {
        try {
            set({
                loading: true,
                errors: {},
            });

            const { data } = await api.post(
                '/quotes',
                payload
            );

            set({
                quote: data,
                loading: false,
            });

        } catch (error: any) {
        set({
            loading: false,
            errors:
            error.response?.data?.errors || {},
        });
    }
  },
    setLoading: (loading) =>
      set({ loading }),

    setQuote: (quote) =>
      set({ quote }),
  })
);