import React from 'react';
import { useStore } from '../context/StoreContext';

interface ValterLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const ValterLogo: React.FC<ValterLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  className = ''
}) => {
  const { siteConfig } = useStore();
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-[#F5F0E8]' : 'text-[#1C2925]';
  const goldColor = '#B89A6A';

  const emblemSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg tracking-[0.25em]',
    md: 'text-2xl tracking-[0.3em]',
    lg: 'text-3xl tracking-[0.35em]'
  };

  if (siteConfig.customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <img
          src={siteConfig.customLogoUrl}
          alt={siteConfig.brandName}
          className={`${emblemSizes[size]} object-contain`}
        />
        <div className="flex flex-col">
          <span className={`font-serif font-light uppercase ${textColor} ${textSizes[size]}`}>
            {siteConfig.brandName}
          </span>
          {showTagline && (
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#B89A6A] font-sans -mt-0.5">
              {siteConfig.brandTagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Horology-inspired Minimalist Emblem: Dial circle with precise 12-hour tick and sleek V hands */}
      <svg
        className={`${emblemSizes[size]} transition-transform duration-300 group-hover:rotate-45`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18.5" stroke={goldColor} strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="20" cy="20" r="15" stroke={goldColor} strokeWidth="0.6" strokeDasharray="1.5 3" strokeOpacity="0.5" />
        {/* Subtle geometric hour indices */}
        <line x1="20" y1="3" x2="20" y2="6" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="34" x2="20" y2="37" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="3" y1="20" x2="6" y2="20" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="34" y1="20" x2="37" y2="20" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Precise abstract 'V' watch hands set at 10:10 */}
        <path
          d="M20 20L13 11M20 20L27 11"
          stroke={goldColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center pinion jewel */}
        <circle cx="20" cy="20" r="2" fill={goldColor} />
      </svg>

      <div className="flex flex-col">
        <span className={`font-serif font-light uppercase ${textColor} ${textSizes[size]}`}>
          {siteConfig.brandName}
        </span>
        {showTagline && (
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#B89A6A] font-sans -mt-0.5">
            {siteConfig.brandTagline}
          </span>
        )}
      </div>
    </div>
  );
};
