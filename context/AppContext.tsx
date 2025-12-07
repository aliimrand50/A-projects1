import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, Task, Language, Theme, View } from '../types';

interface AppContextProps extends AppState {
  addTask: (text: string, date: string, time?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setCurrentView: (view: View) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Helper to translate
import { TRANSLATIONS } from '../constants';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load initial state from local storage or defaults
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('notiplan_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('notiplan_lang') as Language) || 'tr';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('notiplan_theme') as Theme) || 'light';
  });

  const [currentView, setCurrentView] = useState<View>('todo');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('notiplan_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('notiplan_lang', language);
    // Update HTML dir attribute for RTL support
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('notiplan_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Actions
  const addTask = (text: string, date: string, time?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      date,
      time,
      priority: 'medium',
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setTheme = (thm: Theme) => setThemeState(thm);

  // Translation helper
  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry['en'];
  };

  return (
    <AppContext.Provider value={{
      tasks,
      language,
      theme,
      currentView,
      addTask,
      toggleTask,
      deleteTask,
      setLanguage,
      setTheme,
      setCurrentView,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};