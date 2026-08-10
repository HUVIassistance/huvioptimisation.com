import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showProgressBar?: boolean;
}

export default function Logo({ className = "", size = 'md', showProgressBar = true }: LogoProps) {
  const textSizeClass = {
    sm: 'text-xl tracking-[0.08em]',
    md: 'text-2xl sm:text-3xl tracking-[0.1em]',
    lg: 'text-4xl sm:text-5xl tracking-[0.12em]'
  }[size];

  const circleSizeClass = {
    sm: 'w-5 h-5 -top-2.5 -right-4',
    md: 'w-7 h-7 -top-3.5 -right-6',
    lg: 'w-10 h-10 -top-5 -right-9'
  }[size];

  const barWidthClass = {
    sm: 'w-20 h-1.5 mt-1.5',
    md: 'w-28 h-2.5 mt-2.5',
    lg: 'w-40 h-3.5 mt-3.5'
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`} id="huvi-logo-container">
      {/* Upper part: HUVI wordmark + Circular Status Ring */}
      <div className="relative flex items-center justify-center">
        <span 
          className={`text-white font-normal leading-none ${textSizeClass}`}
          style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
        >
          HUVI
        </span>
        
        {/* Circular Progress Indicator on Top-Right */}
        <div className={`absolute ${circleSizeClass}`}>
          <svg viewBox="0 0 36 36" className="w-full h-full">
            {/* Background circular track */}
            <path
              className="text-[#1C2C42]"
              strokeWidth="4"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress arc (Teal-blue) */}
            <path
              className="text-[#3A7697] stroke-current"
              strokeDasharray="65, 100"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
            />
          </svg>
        </div>
      </div>
      
      {/* Lower horizontal progress bar */}
      {showProgressBar && (
        <div className={`${barWidthClass} bg-[#142032] rounded-full overflow-hidden border border-[#1C2C42]/50 p-[1.5px]`}>
          <div 
            className="h-full bg-gradient-to-r from-[#173A5E] via-[#2F678E] to-[#458BB4] rounded-full transition-all duration-1000"
            style={{ width: '60%' }}
          ></div>
        </div>
      )}
    </div>
  );
}
