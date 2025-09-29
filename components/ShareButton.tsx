import React, { useState } from 'react';
import { ShareIcon, CheckIcon } from './Icons';

const ShareButton: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        const url = new URL(window.location.href);
        url.search = '?view=attendance';
        
        navigator.clipboard.writeText(url.toString()).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }, (err) => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy link.');
        });
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-400 bg-sky-900/50 rounded-md hover:bg-sky-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-900"
        >
            {copied ? (
                <>
                    <CheckIcon className="w-4 h-4" />
                    Copied!
                </>
            ) : (
                <>
                    <ShareIcon className="w-4 h-4" />
                    Share for Attendance
                </>
            )}
        </button>
    );
};

export default ShareButton;
