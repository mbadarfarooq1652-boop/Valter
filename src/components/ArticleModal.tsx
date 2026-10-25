import React from 'react';
import { X, BookOpen, Clock, Calendar } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle } = useStore();

  if (!selectedArticle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#082F2B]/85 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedArticle(null)}
      />

      <div className="relative min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="relative bg-[#F4F0E9] text-[#1C2925] rounded-sm max-w-3xl w-full border border-[#DED6CA] shadow-2xl overflow-hidden my-8 p-6 sm:p-10">
          
          <button
            onClick={() => setSelectedArticle(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#716F66] hover:text-[#082F2B] focus:outline-none"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-[#B89A6A] font-semibold mb-2">
              <span>{selectedArticle.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#716F66]">
                <Clock className="w-3 h-3" />
                {selectedArticle.readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#716F66]">
                <Calendar className="w-3 h-3" />
                {selectedArticle.date}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#082F2B] font-light leading-tight mb-4">
              {selectedArticle.title}
            </h2>

            <p className="text-sm sm:text-base text-[#716F66] italic leading-relaxed">
              "{selectedArticle.excerpt}"
            </p>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#EAE3D8] border border-[#DED6CA] mb-8">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[#1C2925]/90 leading-relaxed font-normal">
            {selectedArticle.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-[#DED6CA] flex items-center justify-between text-xs text-[#716F66]">
            <span>Published by the VALTER Design Studio</span>
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-[#082F2B] hover:text-[#B89A6A] font-semibold uppercase tracking-wider"
            >
              Close Reading View
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
