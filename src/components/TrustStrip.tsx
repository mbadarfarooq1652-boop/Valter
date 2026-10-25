import React from 'react';
import { Watch, ShieldCheck, Headphones, Gift } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Watch,
      title: "QUALITY-FOCUSED DESIGN",
      desc: "Considered details in every timepiece."
    },
    {
      icon: ShieldCheck,
      title: "SECURE SHOPPING",
      desc: "A protected and straightforward checkout."
    },
    {
      icon: Headphones,
      title: "CUSTOMER SUPPORT",
      desc: "Help when you need it."
    },
    {
      icon: Gift,
      title: "GIFT-READY PRESENTATION",
      desc: "Thoughtful presentation for special moments."
    }
  ];

  return (
    <section className="bg-[#F4F0E9] border-b border-[#DED6CA] py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#DED6CA]">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 px-2 sm:px-4 lg:px-6 py-2 justify-start lg:justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#EAE3D8] border border-[#DED6CA] flex items-center justify-center text-[#B89A6A] shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#082F2B] mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#716F66] leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
