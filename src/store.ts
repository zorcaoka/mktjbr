import { create } from 'zustand';
import { AdminState, CardData } from './types';
import { persist } from 'zustand/middleware';

const defaultCards: CardData[] = [
  {
    id: 1,
    title: 'QR CODE MEMBER ALFAMART (LEWAT WA)',
    url: 'https://mktalfamartjbr.blogspot.com/',
    order: 0,
    enabled: true
  },
  {
    id: 2,
    title: 'Guidance Sarana Marketing',
    url: 'https://photos.app.goo.gl/4bFsQ982hsT95hYY8',
    order: 1,
    enabled: true
  },
  {
    id: 3,
    title: 'POP PWP,PSM,SEJAGAT',
    url: 'https://photos.app.goo.gl/23TRggSAMUdMfCWPA',
    order: 2,
    enabled: true
  },
  {
    id: 4,
    title: 'Audio Promo',
    url: 'https://www.mediafire.com/folder/idcp1plhp6kju/AUDIO+PROMO',
    order: 3,
    enabled: true
  }
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      cards: defaultCards,
      announcement: null,
      isAuthenticated: false,
      hasUnsavedChanges: false,
      updateCard: (id, title, url) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, title, url } : card
          ),
          hasUnsavedChanges: true,
        })),
      addCard: (title, url) =>
        set((state) => {
          const maxOrder = Math.max(...state.cards.map(c => c.order));
          return {
            cards: [
              ...state.cards,
              {
                id: Math.max(0, ...state.cards.map((c) => c.id)) + 1,
                title,
                url,
                order: maxOrder + 1,
                enabled: true
              },
            ],
            hasUnsavedChanges: true,
          };
        }),
      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
          hasUnsavedChanges: true,
        })),
      reorderCards: (fromIndex: number, toIndex: number) =>
        set((state) => {
          const newCards = [...state.cards];
          const [movedCard] = newCards.splice(fromIndex, 1);
          newCards.splice(toIndex, 0, movedCard);
          return {
            cards: newCards.map((card, index) => ({ ...card, order: index })),
            hasUnsavedChanges: true,
          };
        }),
      toggleCardStatus: (id, enabled, reason) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id
              ? { ...card, enabled, disableReason: enabled ? undefined : reason }
              : card
          ),
          hasUnsavedChanges: true,
        })),
      updateAnnouncement: (content) =>
        set((state) => ({
          announcement: {
            id: state.announcement?.id || Date.now(),
            content,
            active: true
          },
          hasUnsavedChanges: true,
        })),
      toggleAnnouncement: (active) =>
        set((state) => ({
          announcement: state.announcement
            ? { ...state.announcement, active }
            : null,
          hasUnsavedChanges: true,
        })),
      saveChanges: () =>
        set({ hasUnsavedChanges: false }),
      login: (username, password) => {
        if (username === 'admin' && password === 'admin123') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, hasUnsavedChanges: false }),
    }),
    {
      name: 'admin-storage',
      partialize: (state) => ({
        cards: state.cards,
        announcement: state.announcement
      })
    }
  )
);
