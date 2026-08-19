import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Download, 
  ArrowRight, 
  BookOpen, 
  Server, 
  TrendingUp, 
  Clock, 
  Cpu,
  FileText,
  Printer,
  Bot
} from 'lucide-react';

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: () => void;
}

type TabType = 'intro' | 'centraliser' | 'analyser' | 'structurer' | 'automatiser';

export default function BlueprintModal({ isOpen, onClose, onActionClick }: BlueprintModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('intro');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-10" id="blueprint-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#111a2e]/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#15223c] border border-[#17243A] rounded-2xl max-w-5xl w-full h-[85vh] sm:h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in z-10" id="blueprint-modal-panel">
        
        {/* Header */}
        <div className="p-6 border-b border-[#17243A] flex items-center justify-between bg-[#111a2e]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-[#F47B20]/10 text-[#F47B20] border border-[#F47B20]/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg">Le blueprint de la méthode C.A.S.A.</h3>
              <p className="text-[11px] font-mono text-gray-500 mt-0.5 uppercase tracking-wider">GUIDE DE STRUCTURATION ET D'OPTIMISATION • HUVI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg border border-[#17243A] hover:bg-[#17243A] text-gray-400 hover:text-white transition-all cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-mono"
              title="Imprimer ou sauvegarder en PDF"
              id="blueprint-print-btn"
            >
              <Printer className="w-4 h-4" />
              <span>PDF / Imprimer</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg border border-[#17243A] hover:bg-red-500/10 hover:border-red-500/30 text-gray-400 hover:text-red-400 transition-all cursor-pointer"
              id="blueprint-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#17243A] bg-[#111a2e]/40 overflow-x-auto scrollbar-none shrink-0" id="blueprint-tabs">
          {[
            { id: 'intro', label: 'Introduction' },
            { id: 'centraliser', label: 'C • Centraliser' },
            { id: 'analyser', label: 'A • Analyser' },
            { id: 'structurer', label: 'S • Structurer' },
            { id: 'automatiser', label: 'A • Automatiser' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-5 py-3.5 text-xs font-mono font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap flex-1 text-center ${
                activeTab === tab.id
                  ? 'border-[#F47B20] text-[#F47B20] bg-[#17243A]/20'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-[#17243A]/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 font-sans text-gray-300 text-sm leading-relaxed" id="blueprint-modal-content">
          
          {activeTab === 'intro' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="text-center space-y-4 py-4">
                <span className="text-xs font-mono tracking-widest text-[#F47B20] uppercase font-bold">L'Art de simplifier</span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Pourquoi les entreprises en croissance plafonnent ?
                </h3>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                  La majorité des entrepreneurs pensent que pour grandir, il faut travailler plus fort. Mais à un certain point, l'effort ne suffit plus. Ce qui vous bloque n'est pas votre volonté : c'est votre structure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-xl border border-[#17243A] bg-[#111a2e]/50 space-y-3">
                  <h4 className="font-display font-bold text-white text-sm uppercase text-[#F47B20]">L'angle mort</h4>
                  <p className="text-xs text-gray-400">
                    Plus vous prenez de clients, plus la quantité de courriels, de papiers et de suivis explose. Sans un système solide, l'absence de structure devient le principal angle mort. Tout passe par vous, et vous manquez de temps pour piloter la croissance.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-[#17243A] bg-[#111a2e]/50 space-y-3">
                  <h4 className="font-display font-bold text-white text-sm uppercase text-green-400">La solution : La méthode C.A.S.A.</h4>
                  <p className="text-xs text-gray-400">
                    Notre méthode est un cadre pratique en 4 étapes simples conçu pour décharger le dirigeant, responsabiliser l'équipe et automatiser la paperasse. Pas de théorie complexe, juste de la clarté opérationnelle.
                  </p>
                </div>
              </div>

              <div className="border border-[#17243A] rounded-xl p-5 bg-[#17243A]/10 space-y-3 mt-6">
                <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#F47B20]" />
                  <span>Ce que vous allez accomplir avec ce guide :</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-400 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-[#F47B20]">•</span> Centraliser 100% de vos données clés
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F47B20]">•</span> Libérer plus de 10h par semaine
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F47B20]">•</span> Rendre votre équipe autonome sur le terrain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F47B20]">•</span> Automatiser 80% des tâches à faible valeur
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'centraliser' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-[#17243A] pb-4">
                <span className="text-xs font-mono text-[#F47B20] uppercase tracking-wider block">ÉTAPE 01</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">C • Centraliser l'information</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Éliminez la dispersion de vos fichiers clients, de vos soumissions et de vos données opérationnelles.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Lorsque l'information est dispersée entre Excel, les courriels, les SMS et la mémoire de chacun, l'erreur est inévitable. Centraliser signifie définir une "source unique de vérité" pour votre entreprise.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                  <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5">
                    <span className="block text-[11px] font-mono text-red-400 uppercase font-semibold">AVANT</span>
                    <p className="text-xs text-gray-400 mt-2">
                      Fichiers sur l'ordinateur du bureau, notes papier sur les chantiers, emails dans 3 boîtes différentes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-green-500/10 bg-green-500/5 md:col-span-2">
                    <span className="block text-[11px] font-mono text-green-400 uppercase font-semibold">APRÈS</span>
                    <p className="text-xs text-gray-400 mt-2">
                      Un seul outil accessible sur mobile et ordinateur pour toute l'équipe. Fiches clients unifiées avec historique des devis, notes de terrain et statuts en temps réel.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-[#F47B20]">Plan d'action et checklist :</h4>
                  <div className="space-y-2 bg-[#111a2e]/40 p-4 rounded-xl border border-[#17243A]/60">
                    {[
                      "Créer un répertoire client unique (base de données unifiée).",
                      "Interdire l'utilisation des cahiers papier pour les données de contact.",
                      "Centraliser les statuts des soumissions (ex. À envoyer, Envoyé, Signé, Perdu).",
                      "Configurer un accès mobile simple pour vos employés sur les chantiers ou en déplacement."
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 text-xs text-gray-300 cursor-pointer hover:text-white transition-colors py-1">
                        <input type="checkbox" className="mt-0.5 rounded border-[#17243A] text-[#F47B20] focus:ring-[#F47B20] bg-transparent" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analyser' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-[#17243A] pb-4">
                <span className="text-xs font-mono text-[#F47B20] uppercase tracking-wider block">ÉTAPE 02</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">A • Analyser vos angles morts</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Identifiez précisément où l'argent s'échappe et où votre équipe perd le plus de temps.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  On ne peut pas optimiser ce qu'on ne mesure pas. L'étape d'analyse consiste à cartographier vos processus existants pour débusquer les frictions invisibles qui ralentissent votre quotidien.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                  <div className="p-4 rounded-xl border border-[#17243A] bg-[#111a2e]/40">
                    <span className="text-xs font-mono text-gray-400 uppercase block font-semibold">Friction classique #1</span>
                    <h4 className="font-display font-bold text-white text-xs mt-1">La double saisie administrative</h4>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Copier les heures d'un fichier Excel vers un autre outil, puis dans la facturation. Une perte moyenne de 4h à 8h par semaine.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#17243A] bg-[#111a2e]/40">
                    <span className="text-xs font-mono text-gray-400 uppercase block font-semibold">Friction classique #2</span>
                    <h4 className="font-display font-bold text-white text-xs mt-1">Les devis restés sans nouvelles</h4>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Des dizaines de soumissions envoyées, mais jamais relancées par manque de temps. Une perte directe de milliers de dollars de chiffre d'affaires.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-[#F47B20]">Plan d'action et checklist :</h4>
                  <div className="space-y-2 bg-[#111a2e]/40 p-4 rounded-xl border border-[#17243A]/60">
                    {[
                      "Lister toutes les étapes requises pour passer de la demande du client à la facturation finale.",
                      "Estimer le nombre d'heures réelles perdues sur des tâches de secrétariat répétitives.",
                      "Vérifier le taux de signature réel de vos devis de la dernière année.",
                      "Identifier les 3 questions récurrentes que vos employés vous posent chaque jour."
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 text-xs text-gray-300 cursor-pointer hover:text-white transition-colors py-1">
                        <input type="checkbox" className="mt-0.5 rounded border-[#17243A] text-[#F47B20] focus:ring-[#F47B20] bg-transparent" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'structurer' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-[#17243A] pb-4">
                <span className="text-xs font-mono text-[#F47B20] uppercase tracking-wider block">ÉTAPE 03</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">S • Structurer vos opérations</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Standardisez vos processus pour rendre votre équipe autonome et prête à soutenir la croissance.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  La structure est ce qui permet à une entreprise de tourner sans que le propriétaire doive tout superviser. Cela implique d'établir des règles du jeu claires et faciles à suivre pour n'importe quelle nouvelle embauche.
                </p>

                <div className="border border-[#17243A] rounded-xl p-5 bg-[#111a2e]/30 space-y-3">
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">Règle d'or : Rendre la structure plus simple que le désordre</h4>
                  <p className="text-xs text-gray-400">
                    Si un processus nécessite de lire un document de 40 pages, personne ne l'appliquera. Un bon processus se résume en une check-list visuelle simple de 3 à 5 étapes clés.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-[#F47B20]">Plan d'action et checklist :</h4>
                  <div className="space-y-2 bg-[#111a2e]/40 p-4 rounded-xl border border-[#17243A]/60">
                    {[
                      "Rédiger un guide de démarrage ultra-simple pour chaque nouveau membre de l'équipe.",
                      "Définir précisément le responsable unique de chaque processus clé (RACI simple).",
                      "Établir des gabarits standards pour vos messages, rapports et estimations.",
                      "Mettre en place une routine hebdomadaire de 15 minutes pour faire le point sur les projets."
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 text-xs text-gray-300 cursor-pointer hover:text-white transition-colors py-1">
                        <input type="checkbox" className="mt-0.5 rounded border-[#17243A] text-[#F47B20] focus:ring-[#F47B20] bg-transparent" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'automatiser' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
              <div className="border-b border-[#17243A] pb-4">
                <span className="text-xs font-mono text-[#F47B20] uppercase tracking-wider block">ÉTAPE 04</span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">A • Automatiser avec l'IA et les flux intelligents</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Utilisez la technologie moderne pour faire disparaître les tâches à faible valeur ajoutée.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  L'automatisation n'est pas faite pour remplacer le contact humain, mais pour éliminer la paperasse administrative qui fatigue votre équipe. Connectez vos logiciels existants pour faire circuler l'information d'elle-même.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                  <div className="p-4 rounded-xl border border-[#3A7697]/25 bg-[#3A7697]/5">
                    <h4 className="font-display font-bold text-[#E2E8F0] text-xs flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#3A7697]" />
                      <span>Exemple : Relances de devis</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-2">
                      Un devis est envoyé. Si aucune signature n'est reçue après 3 jours, un courriel poli de relance s'envoie de façon autonome. Taux de conversion moyen augmenté de 15%.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#F47B20]/25 bg-[#F47B20]/5">
                    <h4 className="font-display font-bold text-[#E2E8F0] text-xs flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#F47B20]" />
                      <span>Exemple : Classement de factures</span>
                    </h4>
                    <p className="text-xs text-gray-400 mt-2">
                      Dès qu'une facture fournisseur entre par courriel, un assistant IA extrait les données clés (montant, taxes, nom) et la classe directement dans votre comptabilité.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm uppercase tracking-wider text-[#F47B20]">Plan d'action et checklist :</h4>
                  <div className="space-y-2 bg-[#111a2e]/40 p-4 rounded-xl border border-[#17243A]/60">
                    {[
                      "Relier vos outils de messagerie professionnelle avec votre CRM d'affaires.",
                      "Mettre en place des automatisations de relances de devis.",
                      "Éliminer les saisies manuelles répétées entre les chantiers et la facturation.",
                      "Intégrer des assistants IA pour résumer les réunions et trier les documents administratifs."
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 text-xs text-gray-300 cursor-pointer hover:text-white transition-colors py-1">
                        <input type="checkbox" className="mt-0.5 rounded border-[#17243A] text-[#F47B20] focus:ring-[#F47B20] bg-transparent" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#17243A] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111a2e] shrink-0">
          <p className="text-[11px] text-gray-500 font-sans text-center sm:text-left">
            Besoin d'aide pour adapter et implanter ce blueprint dans votre entreprise ?
          </p>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-3 border border-[#17243A] hover:bg-[#17243A] text-gray-300 hover:text-white rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer whitespace-nowrap"
              id="blueprint-footer-close"
            >
              Fermer
            </button>
            <a
              href="https://huvioptimisation.fillout.com/rencontre-doptimisation-exploratoire"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F47B20] hover:bg-[#ff9242] text-white font-bold text-xs uppercase font-mono tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5 cursor-pointer text-center"
              id="blueprint-footer-cta"
            >
              <span>Séance d'optimisation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
