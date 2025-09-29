import React, { useState, useEffect } from 'react';
import { type Link } from './types';
import useUrlState from './hooks/useUrlState';
import { fetchTitleForUrl } from './services/geminiService';

import Header from './components/Header';
import LinkInputForm from './components/LinkInputForm';
import LinkList from './components/LinkList';
import ShareButton from './components/ShareButton';
import LinkDropzone from './components/LinkDropzone';
import UserDetailsForm from './components/UserDetailsForm';
import AttendanceLinkList from './components/AttendanceLinkList';
import FinalizeAttendance from './components/FinalizeAttendance';
import AttendanceReport from './components/AttendanceReport';

const App: React.FC = () => {
  const [links, setLinks] = useUrlState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'admin' | 'attendance' | 'report'>('admin');
  const [attendee, setAttendee] = useState({ name: '', email: '' });
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [attendanceError, setAttendanceError] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'attendance') {
      setView('attendance');
    } else {
      setView('admin');
    }
  }, []);

  const handleAddLinks = async (urls: string[]) => {
    setIsLoading(true);
    const uniqueUrls = urls.filter(url => !links.some(link => link.url === url));
    
    const newLinks: Link[] = uniqueUrls.map(url => ({
      id: crypto.randomUUID(),
      url,
      title: 'Loading title...',
      isLoading: true,
    }));

    if (newLinks.length > 0) {
      setLinks(prev => [...prev, ...newLinks]);
    } else {
      setIsLoading(false);
      return;
    }

    await Promise.all(
      newLinks.map(async (newLink) => {
        try {
          const title = await fetchTitleForUrl(newLink.url);
          setLinks(prev => prev.map(l => l.id === newLink.id ? { ...l, title, isLoading: false } : l));
        } catch (error) {
          console.error(`Failed to fetch title for ${newLink.url}`, error);
          setLinks(prev => prev.map(l => l.id === newLink.id ? { ...l, title: new URL(newLink.url).hostname, isLoading: false } : l));
        }
      })
    );
    setIsLoading(false);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };
  
  const handleFinalizeAttendance = () => {
    if (!attendeeName.trim() || !attendeeEmail.trim()) {
      setAttendanceError('Please fill out both name and email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(attendeeEmail)) {
        setAttendanceError('Please enter a valid email address.');
        return;
    }
    setAttendanceError('');

    const userDetails = { name: attendeeName, email: attendeeEmail };
    setAttendee(userDetails);
    // In a real app, you would send this data to a server.
    // For this example, we'll just switch to a report view.
    console.log('Attendance finalized for:', userDetails);
    console.log('Checked links:', attendance);
    setView('report');
  };

  if (view === 'attendance') {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <Header />
          <p className="text-center text-slate-400 mb-8">Please provide your details and confirm you have reviewed each link.</p>
          <AttendanceLinkList links={links} attendance={attendance} setAttendance={setAttendance} />
          <UserDetailsForm name={attendeeName} setName={setAttendeeName} email={attendeeEmail} setEmail={setAttendeeEmail} />
          {attendanceError && <p className="text-red-400 text-sm mt-4 text-center">{attendanceError}</p>}
          <FinalizeAttendance onClick={handleFinalizeAttendance} disabled={!attendeeName || !attendeeEmail} />
        </div>
      </div>
    );
  }
  
  if (view === 'report') {
     return (
      <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <Header />
            <AttendanceReport links={links} attendance={attendance} attendee={attendee} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Header />
        <div className="mb-8">
          <LinkDropzone onAddLinks={handleAddLinks} isLoading={isLoading} />
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>
          <LinkInputForm onAddLink={(url) => handleAddLinks([url])} isLoading={isLoading} />
        </div>
        
        <LinkList links={links} onRemoveLink={handleRemoveLink} />
        
        {links.length > 0 && (
          <div className="mt-8 flex justify-center">
            <ShareButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
