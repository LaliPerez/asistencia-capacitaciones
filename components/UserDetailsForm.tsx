import React from 'react';

interface UserDetailsFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ name, setName, email, setEmail }) => {
  return (
    <div className="space-y-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-100">Your Details</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-100"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-100"
          required
        />
      </div>
    </div>
  );
};

export default UserDetailsForm;
