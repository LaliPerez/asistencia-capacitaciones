import React from 'react';

interface FinalizeAttendanceProps {
  onClick: () => void;
  disabled: boolean;
}

const FinalizeAttendance: React.FC<FinalizeAttendanceProps> = ({ onClick, disabled }) => {
  return (
    <div className="mt-8">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full px-4 py-3 font-semibold text-white bg-sky-600 rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-slate-900"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default FinalizeAttendance;
