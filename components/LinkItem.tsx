import React from 'react';
import { type Link } from '../types';
import { TrashIcon, SpinnerIcon } from './Icons';

interface LinkItemProps {
  link: Link;
  onRemove: (id: string) => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ link, onRemove }) => {
  return (
    <div className="group flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg shadow-sm border border-slate-700 hover:shadow-md hover:border-sky-700 transition-all duration-200">
      <div className="flex-shrink-0">
        {link.isLoading ? (
          <div className="w-10 h-10 flex items-center justify-center bg-slate-700 rounded-lg">
            <SpinnerIcon className="w-5 h-5 text-slate-500" />
          </div>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center bg-sky-900/50 rounded-lg">
             <img 
               src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} 
               alt="favicon"
               className="w-6 h-6"
               onError={(e) => (e.currentTarget.style.display = 'none')}
             />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-100 truncate block hover:text-sky-400 focus:outline-none focus-visible:underline"
        >
          {link.title}
        </a>
        <p className="text-sm text-slate-400 truncate">{link.url}</p>
      </div>
      <button
        onClick={() => onRemove(link.id)}
        className="flex-shrink-0 p-2 text-slate-500 rounded-full hover:bg-red-900/50 hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        aria-label={`Remove ${link.title}`}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default LinkItem;