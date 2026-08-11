import React, { useState, useEffect } from 'react';
import { Database, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onOpenAdmin: () => void;
  adminSubmissionsCount: number;
  showAdminButton?: boolean;
}

export default function Navbar({ onOpenAdmin, adminSubmissionsCount, showAdminButton = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [promoVisible, setPromoVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoVisible(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navLinks: { label: string; href: string; external?: boolean }[] = [
    { label: 'Le VRAI diagnostic', href: '#problem' },
    { label: 'La méthode CASA', href: '#architecture' },
    { label: 'Solutions concrètes', href: '#what-we-build' },
    { label: 'Comment on travaille', href: '#how-it-works' },
    { label: 'Vos agents IA', href: '#ai-teams' },
    { label: "Calculateur d'opportunités", href: '#builder' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header id="navbar-header" className="fixed top-0 left-0 right-0 z-50 bg-[#111a2e]/80 backdrop-blur-md border-b border-[#17243A]/60">
      {showBanner && (
        <div className="bg-[#070b13] border-b border-[#17243A]/40 py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-x-3 gap-y-1 flex-wrap flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F47B20]/10 to-orange-500/10 border border-[#F47B20]/30 text-[#ff9242] font-mono font-bold text-[9px] sm:text-[10px] px-3 py-1 rounded-full tracking-wider uppercase select-none shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F47B20] animate-pulse"></span>
                Tarif pionnier
              </span>
              <p className={`text-xs sm:text-sm text-gray-300 font-sans leading-none flex items-center flex-wrap gap-x-1.5 gap-y-0.5 truncate transition-all duration-700 ease-in-out ${promoVisible ? 'opacity-100 translate-x-0' : 'opacity-30 sm:opacity-40 translate-x-0.5'}`}>
                <span>Économisez 15 % sur la configuration</span>
                <span className="text-[#ff9242] font-bold">Jusqu'au 30 septembre</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://huvioptimisation.fillout.com/rencontre-doptimisation-exploratoire"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#F47B20] to-[#ff9242] hover:from-[#ff9242] hover:to-[#ffa767] text-white font-mono font-bold text-[10px] sm:text-[11px] rounded-lg shadow-lg shadow-[#F47B20]/10 hover:scale-[1.01] transition-all uppercase tracking-wider shrink-0"
              >
                <span>Réserver ma séance d'optimisation gratuite</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setShowBanner(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <Logo size="sm" showProgressBar={true} className="group-hover:scale-105 transition-transform duration-300" />
              <div className="border-l border-[#17243A] pl-3 py-1 hidden xs:block">
                <span className="block text-[8px] font-mono tracking-[0.2em] text-[#F47B20] uppercase font-semibold leading-none">OPTIMISATION</span>
                <span className="block text-[9px] text-gray-500 mt-0.5 font-sans">Systèmes IA</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-3 xl:gap-3.5 2xl:gap-5 3xl:gap-6 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="font-sans text-xs xl:text-[11px] 2xl:text-xs 3xl:text-[13px] font-medium text-gray-400 hover:text-white transition-colors duration-200 relative py-1 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F47B20] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 2xl:gap-3 shrink-0">
            {/* Admin toggle visualizer */}
            {showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className="relative p-1.5 rounded-lg border border-[#17243A] bg-[#0D1527] hover:bg-[#17243A] text-gray-400 hover:text-[#F47B20] transition-all flex items-center gap-1.5 text-[10px] font-mono"
                title="Console d'Administration des leads"
                id="admin-console-toggle"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Base de données</span>
                {adminSubmissionsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#F47B20] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                    {adminSubmissionsCount}
                  </span>
                )}
              </button>
            )}

            <a
              href="#builder"
              className="inline-flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 2xl:px-3 py-1.5 rounded-md bg-[#0D1527] hover:bg-[#F47B20] text-gray-300 hover:text-white text-[9px] xl:text-[10px] font-mono tracking-wider uppercase font-bold border border-[#17243A] hover:border-[#F47B20] transition-all duration-300 shadow-sm shrink-0"
              id="cta-analysis-nav"
            >
              <span>Calculer mes gains potentiels</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 xl:hidden">
            {showAdminButton && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-lg border border-[#17243A] bg-[#0D1527] hover:bg-[#17243A] text-gray-400 transition-all flex items-center gap-1.5 text-xs font-mono"
                id="admin-console-toggle-mobile"
              >
                <Database className="w-4 h-4" />
                {adminSubmissionsCount > 0 && (
                  <span className="bg-[#F47B20] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {adminSubmissionsCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-[#17243A] hover:bg-[#17243A] text-gray-400 hover:text-white transition-all"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Right Sidebar) */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-50" id="mobile-menu-overlay">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#111a2e] backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sliding Sidebar */}
          <div className="absolute inset-y-0 right-0 w-72 bg-[#111a2e] border-l border-[#17243A] p-6 flex flex-col justify-between shadow-2xl z-20">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#17243A]/40 pb-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Menu</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg border border-[#17243A] hover:bg-[#17243A] text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-base font-medium text-gray-300 hover:text-[#F47B20] transition-colors py-1 border-b border-[#17243A]/20"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#17243A]/40">
              <a
                href="#builder"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#F47B20] text-white text-xs font-semibold text-center hover:bg-[#ff9242] transition-colors uppercase font-mono tracking-wider"
              >
                <span>Calculer mes gains potentiels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
