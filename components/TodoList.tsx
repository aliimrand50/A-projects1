import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icons } from './Icon';

export const TodoList: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask, t } = useApp();
  const [inputText, setInputText] = useState('');
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    
    // Default to today for quick add
    const today = new Date().toISOString().split('T')[0];
    addTask(inputText, today, selectedTime || undefined);
    
    setInputText('');
    setSelectedTime('');
    setShowTimeInput(false);
  };

  // Sort tasks: Incomplete first, then by ID (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return Number(b.id) - Number(a.id);
    return a.completed ? 1 : -1;
  });

  return (
    <div className="w-full max-w-3xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('todo')}</h1>
        <p className="text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
      </div>

      {/* Input Area - Notion style block */}
      <form onSubmit={handleAdd} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 transition-colors">
        <div className="flex items-center gap-3">
          <Icons.Plus className="text-gray-400 w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('add_task_placeholder')}
            className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 h-10"
          />
          <button 
            type="button"
            onClick={() => setShowTimeInput(!showTimeInput)}
            className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${selectedTime ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <Icons.Clock className="w-5 h-5" />
          </button>
        </div>
        
        {/* Expanded Time Input */}
        {showTimeInput && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end animate-fadeIn">
             <input 
               type="time" 
               value={selectedTime}
               onChange={(e) => setSelectedTime(e.target.value)}
               className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm dark:text-white"
             />
          </div>
        )}
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-12 opacity-50">
            <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.Todo className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">{t('no_tasks')}</p>
          </div>
        ) : (
          sortedTasks.map(task => (
            <div 
              key={task.id}
              className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 ${
                task.completed 
                  ? 'bg-gray-50 dark:bg-gray-800/50 border-transparent opacity-60' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  task.completed 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'border-gray-300 dark:border-gray-500 hover:border-blue-400'
                }`}
              >
                {task.completed && <Icons.Check className="w-3.5 h-3.5" />}
              </button>

              <div className="flex-1 min-w-0">
                <p className={`text-base break-words ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                  {task.text}
                </p>
                {task.time && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                    <Icons.Clock className="w-3 h-3" />
                    <span>{task.time}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
              >
                <Icons.Trash className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};