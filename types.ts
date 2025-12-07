export type Language = 'tr' | 'ku' | 'ar' | 'en';
export type Theme = 'light' | 'dark';
export type View = 'todo' | 'calendar' | 'settings';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  date: string; // ISO Date string YYYY-MM-DD
  time?: string; // HH:mm
  priority: 'low' | 'medium' | 'high';
}

export interface AppState {
  tasks: Task[];
  language: Language;
  theme: Theme;
  currentView: View;
}

export interface TranslationDictionary {
  [key: string]: {
    [key in Language]: string;
  };
}