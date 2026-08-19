import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, HelpCircle, Workflow, Settings, Cpu, DollarSign, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('before-starting');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const categories: FAQCategory[] = useMemo(() => [
    {
      id: 'before-starting',
      label: 'Avant de commencer',
      icon: <HelpCircle className="w-4 h-4" />,
      items: [
        {
          id: 'free-session',
          question: "En quoi consiste la séance d'optimisation gratuite ?",
          answer: "La séance d'optimisation est une discussion de 30 à 45 minutes où on cherche à comprendre comment votre entreprise fonctionne aujourd'hui. On parle de vos défis, de vos façons de travailler et des endroits où vous perdez du temps. L'objectif n'est pas de vous vendre quelque chose, mais de voir si on peut réellement vous aider."
        },
        {
          id: 'what-during-meeting',
          question: "Que va-t-on faire pendant cette rencontre ?",
          answer: "On va parler de votre entreprise, de votre équipe, de vos outils et de votre quotidien. On cherche à comprendre ce qui vous ralentit et à identifier quelques pistes d'amélioration concrètes. Si on croit qu'on peut créer de la valeur, on vous expliquera comment."
        },
        {
          id: 'preparation',
          question: "Dois-je préparer quelque chose avant notre rencontre ?",
          answer: "Non. Si vous avez déjà des documents, des procédures ou une idée des défis que vous vivez, tant mieux. Sinon, on vous guidera avec les bonnes questions."
        },
        {
          id: 'good-candidate',
          question: "Comment savoir si mon entreprise est un bon candidat ?",
          answer: "Si vous avez l'impression que votre entreprise fonctionne encore beaucoup grâce à des suivis manuels, des fichiers Excel ou à quelques personnes qui gardent tout dans leur tête, il y a probablement des opportunités intéressantes."
        },
        {
          id: 'where-to-start',
          question: "Je ne sais pas par où commencer. Est-ce un problème ?",
          answer: "Au contraire. C'est souvent pour cette raison que les entreprises nous contactent. Comprendre où agir en premier fait partie de notre travail."
        }
      ]
    },
    {
      id: 'approach',
      label: 'Notre approche',
      icon: <Workflow className="w-4 h-4" />,
      items: [
        {
          id: 'why-huvi',
          question: "Pourquoi choisir HUVI plutôt qu'une agence IA ?",
          answer: (
            <div className="space-y-3 font-sans text-gray-300">
              <p className="text-white font-bold">
                Parce qu'on ne commence pas par parler d'intelligence artificielle. On commence par parler de votre entreprise.
              </p>
              <p>
                Trop d'entreprises se font vendre des outils avant même d'avoir compris leurs vrais défis. Chez HUVI, c'est l'inverse. On prend le temps de comprendre comment vous travaillez, ce qui vous ralentit et où vous perdez du temps. Ensuite seulement, on bâtit une solution adaptée à votre réalité.
              </p>
              <p className="text-[#F47B20] font-medium">
                L'IA, les automatisations et les systèmes ne sont pas une finalité. Ce sont des leviers pour bâtir une entreprise plus simple à gérer, plus autonome et prête à continuer de grandir.
              </p>
            </div>
          )
        },
        {
          id: 'process-audit',
          question: "En quoi consiste un audit de processus ?",
          answer: "On prend le temps de comprendre comment le travail circule dans votre entreprise. De la première demande d'un client jusqu'à la facture finale, on cartographie vos processus, on repère les problèmes et on identifie les occasions de simplifier vos opérations."
        },
        {
          id: 'casa-method',
          question: "Qu'est-ce que la méthode CASA ?",
          answer: (
            <div className="space-y-2">
              <p className="font-bold text-white">CASA est la méthode qu'on utilise pour bâtir des entreprises plus solides.</p>
              <p className="text-[#F47B20] font-mono font-bold text-sm">Centraliser. Analyser. Structurer. Automatiser.</p>
              <p>On commence toujours par mettre de l'ordre avant d'ajouter de la technologie.</p>
            </div>
          )
        },
        {
          id: 'why-analysis-first',
          question: "Pourquoi commencez-vous par analyser l'entreprise avant de parler de technologie ?",
          answer: "Parce qu'un mauvais processus reste un mauvais processus... même s'il est automatisé. Notre objectif est d'abord de comprendre votre réalité pour construire une solution qui aura un réel impact."
        },
        {
          id: 'identify-opportunities',
          question: "Comment identifiez-vous les opportunités d'amélioration ?",
          answer: "On regarde où votre équipe perd du temps, où les erreurs reviennent souvent, où l'information circule mal et où vous devez intervenir inutilement. C'est généralement là que se trouvent les plus grands gains."
        }
      ]
    },
    {
      id: 'solutions',
      label: 'Les solutions',
      icon: <Cpu className="w-4 h-4" />,
      items: [
        {
          id: 'automation-choice',
          question: "Comment choisissez-vous ce qui devrait être automatisé ?",
          answer: "On automatise uniquement les tâches répétitives, prévisibles et à faible valeur ajoutée. Les décisions importantes et les relations humaines restent entre les mains de votre équipe."
        },
        {
          id: 'replace-software',
          question: "Est-ce que vous remplacez nos logiciels actuels ?",
          answer: "Pas nécessairement. Dans bien des cas, on préfère tirer le maximum de vos outils actuels avant d'en ajouter de nouveaux."
        },
        {
          id: 'which-software',
          question: "Quels logiciels utilisez-vous ?",
          answer: "Ça dépend de votre entreprise. Nous ne sommes attachés à aucun logiciel en particulier. Notre rôle est de recommander les outils les mieux adaptés à votre réalité, pas les plus populaires."
        },
        {
          id: 'connect-tools',
          question: "Pouvez-vous connecter mes outils existants ?",
          answer: "Oui. C'est même une grande partie de notre travail. CRM, comptabilité, courriels, formulaires, gestion de projets... notre objectif est que vos outils travaillent enfin ensemble."
        },
        {
          id: 'ai-replace-employees',
          question: "L'IA remplacera-t-elle mes employés ?",
          answer: "Non. On utilise l'IA pour enlever la paperasse, accélérer les tâches répétitives et donner plus de temps à votre équipe pour les tâches qui demandent du jugement, de l'expérience et du contact humain."
        },
        {
          id: 'ai-agent-look',
          question: "À quoi ressemble un agent IA dans une entreprise ?",
          answer: "Imaginez un employé qui ne dort jamais et qui adore les tâches répétitives. Il peut classer des documents, préparer des suivis, répondre aux questions fréquentes, analyser des rapports ou mettre à jour vos systèmes. Il travaille en arrière-plan pour soutenir votre équipe."
        },
        {
          id: 'processes-to-automate',
          question: "Quels processus peut-on automatiser ?",
          answer: "Les suivis de soumissions, la gestion documentaire, la création de dossiers clients, les relances, les approbations, les rapports, les notifications, la saisie de données et bien plus. Chaque entreprise est différente. Les possibilités le sont aussi."
        }
      ]
    },
    {
      id: 'project',
      label: 'Votre projet',
      icon: <DollarSign className="w-4 h-4" />,
      items: [
        {
          id: 'custom-systems',
          question: "Est-ce que vous développez des systèmes sur mesure ?",
          answer: "Oui. Chaque entreprise fonctionne différemment. C'est pourquoi on construit des systèmes adaptés à votre réalité plutôt que d'essayer de faire entrer votre entreprise dans un modèle préfabriqué."
        },
        {
          id: 'project-timeline',
          question: "Combien de temps prend un projet ?",
          answer: "Tout dépend de sa portée. Certaines améliorations peuvent être implantées en quelques jours. D'autres se déploient progressivement sur plusieurs semaines. On privilégie toujours une approche par étapes pour créer de la valeur rapidement."
        },
        {
          id: 'how-deployment-works',
          question: "Comment se déroule une implantation ?",
          answer: "On commence par comprendre votre entreprise, puis on construit une feuille de route claire. Ensuite, on implante les solutions progressivement, en validant chaque étape avec votre équipe."
        },
        {
          id: 'training',
          question: "Est-ce que vous formez notre équipe ?",
          answer: "Oui. Un bon système ne sert à rien si personne ne l'utilise. On prend le temps d'accompagner votre équipe pour que les nouveaux outils et les nouvelles façons de travailler deviennent naturels."
        },
        {
          id: 'post-support',
          question: "Offrez-vous un accompagnement après l'implantation ?",
          answer: "Oui. Une entreprise évolue constamment. On peut continuer à optimiser vos processus, ajouter de nouvelles automatisations et faire évoluer vos systèmes au rythme de votre croissance."
        },
        {
          id: 'cost',
          question: "Combien ça coûte ?",
          answer: "Chaque entreprise est différente. Après une première rencontre, on est en mesure de vous proposer une approche adaptée à votre réalité, à vos objectifs et à votre budget."
        },
        {
          id: 'crm-failure',
          question: "Nous avons déjà essayé un CRM... et ça n'a pas fonctionné.",
          answer: "Vous n'êtes pas les premiers. Le problème n'est souvent pas le CRM lui-même. C'est le manque de structure autour. Avant de parler d'outil, on s'assure que vos façons de travailler sont claires, simples et adaptées à votre entreprise."
        },
        {
          id: 'target-industries',
          question: "Est-ce que vous travaillez seulement avec la construction ?",
          answer: "Nous travaillons principalement avec les entreprises du bâtiment, de l'immobilier et les PME de services. Cela dit, notre méthode s'applique à toute entreprise qui souhaite mieux structurer ses opérations et simplifier son quotidien."
        },
        {
          id: 'project-success',
          question: "Comment mesurez-vous le succès d'un projet ?",
          answer: "Pour nous, un projet est réussi lorsque votre entreprise fonctionne mieux qu'avant. Moins de temps perdu. Moins de tâches répétitives. Une équipe plus autonome. Une meilleure visibilité sur vos opérations. Et surtout, moins de gestion pour vous."
        }
      ]
    }
  ], []);

  // Filter items based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories.map(cat => {
      const matchingItems = cat.items.filter(
        item => 
          item.question.toLowerCase().includes(query) || 
          (typeof item.answer === 'string' && item.answer.toLowerCase().includes(query))
      );
      return {
        ...cat,
        items: matchingItems
      };
    }).filter(cat => cat.items.length > 0);
  }, [categories, searchQuery]);

  // Handle accordion toggling
  const toggleItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // If search is active, we might want to default expand items or show all categories
  const hasActiveSearch = searchQuery.trim().length > 0;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="faq">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="text-xs font-mono text-[#F47B20] uppercase tracking-widest font-bold">RÉPONSES PRATIQUES</span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Foire aux questions (FAQ)
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto font-sans leading-relaxed">
          Tout ce que vous devez savoir sur notre accompagnement, notre méthode de simplification opérationnelle et les automatisations.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mt-6">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher une question ou un sujet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D1527] border border-[#17243A] rounded-xl p-3.5 pl-11 text-xs text-gray-300 focus:outline-none focus:border-[#F47B20] focus:ring-1 focus:ring-[#F47B20]/30 transition-all font-sans"
            id="faq-search-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Category Selectors - hidden on mobile, list/tabs on desktop */}
        {!hasActiveSearch && (
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-2 sticky top-24">
            <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest pl-3 mb-2">CATÉGORIES</span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-xs font-mono transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#17243A] border-[#F47B20] text-[#F47B20] font-bold shadow-md shadow-[#F47B20]/5'
                      : 'bg-[#090D16]/50 border-[#17243A]/80 text-gray-400 hover:bg-[#111a2e] hover:text-white'
                  }`}
                  id={`faq-cat-btn-${cat.id}`}
                >
                  <div className={`p-1.5 rounded transition-all ${isActive ? 'bg-[#F47B20]/10 text-[#F47B20]' : 'bg-[#111a2e] text-gray-500'}`}>
                    {cat.icon}
                  </div>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile quick scroll/category picker if no active search */}
        {!hasActiveSearch && (
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-thin">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono whitespace-nowrap cursor-pointer shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#17243A] border-[#F47B20] text-[#F47B20] font-bold'
                      : 'bg-[#090D16]/50 border-[#17243A]/80 text-gray-400'
                  }`}
                  id={`faq-cat-btn-mobile-${cat.id}`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Right Accordion Panel */}
        <div className={`${hasActiveSearch ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-4 w-full`}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => {
              // In search mode we show all categories that contain matching items. 
              // In normal mode, on desktop we filter by active category (mobile shows everything or active category depending on setup, but filtering active is cleaner)
              if (!hasActiveSearch && activeCategory !== cat.id) return null;

              return (
                <div key={cat.id} className="space-y-4">
                  {hasActiveSearch && (
                    <span className="block text-[11px] font-mono text-[#F47B20] uppercase tracking-widest pl-1 mt-4">
                      {cat.label}
                    </span>
                  )}

                  {cat.items.map((item) => {
                    const isExpanded = expandedItems[item.id] || hasActiveSearch;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border transition-all duration-300 bg-[#090D16]/40 ${
                          isExpanded 
                            ? 'border-[#17243A] shadow-md bg-[#111a2e]/20' 
                            : 'border-[#17243A]/80 hover:border-gray-700'
                        }`}
                        id={`faq-item-box-${item.id}`}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-display font-bold text-white hover:text-[#F47B20] transition-colors cursor-pointer gap-4"
                          aria-expanded={isExpanded}
                          id={`faq-toggle-${item.id}`}
                        >
                          <span>{item.question}</span>
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-[#F47B20]' : ''
                            }`} 
                          />
                        </button>
                        
                        {isExpanded && (
                          <div 
                            className="px-5 pb-5 pt-1 text-xs text-gray-300 font-sans leading-relaxed border-t border-[#17243A]/30 animate-fade-in"
                            id={`faq-answer-${item.id}`}
                          >
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-[#090D16]/20 rounded-2xl border border-[#17243A] space-y-2">
              <p className="text-sm text-gray-400 font-medium">Aucun résultat trouvé pour "{searchQuery}"</p>
              <p className="text-xs text-gray-500">Essayez des termes plus larges comme "CASA", "IA", "CRM" ou "cout".</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
