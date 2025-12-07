import React from 'react';
import { useApp } from '../context/AppContext';
import { Icons } from './Icon';

export const CalendarView: React.FC = () => {
  const { tasks, t, language } = useApp();
  
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState(today);

  // Helper to get days in month
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  
  // Adjust first day for starting week on Monday if preferred, but keeping Sunday standard for simplicity logic
  // However, localizing day names is important.
  const firstDayIndex = getFirstDayOfMonth(year, month); 

  const monthNames: Record<string, string[]> = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    ku: ['Rêbendan', 'Reşemî', 'Adar', 'Avrêl', 'Gulan', 'Pûşper', 'Tîrmeh', 'Gelawêj', 'Rezber', 'Kewçêr', 'Sermawez', 'Berfanbar'],
    ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  };

  const dayNames: Record<string, string[]> = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    tr: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    ku: ['Yek', 'Du', 'Sê', 'Çar', 'Pên', 'În', 'Şem'],
    ar: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت']
  };

  const getTasksForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.date === dateStr);
  };

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(year, month + delta, 1));
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-24">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('calendar')}</h1>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
             ←
          </button>
          <span className="text-lg font-medium w-32 text-center text-gray-800 dark:text-gray-200">
            {monthNames[language][month]} {year}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
             →
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          {dayNames[language].map((day, i) => (
            <div key={i} className="py-3 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 md:h-32 border-b border-r border-gray-100 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-900/30" />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayTasks = getTasksForDay(day);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            return (
              <div key={day} className={`h-24 md:h-32 border-b border-r border-gray-100 dark:border-gray-700/50 p-2 relative transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 ${isToday ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {day}
                </span>
                
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-1.5rem)] scrollbar-hide">
                  {dayTasks.map(task => (
                    <div key={task.id} className={`text-xs p-1 rounded truncate ${task.completed ? 'bg-gray-200 text-gray-500 dark:bg-gray-700' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                      {task.text}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};