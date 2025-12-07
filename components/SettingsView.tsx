import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../constants';
import { Icons } from './Icon';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, theme, setTheme, t } = useApp();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('settings')}</h1>

      <div className="space-y-6">
        
        {/* Language Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Icons.Language className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('language')}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  language === lang.code
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="font-medium">{lang.label}</span>
                {language === lang.code && <Icons.Check className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
              <Icons.Sun className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('theme')}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                theme === 'light'
                   ? 'border-amber-500 bg-amber-50 text-amber-800'
                   : 'border-gray-200 dark:border-gray-700 dark:text-gray-300'
              }`}
            >
              <Icons.Sun className="w-5 h-5" />
              <span>{t('light')}</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                theme === 'dark'
                   ? 'border-indigo-500 bg-indigo-900/30 text-indigo-300'
                   : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icons.Moon className="w-5 h-5" />
              <span>{t('dark')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};