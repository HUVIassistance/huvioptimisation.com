import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  ArrowRight, 
  Check, 
  X, 
  Server, 
  Zap, 
  TrendingUp, 
  Bot, 
  Mail, 
  FileText, 
  FileSpreadsheet, 
  Globe, 
  Cpu, 
  Lock, 
  ChevronRight, 
  AlertTriangle, 
  Sparkles, 
  Phone, 
  Building, 
  User, 
  Trash2, 
  Search, 
  Download, 
  CheckCircle, 
  RefreshCw,
  Clock,
  ArrowUpRight,
  Maximize2,
  BookOpen,
  FileStack,
  Inbox,
  HelpCircle,
  UserPlus,
  Eye,
  Hammer,
  Briefcase,
  ClipboardCheck,
  Timer,
  Lightbulb,
  Circle,
  Ban,
  Gem,
  Rocket,
  Target
} from 'lucide-react';
import Navbar from './components/Navbar';
import InteractiveDiagram from './components/InteractiveDiagram';
import Logo from './components/Logo';
import CasaVisualizer from './components/CasaVisualizer';
import BlueprintModal from './components/BlueprintModal';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Garantie from './components/Garantie';
import { RECOMMENDATIONS_MAP } from './data/recommendations';
import { Industry, Challenge, LeadSubmission, SystemRecommendation } from './types';

// Mock Seeded Submissions to make the Database Admin Console look active right away
const SEED_SUBMISSIONS: LeadSubmission[] = [
  {
    id: 'lead-1',
    name: 'Mathieu Tremblay',
    email: 'm.tremblay@tremblayreno.ca',
    company: 'Tremblay Rénovation Générale',
    phone: '514-555-0192',
    industry: 'construction',
    challenge: 'administration',
    createdAt: '2026-07-10T14:32:00.000Z',
    recommendation: RECOMMENDATIONS_MAP.construction.administration
  },
  {
    id: 'lead-2',
    name: 'Sophie Langlois',
    email: 's.langlois@langloisimmo.com',
    company: 'Langlois Courtage & Immobilier',
    phone: '418-555-0143',
    industry: 'services', // Map 'Immobilier'
    challenge: 'sales',
    createdAt: '2026-07-11T09:15:00.000Z',
    recommendation: RECOMMENDATIONS_MAP.services.sales
  },
  {
    id: 'lead-3',
    name: 'Jean-François Roy',
    email: 'jf.roy@apexconseils.ca',
    company: 'Apex Services Conseils',
    phone: '514-555-0122',
    industry: 'services', // Map 'Services professionnels'
    challenge: 'projects',
    createdAt: '2026-07-12T11:40:00.000Z',
    recommendation: RECOMMENDATIONS_MAP.services.projects
  }
];

const AnimatedCounter = ({ value, suffix = '', duration = 1500 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span className="tabular-nums">{count}{suffix}</span>;
};

export default function App() {
  // Persistence & Admin Console States
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilterIndustry, setAdminFilterIndustry] = useState<string>('all');
  const [selectedAdminSubmission, setSelectedAdminSubmission] = useState<LeadSubmission | null>(null);
  const [showAdminButton, setShowAdminButton] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return (
        params.has('database') || 
        params.has('db') || 
        params.has('admin') || 
        params.has('console') ||
        params.get('admin') === 'true' ||
        params.get('database') === 'true' ||
        params.get('db') === 'true' ||
        params.get('console') === 'true'
      );
    }
    return false;
  });



  // Business Growth Assessment States
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('construction');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>('administration');
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStepMsg, setGenerationStepMsg] = useState('');
  const [currentResult, setCurrentResult] = useState<LeadSubmission | null>(null);

  // Layout Interactivity States
  const [activeProblemTab, setActiveProblemTab] = useState<'before' | 'after'>('before');
  const [activeApproachStep, setActiveApproachStep] = useState<number>(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  // Urgence chiffrée calculator states (🔴 P0 Item 2)
  const [calcHours, setCalcHours] = useState<number>(15);
  const [calcRate, setCalcRate] = useState<number>(75);
  const [calcEmployees, setCalcEmployees] = useState<number>(1);
  const [keepOrEliminateTab, setKeepOrEliminateTab] = useState<'keep' | 'eliminate'>('keep');

  // Hero section InteractiveDiagram zoom control states
  const [isHeroZoomed, setIsHeroZoomed] = useState<boolean>(false);
  const [heroActiveTab, setHeroActiveTab] = useState<'airtable' | 'dashboard' | 'automation' | 'agent'>('airtable');

  const approachRef = useRef<HTMLDivElement>(null);
  const scrollApproach = (direction: 'left' | 'right') => {
    if (approachRef.current) {
      const scrollAmount = approachRef.current.clientWidth * 0.85;
      approachRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const aiTeamsRef = useRef<HTMLDivElement>(null);
  const scrollAiTeams = (direction: 'left' | 'right') => {
    if (aiTeamsRef.current) {
      const scrollAmount = aiTeamsRef.current.clientWidth * 0.85;
      aiTeamsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll effect for mobile sliders (Notre approche & AI Teams)
  useEffect(() => {
    const intervalApproach = setInterval(() => {
      const el = approachRef.current;
      if (el && window.innerWidth < 768) {
        const scrollAmount = el.clientWidth * 0.85;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 30) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000);

    const intervalAiTeams = setInterval(() => {
      const el = aiTeamsRef.current;
      if (el && window.innerWidth < 768) {
        const scrollAmount = el.clientWidth * 0.85;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 30) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 6000);

    return () => {
      clearInterval(intervalApproach);
      clearInterval(intervalAiTeams);
    };
  }, []);

  // Auto load submissions from localStorage + Seed if empty
  useEffect(() => {
    const stored = localStorage.getItem('huvi_lead_submissions');
    if (stored) {
      try {
        setSubmissions(JSON.parse(stored));
      } catch (e) {
        setSubmissions(SEED_SUBMISSIONS);
      }
    } else {
      setSubmissions(SEED_SUBMISSIONS);
      localStorage.setItem('huvi_lead_submissions', JSON.stringify(SEED_SUBMISSIONS));
    }
  }, []);

  // Display toast notification helper
  const triggerToast = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4500);
  };



  // Handle assessment submission and trigger realistic loading roadmap animations
  const handleSubmitAssessment = (e: React.FormEvent) => {
    e.preventDefault();

    setIsGenerating(true);
    setGenerationProgress(0);
    setCurrentResult(null);

    // Realistic custom calculation timeline steps
    const steps = [
      { p: 15, msg: "Analyse de vos défis opérationnels..." },
      { p: 45, msg: "Simplification et organisation des processus..." },
      { p: 75, msg: "Sélection des automatisations et des assistants IA..." },
      { p: 95, msg: "Calcul de l'impact sur vos gains de temps..." },
      { p: 100, msg: "Finalisation de votre plan d'action personnalisé !" }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setGenerationProgress(step.p);
        setGenerationStepMsg(step.msg);
        
        if (step.p === 100) {
          setTimeout(() => {
            // Compile final recommendation object
            const recommendation = RECOMMENDATIONS_MAP[selectedIndustry][selectedChallenge];
            const newSubmission: LeadSubmission = {
              id: 'lead-' + Date.now(),
              name: leadForm.name || 'Visiteur Site',
              email: leadForm.email || 'visiteur@huvioptimisation.com',
              company: leadForm.company || 'PME Intéressée',
              phone: leadForm.phone || '',
              industry: selectedIndustry,
              challenge: selectedChallenge,
              createdAt: new Date().toISOString(),
              recommendation: recommendation
            };

            const updated = [newSubmission, ...submissions];
            setSubmissions(updated);
            localStorage.setItem('huvi_lead_submissions', JSON.stringify(updated));
            setCurrentResult(newSubmission);
            setIsGenerating(false);
            triggerToast("Votre plan d'optimisation personnalisé a été généré avec succès !");
            
            // Auto scroll to results preview card
            const resultElement = document.getElementById('assessment-result-panel');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 600);
        }
      }, (index + 1) * 800);
    });
  };

  // Delete lead submission
  const handleDeleteSubmission = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce lead ?")) {
      const updated = submissions.filter(sub => sub.id !== id);
      setSubmissions(updated);
      localStorage.setItem('huvi_lead_submissions', JSON.stringify(updated));
      triggerToast("Lead retiré de la console administrative.");
      if (selectedAdminSubmission?.id === id) {
        setSelectedAdminSubmission(null);
      }
    }
  };

  // Download lead database as JSON file (demonstrates real utility)
  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "huvi_leads_database.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast("Base de données exportée en fichier JSON avec succès !");
  };

  // Filter submissions for search & tabs in Admin Panel
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      sub.company.toLowerCase().includes(adminSearch.toLowerCase()) ||
      sub.email.toLowerCase().includes(adminSearch.toLowerCase());
    
    const matchesIndustry = adminFilterIndustry === 'all' || sub.industry === adminFilterIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Original CASA Steps Config (interactive section)
  const casaSteps = [
    {
      num: "01",
      title: "Centraliser",
      tagline: "On rassemble l'information qui est éparpillée partout.",
      desc: "Clients, projets, documents, suivis, données importantes.",
      metrics: "Centralisation des données clés au même endroit accessible."
    },
    {
      num: "02",
      title: "Analyser",
      tagline: "On t'aide à prendre de meilleures décisions en rendant visible ce qui est invisible",
      desc: "Tableaux de bord, analyse de données et métriques de performance en temps réel.",
      metrics: "Visibilité totale des marges réelles pour éliminer les angles morts."
    },
    {
      num: "03",
      title: "Structurer",
      tagline: "On crée des façons de travailler simples et claires.",
      desc: "Processus d'équipe clairs, responsabilités définies, répartition des tâches.",
      metrics: "Processus standardisés et partagés avec toute l'équipe."
    },
    {
      num: "04",
      title: "Automatiser",
      tagline: "On laisse la technologie faire le travail répétitif.",
      desc: "Automatisations intelligentes, connexions d'outils, assistants IA.",
      metrics: "Élimination des doubles saisies et de la paperasse manuelle."
    }
  ];

  // Methodological Steps Config
  const methodologySteps = [
    {
      num: "01",
      icon: Sparkles,
      title: "Séance d'optimisation",
      tagline: "Comprendre vos défis et vos objectifs.",
      desc: "Une première rencontre pour comprendre votre entreprise, vos problèmes quotidiens et vos pertes de temps.",
      metrics: "Compréhension globale"
    },
    {
      num: "OPT",
      icon: ClipboardCheck,
      title: "Audit des processus",
      tagline: "Analyse approfondie de chaque département.",
      desc: "Étude complète et rigoureuse de tous vos départements pour cartographier vos flux de travail réels.",
      metrics: "Document d'audit détaillé",
      isOptional: true
    },
    {
      num: "02",
      icon: Search,
      title: "Analyse des opérations",
      tagline: "Voir ce qui se passe réellement.",
      desc: "Analyse de vos processus actuels, vos outils et vos méthodes pour identifier les blocages et opportunités.",
      metrics: "Cartographie des frictions"
    },
    {
      num: "03",
      icon: FileText,
      title: "Cartographie & plan d'action",
      tagline: "Créer une meilleure façon de fonctionner.",
      desc: "Nous transformons nos observations en une feuille de route claire : opportunités d'automatisation et solutions clés.",
      metrics: "Plan de route stratégique"
    },
    {
      num: "04",
      icon: Cpu,
      title: "Implantation des solutions",
      tagline: "Construire avec votre équipe.",
      desc: "Mise en place des nouveaux processus, outils et automatisations en collaboration étroite pour une adoption réelle.",
      metrics: "Déploiement opérationnel"
    },
    {
      num: "05",
      icon: TrendingUp,
      title: "Optimisation continue",
      tagline: "Faire évoluer vos systèmes.",
      desc: "Mesure des résultats, ajustement des solutions et amélioration continue au fil de votre croissance.",
      metrics: "Soutien et évolution"
    }
  ];

  // AI Teams data (now AI Assistants)
  const aiTeams = [
    {
      name: "Assistant administratif",
      icon: Mail,
      role: "Soutien administratif",
      impact: "Élimine la paperasse qui s'accumule. Il classe vos documents automatiquement, extrait les informations importantes et relie vos reçus et bons de commande aux bons dossiers.",
      flow: "Document reçu ➜ Extraction intelligente des données ➜ Classement automatique sécurisé."
    },
    {
      name: "Assistant ventes",
      icon: TrendingUp,
      role: "Soutien commercial",
      impact: "Aide l'équipe à ne plus perdre d'opportunités. Il qualifie les nouvelles demandes de soumissions instantanément, prépare les relances polies de devis et organise vos suivis prioritaires.",
      flow: "Demande entrante ➜ Qualification automatique par l'IA ➜ Notification prioritaire à votre vendeur."
    },
    {
      name: "Assistant projets",
      icon: Clock,
      role: "Suivi opérationnel",
      impact: "Vous aide à voir venir les problèmes avant qu'ils deviennent urgents. Il analyse vos feuilles de temps et vos rapports de chantiers pour détecter les écarts de budget ou de délai.",
      flow: "Rapports quotidiens ➜ Analyse des écarts ➜ Alerte proactive avant la dérive de coût."
    },
    {
      name: "Analyste",
      icon: Cpu,
      role: "Analyste d'affaires",
      impact: "Transforme les données en décisions simples. Il rassemble les chiffres de coûts réels et de commissions pour calculer la vraie rentabilité de vos activités chaque semaine.",
      flow: "Rapprochement des chiffres ➜ Calcul de rentabilité nette ➜ Tableau de bord décisionnel clair."
    },
    {
      name: "Votre assistant",
      icon: Sparkles,
      role: "Solutions adaptées à vos réalités",
      impact: "Votre défi n'est pas dans la liste ? Décrivez-nous le problème. On conçoit l'assistant qui le règle, adapté à vos façons de faire.",
      flow: "Votre besoin d'affaires ➜ Conception d'assistant dédié ➜ Implantation et automatisation clé en main.",
      custom: true
    }
  ];

  // What we improve in the company
  const servicesList = [
    { icon: Zap, title: "Des façons de travailler simplifiées", desc: "On regarde ce qui vous ralentit et on crée des façons de travailler plus simples, claires et efficaces, sans complexité ni étapes inutiles." },
    { icon: Cpu, title: "Des tâches manuelles automatisées", desc: "On élimine le copier-coller et la double saisie qui font perdre des heures chaque semaine à votre équipe." },
    { icon: Database, title: "Une information claire et centralisée", desc: "On crée un espace unique où tous vos fichiers clients, vos soumissions et vos suivis de projets sont faciles à trouver." },
    { icon: TrendingUp, title: "Vos chiffres clés sous les yeux", desc: "On rassemble vos données réelles pour que vous sachiez exactement où vous faites de l'argent et où vous en perdez." },
    { icon: Bot, title: "Des assistants IA au quotidien", desc: "On met en place des assistants numériques simples qui travaillent aux côtés de vos employés pour les libérer de la paperasse." },
    { icon: RefreshCw, title: "Des logiciels qui se parlent enfin", desc: "On relie vos outils existants (courriels, devis, comptabilité, gestion de projets) pour que l'information circule par elle-même." }
  ];

  return (
    <div className="min-h-screen bg-[#111a2e] text-[#E2E8F0] font-sans relative overflow-x-hidden pt-20">
      
      {/* Dynamic Toast Notification */}
      {showNotification && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 animate-bounce flex items-center gap-3 bg-[#17243A] border border-[#F47B20] text-white px-5 py-3.5 rounded-xl shadow-2xl shadow-black max-w-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F47B20] animate-ping"></div>
          <p className="text-xs font-mono">{notificationMsg}</p>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        adminSubmissionsCount={submissions.length} 
        showAdminButton={showAdminButton}
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="hero">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#F47B20]/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-[#3A7697]/5 blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17243A]/60 border border-[#3A7697]/30 text-[#E2E8F0] text-[11px] sm:text-xs font-mono whitespace-nowrap max-w-full overflow-hidden">
              <span className="flex h-2 w-2 rounded-full bg-[#F47B20] shrink-0"></span>
              <span>HUVI Optimisation · Consultant d'affaires PME</span>
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-white leading-[1.1]">
              Quand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F47B20] to-orange-400">travailler plus fort</span> ne suffit plus.
            </h1>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl font-sans">
              Un système qui <strong className="text-white font-semibold">relance tes clients</strong>, <strong className="text-white font-semibold">organise tes projets</strong> et <strong className="text-white font-semibold">calcule ta rentabilité</strong>, sans que tu aies à y penser. Parce qu'une entreprise qui grandit a besoin de <strong className="text-white font-semibold">fondations solides</strong>.
            </p>

            <div className="flex flex-col gap-3 pt-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="#builder" 
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('builder');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-[#F47B20]/10 border border-transparent hover:-translate-y-0.5"
                  id="hero-cta-primary"
                >
                  <span>Calculer mes gains potentiels</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#architecture" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#17243A] hover:bg-[#23385a] text-gray-300 hover:text-white font-semibold text-sm border border-[#17243A] hover:border-[#F47B20]/30 transition-all duration-300"
                  id="hero-cta-secondary"
                >
                  <span>Découvrir notre approche</span>
                </a>
              </div>
              <span className="text-[11px] font-mono text-gray-500 text-center sm:text-left tracking-wide select-none pl-1">
                <Timer className="w-3.5 h-3.5" /> 2 min. 100% gratuit. Sans engagement.
              </span>
            </div>

            <div className="pt-6 border-t border-[#17243A]/60 grid grid-cols-3 gap-4 max-w-md text-left font-mono">
              <div>
                <span className="block text-xl font-bold text-white">
                  <AnimatedCounter value={60} suffix="%" />
                </span>
                <span className="block text-[11px] text-gray-400 uppercase mt-0.5">Temps administratif réduit en moyenne</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-white">
                  <AnimatedCounter value={15} suffix="h+" />
                </span>
                <span className="block text-[11px] text-gray-400 uppercase mt-0.5">Économisées par semaine en moyenne</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-[#F47B20]">
                  <AnimatedCounter value={100} suffix="%" />
                </span>
                <span className="block text-[11px] text-gray-400 uppercase mt-0.5">Solutions testées avec votre équipe</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 font-mono mt-3 italic">
              * Résultats moyens observés chez nos clients accompagnés en 2025
            </p>
          </div>

          {/* Hero interactive visual */}
          <div className="lg:col-span-6 w-full">
            <div className="relative p-1 rounded-2xl bg-gradient-to-b from-[#17243A] to-transparent">
              <InteractiveDiagram 
                isZoomed={isHeroZoomed}
                setIsZoomed={setIsHeroZoomed}
                activeShowcaseTab={heroActiveTab}
                setActiveShowcaseTab={setHeroActiveTab}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reality Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="reality">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">On comprend votre réalité</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Votre entreprise a grandi. Et la complexité a grandi avec elle.
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 pt-4">
            <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#111a2e]/60 border border-[#17243A] hover:border-red-500/30 hover:bg-[#111a2e]/80 transition-all duration-300 h-full text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <FileStack className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-white text-xs sm:text-sm md:text-base leading-snug">Les soumissions et suivis s'empilent.</span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#111a2e]/60 border border-[#17243A] hover:border-red-500/30 hover:bg-[#111a2e]/80 transition-all duration-300 h-full text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Inbox className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-white text-xs sm:text-sm md:text-base leading-snug">Les courriels et les appels ne finissent jamais.</span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#111a2e]/60 border border-[#17243A] hover:border-red-500/30 hover:bg-[#111a2e]/80 transition-all duration-300 h-full text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-white text-xs sm:text-sm md:text-base leading-snug">L’information est dispersée entre les personnes, les outils et les fichiers.</span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#111a2e]/60 border border-[#17243A] hover:border-red-500/30 hover:bg-[#111a2e]/80 transition-all duration-300 h-full text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-white text-xs sm:text-sm md:text-base leading-snug">Les mêmes questions reviennent chaque semaine.</span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#111a2e]/60 border border-[#17243A] hover:border-red-500/30 hover:bg-[#111a2e]/80 transition-all duration-300 h-full text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-white text-xs sm:text-sm md:text-base leading-snug">À chaque nouvelle embauche, tout est à recommencer.</span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-[#111a2e]/60 border border-[#17243A] hover:border-red-500/30 hover:bg-[#111a2e]/80 transition-all duration-300 h-full text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-medium text-white text-xs sm:text-sm md:text-base leading-snug">L’équipe grandit, mais tout remonte encore jusqu’à toi.</span>
            </div>
          </div>

          <div className="pt-8">
            <p className="text-xl sm:text-2xl font-display font-bold text-[#F47B20]">
              Ce n'est pas une question d'efforts.
            </p>
            <p className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
              C'est une question de structure.
            </p>
          </div>
        </div>
      </section>

      {/* Specialization Section */}
      <section className="bg-[#090D15]/80 py-16 px-4 sm:px-6 lg:px-8 border-b border-[#17243A]/40" id="specialization">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Notre raison d'être</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Aider votre entreprise à bâtir la structure nécessaire pour soutenir sa croissance.
            </h2>
            <div className="text-gray-400 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                On connaît la réalité des entreprises en croissance : plus de clients, plus de projets, plus d’informations à gérer. Chez HUVI, on simplifie vos opérations en connectant vos outils, en automatisant vos tâches et en donnant plus d’autonomie à votre équipe.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl border border-[#17243A] bg-[#111a2e] hover:border-amber-500/40 transition-all group" id="spec-construction">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 group-hover:text-amber-400 transition-colors">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base group-hover:text-amber-400 transition-colors">Construction et métiers spécialisés</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Suivis automatiques des soumissions, rapports de chantiers simplifiés, automatisation de la facturation et centralisation des données administratives.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#17243A] bg-[#111a2e] hover:border-blue-500/40 transition-all group" id="spec-realestate">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 group-hover:text-blue-300 transition-colors">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base group-hover:text-blue-400 transition-colors">Immobilier et courtage</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Suivis clients connectés, centralisation des documents légaux et qualification automatisée des prospects vendeurs et acheteurs.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#17243A] bg-[#111a2e] hover:border-emerald-500/40 transition-all group" id="spec-services">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base group-hover:text-emerald-400 transition-colors">PME et services résidentiels</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Planification intelligente de la charge d'équipe, automatisation de la facturation récurrente, portails d'échanges de fichiers et rapports de rentabilité par projet.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-[#17243A]/20 border border-[#17243A]/40 text-center max-w-2xl mx-auto">
            <p className="text-xs text-gray-400 font-mono">
              <Lightbulb className="w-4 h-4 text-[#F47B20]" /> <span className="text-white font-sans font-medium">Vous dirigez une PME de services dans un autre domaine ?</span> Écrivez-nous quand même. Les défis de structure dépassent souvent l'industrie et on sait s'y adapter.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="problem">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Le diagnostic réel</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Le problème n'est pas les outils. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F47B20] to-orange-400">C'est la façon dont ils travaillent ensemble.</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Plus de logiciels ne veut pas dire plus d’efficacité. Sans structure, l’information reste éparpillée entre Excel, les courriels et les conversations.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Notre travail : vous aider à mieux exploiter vos outils actuels avant d’en ajouter de nouveaux.
            </p>

            {/* Selection tab buttons */}
            <div className="inline-flex p-1.5 rounded-lg bg-[#0D1527] border border-[#17243A] w-full" id="problem-toggle-tabs">
              <button
                onClick={() => setActiveProblemTab('before')}
                className={`flex-1 text-center py-2 text-xs font-mono rounded-md font-bold transition-all ${
                  activeProblemTab === 'before'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                <Circle className="w-2.5 h-2.5 fill-current" /> UNE JOURNÉE NORMALE
              </button>
              <button
                onClick={() => setActiveProblemTab('after')}
                className={`flex-1 text-center py-2 text-xs font-mono rounded-md font-bold transition-all ${
                  activeProblemTab === 'after'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                <Circle className="w-2.5 h-2.5 fill-current" /> UNE ENTREPRISE QUI RESPIRE
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            {activeProblemTab === 'before' ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0F0E13] border border-red-950/40 relative space-y-6 shadow-2xl shadow-black animate-fade-in" id="before-chaos-panel">
                <div className="absolute top-4 right-4 text-red-500/10 font-mono text-7xl font-bold tracking-tighter select-none">AVANT</div>
                <div className="flex items-center gap-3 border-b border-red-950/40 pb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <span className="text-xs font-mono text-red-400 tracking-wider">LE CHAOS DU QUOTIDIEN</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-950/20 flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-red-200 text-sm">Chercher un ancien devis</h3>
                      <p className="text-xs text-gray-400 mt-1">Vous perdez un temps fou à chercher des informations dispersées dans les courriels, les messages ou sur un vieil ordi.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-950/20 flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-red-200 text-sm">Relancer un client manuellement</h3>
                      <p className="text-xs text-gray-400 mt-1">Les relances sont oubliées ou prennent des heures de suivi chaque fin de semaine.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-950/20 flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-red-200 text-sm">Demander une information à trois personnes</h3>
                      <p className="text-xs text-gray-400 mt-1">Personne n'a les mêmes chiffres. On se demande sans cesse : "Qui fait quoi et sur quel projet ?"</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-950/20 flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-red-200 text-sm">Copier les mêmes données dans plusieurs outils</h3>
                      <p className="text-xs text-gray-400 mt-1">Vous devez constamment entrer les mêmes informations à travers vos feuilles de temps, soumissions et logiciels.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-950/20 flex gap-4">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-red-200 text-sm">Vérifier les chiffres à la fin du mois</h3>
                      <p className="text-xs text-gray-400 mt-1">Vous prenez des décisions sans trop savoir si vos projets en cours sont réellement rentables aujourd'hui.</p>
                    </div>
                  </div>

                  {/* Emotional peak CTA to widget */}
                  <div className="mt-6 pt-6 border-t border-red-950/40 text-center space-y-3 bg-[#0F0E13]/80 rounded-xl p-4 border border-red-950/20">
                    <p className="text-sm font-semibold text-white">Ça vous ressemble ?</p>
                    <a
                      href="#builder"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-xs tracking-wider font-mono transition-all duration-300 uppercase shadow-md shadow-[#F47B20]/10 cursor-pointer"
                    >
                      <span>Identifier mes premières opportunités</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <p className="text-[11px] text-gray-500 font-mono italic">Gratuit · 30 secondes · Adapté à votre réalité</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#091118] border border-green-950/40 relative space-y-6 shadow-2xl shadow-black animate-fade-in" id="after-huvi-panel">
                <div className="absolute top-4 right-4 text-green-500/10 font-mono text-7xl font-bold tracking-tighter select-none">APRÈS</div>
                <div className="flex items-center gap-3 border-b border-green-950/40 pb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <span className="text-xs font-mono text-green-400 tracking-wider">VOTRE NOUVELLE FAÇON DE TRAVAILLER</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-green-950/10 border border-green-950/20 flex gap-4">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-green-200 text-sm">Les informations sont au bon endroit</h3>
                      <p className="text-xs text-gray-400 mt-1">Tout est centralisé, structuré et accessible en un clic pour vous et vos employés.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-green-950/10 border border-green-950/20 flex gap-4">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-green-200 text-sm">Les suivis se font automatiquement</h3>
                      <p className="text-xs text-gray-400 mt-1">Vos soumissions se relancent d'elles-mêmes sans que vous ayez à y penser.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-green-950/10 border border-green-950/20 flex gap-4">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-green-200 text-sm">L'équipe sait quoi faire</h3>
                      <p className="text-xs text-gray-400 mt-1">Chaque membre de l'équipe avance de façon autonome et rigoureuse sans devoir sans cesse vous demander quoi faire.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-green-950/10 border border-green-950/20 flex gap-4">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-green-200 text-sm">Les décisions sont basées sur de vrais chiffres</h3>
                      <p className="text-xs text-gray-400 mt-1">Vous connaissez votre marge nette réelle chaque semaine sur chaque projet.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-green-950/10 border border-green-950/20 flex gap-4">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-bold text-green-200 text-sm">Le propriétaire reprend du temps</h3>
                      <p className="text-xs text-gray-400 mt-1">Vous sortez de la gestion quotidienne pour enfin redevenir le pilote de votre croissance.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Urgence Chiffrée Section (🔴 P0 Item 2) */}
      <section className="bg-[#090D15] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#17243A]/40" id="cost-calculator">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Ce que vous perdez chaque mois</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Le coût réel d’une entreprise mal structurée
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Chaque inefficacité, chaque information introuvable et chaque tâche répétée inutilement gruge du temps et de l’argent. Utilisez notre calculateur pour voir ce que ces pertes peuvent réellement représenter pour votre entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left side: interactive controls */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0b1220] border border-[#17243A]/80 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <h3 className="font-display font-bold text-white text-base border-b border-[#17243A]/60 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F47B20]"></span>
                  Simulez la situation de votre PME
                </h3>

                {/* Control 1: Hours */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-gray-300 font-medium">Heures d'admin par semaine</label>
                    <span className="font-mono font-bold text-[#F47B20] bg-[#F47B20]/10 px-2 py-0.5 rounded border border-[#F47B20]/20">
                      {calcHours} h / sem
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    step="1"
                    value={calcHours}
                    onChange={(e) => setCalcHours(parseInt(e.target.value))}
                    className="w-full accent-[#F47B20] h-1.5 bg-[#17243A] rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-500 italic">Moyenne de l'industrie : 15h perdues en double saisie et relances.</p>
                </div>

                {/* Control 2: Hourly Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-gray-300 font-medium">Taux horaire moyen estimé</label>
                    <span className="font-mono font-bold text-[#F47B20] bg-[#F47B20]/10 px-2 py-0.5 rounded border border-[#F47B20]/20">
                      {calcRate} $ / h
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="200"
                    step="5"
                    value={calcRate}
                    onChange={(e) => setCalcRate(parseInt(e.target.value))}
                    className="w-full accent-[#F47B20] h-1.5 bg-[#17243A] rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-500 italic">Inclut le coût d'opportunité d'un gestionnaire ou d'un propriétaire.</p>
                </div>

                {/* Control 3: Employee count */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-gray-300 font-medium font-sans">Nombre de personnes impactées</label>
                    <span className="font-mono font-bold text-[#F47B20] bg-[#F47B20]/10 px-2 py-0.5 rounded border border-[#F47B20]/20">
                      {calcEmployees} {calcEmployees > 1 ? 'personnes' : 'personne'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={calcEmployees}
                    onChange={(e) => setCalcEmployees(parseInt(e.target.value))}
                    className="w-full accent-[#F47B20] h-1.5 bg-[#17243A] rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-500 italic">Employés de bureau, répartiteurs ou propriétaires affectés par la paperasse.</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#17243A]/30 rounded-xl border border-[#17243A]/50 text-left">
                <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                  <Lightbulb className="w-4 h-4 text-[#F47B20]" /> <span className="text-white font-semibold">Note de calcul :</span> La formule est simple et transparente : <br />
                  <span className="font-mono text-white text-xs">{calcHours}h × 52 semaines × {calcEmployees} employé(s) × {calcRate}$ / heure = Coût annuel global.</span>
                </p>
              </div>
            </div>

            {/* Right side: visual mathematical outcomes */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#070b14] border border-[#17243A] flex flex-col justify-between space-y-6">
              <div className="space-y-6 text-left">
                <h3 className="font-display font-bold text-white text-base border-b border-[#17243A]/60 pb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  Le coût annuel estimé de vos tâches
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hours lost block */}
                  <div className="p-4 rounded-xl bg-red-500/[0.03] border border-red-500/10 space-y-1">
                    <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">TEMPS PERDU</span>
                    <span className="text-2xl font-mono font-bold text-red-400 block">
                      {calcHours * 52 * calcEmployees} h / an
                    </span>
                    <span className="text-[11px] text-gray-400 block font-sans">
                      Perdues en tâches sans valeur ajoutée.
                    </span>
                  </div>

                  {/* Financial loss block */}
                  <div className="p-4 rounded-xl bg-red-500/[0.03] border border-red-500/20 space-y-1">
                    <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">PERTE FINANCIÈRE DIRECTE</span>
                    <span className="text-2xl font-mono font-bold text-red-500 block">
                      {(calcHours * 52 * calcEmployees * calcRate).toLocaleString()} $ / an
                    </span>
                    <span className="text-[11px] text-gray-400 block font-sans">
                      Dépensées en frictions opérationnelles.
                    </span>
                  </div>
                </div>

                {/* Outcome with HUVI optimization (60% saved) */}
                <div className="p-5 sm:p-6 rounded-xl bg-green-500/[0.03] border border-green-500/20 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-md bg-green-500/10 text-green-400">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h4 className="font-display font-bold text-sm text-green-300">
                      Potentiel d'optimisation avec HUVI
                    </h4>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    En automatisant les relances, en centralisant vos processus et en connectant vos outils, nous éliminons en moyenne <span className="text-white font-bold font-mono">60%</span> du temps administratif inutile.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono">
                    <div>
                      <span className="text-[11px] text-gray-500 uppercase block">HEURES RÉCUPÉRÉES</span>
                      <span className="text-xl font-bold text-green-400 block mt-0.5">
                        + {Math.round(calcHours * 52 * calcEmployees * 0.6)} h / an
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-500 uppercase block">ARGENT RÉINJECTÉ</span>
                      <span className="text-xl font-bold text-green-400 block mt-0.5">
                        + {Math.round(calcHours * 52 * calcEmployees * calcRate * 0.6).toLocaleString()} $ / an
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stat sources & validation */}
              <div className="border-t border-[#17243A]/60 pt-4 text-[11px] text-gray-500 space-y-2 text-left">
                <p className="leading-normal">
                  <span className="text-gray-400 font-bold">Source statistique (15h) :</span> estimation basée sur les heures d’administration, de saisie double et de relances manuelles économisées en moyenne par semaine chez nos clients PME de services.
                </p>
                <p className="leading-normal">
                  <span className="text-gray-400 font-bold">Source statistique (60%) :</span> réduction moyenne de 60 % du temps consacré aux tâches administratives répétitives après la mise en place de notre méthode CASA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="approach">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Notre approche</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]">
            Notre objectif n'est pas d'ajouter de la complexité à votre entreprise. C'est de la simplifier.
          </h2>
          <p className="text-sm font-mono text-red-400 uppercase tracking-widest pt-2">
            <Ban className="w-4 h-4" /> Ce que nous ne faisons pas
          </p>
        </div>

        {/* Navigation arrows (mobile only) */}
        <div className="flex md:hidden items-center justify-end px-2 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollApproach('left')}
              className="p-2 rounded-lg bg-[#111a2e] hover:bg-[#17243a] text-gray-300 border border-[#17243A] transition-all cursor-pointer"
              aria-label="Précédent"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollApproach('right')}
              className="p-2 rounded-lg bg-[#111a2e] hover:bg-[#17243a] text-gray-300 border border-[#17243A] transition-all cursor-pointer"
              aria-label="Suivant"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={approachRef}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 pb-4 md:pb-0 md:grid-cols-2 lg:grid-cols-6 scrollbar-none"
        >
          {/* Card 1 */}
          <div className="min-w-[85vw] sm:min-w-[48vw] md:min-w-0 snap-center lg:col-span-2 p-6 rounded-2xl bg-[#090D16] border border-[#17243A] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/2 transition-all duration-300 flex flex-col gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-white text-base leading-snug">Installer des dizaines de logiciels</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Plus d'outils ne règle pas un manque de structure. On préfère solidifier ce que vous avez déjà avant d'ajouter quoi que ce soit.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[85vw] sm:min-w-[48vw] md:min-w-0 snap-center lg:col-span-2 p-6 rounded-2xl bg-[#090D16] border border-[#17243A] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/2 transition-all duration-300 flex flex-col gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-white text-base leading-snug">Implanter une solution sans comprendre votre réalité</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Chaque entreprise fonctionne différemment. On analyse d'abord vos façons de travailler avant de construire quoi que ce soit. Non négociable.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="min-w-[85vw] sm:min-w-[48vw] md:min-w-0 snap-center lg:col-span-2 p-6 rounded-2xl bg-[#090D16] border border-[#17243A] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/2 transition-all duration-300 flex flex-col gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-white text-base leading-snug">Promettre de remplacer l'humain par l'IA</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Personne ne veut parler à un robot. La technologie doit soutenir votre équipe, pas tenter de remplacer l'expertise et l'intelligence de vos employés.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="min-w-[85vw] sm:min-w-[48vw] md:min-w-0 snap-center md:col-span-1 lg:col-span-3 p-6 rounded-2xl bg-[#090D16] border border-[#17243A] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/2 transition-all duration-300 flex flex-col gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-white text-base leading-snug">Vendre un outil parce qu'il est à la mode</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                On recommande uniquement les solutions qui servent vos objectifs d'affaires. Ce n'est pas parce que c'est "sexy" que c'est une bonne idée.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="min-w-[85vw] sm:min-w-[48vw] md:min-w-0 snap-center md:col-span-2 lg:col-span-3 p-6 rounded-2xl bg-[#090D16] border border-[#17243A] hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/2 transition-all duration-300 flex flex-col gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <h3 className="font-display font-bold text-white text-base leading-snug">Promettre des résultats magiques</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                La technologie est un levier. Les vrais résultats viennent d'une meilleure façon de travailler.
              </p>
            </div>
          </div>
        </div>

        {/* COMPARATIVE SPLIT PANEL (🔴 P0 Item 3 - Anti-objection structurée) */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-[#0b1220]/50 border border-[#17243A]/60 max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-lg sm:text-xl text-white">
              Votre équipe, améliorée. Jamais remplacée.
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              On ne remplace pas votre équipe. On remplace ses pires tâches. Notre objectif est de libérer votre équipe pour la recentrer sur ce qui compte vraiment.
            </p>
          </div>

          {/* Mobile Selector Tab Switcher */}
          <div className="flex md:hidden flex-col gap-2.5 w-full max-w-sm mx-auto my-6 p-2 bg-[#090D16] border border-[#17243A] rounded-2xl">
            <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest text-center">
              Choisissez ce que vous voulez voir :
            </span>
            <button
              onClick={() => setKeepOrEliminateTab('keep')}
              className={`w-full p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1 ${
                keepOrEliminateTab === 'keep'
                  ? 'bg-green-500/10 border-2 border-green-500/50 text-green-400 shadow-lg shadow-green-500/5'
                  : 'bg-transparent border border-[#17243A] text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Gem className="w-3.5 h-3.5 shrink-0" /> CE QUE L'ÉQUIPE GARDE
              </span>
              <span className="text-[11px] leading-snug opacity-90 font-sans">
                La relation client, l'expertise technique et le contrôle final.
              </span>
            </button>
            <button
              onClick={() => setKeepOrEliminateTab('eliminate')}
              className={`w-full p-3.5 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1 ${
                keepOrEliminateTab === 'eliminate'
                  ? 'bg-red-500/10 border-2 border-red-500/50 text-red-400 shadow-lg shadow-red-500/5'
                  : 'bg-transparent border border-[#17243A] text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5 shrink-0" /> CE QU'ON ÉLIMINE
              </span>
              <span className="text-[11px] leading-snug opacity-90 font-sans">
                La double saisie, les relances manuelles et la paperasse.
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
            {/* Left Box: Ce que l'équipe garde */}
            <div className={`p-6 rounded-xl bg-green-950/5 border border-green-950/30 flex flex-col justify-between space-y-4 ${
              keepOrEliminateTab === 'keep' ? 'flex' : 'hidden md:flex'
            }`}>
              <div>
                <div className="flex items-center gap-2 border-b border-green-950/30 pb-3 mb-4">
                  <Gem className="w-4 h-4 text-green-400 shrink-0" />
                  <h4 className="font-display font-bold text-green-400 text-sm uppercase font-mono tracking-wider">
                    Ce que votre équipe GARDE
                  </h4>
                </div>
                <ul className="space-y-4 font-sans text-xs text-gray-400 text-left">
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">Le contact humain et la relation client</strong>
                      <span>Prendre le temps d'écouter vos clients, de bâtir de vrais relations et d'offrir un service irréprochable.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">L'expertise et le jugement terrain</strong>
                      <span>Le pouvoir de valider les soumissions, d'ajuster les stratégies et de résoudre les vrais défis.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">Le contrôle final</strong>
                      <span>L'équipe reste en contrôle : elle valide et approuve chaque relance IA en un seul clic.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-green-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">Du temps pour se concentrer sur la croissance</strong>
                      <span>La liberté d'esprit nécessaire pour innover, optimiser la production ou chercher des opportunités.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] text-green-500/70 font-mono italic text-left pt-2">
                = Recentrage complet sur ce qui fait avancer la business.
              </p>
            </div>

            {/* Right Box: Ce qu'on élimine */}
            <div className={`p-6 rounded-xl bg-red-950/5 border border-red-950/30 flex flex-col justify-between space-y-4 ${
              keepOrEliminateTab === 'eliminate' ? 'flex' : 'hidden md:flex'
            }`}>
              <div>
                <div className="flex items-center gap-2 border-b border-red-950/30 pb-3 mb-4">
                  <Trash2 className="w-4 h-4 text-red-400 shrink-0" />
                  <h4 className="font-display font-bold text-red-400 text-sm uppercase font-mono tracking-wider">
                    Ce qu'on ÉLIMINE de leur journée
                  </h4>
                </div>
                <ul className="space-y-4 font-sans text-xs text-gray-400 text-left">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">La double saisie constante</strong>
                      <span>Plus besoin de transcrire manuellement des factures ou des rapports d'un logiciel à l'autre.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">La charge mentale des relances</strong>
                      <span>Le stress de devoir se rappeler de faire les suivis de devis et de factures en retard un par un.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">Le classement fastidieux</strong>
                      <span>Le temps perdu à renommer manuellement chaque fichier PDF et à le glisser dans le bon dossier.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 text-base leading-none shrink-0">•</span>
                    <div>
                      <strong className="text-white block font-display">Le doute de début de journée</strong>
                      <span>Le manque de clarté opérationnelle et l'absence d'organisation qui poussent à se demander sans cesse "par quoi on commence ?".</span>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="text-[11px] text-red-500/70 font-mono italic text-left pt-2">
                = Élimination de la fatigue administrative et des tâches répétitives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HUVI System Architecture Section */}
      <section className="bg-[#090D15]/80 py-24 px-4 sm:px-6 lg:px-8 border-b border-[#17243A]/40" id="architecture">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">La méthode HUVI</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Notre méthode CASA pour bâtir des entreprises plus solides
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Les meilleures solutions commencent toujours par de bonnes fondations. CASA est la méthode qu'on utilise pour remettre de l'ordre, étape par étape, avant de laisser la technologie accélérer le reste.
            </p>
          </div>

          {/* Interactive Layered Architecture Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Step navigation tabs */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {casaSteps.map((step, idx) => (
                <button
                  key={step.num}
                  onClick={() => setActiveApproachStep(idx)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 ${
                    activeApproachStep === idx
                      ? 'bg-[#17243A] border-[#F47B20] shadow-lg shadow-[#F47B20]/5 md:translate-x-2'
                      : 'bg-[#111a2e] border-[#17243A] hover:bg-[#0D1527] hover:border-gray-700'
                  }`}
                  id={`methodology-btn-${idx}`}
                >
                  <span className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all ${
                    activeApproachStep === idx 
                      ? 'bg-[#F47B20]/20 text-[#F47B20] border border-[#F47B20]/30' 
                      : 'bg-[#17243A]/40 text-gray-500 border border-[#17243A]/20'
                  }`}>
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">{step.tagline}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeApproachStep === idx ? 'text-[#F47B20] rotate-90' : 'text-gray-600'}`} />
                </button>
              ))}
            </div>

            {/* Right: Detailed active layer card */}
            <div className="lg:col-span-7 flex">
              <div className="w-full p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-[#17243A] relative overflow-hidden" id="architecture-detail-card">
                {/* Visual background layers overlay effect */}
                <div className="absolute right-0 bottom-0 w-48 h-48 opacity-5 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="80" height="15" rx="2" fill="#F47B20" />
                    <rect x="15" y="30" width="70" height="15" rx="2" fill="#F47B20" />
                    <rect x="20" y="50" width="60" height="15" rx="2" fill="#F47B20" />
                    <rect x="25" y="70" width="50" height="15" rx="2" fill="#F47B20" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                  {/* Left part: Text details */}
                  <div className="md:col-span-6 space-y-6 flex flex-col justify-between h-full order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 border-b border-[#17243A] pb-4">
                        <span className="text-[11px] font-mono font-bold bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full border border-green-500/30 shrink-0 flex items-center gap-1.5 shadow-lg shadow-green-500/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                          CHECKPOINT {(casaSteps[activeApproachStep] || casaSteps[0]).num}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white truncate">
                          {(casaSteps[activeApproachStep] || casaSteps[0]).title}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-display font-semibold text-[#F47B20] text-sm sm:text-base">
                          {(casaSteps[activeApproachStep] || casaSteps[0]).tagline}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {(casaSteps[activeApproachStep] || casaSteps[0]).desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-[#17243A]/60">
                      <span className="block text-[11px] font-mono text-green-400/90 uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-green-400"></span>
                        RÉSULTAT DU CHECKPOINT :
                      </span>
                      <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 flex gap-2.5 items-center">
                        <div className="p-1 rounded bg-green-500/10 text-green-400 shrink-0 border border-green-500/20">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className="text-[11px] font-sans text-gray-300 font-medium leading-tight">
                          {(casaSteps[activeApproachStep] || casaSteps[0]).metrics}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right part: Animated graphics visualizer */}
                  <div className="md:col-span-6 flex items-center justify-center order-1 md:order-2">
                    <CasaVisualizer activeStep={activeApproachStep} />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Blueprint CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center" id="blueprint-cta">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#090D16] to-[#121B2A] border border-[#F47B20]/25 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F47B20]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#F47B20]/10 transition-all duration-500"></div>
          <div className="space-y-2 relative z-10 text-left">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-bold">Ressource stratégique gratuite</span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Le Blueprint de la Méthode C.A.S.A.</h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Découvrez notre plan d'action complet. Un guide stratégique étape par étape pour structurer votre entreprise de A à Z, sans ajouter de complexité inutile.
            </p>
          </div>
          <button 
            onClick={() => setIsBlueprintOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-xs transition-all duration-300 shadow-xl shadow-[#F47B20]/10 hover:-translate-y-0.5 cursor-pointer uppercase font-mono tracking-wider shrink-0 relative z-10"
            id="open-blueprint-btn"
          >
            <BookOpen className="w-4 h-4" />
            <span>Accéder au blueprint gratuit</span>
          </button>
        </div>
      </section>

      {/* What We Help Build Section */}
      <section className="bg-[#090D15]/80 py-24 px-4 sm:px-6 lg:px-8 border-b border-[#17243A]/40" id="what-we-build">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Solutions concrètes</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
              Une entreprise plus simple à gérer au quotidien.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              On simplifie ce qui ralentit votre entreprise pour créer un quotidien plus fluide, plus clair et plus prévisible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => {
              const ServiceIcon = service.icon || Check;
              return (
                <div 
                  key={idx} 
                  className="p-6 rounded-xl border border-[#17243A] bg-[#111a2e]/95 hover:bg-[#0D1527] hover:border-[#F47B20]/40 transition-all duration-300 relative group flex flex-col justify-between"
                  id={`service-grid-card-${idx}`}
                >
                  <div className="space-y-4">
                    <div className="p-2.5 w-10 h-10 rounded-lg bg-[#F47B20]/10 border border-[#F47B20]/25 text-[#F47B20] group-hover:bg-[#F47B20]/20 transition-all duration-300 flex items-center justify-center shrink-0">
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-white text-base group-hover:text-[#F47B20] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-[#17243A]/40 flex justify-end">
                    <span className="text-[11px] font-mono text-gray-500 group-hover:text-[#3A7697] transition-colors flex items-center gap-1.5">
                      <span>Inclus</span>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="how-it-works">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Avancer ensemble</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Comprendre d'abord. Construire ensuite.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            On ne se contente pas de recommander des solutions. On travaille à vos côtés pour mettre en place des méthodes de travail plus simples et plus efficaces.
          </p>
        </div>

        {/* Timeline flow */}
        <div className="relative mt-12" id="methodology-timeline">
          
          {/* Connector horizontal line for large screens */}
          <div className="hidden lg:block absolute top-6 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#17243A] via-[#F47B20]/30 to-[#17243A] z-0"></div>

          {/* Connector vertical line for mobile */}
          <div className="lg:hidden absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#17243A] via-[#F47B20]/20 to-[#17243A] z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {methodologySteps.map((step, idx) => {
              const StepIcon = step.icon || Sparkles;
              return (
                <div 
                  key={idx} 
                  className={`relative flex flex-row lg:flex-col items-start text-left lg:text-center lg:items-center gap-4 lg:gap-6 p-5 rounded-2xl bg-[#111a2e]/40 border transition-all duration-300 group overflow-hidden ${
                    step.isOptional 
                      ? 'border-[#3A7697]/30 hover:border-[#3A7697]/60 hover:bg-[#111a2e]/60' 
                      : 'border-[#17243A]/70 hover:border-[#F47B20]/50 hover:bg-[#111a2e]/80'
                  }`}
                >
                  {/* Ambient illumination glow on hover */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    step.isOptional ? 'bg-[#3A7697]/15' : 'bg-[#F47B20]/10'
                  }`}></div>
                  
                  {/* Step icon container with step number badge */}
                  <div className="relative shrink-0 z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-[#090D15] border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                      step.isOptional 
                        ? 'border-[#17243A] group-hover:border-[#3A7697] text-[#3A7697] group-hover:text-white group-hover:shadow-[#3A7697]/15' 
                        : 'border-[#17243A] group-hover:border-[#F47B20] text-[#F47B20] group-hover:text-white group-hover:shadow-[#F47B20]/15'
                    }`}>
                      <StepIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Small step number badge */}
                    <span className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.5 min-w-[20px] h-5 rounded-md text-[11px] font-mono font-bold flex items-center justify-center shadow-md ${
                      step.isOptional
                        ? 'bg-gradient-to-r from-[#3A7697] to-blue-500 text-white'
                        : 'bg-gradient-to-r from-[#F47B20] to-orange-500 text-white'
                    }`}>
                      {step.num}
                    </span>
                    {/* Glowing ring */}
                    <div className={`absolute inset-0 rounded-2xl scale-75 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 ${
                      step.isOptional ? 'bg-[#3A7697]/10' : 'bg-[#F47B20]/10'
                    }`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 lg:space-y-3 flex-1 lg:flex-none relative z-10 w-full">
                    <div className="space-y-1">
                      <span className={`inline-block text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                        step.isOptional
                          ? 'text-[#3A7697] bg-[#3A7697]/5 border-[#3A7697]/10'
                          : 'text-[#F47B20] bg-[#F47B20]/5 border-[#F47B20]/10'
                      }`}>
                        {step.isOptional ? "Étape Optionnelle" : `Étape ${step.num}`}
                      </span>
                      <h3 className={`font-display font-bold text-white text-base sm:text-lg transition-colors pt-1 ${
                        step.isOptional ? 'group-hover:text-[#3A7697]' : 'group-hover:text-[#F47B20]'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#3A7697] leading-snug">
                        {step.tagline}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs lg:mx-auto">
                      {step.desc}
                    </p>
                    <div className="pt-1">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono bg-[#0D1527]/40 border px-2.5 py-1 rounded-full ${
                        step.isOptional ? 'text-[#3A7697] border-[#3A7697]/30' : 'text-gray-500 border-[#17243A]/60'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${step.isOptional ? 'bg-[#3A7697]' : 'bg-[#3A7697]'}`}></span>
                        <span>{step.metrics}</span>
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Specialized AI Teams Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="ai-teams">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-[#F47B20]/30 text-[#F47B20] text-[11px] font-mono uppercase font-bold tracking-wider mx-auto">
            <Zap className="w-3.5 h-3.5" /> POUR ALLER PLUS LOIN
          </div>
          <span className="block text-xs font-mono tracking-widest text-gray-500 uppercase font-semibold">Vos agents IA personnalisés</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Vous ne devriez pas passer vos journées à faire des tâches que l'IA pourrait faire.
          </h2>
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-[#111a2e] to-[#0D1527] border border-[#F47B20]/30 shadow-xl relative overflow-hidden text-center mt-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F47B20]/5 rounded-full blur-2xl pointer-events-none"></div>
            <p className="text-white text-base sm:text-lg leading-relaxed font-sans font-medium">
              « <span className="text-[#F47B20] font-bold">Une fois que la structure est solide</span>, on ajoute une couche d'assistants IA qui travaillent dans l'ombre. On la recommande seulement quand la base est solide. »
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2 font-sans max-w-lg mx-auto">
              Nous n'implantons pas d'IA sur du chaos. Nous bâtissons d'abord vos fondations numériques, puis nous décuplons votre efficacité.
            </p>
          </div>
        </div>

        {/* Navigation arrows (mobile only) */}
        <div className="flex md:hidden items-center justify-end px-2 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollAiTeams('left')}
              className="p-2 rounded-lg bg-[#111a2e] hover:bg-[#17243a] text-gray-300 border border-[#17243A] transition-all cursor-pointer"
              aria-label="Précédent"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollAiTeams('right')}
              className="p-2 rounded-lg bg-[#111a2e] hover:bg-[#17243a] text-gray-300 border border-[#17243A] transition-all cursor-pointer"
              aria-label="Suivant"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={aiTeamsRef}
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 md:gap-6 pb-4 md:pb-0 md:grid-cols-2 lg:grid-cols-3 scrollbar-none"
        >
          {aiTeams.map((agent, index) => {
            const IconComponent = agent.icon;
            const isCustom = 'custom' in agent && agent.custom;
            return (
              <div 
                key={index} 
                className={`min-w-[85vw] sm:min-w-[48vw] md:min-w-0 snap-center p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group ${
                  isCustom 
                    ? 'bg-gradient-to-br from-[#090D16] to-[#121B2A] border-2 border-[#F47B20]/40 hover:border-[#F47B20] hover:shadow-xl hover:shadow-[#F47B20]/5 md:col-span-2 lg:col-span-2' 
                    : 'bg-[#090D16] border border-[#17243A] hover:border-[#F47B20]/50 hover:shadow-xl hover:shadow-[#F47B20]/2'
                }`}
                id={`ai-team-card-${index}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#17243A]/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border text-[#F47B20] ${isCustom ? 'bg-[#F47B20]/20 border-[#F47B20]/40' : 'bg-[#F47B20]/10 border-[#F47B20]/20'}`}>
                        <IconComponent className="w-4 h-4 animate-pulse" />
                      </div>
                      <h3 className="font-display font-bold text-white text-sm sm:text-base text-left">{agent.name}</h3>
                    </div>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isCustom ? 'text-[#F47B20]' : 'text-gray-500'}`}>
                      {isCustom ? <><Rocket className="w-3 h-3" /> SUR MESURE</> : 'AGENT ACTIF'}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#F47B20] font-medium text-left">{agent.role}</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans text-left">{agent.impact}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#17243A]/40 bg-[#090D16]/40 text-left">
                  <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-1.5">FLUX AUTOMATISÉ :</span>
                  <p className="text-[11px] text-gray-300 font-mono leading-normal bg-[#111a2e] p-2 rounded-lg border border-[#17243A]/30">
                    {agent.flow}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Experience Section (Business Growth Assessment) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="builder">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold bg-[#F47B20]/10 px-3 py-1 rounded-full border border-[#F47B20]/20">
            ÉVALUATION & OPPORTUNITÉS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Votre plan d'action personnalisé
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Faites le test pour voir rapidement où l’automatisation et l’IA peuvent vous faire gagner du temps.

          </p>
        </div>

        {/* ORIGINAL RADAR D'OPPORTUNITÉS RAPIDE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in" id="radar-tool-container">
            
            {/* Form Side */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-semibold">Par où commencer</span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-1">
                  Obtenez une première piste d'amélioration adaptée à votre réalité.
                </h3>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  Sélectionnez votre domaine d'activité et votre défi principal pour obtenir instantanément une première orientation d'optimisation adaptée à votre réalité.
                </p>
              </div>

              <form onSubmit={handleSubmitAssessment} className="space-y-5 p-6 rounded-2xl bg-[#090D16] border border-[#17243A]" id="assessment-form">
                
                {/* Step 1: Industry */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">1. Secteur d'activité</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry('construction')}
                      className={`p-3 rounded-lg text-xs font-mono font-bold text-center border transition-all ${
                        selectedIndustry === 'construction'
                          ? 'bg-[#17243A] border-[#F47B20] text-[#F47B20]'
                          : 'bg-[#111a2e] border-[#17243A] text-gray-400 hover:text-white'
                      }`}
                    >
                      <Hammer className="w-3.5 h-3.5" /> Construction
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry('other')}
                      className={`p-3 rounded-lg text-xs font-mono font-bold text-center border transition-all ${
                        selectedIndustry === 'other'
                          ? 'bg-[#17243A] border-[#F47B20] text-[#F47B20]'
                          : 'bg-[#111a2e] border-[#17243A] text-gray-400 hover:text-white'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" /> Immobilier
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry('services')}
                      className={`p-3 rounded-lg text-xs font-mono font-bold text-center border transition-all ${
                        selectedIndustry === 'services'
                          ? 'bg-[#17243A] border-[#F47B20] text-[#F47B20]'
                          : 'bg-[#111a2e] border-[#17243A] text-gray-400 hover:text-white'
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" /> Professionnels
                    </button>
                  </div>
                </div>

                {/* Step 2: Challenge */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider">2. Principal Défi Opérationnel</label>
                  <select
                    value={selectedChallenge}
                    onChange={(e) => setSelectedChallenge(e.target.value as Challenge)}
                    className="w-full bg-[#111a2e] border border-[#17243A] rounded-lg p-3 text-xs text-gray-300 focus:outline-none focus:border-[#F47B20] font-sans"
                    id="challenge-select"
                  >
                    <option value="administration">Administration (Trop de paperasse / Saisie manuelle)</option>
                    <option value="sales">Ventes (Suivi de devis / Qualification de leads)</option>
                    <option value="projects">Gestion de projets (Chantiers / Retards de livraison)</option>
                    <option value="communication">Suivi Client (Silos d'info / Appels constants)</option>
                    <option value="data">Données (Manque de visibilité sur les marges financières)</option>
                  </select>
                </div>

                {/* Submit CTA button with loading states */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-xs tracking-wider font-mono transition-all duration-300 shadow-md flex items-center justify-center gap-2 disabled:bg-gray-700 disabled:cursor-not-allowed uppercase cursor-pointer"
                  id="assessment-submit-btn"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Calcul de l'architecture... {generationProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Identifier mes premières opportunités</span>
                    </>
                  )}
                </button>

                {isGenerating && (
                  <div className="space-y-2 mt-3 animate-pulse">
                    <div className="w-full bg-[#111a2e] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#F47B20] to-orange-500 h-full transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono text-center">{generationStepMsg}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Blueprint Report Results Display */}
            <div className="lg:col-span-7 flex" id="assessment-result-panel">
              {currentResult ? (
                <div className="w-full p-8 rounded-2xl bg-[#090D16] border-2 border-[#F47B20]/40 shadow-2xl shadow-[#F47B20]/5 relative space-y-6 flex flex-col justify-between animate-fade-in" id="report-active-box">
                  
                  {/* Upper Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#17243A] pb-4">
                      <div>
                        <span className="text-[11px] font-mono text-[#F47B20] uppercase tracking-wider block">PLAN RECOMMANDÉ : ORIENTATION STRATÉGIQUE</span>
                        <h3 className="font-display text-xl font-bold text-white mt-1">
                          {currentResult.recommendation.title}
                        </h3>
                      </div>
                      <div className="p-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                        <CheckCircle className="w-5 h-5 animate-pulse" />
                      </div>
                    </div>



                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {currentResult.recommendation.description}
                    </p>

                    {/* Modules list */}
                    <div className="space-y-2 pt-3">
                      <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest">SOLUTIONS DE SIMPLIFICATION :</span>
                      <ul className="space-y-2">
                        {currentResult.recommendation.modules.map((mod, i) => (
                          <li key={i} className="flex gap-2.5 items-start text-xs text-gray-300">
                            <Check className="w-4 h-4 text-[#F47B20] shrink-0 mt-0.5" />
                            <span>{mod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* IA Assistants specific to their recommendation */}
                    <div className="space-y-2 pt-3 border-t border-[#17243A]/40">
                      <span className="block text-[11px] font-mono text-[#F47B20] uppercase tracking-widest">ASSISTANTS IA CONSEILLÉS :</span>
                      <ul className="space-y-2">
                        {currentResult.recommendation.aiAgents.map((agent, i) => (
                          <li key={i} className="text-xs text-gray-400 flex gap-2 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                            <span className="leading-relaxed">
                              <strong className="text-white font-medium">{agent.split(':')[0]}:</strong> 
                              {agent.split(':')[1]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact estimate card */}
                    <div className="pt-3">
                      <div className="p-4 rounded-xl bg-[#17243A]/50 border border-[#F47B20]/20">
                        <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider">GAINS RENTABILITÉ ESTIMÉS :</span>
                        <p className="text-sm font-semibold text-white mt-1 font-bold">
                          {currentResult.recommendation.impactEstimate}
                        </p>
                        {/* Urgence — coût du statu quo (chantier stratégie #6) with chaos replaced with désordre */}
                        <p className="text-[11px] text-[#F47B20] mt-2 italic leading-relaxed">
                          « Le diagnostic complet chiffre le coût exact de votre désordre actuel — et ce que vous gagnez à le structurer. »
                        </p>
                      </div>
                    </div>

                    {/* Primary CTA - Faire mon bilan IA complet (EN PREMIER) */}
                    <div className="p-5 rounded-xl bg-gradient-to-r from-[#17243A] to-[#0D1527] border-2 border-[#F47B20] space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F47B20]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F47B20]/10 transition-all duration-300"></div>
                      <div className="space-y-1 relative z-10 text-left">
                        <span className="text-[11px] font-mono tracking-wider text-[#F47B20] uppercase font-bold">Étape suivante n°1</span>
                        <p className="text-xs sm:text-sm text-white font-semibold leading-snug">
                          Obtenez votre analyse de maturité personnalisée complète sur l'ensemble de votre organisation.
                        </p>
                      </div>
                      <a 
                        href="https://bilan.huvioptimisation.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-xs font-mono tracking-wider transition-all duration-300 uppercase shadow-md relative z-10 hover:scale-[1.01] cursor-pointer"
                        id="full-bilan-cta"
                      >
                        <span>Faire mon bilan IA complet</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>

                  </div>

                  {/* Secondary CTA - Vous voulez en discuter ? (Page de confirmation) */}
                  <div className="pt-6 border-t border-[#17243A] space-y-4 bg-[#090D16]/80 text-left">
                    <div className="space-y-1">
                      <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">Vous voulez en discuter ?</h4>
                      <p className="text-xs text-gray-400 italic">
                        « Une rencontre pour comprendre votre entreprise, vos blocages et vos pertes de temps. »
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                      <a
                        href="https://huvioptimisation.fillout.com/rencontre-doptimisation-exploratoire"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-3 bg-[#17243A] hover:bg-[#23385a] text-gray-200 hover:text-white border border-[#17243A] hover:border-[#F47B20]/30 font-bold text-[11px] rounded font-mono tracking-wider transition-all inline-flex items-center justify-center gap-1.5 uppercase shrink-0 cursor-pointer"
                      >
                        <span>Prendre ma séance d'optimisation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>

                      {/* Prochaines étapes display: Séance → Diagnostic → Parcours */}
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-widest">Prochaines étapes :</span>
                        <div className="flex items-center justify-start sm:justify-end gap-1.5 text-[11px] font-mono text-[#F47B20] mt-1 font-bold">
                          <span className="text-gray-300">Séance d'optimisation</span>
                          <span className="text-gray-600">→</span>
                          <span className="text-gray-400">Diagnostic des processus</span>
                          <span className="text-gray-600">→</span>
                          <span className="text-gray-400">Parcours de croissance</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="w-full p-8 rounded-2xl bg-[#090D16]/50 border border-[#17243A] flex flex-col items-center justify-center text-center py-16 space-y-6" id="report-placeholder-box">
                  <div className="w-12 h-12 rounded-xl bg-[#17243A]/60 border border-[#17243A] flex items-center justify-center text-[#F47B20]">
                    <Cpu className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-bold text-base">Rapport d'Analyse En Attente</h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">
                      Remplissez l'analyse à gauche pour obtenir instantanément vos recommandations d'optimisation et de croissance.
                    </p>
                  </div>
                  <div className="w-full max-w-sm pt-4 border-t border-[#17243A]/40 space-y-2">
                    <a 
                      href="https://bilan.huvioptimisation.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-xs font-mono tracking-wider transition-all duration-300 uppercase shadow-md cursor-pointer"
                      id="placeholder-bilan-cta"
                    >
                      <span>Faire mon Bilan IA complet</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <span className="block text-[11px] font-mono text-gray-500">
                      <Timer className="w-3.5 h-3.5" /> 2 min. — Gratuit & Sans engagement
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>
      </section>

      {/* Dedicated Bilan IA Complet Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="bilan-ia-complet">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0b1220] via-[#0D1527] to-[#121B2A] border border-[#F47B20]/30 shadow-2xl relative overflow-hidden group max-w-5xl mx-auto">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F47B20]/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-[#F47B20]/10 transition-all duration-700"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-bold bg-[#F47B20]/10 px-3.5 py-1.5 rounded-full border border-[#F47B20]/20 inline-block">
              ÉVALUATION DE MATURITÉ IA
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Prêt à faire votre Bilan IA Complet ?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              En 2 minutes, le bilan calcule les pertes de temps et d'argent de ton entreprise, estime tes gains potentiels et te transmet un plan d'action sur-mesure selon ton niveau de maturité numérique .
            </p>

            <div className="pt-4">
              <a 
                href="https://bilan.huvioptimisation.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-sm tracking-wider uppercase font-mono shadow-2xl shadow-[#F47B20]/20 transition-all duration-300 hover:-translate-y-0.5"
                id="direct-bilan-btn"
              >
                <span>Démarrer mon Bilan IA maintenant</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>
              <span className="block text-[11px] text-gray-500 font-mono mt-3">
                Ouvre notre questionnaire sécurisé dans un nouvel onglet
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left max-w-2xl mx-auto font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#111a2e]/60 border border-[#17243A] flex items-start gap-2.5">
                <Timer className="w-5 h-5 text-[#F47B20] shrink-0" />
                <div>
                  <span className="block font-bold text-white">Rapide & Gratuit</span>
                  <span className="text-[11px] text-gray-500 font-sans">Seulement 2 minutes de questions</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111a2e]/60 border border-[#17243A] flex items-start gap-2.5">
                <Lock className="w-5 h-5 text-[#F47B20] shrink-0" />
                <div>
                  <span className="block font-bold text-white">100% Sécurisé</span>
                  <span className="text-[11px] text-gray-500 font-sans font-normal">Données confidentielles et cryptées</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111a2e]/60 border border-[#17243A] flex items-start gap-2.5">
                <Target className="w-5 h-5 text-[#F47B20] shrink-0" />
                <div>
                  <span className="block font-bold text-white">Sans Engagement</span>
                  <span className="text-[11px] text-gray-500 font-sans">Un plan d'action actionnable direct</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <Garantie />

      <FAQ />

      {/* Conversion / Final CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40 text-center relative" id="conversion">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F47B20]/5 blur-[100px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <Logo size="lg" className="mb-6 animate-float" />

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Vous avez déjà <span className="text-[#F47B20]">bâti quelque chose de solide</span>. Maintenant, il faut lui donner <span className="text-[#F47B20]">les fondations</span> pour continuer à grandir.
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
            On s'assoit ensemble, on regarde vos chiffres, vos angles morts, et on bâtit un plan clair. Pas de blabla technique, que des solutions pratiques.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://huvioptimisation.fillout.com/rencontre-doptimisation-exploratoire"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-sm transition-all duration-300 shadow-xl shadow-[#F47B20]/10 hover:-translate-y-0.5 cursor-pointer uppercase font-mono tracking-wider"
              id="final-cta-btn"
            >
              <span>Parlons de votre réalité</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-gray-500 pt-4">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" /> Sans engagement
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" /> Pistes d'action rapides
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" /> Équipe d'experts locale
            </span>
          </div>
        </div>
      </section>

      {/* Database Admin Console Full Overlay Drawer */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="admin-console-overlay">
          <div className="absolute inset-0 bg-[#111a2e]/90 backdrop-blur-sm" onClick={() => setIsAdminOpen(false)}></div>

          <div className="absolute inset-y-0 right-0 max-w-4xl w-full bg-[#15223c] border-l border-[#17243A] shadow-2xl flex flex-col" id="admin-console-panel">
            
            {/* Header */}
            <div className="p-6 border-b border-[#17243A] flex items-center justify-between bg-[#111a2e]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#F47B20]/10 text-[#F47B20] border border-[#F47B20]/20">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">Console Administrative des Soumissions</h3>
                  <p className="text-[11px] font-mono text-gray-500 mt-0.5">HISTORIQUE DES LEADS CLIENTS • HUVI ENGINE</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-lg border border-[#17243A] hover:bg-[#17243A] text-gray-400 hover:text-white transition-all cursor-pointer"
                id="close-admin-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-header controls */}
            <div className="p-4 bg-[#111a2e]/60 border-b border-[#17243A] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-2 w-full relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, compagnie ou email..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full bg-[#111a2e] border border-[#17243A] rounded-lg p-2.5 pl-9 text-xs text-gray-300 focus:outline-none focus:border-[#F47B20]"
                  id="admin-search-input"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <select
                  value={adminFilterIndustry}
                  onChange={(e) => setAdminFilterIndustry(e.target.value)}
                  className="bg-[#111a2e] border border-[#17243A] rounded-lg p-2.5 text-xs text-gray-300 focus:outline-none"
                  id="admin-industry-select"
                >
                  <option value="all">Tous les secteurs</option>
                  <option value="construction">Construction</option>
                  <option value="other">Immobilier</option>
                  <option value="services">Professionnels</option>
                </select>

                <button
                  onClick={handleDownloadJSON}
                  className="p-2.5 rounded-lg border border-[#3A7697]/40 bg-[#17243A]/40 text-[#3A7697] hover:text-white hover:bg-[#17243A] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  id="admin-export-btn"
                  title="Télécharger la base sous format JSON"
                >
                  <Download className="w-4 h-4" />
                  <span>Exporter</span>
                </button>
              </div>
            </div>

            {/* List and detail panel splits */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
              
              {/* Leads List */}
              <div className="md:col-span-5 border-r border-[#17243A]/60 overflow-y-auto p-4 space-y-3 bg-[#111a2e]/30">
                <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                  LEADS REÇUS ({filteredSubmissions.length})
                </span>

                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((sub) => {
                    const isSelected = selectedAdminSubmission?.id === sub.id;
                    return (
                      <div
                        key={sub.id}
                        onClick={() => setSelectedAdminSubmission(sub)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#17243A] border-[#F47B20] shadow-md' 
                            : 'bg-[#111a2e] border-[#17243A]/80 hover:border-gray-700'
                        }`}
                        id={`lead-item-${sub.id}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-display text-xs font-bold text-white">{sub.company}</h3>
                            <p className="text-[11px] text-gray-400 mt-1 font-sans">{sub.name}</p>
                          </div>
                          <button
                            onClick={(e) => handleDeleteSubmission(sub.id, e)}
                            className="p-1 rounded text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Supprimer la soumission"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between border-t border-[#17243A]/40 pt-2 text-[11px] font-mono text-gray-500">
                          <span className="uppercase text-[#F47B20]">
                            {sub.industry === 'construction' ? 'Construction' : sub.industry === 'other' ? 'Immobilier' : 'Professionnels'}
                          </span>
                          <span>{new Date(sub.createdAt).toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-xs text-gray-500 font-sans">
                    Aucune soumission ne correspond à votre recherche.
                  </div>
                )}
              </div>

              {/* Lead Details */}
              <div className="md:col-span-7 overflow-y-auto p-6 space-y-6">
                {selectedAdminSubmission ? (
                  <div className="space-y-6" id="admin-lead-details">
                    
                    {/* Header */}
                    <div className="border-b border-[#17243A] pb-4">
                      <span className="text-[11px] font-mono text-[#F47B20] uppercase tracking-wider block">Fiche client détaillée</span>
                      <h3 className="font-display text-lg font-bold text-white mt-1">
                        {selectedAdminSubmission.company}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Soumis le {new Date(selectedAdminSubmission.createdAt).toLocaleDateString('fr-CA', { 
                          year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid grid-cols-2 gap-4 bg-[#111a2e] p-4 rounded-xl border border-[#17243A]/60">
                      <div>
                        <span className="block text-[11px] font-mono text-gray-500 uppercase">CONTACT</span>
                        <span className="text-xs text-white font-medium block mt-0.5">{selectedAdminSubmission.name}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-gray-500 uppercase">COURRIEL</span>
                        <span className="text-xs text-[#3A7697] font-medium block mt-0.5 truncate">{selectedAdminSubmission.email}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-gray-500 uppercase">TÉLÉPHONE</span>
                        <span className="text-xs text-white font-medium block mt-0.5">{selectedAdminSubmission.phone || 'Non fourni'}</span>
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono text-gray-500 uppercase">DÉFI SÉLECTIONNÉ</span>
                        <span className="text-xs text-[#F47B20] font-mono font-bold block mt-0.5 uppercase">{selectedAdminSubmission.challenge}</span>
                      </div>
                    </div>

                    {/* Associated Computed Plan */}
                    <div className="space-y-4 pt-4 border-t border-[#17243A]/40">
                      <span className="block text-[11px] font-mono text-gray-500 uppercase tracking-widest">PLAN RECOMMANDÉ PAR L'ENGIN HUVI :</span>
                      <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
                        <h4 className="font-display font-bold text-white text-sm">{selectedAdminSubmission.recommendation.title}</h4>
                        <p className="text-xs text-gray-300 mt-2 leading-relaxed">{selectedAdminSubmission.recommendation.description}</p>
                        
                        <div className="mt-4 space-y-2">
                          <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-widest">MODULES ESTIMÉS :</span>
                          <ul className="space-y-1">
                            {selectedAdminSubmission.recommendation.modules.map((mod, i) => (
                              <li key={i} className="flex gap-2 items-start text-xs text-gray-400">
                                <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                <span>{mod}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-16 space-y-2">
                    <Database className="w-8 h-8 text-gray-600 animate-pulse" />
                    <p className="text-xs font-sans">Sélectionnez une fiche de soumission à gauche pour afficher l'analyse opérationnelle générée par HUVI.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      <BlueprintModal 
        isOpen={isBlueprintOpen} 
        onClose={() => setIsBlueprintOpen(false)} 
        onActionClick={() => {
          const formElement = document.getElementById('builder');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
            triggerToast("Remplissez l'analyse ci-dessous pour obtenir vos recommandations gratuites.");
          }
        }}
      />

      {/* Footer */}
      <footer className="bg-[#04060A] border-t border-[#17243A]/60 pt-12 pb-10 px-4 sm:px-6 lg:px-8 relative" id="footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Logo & Pitch */}
          <div className="md:col-span-3 space-y-3">
            <Logo size="sm" showProgressBar={true} className="items-start" />
            <p className="text-[11px] text-gray-500 leading-relaxed font-sans max-w-sm pt-1">
              HUVI Optimisation accompagne les entrepreneurs de la construction, de l'immobilier et des services à structurer leurs opérations grâce à l'automatisation et à l'intelligence artificielle.
            </p>
            <p className="text-[11px] font-mono text-gray-600">
              © {new Date().getFullYear()} HUVI Optimisation Inc. Tous droits réservés. <br />
              Montréal, Québec, Canada.
            </p>
          </div>
 
          {/* Quick links */}
          <div className="md:col-span-3 space-y-2 text-left md:pt-2">
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Plan du site</h4>
            <ul className="space-y-1.5 text-[11px] font-sans text-gray-500">
              <li><a href="#problem" className="hover:text-white transition-colors">Le diagnostic</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">La méthode CASA</a></li>
              <li><a href="#ai-teams" className="hover:text-white transition-colors">Nos assistants IA</a></li>
              <li><a href="#what-we-build" className="hover:text-white transition-colors">Ce qu'on simplifie</a></li>
              <li><a href="https://huvioptimisation.fillout.com/rencontre-doptimisation-exploratoire" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Séance d'optimisation</a></li>
              <li><a href="/ressources/" className="hover:text-white transition-colors">Ressources</a></li>
            </ul>
          </div>
 
          {/* Solutions */}
          <div className="md:col-span-3 space-y-2 text-left md:pt-2">
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Nos solutions</h4>
            <ul className="space-y-1.5 text-[11px] font-sans text-gray-500">
              <li><a href="/solutions/audit-des-processus/" className="hover:text-white transition-colors">Audit des processus</a></li>
              <li><a href="/solutions/centralisation-crm/" className="hover:text-white transition-colors">Centralisation &amp; CRM</a></li>
              <li><a href="/solutions/suivis-automatises/" className="hover:text-white transition-colors">Suivis automatisés</a></li>
              <li><a href="/solutions/suivi-des-heures/" className="hover:text-white transition-colors">Suivi des heures</a></li>
              <li><a href="/solutions/analyse-performance/" className="hover:text-white transition-colors">Analyse &amp; performance</a></li>
              <li><a href="/solutions/marges-rentabilite/" className="hover:text-white transition-colors">Marges &amp; rentabilité</a></li>
              <li><a href="/solutions/onboarding-fidelisation/" className="hover:text-white transition-colors">Onboarding &amp; fidélisation</a></li>
              <li><a href="/solutions/automatisation-ia/" className="hover:text-white transition-colors">Automatisation &amp; IA</a></li>
            </ul>
          </div>
 
          {/* Core values declaration */}
          <div className="md:col-span-3 space-y-2 text-left md:pt-2">
            <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">Notre engagement</h4>
            <div className="p-3 rounded-lg bg-[#111a2e] border border-[#17243A] text-[11px] font-mono text-gray-500 leading-relaxed space-y-1">
              <p className="text-[#F47B20] font-bold">● Partenaire de votre croissance : la structure d'abord, la technologie ensuite.</p>
              <p>On bâtit des solutions simples et sur mesure pour des résultats concrets et mesurables au quotidien.</p>
            </div>
          </div>
 
        </div>
      </footer>

    </div>
  );
}
