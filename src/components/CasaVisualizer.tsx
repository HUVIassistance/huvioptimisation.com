import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  FileSpreadsheet, 
  FileText, 
  Bot, 
  Zap, 
  TrendingUp, 
  Check, 
  DollarSign, 
  ArrowRight, 
  Clock, 
  User, 
  Users, 
  Layers, 
  HelpCircle,
  FolderOpen,
  Calendar,
  Receipt
} from 'lucide-react';

interface CasaVisualizerProps {
  activeStep: number;
}

export default function CasaVisualizer({ activeStep }: CasaVisualizerProps) {
  // Analytical State simulation
  const [profitMargin, setProfitMargin] = useState(12);
  const [losses, setLosses] = useState(4850);
  const [conversionRate, setConversionRate] = useState(38);
  const [hoursPerProject, setHoursPerProject] = useState(42);
  const [activeWorkflowNode, setActiveWorkflowNode] = useState(0);

  // Auto animation loops
  useEffect(() => {
    if (activeStep === 1) { // Analyser
      const interval = setInterval(() => {
        setProfitMargin(prev => (prev >= 28 ? 12 : prev + 1));
        setLosses(prev => (prev <= 450 ? 4850 : prev - 150));
        setConversionRate(prev => (prev >= 65 ? 38 : prev + 1));
        setHoursPerProject(prev => (prev <= 18 ? 42 : prev - 1));
      }, 120);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === 3) { // Automatiser
      const interval = setInterval(() => {
        setActiveWorkflowNode(prev => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeStep]);

  // Step 1 Layout: Centraliser
  const renderCentraliser = () => {
    const nodes = [
      { id: 1, label: 'Excel dispersés', icon: FileSpreadsheet, x: '8%', y: '10%', color: 'border-green-500/30 text-green-400' },
      { id: 2, label: 'Courriels clients', icon: Mail, x: '78%', y: '10%', color: 'border-blue-500/30 text-blue-400' },
      { id: 3, label: 'Suivis manuels', icon: FileText, x: '8%', y: '45%', color: 'border-yellow-500/30 text-yellow-400' },
      { id: 4, label: 'Téléphone & SMS', icon: Zap, x: '78%', y: '45%', color: 'border-purple-500/30 text-purple-400' },
      { id: 5, label: 'Feuilles de temps', icon: Clock, x: '8%', y: '80%', color: 'border-emerald-500/30 text-emerald-400' },
      { id: 6, label: 'Factures & Reçus', icon: Receipt, x: '78%', y: '80%', color: 'border-rose-500/30 text-rose-400' }
    ];

    return (
      <div className="relative w-full h-[320px] bg-[#070b13] rounded-xl border border-[#17243A]/60 overflow-hidden flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#17243a_1px,transparent_1px),linear-gradient(to_bottom,#17243a_1px,transparent_1px)] bg-[size:20px_20px] opacity-15"></div>

        {/* Dynamic laser lines flowing towards center (fully responsive with viewBox) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Node 1 -> Center */}
          <path d="M 15 15 L 50 50" fill="none" stroke="#F47B20" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="1.5 1.5" />
          <circle r="1" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 15 15 L 50 50" />
          </circle>

          {/* Node 2 -> Center */}
          <path d="M 85 15 L 50 50" fill="none" stroke="#F47B20" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="1.5 1.5" />
          <circle r="1" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 85 15 L 50 50" />
          </circle>

          {/* Node 3 -> Center */}
          <path d="M 15 50 L 50 50" fill="none" stroke="#F47B20" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="1.5 1.5" />
          <circle r="1" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M 15 50 L 50 50" />
          </circle>

          {/* Node 4 -> Center */}
          <path d="M 85 50 L 50 50" fill="none" stroke="#F47B20" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="1.5 1.5" />
          <circle r="1" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 85 50 L 50 50" />
          </circle>

          {/* Node 5 -> Center */}
          <path d="M 15 85 L 50 50" fill="none" stroke="#F47B20" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="1.5 1.5" />
          <circle r="1" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
            <animateMotion dur="2.6s" repeatCount="indefinite" path="M 15 85 L 50 50" />
          </circle>

          {/* Node 6 -> Center */}
          <path d="M 85 85 L 50 50" fill="none" stroke="#F47B20" strokeWidth="0.4" strokeOpacity="0.25" strokeDasharray="1.5 1.5" />
          <circle r="1" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
            <animateMotion dur="2.3s" repeatCount="indefinite" path="M 85 85 L 50 50" />
          </circle>
        </svg>

        {/* Central Epicentre Node */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F47B20] to-[#ff9242] text-white flex items-center justify-center shadow-lg shadow-[#F47B20]/30 border border-[#ffa767] animate-pulse">
            <Layers className="w-8 h-8" />
          </div>
          <span className="mt-2.5 text-[10px] font-mono font-extrabold text-[#F47B20] bg-[#F47B20]/10 px-2.5 py-0.5 rounded-full border border-[#F47B20]/20 whitespace-nowrap uppercase tracking-wider">
            Votre système
          </span>
        </div>

        {/* Surrounding Nodes */}
        {nodes.map(node => {
          const Icon = node.icon;
          return (
            <div 
              key={node.id} 
              style={{ left: node.x, top: node.y }}
              className="absolute z-10 flex flex-col items-center"
            >
              <div className={`w-9 h-9 rounded-xl bg-[#0d1321] border ${node.color} flex items-center justify-center shadow-md`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="mt-1 text-[8px] font-mono text-gray-400 font-semibold text-center max-w-[80px] truncate">{node.label}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Step 2 Layout: Analyser
  const renderAnalyser = () => {
    return (
      <div className="relative w-full h-[320px] bg-[#070b13] rounded-xl border border-[#17243A]/60 overflow-hidden p-5 flex flex-col justify-between">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-[#17243A]/40 pb-2">
          <span className="text-[10px] font-mono font-bold text-gray-500">INDIFICATEURS CLÉS EN TEMPS RÉEL</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#F47B20]"></span>
        </div>

        {/* Profit Margin Widget */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium font-sans">Marge Bénéficiaire Nette</span>
            <span className="text-green-400 font-mono font-bold">+{profitMargin}%</span>
          </div>
          <div className="w-full bg-[#111a2e] h-2.5 rounded-full overflow-hidden border border-[#17243A]">
            <div 
              className="bg-gradient-to-r from-[#10b981] to-green-400 h-full rounded-full transition-all duration-300" 
              style={{ width: `${(profitMargin / 35) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Loss Prevention Widget */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium font-sans">Fuites financières éliminées</span>
            <span className="text-red-400 font-mono font-bold">-{losses} $ / mois</span>
          </div>
          <div className="w-full bg-[#111a2e] h-2.5 rounded-full overflow-hidden border border-[#17243A]">
            <div 
              className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full transition-all duration-300" 
              style={{ width: `${(losses / 4850) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* NEW Metric 3: Conversion Rate */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium font-sans">Taux de conversion des devis</span>
            <span className="text-[#F47B20] font-mono font-bold">{conversionRate}%</span>
          </div>
          <div className="w-full bg-[#111a2e] h-2.5 rounded-full overflow-hidden border border-[#17243A]">
            <div 
              className="bg-gradient-to-r from-[#F47B20] to-orange-400 h-full rounded-full transition-all duration-300" 
              style={{ width: `${conversionRate}%` }}
            ></div>
          </div>
        </div>

        {/* NEW Metric 4: Hours Saved / Cycle Time */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 font-medium font-sans">Heures admin par projet</span>
            <span className="text-blue-400 font-mono font-bold">{hoursPerProject}h / contrat</span>
          </div>
          <div className="w-full bg-[#111a2e] h-2.5 rounded-full overflow-hidden border border-[#17243A]">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300" 
              style={{ width: `${(hoursPerProject / 42) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Profit Step Breakdown */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-[#111a2e]/50 border border-[#17243A]/40 rounded-lg p-2 text-center">
            <span className="block text-[8px] font-mono text-gray-500 uppercase">Rendement net</span>
            <span className="text-[10px] font-mono font-bold text-green-400">Hausse de +18%</span>
          </div>
          <div className="bg-[#111a2e]/50 border border-[#17243A]/40 rounded-lg p-2 text-center">
            <span className="block text-[8px] font-mono text-[#F47B20] uppercase font-bold">Temps Récupéré</span>
            <span className="text-[10px] font-mono font-bold text-[#F47B20]">15h / sem.</span>
          </div>
        </div>
      </div>
    );
  };

  // Step 3 Layout: Structurer
  const renderStructurer = () => {
    return (
      <div className="relative w-full h-[320px] bg-[#070b13] rounded-xl border border-[#17243A]/60 overflow-hidden flex flex-col justify-between p-5">
        <div className="flex items-center justify-between border-b border-[#17243A]/40 pb-2 mb-2">
          <span className="text-[10px] font-mono font-bold text-gray-500">HIÉRARCHIE ET DISTRIBUTION DES ACTIONS</span>
          <span className="text-[9px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full uppercase">Ordre</span>
        </div>

        {/* 3 Tier Structure */}
        <div className="flex flex-col gap-2.5 justify-center flex-1">
          
          {/* Tier 1 */}
          <div className="flex items-center justify-between bg-[#111a2e]/80 border border-[#17243A] p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/25 shrink-0">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <h6 className="text-[10px] font-sans font-extrabold text-white">Dirigeant (Vous)</h6>
                <p className="text-[8px] text-gray-400 leading-tight font-sans">Surveille uniquement la rentabilité globale et la stratégie.</p>
              </div>
            </div>
            <span className="text-[8px] font-mono text-blue-400 uppercase font-bold shrink-0 ml-2">Décisions</span>
          </div>

          {/* Tier 2 */}
          <div className="flex items-center justify-between bg-[#111a2e]/80 border border-[#F47B20]/30 p-2 rounded-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-[#F47B20]/5 blur-sm pointer-events-none"></div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#F47B20]/10 text-[#F47B20] border border-[#F47B20]/25 shrink-0">
                <FolderOpen className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <h6 className="text-[10px] font-sans font-extrabold text-white">Gestion des Procédures & Tâches</h6>
                <p className="text-[8px] text-gray-400 leading-tight font-sans">Structure documentée qui attribue et suit chaque étape en direct.</p>
              </div>
            </div>
            <span className="text-[8px] font-mono text-[#F47B20] uppercase font-bold shrink-0 animate-pulse ml-2">Procédures</span>
          </div>

          {/* Tier 3 */}
          <div className="flex items-center justify-between bg-[#111a2e]/80 border border-[#17243A] p-2 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/25 shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <h6 className="text-[10px] font-sans font-extrabold text-white">Équipes de Terrain</h6>
                <p className="text-[8px] text-gray-400 leading-tight font-sans">Reçoivent l'exacte feuille de route claire du jour sans stress.</p>
              </div>
            </div>
            <span className="text-[8px] font-mono text-green-400 uppercase font-bold shrink-0 ml-2">Exécution</span>
          </div>

        </div>
      </div>
    );
  };

  // Step 4 Layout: Automatiser
  const renderAutomatiser = () => {
    const workflow = [
      { step: 0, label: 'Prospect', icon: Mail, desc: 'Lead reçu' },
      { step: 1, label: 'IA Analyse', icon: Bot, desc: 'Extractions' },
      { step: 2, label: 'Ajout contact CRM', icon: FileText, desc: 'CRM unifié' },
      { step: 3, label: 'SMS Client', icon: Zap, desc: 'Rappel Auto' }
    ];

    return (
      <div className="relative w-full h-[320px] bg-[#070b13] rounded-xl border border-[#17243A]/60 overflow-hidden p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-[#17243A]/40 pb-2">
          <span className="text-[10px] font-mono font-bold text-gray-500">EXEMPLE DE WORKFLOW FLUIDE EN ACTION</span>
          <span className="flex items-center gap-1 text-[9px] font-mono text-[#F47B20] font-extrabold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F47B20] animate-ping"></span>
            <span>TEMPS RÉEL</span>
          </span>
        </div>

        {/* Workflow Chain */}
        <div className="flex items-center justify-between py-6 relative">
          
          {/* Connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#17243A]/80 -translate-y-1/2 z-0"></div>
          
          {/* Progress fill */}
          <div 
            className="absolute top-1/2 left-4 h-0.5 bg-gradient-to-r from-[#F47B20] to-orange-400 -translate-y-1/2 z-0 transition-all duration-700"
            style={{ width: `${(activeWorkflowNode / 3) * 85}%` }}
          ></div>

          {workflow.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeWorkflowNode === idx;
            const isCompleted = activeWorkflowNode > idx;

            return (
              <div key={item.step} className="flex flex-col items-center relative z-10 w-16">
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 border ${
                  isActive 
                    ? 'bg-[#F47B20] border-[#ffb17c] text-white shadow-lg shadow-[#F47B20]/40 scale-110'
                    : isCompleted
                    ? 'bg-[#111a2e] border-green-500 text-green-400 shadow-md shadow-green-500/5'
                    : 'bg-[#0d1321] border-[#17243A]/80 text-gray-500'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>
                
                <h6 className={`mt-2 text-[8px] sm:text-[9px] font-mono font-bold text-center leading-tight truncate max-w-full ${isActive ? 'text-[#F47B20]' : 'text-gray-400'}`}>
                  {item.label}
                </h6>
                <span className="text-[7px] text-gray-500 font-mono mt-0.5 whitespace-nowrap text-center">{item.desc}</span>
              </div>
            );
          })}
        </div>

        {/* Workflow Info Alert */}
        <div className="p-3 rounded-lg bg-[#111a2e]/50 border border-[#17243A]/60 flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#F47B20]/10 text-[#F47B20] flex items-center justify-center shrink-0">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
          </div>
          <p className="text-[10px] text-left text-gray-400 font-sans leading-normal">
            <b>Zéro action manuelle :</b> Dès la soumission reçue, l'IA trie, calcule les prix, planifie l'itinéraire et envoie le devis directement au client final.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full relative select-none animate-fade-in" key={activeStep}>
      {activeStep === 0 && renderCentraliser()}
      {activeStep === 1 && renderAnalyser()}
      {activeStep === 2 && renderStructurer()}
      {activeStep === 3 && renderAutomatiser()}
    </div>
  );
}
