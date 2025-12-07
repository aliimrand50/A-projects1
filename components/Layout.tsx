import React from 'react';
import { useApp } from '../context/AppContext';
import { Icons } from './Icon';
import { TodoList } from './TodoList';
import { CalendarView } from './CalendarView';
import { SettingsView } from './SettingsView';

export const Layout: React.FC = () => {
  const { currentView, setCurrentView, t } = useApp();

  const renderContent = () => {
    switch (currentView) {
      case 'todo': return <TodoList />;
      case 'calendar': return <CalendarView />;
      case 'settings': return <SettingsView />;
      default: return <TodoList />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: typeof currentView, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-colors duration-200 ${
        currentView === view 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
      }`}
    >
      <Icon className={`w-6 h-6 mb-1 ${currentView === view ? 'fill-current opacity-20' : ''}`} strokeWidth={currentView === view ? 2.5 : 2} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-e border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <span className="font-bold text-xl tracking-tight">NotiPlan</span>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'todo', icon: Icons.Todo, label: t('todo') },
            { id: 'calendar', icon: Icons.Calendar, label: t('calendar') },
            { id: 'settings', icon: Icons.Settings, label: t('settings') }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden scroll-smooth relative">
        <div className="p-4 md:p-8 max-w-4xl mx-auto pt-8 md:pt-12 pb-24">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe z-50">
        <div className="flex justify-around items-center h-16 px-2">
          <NavItem view="todo" icon={Icons.Todo} label={t('todo')} />
          <NavItem view="calendar" icon={Icons.Calendar} label={t('calendar')} />
          <NavItem view="settings" icon={Icons.Settings} label={t('settings')} />
        </div>
      </div>
    </div>
  );
};