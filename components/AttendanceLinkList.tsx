import React from 'react';
import { type Link } from '../types';
import AttendanceLinkItem from './AttendanceLinkItem';

interface AttendanceLinkListProps {
  links: Link[];
  attendance: Record<string, boolean>;
  setAttendance: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const AttendanceLinkList: React.FC<AttendanceLinkListProps> = ({ links, attendance, setAttendance }) => {
  if (links.length === 0) {
    return <p className="text-center text-slate-500">No links have been shared for attendance.</p>;
  }

  const handleToggle = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  return (
    <div className="space-y-4 mb-8">
      {links.map(link => (
        <AttendanceLinkItem 
          key={link.id} 
          link={link} 
          isChecked={!!attendance[link.id]}
          onToggle={() => handleToggle(link.id)}
        />
      ))}
    </div>
  );
};

export default AttendanceLinkList;
