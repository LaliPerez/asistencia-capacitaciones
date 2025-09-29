import React from 'react';
import { type Link, type Attendee, type AttendanceRecord } from '../types';
import { CheckIcon } from './Icons';

interface AttendanceReportProps {
  links: Link[];
  attendance: AttendanceRecord;
  attendee: Attendee;
  onDownloadPdf: () => void;
}

const AttendanceReport: React.FC<AttendanceReportProps> = ({ links, attendance, attendee, onDownloadPdf }) => {

    return (
        <div className="bg-slate-800/50 rounded-lg border border-slate-700">
            <div id="report-content" className="p-8 text-slate-200">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-16 bg-green-900/50 text-green-400 rounded-full flex items-center justify-center">
                            <CheckIcon className="w-8 h-8" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100">Attendance Submitted!</h2>
                    <p className="text-slate-400 mt-2">Thank you, {attendee.name}. Your submission has been recorded.</p>
                </div>
                
                <div className="mt-6 text-left bg-slate-800 p-4 rounded-md border border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">Attendee Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><span className="font-semibold text-slate-400">Name:</span> {attendee.name}</p>
                        <p><span className="font-semibold text-slate-400">Email:</span> {attendee.email}</p>
                        <p><span className="font-semibold text-slate-400">DNI:</span> {attendee.dni}</p>
                        <p><span className="font-semibold text-slate-400">Company:</span> {attendee.company}</p>
                    </div>
                     <div className="mt-4">
                        <p className="font-semibold text-slate-400 text-sm">Signature:</p>
                        <div className="mt-1 p-2 bg-white rounded-md inline-block">
                             <img src={attendee.signature} alt="Signature" className="h-16 w-auto" />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4 border-b border-slate-700 pb-2">Reviewed Links</h3>
                    <ul className="space-y-3">
                        {links.map(link => (
                            <li key={link.id} className="text-sm flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-slate-200">{link.title}</p>
                                    <p className="text-xs text-slate-500">{link.url}</p>
                                </div>
                                <p className="text-xs text-green-400">{attendance[link.id]?.timestamp}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-6 border-t border-slate-700">
                 <button
                    onClick={onDownloadPdf}
                    className="w-full px-4 py-3 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-900"
                  >
                    Download PDF Report
                </button>
            </div>
        </div>
    );
};

export default AttendanceReport;