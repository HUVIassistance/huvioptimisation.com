import React from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Garantie() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40 overflow-hidden" id="garantie-huvi">
      {/* Dynamic background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-gradient-to-r from-[#F47B20]/5 to-[#3A7697]/5 blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#090d15]/90 border border-[#243755] relative overflow-hidden shadow-2xl">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F47B20]/3 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#3A7697]/3 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left/Top Content: The Shield Icon and Badges */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#F47B20]/15 to-[#ff9242]/5 rounded-2xl text-[#F47B20] border border-[#F47B20]/25 shadow-lg shadow-[#F47B20]/5 relative group">
                <Shield className="w-10 h-10 animate-pulse" />
                <div className="absolute -top-1 -right-1 p-1 bg-orange-500 rounded-full text-white">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Notre engagement</span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  La garantie HUVI
                </h2>
              </div>
            </div>

            {/* Right/Bottom Content: The core text and commitment */}
            <div className="md:col-span-8 space-y-6">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                Chaque système, CRM ou automatisation que nous mettons en place est testé en direct avec vos équipes. 
                <span className="text-white font-medium"> Si une solution n'est pas adoptée par votre équipe ou n'apporte pas l'impact attendu</span>, 
                nous l'ajustons jusqu'à ce qu'elle fonctionne réellement dans votre quotidien.
              </p>

              <div className="pt-4 border-t border-[#17243A]/60 flex flex-wrap gap-4 items-center text-xs font-mono text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Validation terrain en direct</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Ajustements inclus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>0% théorie, 100% pratique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
