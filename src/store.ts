import { create } from 'zustand';
import { AdminState, CardData, CustomPage } from './types';

const defaultCards: CardData[] = [
  {
    id: 1,
    title: 'QR CODE MEMBER ALFAMART (LEWAT WA)',
    url: 'https://mktalfamartjbr.blogspot.com/'
  },
  {
    id: 2,
    title: 'Guidance Sarana Marketing',
    url: 'https://photos.app.goo.gl/4bFsQ982hsT95hYY8'
  },
  {
    id: 3,
    title: 'POP PWP,PSM,SEJAGAT',
    url: 'https://photos.app.goo.gl/23TRggSAMUdMfCWPA'
  },
  {
    id: 4,
    title: 'Audio Promo',
    url: 'https://www.mediafire.com/folder/idcp1plhp6kju/AUDIO+PROMO'
  }
];

export const useAdminStore = create<AdminState>((set) => ({
  cards: defaultCards,
  customPages: [],
  isAuthenticated: false,
  updateCard: (id, title, url) =>
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === id ? { ...card, title, url } : card
      ),
    })),
  addCard: (title, url) =>
    set((state) => ({
      cards: [
        ...state.cards,
        {
          id: Math.max(0, ...state.cards.map((c) => c.id)) + 1,
          title,
          url,
        },
      ],
    })),
  deleteCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),
    })),
  addCustomPage: (title, htmlContent) =>
    set((state) => ({
      customPages: [
        ...state.customPages,
        {
          id: Math.max(0, ...state.customPages.map((p) => p.id)) + 1,
          title,
          htmlContent,
          slug: title.toLowerCase().replace(/\s+/g, '-'),
        },
      ],
    })),
  updateCustomPage: (id, title, htmlContent) =>
    set((state) => ({
      customPages: state.customPages.map((page) =>
        page.id === id
          ? {
              ...page,
              title,
              htmlContent,
              slug: title.toLowerCase().replace(/\s+/g, '-'),
            }
          : page
      ),
    })),
  deleteCustomPage: (id) =>
    set((state) => ({
      customPages: state.customPages.filter((page) => page.id !== id),
    })),
  login: (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false }),
}));