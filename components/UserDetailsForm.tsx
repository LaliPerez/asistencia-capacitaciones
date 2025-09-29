import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { type Attendee } from '../types';

interface UserDetailsFormProps {
  attendee: Attendee;
  setAttendee: React.Dispatch<React.SetStateAction<Attendee>>;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ attendee, setAttendee }) => {
  const sigPad = useRef<SignatureCanvas>(null);

  const inputStyle = "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-100";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAttendee(prev => ({...prev, [id]: value }));
  };

  const clearSignature = () => {
    sigPad.current?.clear();
    setAttendee(prev => ({ ...prev, signature: '' }));
  };

  const saveSignature = () => {
    if (sigPad.current && !sigPad.current.isEmpty()) {
      setAttendee(prev => ({ ...prev, signature: sigPad.current.getTrimmedCanvas().toDataURL('image/png') }));
    }
  };

  return (
    <div className="space-y-4 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                Full Name
                </label>
                <input type="text" id="name" value={attendee.name} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
                </label>
                <input type="email" id="email" value={attendee.email} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
                <label htmlFor="dni" className="block text-sm font-medium text-slate-300 mb-1">
                DNI
                </label>
                <input type="text" id="dni" value={attendee.dni} onChange={handleChange} className={inputStyle} required />
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-1">
                Company
                </label>
                <input type="text" id="company" value={attendee.company} onChange={handleChange} className={inputStyle} required />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Signature</label>
            <div className="bg-slate-100 rounded-md border border-slate-600">
                <SignatureCanvas 
                    ref={sigPad}
                    penColor='black'
                    canvasProps={{className: 'w-full h-32 rounded-md'}}
                    onEnd={saveSignature}
                />
            </div>
            <div className="flex justify-end gap-2 mt-2">
                <button onClick={clearSignature} type="button" className="text-sm text-slate-400 hover:text-white transition-colors">Clear</button>
            </div>
        </div>
    </div>
  );
};

export default UserDetailsForm;
