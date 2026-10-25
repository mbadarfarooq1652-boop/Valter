import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export const JournalSection: React.FC = () => {
  const { setSelectedArticle } = useStore();

  return (
    <section className="bg-[#F4F0E9] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#B89A6A]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B89A6A] font-semibold">
              THE VALTER JOURNAL
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#082F2B] font-light tracking-tight mb-3">
            Notes on Time
          </h2>
          <p className="text-sm sm:text-base text-[#716F66]">
            Stories on personal style, watch design, and the details that matter.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white border border-[#DED6CA] hover:border-[#B89A6A] rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[16/10] w-full bg-[#EAE3D8] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 bg-white">
                <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#B89A6A] font-semibold mb-2">
                  <span>{article.category}</span>
                  <span className="text-[#716F66] font-normal lowercase tracking-normal">{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-[#082F2B] font-medium group-hover:text-[#B89A6A] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#716F66] leading-relaxed mb-6 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="pt-4 border-t border-[#DED6CA]/60 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#082F2B] group-hover:text-[#B89A6A] transition-colors inline-flex items-center gap-1.5">
                    READ STORY
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#082F2B] group-hover:text-[#B89A6A] transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
