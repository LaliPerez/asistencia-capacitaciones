import React from 'react';
import { type Link } from '../types';

interface AttendanceLinkItemProps {
  link: Link;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

const AttendanceLinkItem: React.FC<AttendanceLinkItemProps> = ({ link, isChecked, onToggle }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg shadow-sm border border-slate-700">
      <div className="flex-shrink-0">
        <img 
          src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} 
          alt="favicon"
          className="w-8 h-8"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
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
      <div className="flex-shrink-0">
        <label htmlFor={`attendance-${link.id}`} className="flex items-center space-x-2 cursor-pointer p-2">
           <input
            id={`attendance-${link.id}`}
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggle(link.id)}
            className="h-5 w-5 rounded bg-slate-700 border-slate-600 text-sky-500 focus:ring-sky-500"
          />
           <span className="sr-only">Mark as reviewed</span>
        </label>
      </div>
    </div>
  );
};

export default AttendanceLinkItem;
