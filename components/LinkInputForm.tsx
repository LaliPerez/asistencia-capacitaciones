import React, { useState } from 'react';
import { PlusIcon } from './Icons';

interface LinkInputFormProps {
  onAddLink: (url: string) => void;
  isLoading: boolean;
}

const LinkInputForm: React.FC<LinkInputFormProps> = ({ onAddLink, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com).');
      return;
    }
    
    setError('');
    onAddLink(url);
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-start gap-2">
        <div className="flex-grow">
          <label htmlFor="url-input" className="sr-only">Add URL</label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            placeholder="https://example.com"
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-100 placeholder:text-slate-500"
            disabled={isLoading}
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 h-[42px] font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-900"
          disabled={isLoading}
          aria-label="Add Link"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Add Link</span>
        </button>
      </div>
    </form>
  );
};

export default LinkInputForm;
