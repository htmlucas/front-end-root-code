import { create } from 'zustand';

import type { QuoteResponse } from '../types/quote';

interface QuoteStore {
  loading: boolean;
  quote: QuoteResponse | null;

  setLoading: (loading: boolean) => void;
  setQuote: (quote: QuoteResponse | null) => void;
}

export const useQuoteStore = create<QuoteStore>(
  (set) => ({
    loading: false,

    quote: null,

    setLoading: (loading) =>
      set({ loading }),

    setQuote: (quote) =>
      set({ quote }),
  })
);