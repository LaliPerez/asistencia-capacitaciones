import React from 'react';
import { type Link, type AttendanceRecord } from '../types';
import AttendanceLinkItem from './AttendanceLinkItem';

interface AttendanceLinkListProps {
  links: Link[];
  attendance: AttendanceRecord;
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord>>;
}

const AttendanceLinkList: React.FC<AttendanceLinkListProps> = ({ links, attendance, setAttendance }) => {
  if (links.length === 0) {
    return <p className="text-center text-slate-500 mt-8">No links have been shared for attendance.</p>;
  }

  const handleToggle = (id: string) => {
    setAttendance(prev => {
        // Only mark as completed, do not un-check
        if (prev[id] === null) {
            return {
                ...prev, 
                [id]: { timestamp: new Date().toLocaleString('es-AR') }
            };
        }
        return prev;
    });
  };
  
  return (
    <div className="space-y-4 mb-8">
      {links.map(link => (
        <AttendanceLinkItem 
          key={link.id} 
          link={link} 
          record={attendance[link.id] || null}
          onToggle={() => handleToggle(link.id)}
        />
      ))}
    </div>
  );
};

export default AttendanceLinkList;