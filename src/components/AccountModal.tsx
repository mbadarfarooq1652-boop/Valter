import React, { useState } from 'react';
import { X, User, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, showToast } = useStore();
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isAccountOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      showToast(mode === 'signin' ? 'Welcome back to your VALTER account.' : 'Account created successfully.');
      setIsAccountOpen(false);
      setIsSubmitted(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#082F2B]/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAccountOpen(false)}
      />

      <div className="relative min-h-screen p-4 flex items-center justify-center">
        <div className="relative bg-[#F4F0E9] text-[#1C2925] rounded-sm max-w-md w-full border border-[#DED6CA] shadow-2xl p-8">
          
          <button
            onClick={() => setIsAccountOpen(false)}
            className="absolute top-4 right-4 text-[#716F66] hover:text-[#082F2B] p-1.5 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#EAE3D8] border border-[#DED6CA] flex items-center justify-center text-[#B89A6A] mx-auto mb-3">
              <User className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#B89A6A] font-semibold block mb-1">
              CLIENT PORTAL
            </span>
            <h3 className="font-serif text-2xl text-[#082F2B]">
              {mode === 'signin' ? 'Sign In to VALTER' : 'Create an Account'}
            </h3>
            <p className="text-xs text-[#716F66] mt-1">
              {mode === 'signin'
                ? 'Access order history, saved timepieces, and concierge services.'
                : 'Join for priority access to limited watch editions and private events.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-[#DED6CA] mb-6">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 pb-3 text-xs tracking-wider uppercase font-medium text-center transition-colors border-b-2 ${
                mode === 'signin'
                  ? 'border-[#082F2B] text-[#082F2B]'
                  : 'border-transparent text-[#716F66] hover:text-[#082F2B]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 pb-3 text-xs tracking-wider uppercase font-medium text-center transition-colors border-b-2 ${
                mode === 'register'
                  ? 'border-[#082F2B] text-[#082F2B]'
                  : 'border-transparent text-[#716F66] hover:text-[#082F2B]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-[10px] tracking-wider uppercase text-[#716F66] font-semibold block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#716F66] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Julian Montgomery"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DED6CA] focus:border-[#B89A6A] text-xs rounded-xs focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] tracking-wider uppercase text-[#716F66] font-semibold block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#716F66] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DED6CA] focus:border-[#B89A6A] text-xs rounded-xs focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] tracking-wider uppercase text-[#716F66] font-semibold">
                  Password
                </label>
                {mode === 'signin' && (
                  <span className="text-[10px] text-[#B89A6A] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#716F66] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#DED6CA] focus:border-[#B89A6A] text-xs rounded-xs focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-3.5 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors shadow-md mt-2 disabled:opacity-50"
            >
              {isSubmitted ? 'AUTHENTICATING...' : mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="text-[11px] text-[#716F66] text-center mt-6">
            Demonstration client account interface. By accessing this store, you agree to the VALTER terms of service.
          </p>

        </div>
      </div>
    </div>
  );
};
