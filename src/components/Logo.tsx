import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showProgressBar?: boolean;
}

export default function Logo({ className = "", size = 'md', showProgressBar: _showProgressBar = true }: LogoProps) {
  const sizeClass = {
    sm: 'h-10 w-auto',
    md: 'h-16 w-auto',
    lg: 'h-24 w-auto'
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`} id="huvi-logo-container">
      <img
        src="/logo.png"
        alt="HUVI Optimisation"
        className={sizeClass}
      />
    </div>
  );
}
