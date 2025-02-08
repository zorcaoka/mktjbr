export interface CardData {
  id: number;
  title: string;
  url: string;
}

export interface CustomPage {
  id: number;
  title: string;
  htmlContent: string;
  slug: string;
}

export interface AdminState {
  cards: CardData[];
  customPages: CustomPage[];
  updateCard: (id: number, title: string, url: string) => void;
  addCard: (title: string, url: string) => void;
  deleteCard: (id: number) => void;
  addCustomPage: (title: string, htmlContent: string) => void;
  updateCustomPage: (id: number, title: string, htmlContent: string) => void;
  deleteCustomPage: (id: number) => void;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}