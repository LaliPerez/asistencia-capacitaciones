import React from 'react';
import { type Link } from '../types';
import { CheckIcon } from './Icons';

interface AttendanceReportProps {
  links: Link[];
  attendance: Record<string, boolean>;
  attendee: { name: string; email: string };
}

const AttendanceReport: React.FC<AttendanceReportProps> = ({ links, attendance, attendee }) => {
    const reviewedCount = Object.values(attendance).filter(Boolean).length;
    const totalCount = links.length;

    return (
        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
            <div className="flex justify-center items-center mb-4">
                <div className="w-16 h-16 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-8 h-8" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Attendance Submitted!</h2>
            <p className="text-slate-400 mt-2">Thank you, {attendee.name}. Your submission has been recorded.</p>
            
            <div className="mt-6 text-left bg-slate-800 p-4 rounded-md">
                <p><span className="font-semibold text-slate-300">Name:</span> {attendee.name}</p>
                <p><span className="font-semibold text-slate-300">Email:</span> {attendee.email}</p>
                <p className="mt-2"><span className="font-semibold text-slate-300">Links Reviewed:</span> {reviewedCount} of {totalCount}</p>
            </div>
        </div>
    );
};

export default AttendanceReport;
