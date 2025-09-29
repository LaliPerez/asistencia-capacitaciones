import React from 'react';
import { type Link } from '../types';
import { CheckIcon } from './Icons';

interface AttendanceLinkItemProps {
  link: Link;
  record: { timestamp: string } | null;
  onToggle: (id: string) => void;
}

const AttendanceLinkItem: React.FC<AttendanceLinkItemProps> = ({ link, record, onToggle }) => {
  const isChecked = record !== null;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-sm border transition-all duration-200 ${isChecked ? 'bg-green-900/30 border-green-700/50' : 'bg-slate-800/50 border-slate-700'}`}>
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
         {isChecked ? (
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <CheckIcon className="w-5 h-5" />
            </div>
         ) : (
            <img 
              src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} 
              alt="favicon"
              className="w-8 h-8"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
         )}
      </div>
      <div className="flex-1 min-w-0">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onToggle(link.id)}
          className="font-semibold text-slate-100 truncate block hover:text-sky-400 focus:outline-none focus-visible:underline"
        >
          {link.title}
        </a>
        <p className="text-sm text-slate-400 truncate">{link.url}</p>
        {isChecked && (
            <p className="text-xs text-green-400 mt-1">Completed: {record.timestamp}</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceLinkItem;