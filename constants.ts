import { TranslationDictionary, Language } from './types';

export const TRANSLATIONS: TranslationDictionary = {
  app_title: {
    tr: 'NotiPlan',
    ku: 'NotiPlan',
    ar: 'نوتي بلان',
    en: 'NotiPlan',
  },
  todo: {
    tr: 'Yapılacaklar',
    ku: 'Karên Kirinê',
    ar: 'المهام',
    en: 'To-Do',
  },
  calendar: {
    tr: 'Takvim',
    ku: 'Salname',
    ar: 'التقويم',
    en: 'Calendar',
  },
  settings: {
    tr: 'Ayarlar',
    ku: 'Mîheng',
    ar: 'الإعدادات',
    en: 'Settings',
  },
  add_task_placeholder: {
    tr: 'Yeni bir görev ekle...',
    ku: 'Karekî nû lê zêde bike...',
    ar: 'أضف مهمة جديدة...',
    en: 'Add a new task...',
  },
  no_tasks: {
    tr: 'Henüz görev yok. Güne başlamak için bir tane ekle!',
    ku: 'Hîn tu kar tune ne. Yekê lê zêde bike!',
    ar: 'لا توجد مهام حتى الآن. أضف واحدة للبدء!',
    en: 'No tasks yet. Add one to start your day!',
  },
  language: {
    tr: 'Dil',
    ku: 'Ziman',
    ar: 'اللغة',
    en: 'Language',
  },
  theme: {
    tr: 'Tema',
    ku: 'Tema',
    ar: 'السمة',
    en: 'Theme',
  },
  light: {
    tr: 'Açık',
    ku: 'Ronahî',
    ar: 'فاتح',
    en: 'Light',
  },
  dark: {
    tr: 'Koyu',
    ku: 'Tarî',
    ar: 'داكن',
    en: 'Dark',
  },
  delete: {
    tr: 'Sil',
    ku: 'Jê bibe',
    ar: 'حذف',
    en: 'Delete',
  },
  today: {
    tr: 'Bugün',
    ku: 'Îro',
    ar: 'اليوم',
    en: 'Today',
  },
  priority: {
    tr: 'Öncelik',
    ku: 'Pêşînî',
    ar: 'الأولوية',
    en: 'Priority',
  },
  set_time: {
    tr: 'Zaman Ekle',
    ku: 'Dem zêde bike',
    ar: 'ضبط الوقت',
    en: 'Set Time',
  }
};

export const LANGUAGES: { code: Language; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'tr', label: 'Türkçe', dir: 'ltr' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ku', label: 'Kurdî', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
];
