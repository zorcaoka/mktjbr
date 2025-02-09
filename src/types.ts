export interface CardData {
  id: number;
  title: string;
  url: string;
  order: number;
  enabled: boolean;
  disableReason?: string;
}

export interface Announcement {
  id: number;
  content: string;
  active: boolean;
}

export interface AdminState {
  cards: CardData[];
  announcement: Announcement | null;
  updateCard: (id: number, title: string, url: string) => void;
  addCard: (title: string, url: string) => void;
  deleteCard: (id: number) => void;
  reorderCards: (fromIndex: number, toIndex: number) => void;
  toggleCardStatus: (id: number, enabled: boolean, reason?: string) => void;
  updateAnnouncement: (content: string) => void;
  toggleAnnouncement: (active: boolean) => void;
  isAuthenticated: boolean;
  hasUnsavedChanges: boolean;
  saveChanges: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
