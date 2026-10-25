import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactView: React.FC = () => {
  const { setCurrentRoute } = useStore();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F4F0E9] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#716F66] mb-8">
          <button onClick={() => setCurrentRoute('home')} className="hover:text-[#082F2B] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-[#082F2B] font-medium">Contact & Concierge</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold block mb-2">
            CLIENT CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#082F2B] font-light tracking-tight mb-3">
            How May We Assist You?
          </h1>
          <p className="text-sm sm:text-base text-[#716F66]">
            Our horological specialists are at your disposal for timepiece inquiries, custom strap requests, and boutique appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-7 shadow-xs space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-[#B89A6A] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#082F2B] font-semibold mb-0.5">
                    Concierge Dispatch
                  </h4>
                  <p className="text-xs text-[#716F66] mb-1">Response within 24 business hours</p>
                  <span className="font-mono text-xs text-[#082F2B]">concierge@valterwatches.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-[#B89A6A] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#082F2B] font-semibold mb-0.5">
                    Private Consultations
                  </h4>
                  <p className="text-xs text-[#716F66] mb-1">Mon–Fri, 9am–6pm CET</p>
                  <span className="font-mono text-xs text-[#082F2B]">+41 22 819 4000</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-[#B89A6A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#082F2B] font-semibold mb-0.5">
                    Geneva Showroom & Workshop
                  </h4>
                  <p className="text-xs text-[#716F66]">
                    Rue du Rhône 42, 1204 Genève, Switzerland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D8] text-[#B89A6A] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#082F2B] font-semibold mb-0.5">
                    Showroom Hours
                  </h4>
                  <p className="text-xs text-[#716F66]">
                    Tuesday – Saturday: 10:00 – 18:30 (By appointment)
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#DED6CA] rounded-sm p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#B89A6A] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#082F2B] mb-2">Message Dispatched</h3>
                <p className="text-xs text-[#716F66] max-w-sm mx-auto mb-6">
                  Thank you for reaching out to the VALTER Concierge. A timepiece advisor will reply to your inquiry shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#082F2B] text-[#F5F0E8] text-xs uppercase tracking-wider font-semibold rounded-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                    Subject / Department
                  </label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                  >
                    <option>General Timepiece Inquiry</option>
                    <option>Couple Watches Customization</option>
                    <option>Order Tracking & Courier Inquiries</option>
                    <option>International Warranty & Servicing</option>
                    <option>Private Showroom Appointment</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#716F66] block mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please let us know which collection or specific timepiece you wish to discuss..."
                    className="w-full px-3 py-2 bg-[#F4F0E9] border border-[#DED6CA] text-xs rounded-xs focus:outline-none focus:border-[#B89A6A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#082F2B] hover:bg-[#0B3B35] text-[#F5F0E8] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors shadow-md"
                >
                  DISPATCH INQUIRY TO CONCIERGE
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
