import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedStore {
  items: string[];
  addItem: (productId: string) => void;
  getItems: (limit?: number) => string[];
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) =>
        set((state) => ({
          items: [
            productId,
            ...state.items.filter((id) => id !== productId),
          ].slice(0, 12),
        })),

      getItems: (limit = 4) => get().items.slice(0, limit),
    }),
    { name: "daycrunch-recently-viewed" }
  )
);
