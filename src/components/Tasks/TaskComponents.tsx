"use client";

import React from 'react';

interface BaseTaskProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  onToggle?: (completed: boolean) => void;
  onDelete?: () => void;
}

// 1. Simple Task Component
export const SimpleTask: React.FC<BaseTaskProps> = ({ 
  title, 
  description, 
  isCompleted = false, 
  onToggle,
  onDelete
}) => {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl shadow-sm border border-green-100 dark:border-green-900/30 flex items-center justify-between transition-all hover:shadow-md group">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold rounded uppercase">Simple</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="ml-4 flex items-center gap-3">
        {onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            title="Delete sub-task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={(e) => onToggle?.(e.target.checked)}
          className="w-6 h-6 rounded-md border-green-300 dark:border-green-600 text-green-600 focus:ring-green-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

// 2. Lecture Task Component
interface LectureTaskProps extends BaseTaskProps {
  videoUrl: string;
}

export const LectureTask: React.FC<LectureTaskProps> = ({ 
  title, 
  description, 
  videoUrl,
  isCompleted = false, 
  onToggle,
  onDelete
}) => {
  // Extract embed URL if it's a standard watch link
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  return (
    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all hover:shadow-md group">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold rounded uppercase">Lecture</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-red-200 dark:border-red-800 mb-2">
          <iframe 
            className="w-full h-full"
            src={getEmbedUrl(videoUrl)} 
            title={title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      </div>
      <div className="flex items-center gap-4 h-full self-start sm:self-center">
        {onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            title="Delete sub-task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={(e) => onToggle?.(e.target.checked)}
          className="w-6 h-6 rounded-md border-red-300 dark:border-red-600 text-red-600 focus:ring-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

// 3. Revision Task Component
export const RevisionTask: React.FC<BaseTaskProps> = ({ 
  title, 
  description, 
  isCompleted = false, 
  onToggle,
  onDelete 
}) => {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/30 flex items-center justify-between transition-all hover:shadow-md group">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded uppercase">Revision</span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="ml-4 flex items-center gap-3">
        {onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            title="Delete sub-task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        <input 
          type="checkbox" 
          checked={isCompleted}
          onChange={(e) => onToggle?.(e.target.checked)}
          className="w-6 h-6 rounded-md border-yellow-300 dark:border-yellow-600 text-yellow-600 focus:ring-yellow-500 cursor-pointer"
        />
      </div>
    </div>
  );
};
