import React, { useState, useEffect } from 'react';
import { 
  Mail, FileSpreadsheet, FileText, Globe, Layers, Zap, Bot, TrendingUp, 
  Cpu, Server, Check, Folder, FolderOpen, Play, Send, RefreshCw, 
  Upload, CheckSquare, Sparkles, ArrowRight, AlertTriangle, Eye, ShieldCheck
} from 'lucide-react';

interface InteractiveDiagramProps {
  isZoomed?: boolean;
  setIsZoomed?: (val: boolean) => void;
  activeShowcaseTab?: 'airtable' | 'dashboard' | 'automation' | 'agent';
  setActiveShowcaseTab?: (val: 'airtable' | 'dashboard' | 'automation' | 'agent') => void;
}

export default function InteractiveDiagram({
  isZoomed: externalIsZoomed,
  setIsZoomed: externalSetIsZoomed,
  activeShowcaseTab: externalActiveShowcaseTab,
  setActiveShowcaseTab: externalSetActiveShowcaseTab
}: InteractiveDiagramProps = {}) {
  const [activePacket, setActivePacket] = useState<number | null>(null);
  const [activatedNode, setActivatedNode] = useState<string | null>(null);
  const [simulationStatus, setSimulationStatus] = useState<string>("Prêt à simplifier vos façons de travailler...");
  const [processedCount, setProcessedCount] = useState(148);

  // Showcase section states
  const [internalActiveShowcaseTab, internalSetActiveShowcaseTab] = useState<'airtable' | 'dashboard' | 'automation' | 'agent'>('airtable');
  const activeShowcaseTab = externalActiveShowcaseTab !== undefined ? externalActiveShowcaseTab : internalActiveShowcaseTab;
  const setActiveShowcaseTab = externalSetActiveShowcaseTab !== undefined ? externalSetActiveShowcaseTab : internalSetActiveShowcaseTab;

  const [internalIsZoomed, internalSetIsZoomed] = useState<boolean>(false);
  const isZoomed = externalIsZoomed !== undefined ? externalIsZoomed : internalIsZoomed;
  const setIsZoomed = externalSetIsZoomed !== undefined ? externalSetIsZoomed : internalSetIsZoomed;

  const [flashShowcase, setFlashShowcase] = useState<boolean>(false);
  const [lightningOptionIdx, setLightningOptionIdx] = useState<number | null>(null);
  const [lightningSide, setLightningSide] = useState<'left' | 'right' | 'both' | null>(null);
  
  // 1. Airtable State
  const [airtableRows, setAirtableRows] = useState([
    { id: 1, name: "Chantier #209 Sillery", client: "Tremblay Construction", total: "145,000 $", margin: "32%", status: "En cours", aiClass: "Optimisé", lastSync: "Il y a 5 min" },
    { id: 2, name: "Rénovation Résidence Lévis", client: "Gagnon & Fils", total: "64,200 $", margin: "28%", status: "Facturé", aiClass: "Optimisé", lastSync: "Il y a 2 min" },
    { id: 3, name: "Immeuble Locatif Ste-Foy", client: "ImmoQuébec", total: "220,000 $", margin: "19%", status: "En attente", aiClass: "Alerte : Marge < 20%", lastSync: "À l'instant" },
    { id: 4, name: "Agrandissement Clinique Québec", client: "Dr. Lavoie", total: "112,000 $", margin: "34%", status: "Planifié", aiClass: "Optimisé", lastSync: "Il y a 1h" }
  ]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editingMargin, setEditingMargin] = useState<string>("");

  // 2. Dashboard State
  const [activeDashboardProject, setActiveDashboardProject] = useState<number>(1);

  // 3. Automation State
  const [automationStep, setAutomationStep] = useState<number>(0);
  const [automationStatusText, setAutomationStatusText] = useState<string>("En attente de déclenchement...");
  const [isAutomationRunning, setIsAutomationRunning] = useState<boolean>(false);
  const [generatedEmailDraft, setGeneratedEmailDraft] = useState<string>("");

  // 4. Folder Agent IA State
  const [selectedFileForAgent, setSelectedFileForAgent] = useState<string | null>(null);
  const [agentProcessingStep, setAgentProcessingStep] = useState<number>(0);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);
  const [folderFiles, setFolderFiles] = useState<string[]>([
    "2026-07-15_Tremblay-Sillery_Contrat.pdf",
    "2026-07-22_Facture_Plomberie-Laval_1240.pdf",
    "2026-07-30_Devis_Structure_Approved.pdf"
  ]);

  const startAutomationSimulation = () => {
    if (isAutomationRunning) return;
    setIsAutomationRunning(true);
    setAutomationStep(1);
    setAutomationStatusText("🚨 DÉCLENCHEUR : Facture #F-2026-089 impayée depuis 7 jours.");
    
    setTimeout(() => {
      setAutomationStep(2);
      setAutomationStatusText("🧠 ANALYSE IA : L'Agent de Relance lit l'historique client...");
    }, 1500);

    setTimeout(() => {
      setAutomationStep(3);
      setAutomationStatusText("✍️ RÉDACTION IA : Génération d'une relance personnalisée polie mais ferme.");
      setGeneratedEmailDraft(
        `Objet : Suivi de votre facture impayée - Chantier #209 Sillery\n\nBonjour M. Tremblay,\n\nJ'espère que vous allez bien. Je vous contacte concernant la facture #F-2026-089 d'un montant de 14,500$ émise le 2026-07-28, qui semble être en souffrance.\n\nSachant que le projet Sillery avance très bien, nous apprécierions grandement si vous pouviez finaliser le paiement cette semaine. S'il y a le moindre enjeu, n'hésitez pas à m'appeler.\n\nMerci de votre confiance,\nService administratif (Automatisé par HUVI)`
      );
    }, 3000);

    setTimeout(() => {
      setAutomationStep(4);
      setAutomationStatusText("📬 ENVOI AUTOMATIQUE : Courriel et SMS acheminés au client.");
    }, 5000);

    setTimeout(() => {
      setAutomationStep(5);
      setAutomationStatusText("✅ SUCCÈS : Enregistrement de la relance dans l'Airtable central.");
      setIsAutomationRunning(false);
    }, 6500);
  };

  const runAgentFileProcessor = (fileName: string) => {
    if (isAgentRunning) return;
    setSelectedFileForAgent(fileName);
    setIsAgentRunning(true);
    setAgentProcessingStep(1);
    setAgentLogs(["[INFO] Fichier reçu : " + fileName]);

    setTimeout(() => {
      setAgentProcessingStep(2);
      setAgentLogs(prev => [
        ...prev,
        "[IA] Lecture OCR et extraction par vision artificielle...",
        "[IA] Métadonnées extraites :",
        "   - Fournisseur : Élec Québec Inc.",
        "   - Date de facture : 2026-08-01",
        "   - Montant total : 3,850.00 $",
        "   - Taxes : TPS 192.50 $, TVQ 383.91 $"
      ]);
    }, 1500);

    setTimeout(() => {
      setAgentProcessingStep(3);
      setAgentLogs(prev => [
        ...prev,
        "[SYSTÈME] Renommage automatique : '2026-08-01_Elec-Quebec_3850-00.pdf'",
        "[SYSTÈME] Rangement : '📂 HUVI_ARCHIVES/Factures_Fournisseurs/2026/Elec-Quebec/'"
      ]);
    }, 3200);

    setTimeout(() => {
      setAgentProcessingStep(4);
      setAgentLogs(prev => [
        ...prev,
        "[SYNC COMPTABLE] Écriture comptable ajoutée automatiquement à Airtable.",
        "🎉 STATUT : Terminé ! Zéro saisie manuelle effectuée."
      ]);
      setFolderFiles(prev => [...prev, "2026-08-01_Elec-Quebec_3850-00.pdf"]);
      
      // Sync with airtable live
      setAirtableRows(prev => [
        ...prev,
        {
          id: prev.length + 1,
          name: "Facture Élec Québec",
          client: "Fournisseur Élec Québec",
          total: "3,850 $",
          margin: "Dépense projet",
          status: "Archivé",
          aiClass: "Saisie auto complétée",
          lastSync: "À l'instant"
        }
      ]);
      
      setIsAgentRunning(false);
    }, 5500);
  };

  // Raw data sources representing the "BEFORE" state (Irritants and chaos)
  const dataSources = [
    { id: 'oublies', label: 'Demandes oubliées', icon: Mail, color: 'from-red-500 to-rose-600', description: 'Perte d\'opportunités par manque de suivi' },
    { id: 'manuels', label: 'Suivis manuels', icon: FileSpreadsheet, color: 'from-orange-500 to-amber-600', description: 'Temps perdu à relancer un par un' },
    { id: 'excel', label: 'Informations dispersées', icon: FileText, color: 'from-yellow-500 to-amber-600', description: 'Données fragmentées sur plusieurs fichiers' },
    { id: 'admin', label: 'Admin répétitive', icon: Globe, color: 'from-rose-600 to-red-600', description: 'Double saisie constante entre vos outils' }
  ];

  // Destination states representing the "AFTER" state (Value and outcomes)
  const systemOutputs = [
    { id: 'systems', label: 'Hub centralisé', icon: Layers, desc: 'Toutes vos opportunités et données unifiées en direct.', delay: 1200 },
    { id: 'automation', label: 'Relance Automatique', icon: Zap, desc: 'Rappels automatisés rédigés par l\'IA pour vos impayés.', delay: 1400 },
    { id: 'dashboards', label: 'Suivi des Marges', icon: TrendingUp, desc: 'Dashboard de rentabilité nette en temps réel.', delay: 1600 },
    { id: 'aiTeams', label: 'Folder Agent IA', icon: Bot, desc: 'Classement, lecture et renommage automatique de vos fichiers.', delay: 1800 }
  ];

  const triggerFlow = (sourceIndex: number) => {
    setSimulationStatus("🎰 INITIALISATION : Lancement du séquenceur...");
    
    let step = 0;
    const maxSteps = 24;
    
    const runCasinoRoll = () => {
      const randomIdx = Math.floor(Math.random() * 4);
      const sideRand = Math.random();
      const randomSide: 'left' | 'right' | 'both' = sideRand < 0.35 ? 'left' : sideRand < 0.7 ? 'right' : 'both';
      
      setLightningOptionIdx(randomIdx);
      setLightningSide(randomSide);
      
      const casinoLogs = [
        "⚡ CANALISATION : Scan complet des congestions...",
        "⚙️ OPTIMISATION : Routage vers votre système...",
        "🎰 SÉQUENÇAGE : Élimination des pertes de temps...",
        "🧠 EXTRACTION IA : Traitement cognitif en cours...",
        "💎 RENTABILITÉ : Alignement de la structure CASA...",
        "🚀 DÉPLOIEMENT : Activation des automates de terrain..."
      ];
      if (step % 3 === 0) {
        setSimulationStatus(casinoLogs[Math.floor(Math.random() * casinoLogs.length)]);
      }
      
      step++;
      
      if (step < maxSteps) {
        // Calculate variable delay for organic casino deceleration
        const delay = 30 + Math.pow(step / maxSteps, 2) * 180;
        setTimeout(runCasinoRoll, delay);
      } else {
        // Reset casino light effects
        setLightningOptionIdx(null);
        setLightningSide(null);

        // Proceed to normal flow
        setSimulationStatus(`🎯 IRRITANT IDENTIFIÉ : Optimisation de "${dataSources[sourceIndex].label}"...`);
        setActivePacket(sourceIndex);
        setActivatedNode(null);

        // Map source index to active tab
        const tabKeys: ('airtable' | 'automation' | 'dashboard' | 'agent')[] = ['airtable', 'automation', 'dashboard', 'agent'];
        const targetTab = tabKeys[sourceIndex];
        
        // Switch the live screen immediately
        setActiveShowcaseTab(targetTab);
        setFlashShowcase(true);
        setTimeout(() => setFlashShowcase(false), 800);

        // 1. Packet travels to central Core (HUVI Engine)
        setTimeout(() => {
          setActivatedNode('core');
          setSimulationStatus("⚡ TRANSMISSION : Structuration en cours (Procédures standardisées & tâches)...");
        }, 700);

        // 2. Core lights up the specific output corresponding to the source
        const targetOutputId = systemOutputs[sourceIndex].id;

        setTimeout(() => {
          setActivatedNode(targetOutputId);
          setProcessedCount(prev => prev + 1);
          setSimulationStatus(`🎉 SUCCÈS : Solution "${systemOutputs[sourceIndex].label}" activée et synchronisée.`);
        }, 1600);

        // 2.5 Automatically display the detailed demo of the selected solution
        setTimeout(() => {
          setIsZoomed(true);
        }, 2400);

        // 3. Reset packet animation
        setTimeout(() => {
          setActivePacket(null);
        }, 2800);
      }
    };
    
    runCasinoRoll();
  };

  const handleOutputClick = (outputId: string) => {
    setActivatedNode(outputId);
    setSimulationStatus(`Affichage direct de la solution : ${systemOutputs.find(o => o.id === outputId)?.label}...`);
    
    const outputToTabMap: Record<string, 'airtable' | 'dashboard' | 'automation' | 'agent'> = {
      'systems': 'airtable',
      'automation': 'automation',
      'dashboards': 'dashboard',
      'aiTeams': 'agent'
    };
    const targetTab = outputToTabMap[outputId];
    if (targetTab) {
      setActiveShowcaseTab(targetTab);
      setFlashShowcase(true);
      setTimeout(() => setFlashShowcase(false), 800);
    }
  };

  // Auto trigger subtle software screen switch periodically to keep the interface living
  useEffect(() => {
    const interval = setInterval(() => {
      const tabKeys: ('airtable' | 'dashboard' | 'automation' | 'agent')[] = ['airtable', 'dashboard', 'automation', 'agent'];
      setActiveShowcaseTab(prev => {
        const currentIdx = tabKeys.indexOf(prev);
        const nextIdx = (currentIdx + 1) % tabKeys.length;
        return tabKeys[nextIdx];
      });
    }, 12000); // Shift every 12 seconds in background
    return () => clearInterval(interval);
  }, []);

  const tracks = [
    {
      id: 'airtable' as const,
      num: "1",
      title: "Opportunités & Hub Central",
      icon: Layers,
      color: "from-blue-500 to-indigo-600",
      irritant: {
        label: "Désordre (AVANT)",
        desc: "Demandes perdues dans les courriels, suivis irréguliers et opportunités de chantier oubliées par manque de centralisation."
      },
      solution: {
        label: "Structure (APRÈS)",
        desc: "Toutes les demandes s'inscrivent automatiquement dans un tableau collaboratif propre. Zéro opportunité perdue."
      }
    },
    {
      id: 'dashboard' as const,
      num: "2",
      title: "Trésorerie & Marges en direct",
      icon: TrendingUp,
      color: "from-amber-500 to-orange-600",
      irritant: {
        label: "Incertitude (AVANT)",
        desc: "Heures perdues sur des fichiers Excel lents et fragiles. Risque d'erreur de formule et flou sur la rentabilité nette réelle."
      },
      solution: {
        label: "Visibilité (APRÈS)",
        desc: "Un tableau de bord de rentabilité consolidé en temps réel. Alertes automatiques dès qu'un projet descend sous les 20%."
      }
    },
    {
      id: 'automation' as const,
      num: "3",
      title: "Suivis & Relances de Factures",
      icon: Zap,
      color: "from-emerald-500 to-green-600",
      irritant: {
        label: "Retards (AVANT)",
        desc: "Relances manuelles pénibles et chronophages. Factures impayées oubliées qui pénalisent directement la trésorerie."
      },
      solution: {
        label: "Régularité (APRÈS)",
        desc: "L'automate surveille les échéances, et l'IA rédige puis envoie des rappels polis et professionnels par e-mail et SMS."
      }
    },
    {
      id: 'agent' as const,
      num: "4",
      title: "Classement Administratif",
      icon: Bot,
      color: "from-violet-500 to-purple-600",
      irritant: {
        label: "Double Saisie (AVANT)",
        desc: "Perte de temps constante à télécharger des fichiers, les renommer à la main et les classer dans Google Drive."
      },
      solution: {
        label: "Automatisation (APRÈS)",
        desc: "L'Assistant IA analyse l'e-mail, extrait le contenu, renomme intelligemment le document et le classe sans action humaine."
      }
    }
  ];

  return (
    <div id="interactive-diagram-container" className="relative w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#090D16] border border-[#17243A]/80 shadow-2xl shadow-black overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F47B20]/5 blur-[120px] pointer-events-none"></div>

      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#17243A]/60 pb-5 mb-8 gap-4 relative z-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#F47B20] uppercase font-semibold bg-[#F47B20]/10 px-2.5 py-1 rounded-full border border-[#F47B20]/20">
            COMPACTEUR OPÉRATIONNEL
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-3">
            Moins de désordre. Plus de contrôle.
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-2xl">
            Voici concrètement comment HUVI transforme vos opérations. Cliquez sur un problème à gauche pour voir comment il est réglé par notre système.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="block text-[10px] font-mono text-gray-500">TÂCHES OPÉRATIONNELLES</span>
            <span className="text-xs font-mono font-bold text-green-400">{processedCount} traitées aujourd'hui</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </div>

      {!isZoomed ? (
        /* 3-COLUMN SYSTEM FLOW DIAGRAM (Default View) */
        <div className="relative z-10 animate-fade-in flex flex-col space-y-8" id="before-after-flowchart">
          
          {/* Instructions banner */}
          <div className="bg-[#111a2e]/60 border border-[#17243A]/60 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F47B20] shrink-0 animate-pulse" />
              <span>
                <strong>Simulez la transformation :</strong> Cliquez sur n'importe quel problème de la colonne de gauche (Avant) pour voir l'optimisation en direct.
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest hidden md:inline">
              Moteur actif
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center relative">
            
            {/* SVG Connector Lines (desktop only) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Left to Center paths */}
                <path d="M 280 80 Q 400 80, 440 180" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M 280 150 Q 400 150, 440 200" fill="none" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M 280 230 Q 400 230, 440 220" fill="none" stroke="#eab308" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M 280 300 Q 400 300, 440 240" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />

                {/* Center to Right paths */}
                <path d="M 520 180 Q 560 80, 680 80" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M 520 200 Q 560 150, 680 150" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M 520 220 Q 560 230, 680 230" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />
                <path d="M 520 240 Q 560 300, 680 300" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.15" strokeDasharray="4 4" />

                {/* Active animated packets */}
                {activePacket !== null && (
                  <circle r="5" fill="#F47B20" className="shadow-lg shadow-[#F47B20]">
                    <animateMotion
                      dur="0.9s"
                      repeatCount="1"
                      fill="freeze"
                      path={
                        activePacket === 0 ? "M 280 80 Q 400 80, 440 180" :
                        activePacket === 1 ? "M 280 150 Q 400 150, 440 200" :
                        activePacket === 2 ? "M 280 230 Q 400 230, 440 220" :
                        "M 280 300 Q 400 300, 440 240"
                      }
                    />
                  </circle>
                )}
                {activatedNode !== null && activatedNode !== 'core' && (
                  <circle r="5" fill="#10b981" className="shadow-lg shadow-green-500">
                    <animateMotion
                      dur="0.9s"
                      repeatCount="1"
                      fill="freeze"
                      path={
                        activatedNode === 'systems' ? "M 520 180 Q 560 80, 680 80" :
                        activatedNode === 'automation' ? "M 520 200 Q 560 150, 680 150" :
                        activatedNode === 'dashboards' ? "M 520 220 Q 560 230, 680 230" :
                        "M 520 240 Q 560 300, 680 300"
                      }
                    />
                  </circle>
                )}
              </svg>
            </div>

            {/* Column 1: Sources (AVANT - Irritants) */}
            <div className="lg:col-span-4 space-y-3 z-10">
              <div className="flex items-center gap-2 pb-2 px-1 border-b border-[#17243A]/40 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                  DÉSORDRE OPÉRATIONNEL (AVANT)
                </span>
              </div>
              
              {dataSources.map((source, idx) => {
                const SourceIcon = source.icon;
                const isCurrentActive = activePacket === idx;
                const isFlashed = lightningOptionIdx === idx && (lightningSide === 'left' || lightningSide === 'both');
                return (
                  <button
                    key={source.id}
                    onClick={() => triggerFlow(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                      isCurrentActive
                        ? 'bg-red-500/15 border-red-500 shadow-lg shadow-red-500/10 scale-[1.02]'
                        : isFlashed
                        ? 'bg-[#F47B20]/20 border-[#F47B20] text-white shadow-[0_0_20px_rgba(244,123,32,0.6)] scale-[1.03]'
                        : 'bg-[#0d1321]/40 border-[#17243A]/60 hover:border-red-500/40 hover:bg-[#0d1321]/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[#17243A]/60 ${isCurrentActive || isFlashed ? 'text-[#F47B20]' : 'text-gray-400 group-hover:text-red-400'} transition-colors`}>
                        <SourceIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{source.label}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate leading-relaxed">{source.description}</p>
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase text-red-400 opacity-60 group-hover:opacity-100 transition-opacity">
                        Résoudre ➜
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Column 2: Central Router (HUVI Core) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 lg:py-0 z-10">
              <div className="relative flex items-center justify-center w-24 h-24">
                {/* Neon blur backing */}
                <div className="absolute -inset-4 rounded-full bg-[#F47B20]/10 blur-md animate-pulse"></div>

                {/* Concentric rotating/pulsing ring effects in vibrant orange */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F47B20]/50 animate-spin [animation-duration:12s]"></div>
                <div className="absolute -inset-2.5 rounded-full border border-double border-[#F47B20]/30 animate-pulse"></div>
                
                {/* Inner central processing core node: Always-orange & animated */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 bg-gradient-to-br from-[#F47B20] via-[#ff9242] to-[#E25B00] border-2 border-[#ffae70] text-white shadow-[0_0_25px_rgba(244,123,32,0.65)] ${
                  activatedNode === 'core' || activePacket !== null
                    ? 'scale-115 shadow-[0_0_45px_rgba(244,123,32,0.9)]'
                    : 'scale-105 hover:scale-110'
                }`}>
                  <Cpu className={`w-7 h-7 animate-[spin_12s_linear_infinite] ${
                    activatedNode === 'core' || activePacket !== null ? 'animate-pulse' : ''
                  }`} />
                </div>

                {/* Status indicator pill */}
                <div className="absolute -bottom-6 bg-[#090D16] border border-[#F47B20]/60 px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-md shadow-[#F47B20]/5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#F47B20] uppercase animate-pulse">
                    VOTRE SYSTÈME
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Outcomes (APRÈS - Solutions) */}
            <div className="lg:col-span-4 space-y-3 z-10">
              <div className="flex items-center gap-2 pb-2 px-1 border-b border-[#17243A]/40 mb-3">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                  STRUCTURE CENTRALISÉE (APRÈS)
                </span>
              </div>

              {systemOutputs.map((output, idx) => {
                const OutputIcon = output.icon;
                const isCurrentActivated = activatedNode === output.id;
                const isFlashed = lightningOptionIdx === idx && (lightningSide === 'right' || lightningSide === 'both');
                
                return (
                  <button
                    key={output.id}
                    onClick={() => handleOutputClick(output.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 relative group cursor-pointer ${
                      isCurrentActivated
                        ? 'bg-green-500/15 border-green-500 shadow-lg shadow-green-500/10 scale-[1.02]'
                        : isFlashed
                        ? 'bg-green-500/20 border-green-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-[1.03]'
                        : 'bg-[#0d1321]/40 border-[#17243A]/60 hover:border-[#F47B20]/40 hover:bg-[#0d1321]/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-[#17243A]/60 ${isCurrentActivated || isFlashed ? 'text-green-400' : 'text-gray-400 group-hover:text-green-400'} transition-colors`}>
                        <OutputIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{output.label}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 truncate leading-relaxed">{output.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Real-time Console simulation logger */}
          <div className="p-4 bg-[#111a2e]/60 rounded-xl border border-[#17243A]/60 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#F47B20]"></div>
            <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-[#17243A]/40 font-mono text-[10px] text-gray-500">
              <span>CONSOLE OPÉRATIONNELLE</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                SYSTÈME EN DIRECT
              </span>
            </div>
            <div className="flex items-start gap-2.5 font-mono text-xs text-gray-300 min-h-[1.5rem]">
              <span className="text-[#F47B20] shrink-0 font-bold">&gt;</span>
              <p className="leading-relaxed">
                {simulationStatus}
                <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-[pulse_1s_infinite]"></span>
              </p>
            </div>
          </div>
          
        </div>
      ) : (
        /* ZOOMED SIMULATOR VIEW: Full-width clean software cockpit */
        <div className="relative z-10 animate-fade-in" id="zoomed-simulator">
          {/* Back button above the window */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsZoomed(false)}
              className="px-4 py-2 rounded-lg bg-[#111a2e] hover:bg-[#17243a] text-gray-300 hover:text-white border border-[#17243A] text-xs font-mono font-bold uppercase flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>← Retour aux 4 étapes d'optimisation</span>
            </button>
            <p className="text-xs text-gray-500 font-mono italic hidden md:block">
              Moteur actif. Vous pouvez alterner entre les outils via l'onglet ci-dessous.
            </p>
          </div>

          <div 
            className={`rounded-xl border-2 bg-[#0b1220]/95 p-4 sm:p-6 min-h-[500px] transition-all duration-700 ${
              flashShowcase 
                ? 'border-[#F47B20] bg-[#F47B20]/[0.01] shadow-xl shadow-[#F47B20]/5' 
                : 'border-[#17243A]/80 shadow-lg'
            }`}
          >
            {/* Window header mimicking Mac browser with clickable tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#17243A]/60 pb-4 mb-5 gap-3">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="ml-2 text-[9px] font-mono text-gray-500 uppercase tracking-widest hidden lg:inline">
                  HUVI SYSTEMS WORKSPACE
                </span>
              </div>

              {/* Navigation Tabs inside mockup */}
              <div className="flex items-center flex-wrap gap-1 bg-[#070b14]/80 p-0.5 rounded-lg border border-[#17243A]/40">
                {tracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setActiveShowcaseTab(track.id);
                      setSimulationStatus(`Consultation : ${track.title}`);
                      setFlashShowcase(true);
                      setTimeout(() => setFlashShowcase(false), 500);
                    }}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      activeShowcaseTab === track.id
                        ? 'bg-[#F47B20] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {track.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="text-[9px] font-mono text-[#F47B20] bg-[#F47B20]/10 px-2.5 py-0.5 rounded-full border border-[#F47B20]/20 uppercase font-bold shrink-0 self-start sm:self-center">
                {activeShowcaseTab === 'airtable' && 'Hub centralisé'}
                {activeShowcaseTab === 'dashboard' && 'Rapport financier'}
                {activeShowcaseTab === 'automation' && 'Automate make'}
                {activeShowcaseTab === 'agent' && 'Assistant IA drive'}
              </div>
            </div>

            {/* Inner Interactive Demo Contents */}
            <div className="flex-1 flex flex-col justify-between">
              
              {/* TAB 1: AIRTABLE CENTRAL HUB */}
              {activeShowcaseTab === 'airtable' && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#17243A]/60 pb-3">
                    <div>
                      <h5 className="font-display font-bold text-sm text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-sm bg-blue-500"></span>
                        Système de gestion : Base de Données Centralisée
                      </h5>
                      <p className="text-[11px] text-gray-400">Toutes vos fiches de chantiers, vos clients et vos marges consolidés à un seul endroit.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newProj = {
                          id: airtableRows.length + 1,
                          name: `Nouveau Projet #${Math.floor(Math.random() * 900) + 100}`,
                          client: "Client Privé",
                          total: `${Math.floor(Math.random() * 150) + 50},000 $`,
                          margin: `${Math.floor(Math.random() * 15) + 20}%`,
                          status: "Planifié",
                          aiClass: "Optimisé",
                          lastSync: "À l'instant"
                        };
                        setAirtableRows(prev => [...prev, newProj]);
                      }}
                      className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] font-bold transition-all flex items-center gap-1 shrink-0 self-start cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>+ Ajouter un projet</span>
                    </button>
                  </div>

                  {/* SpreadSheet Table */}
                  <div className="overflow-x-auto rounded-lg border border-[#17243A]/40 bg-[#070b14]">
                    <table className="w-full text-left border-collapse font-mono text-[11px]">
                      <thead>
                        <tr className="bg-[#111a2e] text-gray-400 border-b border-[#17243A]/60 uppercase text-[10px]">
                          <th className="p-2.5">Projet</th>
                          <th className="p-2.5">Client</th>
                          <th className="p-2.5">Budget</th>
                          <th className="p-2.5 text-right">Marge Est.</th>
                          <th className="p-2.5 text-center">Statut</th>
                          <th className="p-2.5">Analyse IA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {airtableRows.map((row) => (
                          <tr key={row.id} className="border-b border-[#17243A]/30 hover:bg-[#111a2e]/40 transition-colors">
                            <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                              <CheckSquare className="w-3 h-3 text-[#F47B20]" />
                              {row.name}
                            </td>
                            <td className="p-2.5 text-gray-300">{row.client}</td>
                            <td className="p-2.5 text-green-400 font-bold">{row.total}</td>
                            <td className="p-2.5 text-right font-bold text-white">
                              {editingRowId === row.id ? (
                                <div className="flex items-center justify-end gap-1">
                                  <input 
                                    type="text" 
                                    value={editingMargin} 
                                    onChange={(e) => setEditingMargin(e.target.value)}
                                    className="w-12 bg-[#17243A] border border-[#F47B20] text-white text-right px-1 rounded text-[10px] focus:outline-none"
                                  />
                                  <button 
                                    onClick={() => {
                                      setAirtableRows(prev => prev.map(r => r.id === row.id ? { ...r, margin: editingMargin + "%", lastSync: "À l'instant" } : r));
                                      setEditingRowId(null);
                                    }}
                                    className="text-green-400 hover:text-green-300 font-bold px-1"
                                  >
                                    ✓
                                  </button>
                                </div>
                              ) : (
                                <span 
                                  className="cursor-pointer border-b border-dashed border-gray-600 hover:text-[#F47B20] hover:border-[#F47B20]"
                                  onClick={() => {
                                    setEditingRowId(row.id);
                                    setEditingMargin(row.margin.replace('%', ''));
                                  }}
                                  title="Cliquez pour éditer la marge"
                                >
                                  {row.margin}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                row.status === 'En cours' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                row.status === 'Facturé' || row.status === 'Archivé' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                row.status === 'En attente' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="p-2.5">
                              <span className={`text-[10px] font-sans ${row.aiClass.includes('Alerte') ? 'text-red-400 font-semibold flex items-center gap-1' : 'text-gray-400'}`}>
                                {row.aiClass.includes('Alerte') && <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />}
                                {row.aiClass}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 bg-[#111a2e]/40 rounded-lg border border-[#17243A]/40 flex items-center justify-between text-[11px] text-gray-400 font-sans">
                    <p>💡 <span className="font-semibold text-white">Astuce interactive</span> : Cliquez sur une valeur de <b>Marge Est.</b> ci-dessus pour la modifier et voir comment le système réagit en temps réel.</p>
                    <span className="font-mono text-[9px] text-[#F47B20] uppercase font-bold shrink-0 hidden sm:inline">Modèle connecté</span>
                  </div>
                </div>
              )}

              {/* TAB 2: REAL-TIME PROFITABILITY DASHBOARD */}
              {activeShowcaseTab === 'dashboard' && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="border-b border-[#17243A]/60 pb-3">
                    <h5 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-sm bg-[#F47B20]"></span>
                      Dashboard Stratégique : Rentabilité Nette par Projet
                    </h5>
                    <p className="text-[11px] text-gray-400">Vue macro d'ensemble pour le propriétaire. Analyse de chaque centime de dépenses par rapport aux prévisions.</p>
                  </div>

                  {/* KPI Cards row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 font-mono">
                    <div className="p-3 rounded-lg bg-[#070b14] border border-[#17243A]/50">
                      <span className="text-[9px] text-gray-500 block">REVENU CONSOLIDÉ</span>
                      <span className="text-sm font-bold text-white block mt-1">
                        {(airtableRows.reduce((acc, row) => acc + parseInt(row.total.replace(/[^0-9]/g, '')), 0)).toLocaleString()} $
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#070b14] border border-[#17243A]/50">
                      <span className="text-[9px] text-gray-500 block">MARGE MOYENNE</span>
                      <span className="text-sm font-bold text-[#F47B20] block mt-1">
                        {(airtableRows.reduce((acc, row) => {
                          const num = parseInt(row.margin.replace(/[^0-9]/g, ''));
                          return isNaN(num) ? acc : acc + num;
                        }, 0) / airtableRows.filter(r => !isNaN(parseInt(r.margin))).length).toFixed(1)} %
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#070b14] border border-[#17243A]/50">
                      <span className="text-[9px] text-gray-500 block">RÉDUCTION ADMIN</span>
                      <span className="text-sm font-bold text-green-400 block mt-1">-15h / sem</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#070b14] border border-[#17243A]/50 col-span-2 sm:col-span-1">
                      <span className="text-[9px] text-gray-500 block">ALERTES EN COURS</span>
                      <span className="text-sm font-bold text-red-500 block mt-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-bounce" />
                        <span>1 Active</span>
                      </span>
                    </div>
                  </div>

                  {/* Sub grid layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Left side selector */}
                    <div className="md:col-span-4 space-y-2">
                      <span className="text-[10px] text-gray-500 font-mono block uppercase">Projets surveillés :</span>
                      {airtableRows.map((row) => (
                        <button
                          key={row.id}
                          onClick={() => setActiveDashboardProject(row.id)}
                          className={`w-full p-2 rounded-lg border text-left flex items-center justify-between transition-all font-mono text-[10px] cursor-pointer ${
                            activeDashboardProject === row.id
                              ? 'bg-[#17243A]/60 border-[#F47B20] text-white font-bold'
                              : 'bg-[#070b14]/50 border-[#17243A]/60 text-gray-400 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{row.name}</span>
                          <span className="text-[#F47B20]">{row.margin}</span>
                        </button>
                      ))}
                    </div>

                    {/* Right side live detail */}
                    <div className="md:col-span-8 p-4 rounded-lg bg-[#070b14] border border-[#17243A]/50 space-y-3 font-mono text-[11px]">
                      <div className="flex items-center justify-between border-b border-[#17243A]/40 pb-2">
                        <span className="text-xs font-bold text-white">
                          RÉPARTITION : {airtableRows.find(r => r.id === activeDashboardProject)?.name}
                        </span>
                        <span className="text-[10px] text-gray-400">Budget total : {airtableRows.find(r => r.id === activeDashboardProject)?.total}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Coûts de Main d'œuvre (Estimés vs Réels)</span>
                            <span className="text-white">42% (Optimal)</span>
                          </div>
                          <div className="w-full bg-[#111a2e] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#3A7697] h-full rounded-full" style={{ width: '42%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Coûts de Sous-traitance & Matériaux</span>
                            <span className="text-white">35%</span>
                          </div>
                          <div className="w-full bg-[#111a2e] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#3A7697] h-full rounded-full" style={{ width: '35%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Consommation du Budget d'Heures</span>
                            <span className="text-white">68% (54h / 80h)</span>
                          </div>
                          <div className="w-full bg-[#111a2e] h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500/80 h-full rounded-full" style={{ width: '68%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Conformité du devis au coût réel</span>
                            <span className="text-white">96% d'exactitude</span>
                          </div>
                          <div className="w-full bg-[#111a2e] h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                            <span>Marge bénéficiaire nette</span>
                            <span className="text-[#F47B20] font-bold">
                              {airtableRows.find(r => r.id === activeDashboardProject)?.margin}
                            </span>
                          </div>
                          <div className="w-full bg-[#111a2e] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#F47B20] h-full rounded-full" style={{ 
                              width: airtableRows.find(r => r.id === activeDashboardProject)?.margin || '20%' 
                            }}></div>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] text-gray-400 italic font-sans">
                        * Toutes les dépenses chantiers sont capturées en arrière-plan à la volée dès qu'un agent traite un fichier fournisseur. Pas d'erreur d'écriture, pas de retard de calcul.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: AUTOMATION AND AUTOMATED FOLLOW-UPS */}
              {activeShowcaseTab === 'automation' && (
                <div className="space-y-4 animate-fade-in text-left font-sans">
                  <div className="border-b border-[#17243A]/60 pb-3">
                    <h5 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-sm bg-orange-500 animate-pulse"></span>
                      Séquence de Relance Automatique de Facturation
                    </h5>
                    <p className="text-[11px] text-gray-400">Plus de temps perdu à appeler les retardataires : le système s'occupe de rédiger et d'acheminer le rappel poli.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Workflow steps */}
                    <div className="md:col-span-5 space-y-3 font-mono text-[11px]">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Séquence programmée :</p>
                      
                      <div className={`p-2.5 rounded-lg border transition-all ${automationStep >= 1 ? 'bg-red-500/10 border-red-500/30 text-white font-bold' : 'bg-[#070b14]/50 border-[#17243A]/60 text-gray-500'}`}>
                        <span className="font-bold">ÉTAPE 1 : Déclencheur</span>
                        <p className="text-[10px] mt-0.5">Facture impayée depuis 7 jours</p>
                      </div>

                      <div className={`p-2.5 rounded-lg border transition-all ${automationStep >= 2 ? 'bg-[#17243A] border-[#F47B20]/40 text-white font-bold' : 'bg-[#070b14]/50 border-[#17243A]/60 text-gray-500'}`}>
                        <span className="font-bold">ÉTAPE 2 : Analyse du Ton</span>
                        <p className="text-[10px] mt-0.5">L'IA consulte l'historique d'échange client</p>
                      </div>

                      <div className={`p-2.5 rounded-lg border transition-all ${automationStep >= 3 ? 'bg-[#17243A] border-[#F47B20]/60 text-white font-bold font-mono' : 'bg-[#070b14]/50 border-[#17243A]/60 text-gray-500'}`}>
                        <span className="font-bold">ÉTAPE 3 : Brouillon rédigé</span>
                        <p className="text-[10px] mt-0.5 font-normal">Génération de la relance adaptée</p>
                      </div>

                      <div className={`p-2.5 rounded-lg border transition-all ${automationStep >= 4 ? 'bg-green-500/10 border-green-500/30 text-white font-bold' : 'bg-[#070b14]/50 border-[#17243A]/60 text-gray-500'}`}>
                        <span className="font-bold">ÉTAPE 4 : Envoi & Logs</span>
                        <p className="text-[10px] mt-0.5">Courriel envoyé + notif administrative</p>
                      </div>

                      <button
                        onClick={startAutomationSimulation}
                        disabled={isAutomationRunning}
                        className="w-full py-2 bg-[#F47B20] hover:bg-[#ff9242] text-white rounded font-mono font-bold text-xs tracking-wider transition-all uppercase flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isAutomationRunning ? "Relance en cours..." : "Simuler la séquence"}</span>
                      </button>
                    </div>

                    {/* Email visual editor */}
                    <div className="md:col-span-7 flex flex-col justify-between p-4 rounded-lg bg-[#070b14] border border-[#17243A]/60 font-mono text-[10px]">
                      <div>
                        <div className="flex items-center gap-1.5 border-b border-[#17243A]/50 pb-2 mb-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                          <span className="ml-2 text-gray-400 text-[9px] uppercase">Aperçu du message automatisé</span>
                        </div>

                        {generatedEmailDraft ? (
                          <div className="space-y-2 animate-fade-in text-gray-300 whitespace-pre-wrap leading-relaxed text-left max-h-[180px] overflow-y-auto bg-[#0b1220]/40 p-2.5 rounded border border-[#17243A]/30 font-mono">
                            {generatedEmailDraft}
                          </div>
                        ) : (
                          <div className="py-12 text-center text-gray-500 italic">
                            Cliquez sur "Simuler la séquence" pour voir l'IA rédiger le rappel intelligent en direct.
                          </div>
                        )}
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#17243A]/30 text-gray-500 text-[9px] flex items-center justify-between">
                        <span>Statut : {automationStatusText}</span>
                        {isAutomationRunning && <span className="text-[#F47B20] animate-pulse">Traitement...</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: THE FOLDER AGENT IA */}
              {activeShowcaseTab === 'agent' && (
                <div className="space-y-4 animate-fade-in text-left">
                  <div className="border-b border-[#17243A]/60 pb-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h5 className="font-display font-bold text-sm text-white flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-orange-500" />
                        L'Agent de Classement de Documents (Google Drive)
                      </h5>
                      <span className="text-[10px] font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-0.5 rounded-full">
                        SÉCURISÉ & APPRIS
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">Ranger les fichiers administratifs au bon endroit, les renommer rigoureusement et en extraire la comptabilité automatiquement.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Left side: Folder Explorer */}
                    <div className="md:col-span-5 p-3 rounded-lg bg-[#070b14] border border-[#17243A]/60 font-mono text-[11px]">
                      <span className="text-[9px] text-gray-500 block uppercase mb-2">Structure Google Drive :</span>
                      
                      <div className="space-y-1.5 text-left">
                        <div className="flex items-center gap-1.5 text-white font-bold">
                          <Folder className="w-3.5 h-3.5 text-[#F47B20] fill-[#F47B20]/10" />
                          <span>📂 HUVI_ARCHIVES</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white pl-3">
                          <Folder className="w-3.5 h-3.5 text-orange-500 fill-orange-500/10" />
                          <span>📂 Factures_Fournisseurs</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white pl-6">
                          <FolderOpen className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                          <span>📂 2026</span>
                        </div>

                        {/* Files inside 2026 folder */}
                        <div className="pl-9 space-y-1.5 text-gray-400 border-l border-[#17243A] ml-[31px]">
                          {folderFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 hover:text-white transition-all text-[10px]">
                              <FileText className="w-3 h-3 text-blue-400" />
                              <span className="truncate">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side: AI Processor Panel */}
                    <div className="md:col-span-7 flex flex-col justify-between gap-3">
                      <div className="p-3.5 rounded-lg bg-[#111a2e]/60 border border-[#17243A]/50 space-y-2">
                        <span className="text-[10px] text-[#F47B20] font-mono block uppercase font-bold">1. Fichier reçu à traiter :</span>
                        <div className="p-2.5 rounded-md bg-[#070b14] border border-[#17243A]/40 flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-red-400 animate-pulse" />
                            <span className="text-white font-semibold">facture_electricite_volt_3850.pdf</span>
                          </div>
                          <button
                            onClick={() => runAgentFileProcessor("facture_electricite_volt_3850.pdf")}
                            disabled={isAgentRunning}
                            className="px-2.5 py-1 rounded bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-[10px] uppercase font-mono disabled:opacity-50 cursor-pointer shrink-0"
                          >
                            Lancer l'Agent IA
                          </button>
                        </div>
                      </div>

                      {/* Terminal Log */}
                      <div className="p-3 rounded-lg bg-[#02050a] border border-[#17243A]/80 flex flex-col h-[140px]">
                        <div className="flex items-center justify-between border-b border-[#17243A]/40 pb-1.5 mb-1.5">
                          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">LOGS DE CLASSEMENT IA</span>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[8px] font-mono text-green-400">Actif</span>
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto text-left font-mono text-[9px] text-[#E2E8F0] space-y-1">
                          {agentLogs.length > 0 ? (
                            agentLogs.map((log, idx) => (
                              <div key={idx} className={log.includes('🎉') ? 'text-green-400 font-bold' : log.includes('[IA]') ? 'text-blue-300' : 'text-gray-400'}>
                                {log}
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-600 italic">Prêt à extraire. Cliquez sur "Lancer l'Agent IA" pour démarrer l'OCR vision et synchroniser Airtable.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer inside the mockup screen */}
            <div className="mt-6 pt-3.5 border-t border-[#17243A]/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] text-gray-500 font-sans">
              <p className="italic text-left leading-normal">
                {activeShowcaseTab === 'airtable' && "* Hub centralisé synchronisé. Toute modification de valeur recalcule immédiatement les marges opérationnelles."}
                {activeShowcaseTab === 'dashboard' && "* Dashboard décisionnel alimenté à 100% en direct par les données extraites automatiquement par l'IA."}
                {activeShowcaseTab === 'automation' && "* Séquence sécurisée. Les modèles de rappels IA s'adaptent selon les conditions définies."}
                {activeShowcaseTab === 'agent' && "* Archivage automatique. Les fichiers sont lus via OCR, renommés proprement et classés dans Google Drive."}
              </p>
              <button 
                onClick={() => setIsZoomed(false)}
                className="font-mono text-[9px] text-[#F47B20] hover:text-[#ff9242] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                ← Fermer l'outil
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Merged bottom information strip */}
      <div className="mt-8 pt-5 border-t border-[#17243A]/60 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-[11px] text-gray-400 font-sans italic text-left max-w-2xl leading-relaxed">
          💡 <b>La simplicité HUVI :</b> On simplifie le quotidien de ton équipe en connectant intelligemment vos outils, sans ajouter une tonne d'abonnements et de nouveaux logiciels complexes.
        </p>
        <a
          href="#builder"
          className="px-5 py-2.5 bg-gradient-to-r from-[#F47B20] to-[#ff9242] hover:from-[#ff9242] hover:to-[#ffa767] text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-[#F47B20]/10 transition-all uppercase flex items-center gap-2 tracking-wider whitespace-nowrap cursor-pointer hover:scale-[1.01]"
        >
          <span>Calculer vos gains potentiels</span>
          <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
        </a>
      </div>
    </div>
  );
}
