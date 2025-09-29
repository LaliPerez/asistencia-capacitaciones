import React, { useState, useCallback } from 'react';
import { LinkIcon } from './Icons';

interface LinkDropzoneProps {
  onAddLinks: (urls: string[]) => void;
  isLoading: boolean;
}

const LinkDropzone: React.FC<LinkDropzoneProps> = ({ onAddLinks, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isLoading) return;

    const droppedText = e.dataTransfer.getData('text/plain');
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = droppedText.match(urlRegex) || [];
    if (urls.length > 0) {
      onAddLinks(urls);
    }
  }, [isLoading, onAddLinks]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 mb-4
        ${isDragging ? 'border-sky-500 bg-sky-900/20' : 'border-slate-700 hover:border-slate-500'}
        ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div className="flex flex-col items-center justify-center text-slate-500">
        <LinkIcon className="w-8 h-8 mb-2" />
        <p className="font-semibold">Drag & drop links here</p>
        <p className="text-sm">or paste text containing URLs</p>
      </div>
    </div>
  );
};

export default LinkDropzone;
