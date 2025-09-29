import React, { useState, useEffect, useCallback } from 'react';
import { type Link, type Attendee, type AttendanceRecord } from './types';
import useUrlState from './hooks/useUrlState';
import { fetchTitleForUrl } from './services/geminiService';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import Header from './components/Header';
import LinkList from './components/LinkList';
import ShareButton from './components/ShareButton';
import LinkDropzone from './components/LinkDropzone';
import LinkInputForm from './components/LinkInputForm';
import UserDetailsForm from './components/UserDetailsForm';
import AttendanceLinkList from './components/AttendanceLinkList';
import FinalizeAttendance from './components/FinalizeAttendance';
import AttendanceReport from './components/AttendanceReport';

const App: React.FC = () => {
  const [links, setLinks] = useUrlState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'admin' | 'attendance' | 'report'>('admin');
  const [attendee, setAttendee] = useState<Attendee>({ name: '', email: '', dni: '', company: '', signature: '' });
  const [attendance, setAttendance] = useState<AttendanceRecord>({});
  const [attendanceError, setAttendanceError] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'attendance') {
      setView('attendance');
    } else {
      setView('admin');
    }
  }, []);

  useEffect(() => {
    // Initialize attendance record when links are loaded in attendance view
    if (view === 'attendance') {
      setAttendance(prev => {
        const newRecord: AttendanceRecord = {};
        links.forEach(link => {
          newRecord[link.id] = prev[link.id] || null;
        });
        return newRecord;
      });
    }
  }, [links, view]);

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
    setAttendanceError('');
    if (Object.values(attendee).some(val => val.trim() === '')) {
      setAttendanceError('Please fill out all your details, including the signature.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(attendee.email)) {
        setAttendanceError('Please enter a valid email address.');
        return;
    }
    if (links.some(link => !attendance[link.id])) {
        setAttendanceError('Please review all links before submitting.');
        return;
    }
    
    console.log('Attendance finalized for:', attendee);
    console.log('Checked links:', attendance);
    setView('report');
  };

  const handleDownloadPdf = useCallback(() => {
    const reportElement = document.getElementById('report-content');
    if (reportElement) {
      html2canvas(reportElement, { scale: 2, backgroundColor: '#1e293b' }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Asistencia-${attendee.name.replace(' ', '_')}.pdf`);
      });
    }
  }, [attendee.name]);

  const allLinksChecked = links.length > 0 && links.every(link => !!attendance[link.id]);
  const allDetailsFilled = attendee.name && attendee.email && attendee.dni && attendee.company && attendee.signature;

  if (view === 'attendance') {
    return (
      <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
        <div className="container mx-auto max-w-2xl px-4 py-8">
          <Header view={view} />
          <p className="text-center text-slate-400 mb-8">Please provide your details and click each link to mark your attendance.</p>
          <UserDetailsForm attendee={attendee} setAttendee={setAttendee} />
          <h2 className="text-xl font-semibold text-slate-100 mt-8 mb-4">Training Links</h2>
          <AttendanceLinkList links={links} attendance={attendance} setAttendance={setAttendance} />
          {attendanceError && <p className="text-red-400 text-sm mt-4 text-center">{attendanceError}</p>}
          <FinalizeAttendance onClick={handleFinalizeAttendance} disabled={!allLinksChecked || !allDetailsFilled} />
        </div>
      </div>
    );
  }
  
  if (view === 'report') {
     return (
      <div className="bg-slate-900 text-slate-100 min-h-screen font-sans flex items-center justify-center">
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <Header view={view} />
            <AttendanceReport 
              links={links} 
              attendance={attendance} 
              attendee={attendee} 
              onDownloadPdf={handleDownloadPdf}
            />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Header view={view} />
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
          <div className="mt-8 flex flex-col items-center gap-4">
             <button
              onClick={() => setLinks([])}
              className="text-sm text-slate-500 hover:text-red-400 transition-colors"
             >
              Clear All Links
             </button>
            <ShareButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
