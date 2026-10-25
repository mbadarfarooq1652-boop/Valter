import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 700);
  };

  return (
    <section className="bg-[#082F2B] text-[#F5F0E8] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#31514A]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-[#B89A6A]" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
            VALTER PRIVATE DISPATCH
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F0E8] font-light tracking-tight mb-3">
          A Note from VALTER
        </h2>

        <p className="text-sm sm:text-base text-[#F5F0E8]/80 leading-relaxed mb-8 max-w-xl mx-auto">
          Be the first to discover new collections, thoughtful styling ideas, private boutique invitations, and stories from our world.
        </p>

        {status === 'success' ? (
          <div className="p-6 bg-[#052522] border border-[#B89A6A] rounded-sm max-w-md mx-auto text-center animate-fadeIn">
            <CheckCircle2 className="w-7 h-7 text-[#B89A6A] mx-auto mb-2" />
            <h4 className="font-serif text-xl text-white mb-1">Thank you for subscribing</h4>
            <p className="text-xs text-[#F5F0E8]/80">
              Welcome to the VALTER circle. You will receive our next curated dispatch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3.5 bg-[#052522] border border-[#31514A] focus:border-[#B89A6A] text-[#F5F0E8] placeholder-[#716F66] text-xs focus:outline-none rounded-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 bg-[#B89A6A] hover:bg-[#c9ad7f] text-[#082F2B] font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-colors shrink-0 disabled:opacity-50"
            >
              {status === 'loading' ? 'JOINING...' : 'SUBSCRIBE'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-1.5 mt-3 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        <p className="text-[11px] text-[#716F66] mt-4">
          We respect your privacy. You may unsubscribe at any time. View our{' '}
          <span className="text-[#B89A6A] underline cursor-pointer hover:text-white">Privacy Policy</span>.
        </p>
      </div>
    </section>
  );
};
