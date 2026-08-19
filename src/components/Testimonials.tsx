import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare, Shield, Smartphone, ArrowRight } from 'lucide-react';

interface GoogleReview {
  type: 'google';
  author: string;
  initial: string;
  avatarBg: string;
  rating: number;
  time: string;
  text: string;
  outcomeTag: string;
}

interface SMSMessage {
  sender: 'hugo' | 'client';
  text: string;
  time?: string;
}

interface SMSTestimonial {
  type: 'sms';
  clientName: string;
  clientSubtitle: string;
  avatarBg: string;
  outcomeTag: string;
  savingValue?: string;
  messages: SMSMessage[];
}

type Testimonial = GoogleReview | SMSTestimonial;

export default function Testimonials() {
  const [filter, setFilter] = useState<'all' | 'google' | 'sms'>('all');

  const testimonials: Testimonial[] = [
    {
      type: 'sms',
      clientName: 'Charles',
      clientSubtitle: 'Les entreprises C.J. Morissette',
      avatarBg: 'bg-emerald-600',
      outcomeTag: 'Gain financier et temps',
      savingValue: '3 500 $ / mois sauvés',
      messages: [
        {
          sender: 'hugo',
          text: "Salut Charles, j'espère que tu vas bien ! Je me demandais à quoi ressemblait le bilan après 3 mois d'utilisation du CRM. Ça se passe toujours bien pour vous !?"
        },
        {
          sender: 'client',
          text: "Salut yes ça va merci, la saison est partie en feu 🔥 Ça va vraiment bien depuis qu'on utilise crm. On sauve à peu près 3500 par mois en admin et ça nous prend moins de temps qu'avant en plus. Vraiment solide mon gars"
        },
        {
          sender: 'hugo',
          text: "Hahah, content que ça se passe A1 pour toi chef. Let's go !!!"
        },
        {
          sender: 'hugo',
          text: "N'hésite pas s'il y a quoi que ce soit, appelle-moi 👌"
        }
      ]
    },
    {
      type: 'sms',
      clientName: 'André',
      clientSubtitle: 'André Pavage',
      avatarBg: 'bg-blue-600',
      outcomeTag: 'Suivis & Gestion de projet',
      savingValue: 'Gain de temps important',
      messages: [
        {
          sender: 'hugo',
          text: "Salut André, J'espère que tu vas bien. Je voulais juste faire un petit suivi après 3 mois d'utilisation. Je suis curieux de savoir comment ça se passe de votre côté ?"
        },
        {
          sender: 'client',
          text: "Bonjour Hugo. Je vais bien merci et toi. On est bien contents, pas de problèmes depuis qu'on s'est parlé. Suivis soumission auto et gestion de projet nous fait gagner bcp de temps. Merci du suivi Hugo. Bonne journée"
        },
        {
          sender: 'hugo',
          text: "Génial, content de l'entendre. S'il y a quoi que ce soit n'hésite pas à m'appeler. Bonne soirée !"
        }
      ]
    },
    {
      type: 'google',
      author: 'Nicolau Dionne',
      initial: 'N',
      avatarBg: 'bg-orange-600',
      rating: 5,
      time: 'Il y a 1 an',
      outcomeTag: 'Système Airtable et coaching',
      text: "On a reçu un excellent service de coaching par HUVI pour améliorer nos résultats avec la technologie. Ils ont été très réactifs et à l'écoute de nos besoins pour la mise en place de notre système Airtable. On recommande fortement !",
    },
    {
      type: 'google',
      author: 'Randolph',
      initial: 'R',
      avatarBg: 'bg-indigo-600',
      rating: 5,
      time: 'Récemment',
      outcomeTag: 'Rapidité et professionnalisme',
      text: "Service incroyable et très rapide, service vraiment professionnel, je le recommande !",
    },
    {
      type: 'sms',
      clientName: 'Jeff',
      clientSubtitle: 'J.R.D. Construction',
      avatarBg: 'bg-amber-600',
      outcomeTag: 'Soumissions et courriels automatisés',
      savingValue: 'Plus de temps pour les clients',
      messages: [
        {
          sender: 'client',
          text: "Hey salut Hugo, juste te dire qu'on apprécie vraiment le travail que t'as fait pour nous. Le CRM c'est solide. On a gagné BEAUCOUP de temps avec les soumissions et les courriels automatiques. L'équipe a pas mal plus de temps à mettre sur les appels clients. Thanks pour ton travail boss"
        },
        {
          sender: 'hugo',
          text: "What's up chef, comment tu vas !? Let's gooo, content d'entendre ça !! Merci de prendre le temps de m'écrire, ça a été un plaisir de travailler avec vous. Là, vous êtes équipés pour rouler. Et s'il y a quoi que ce soit, mon # est toujours ouvert, n'hésite pas à m'appeler 👌"
        }
      ]
    }
  ];

  const filteredTestimonials = testimonials.filter(t => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#17243A]/40" id="testimonials">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F47B20]/3 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17243A]/60 border border-[#243755] text-xs font-mono text-gray-400">
            <CheckCircle className="w-3.5 h-3.5 text-[#F47B20]" />
            <span>Retours d'expérience vérifiés</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            Des résultats concrets, <span className="text-[#F47B20]">sur le terrain.</span>
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Pas de blabla marketing. Juste des entrepreneurs qui ont simplifié leurs opérations, gagné du temps et repris le contrôle de leur entreprise.
          </p>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-[#F47B20] text-white font-semibold'
                  : 'bg-[#111a2e]/60 text-gray-400 hover:text-white border border-[#17243A]/40'
              }`}
              id="filter-all-btn"
            >
              Tous les retours ({testimonials.length})
            </button>
            <button
              onClick={() => setFilter('sms')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                filter === 'sms'
                  ? 'bg-[#F47B20] text-white font-semibold'
                  : 'bg-[#111a2e]/60 text-gray-400 hover:text-white border border-[#17243A]/40'
              }`}
              id="filter-sms-btn"
            >
              <Smartphone className="w-3 h-3" />
              Suivis SMS
            </button>
            <button
              onClick={() => setFilter('google')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                filter === 'google'
                  ? 'bg-[#F47B20] text-white font-semibold'
                  : 'bg-[#111a2e]/60 text-gray-400 hover:text-white border border-[#17243A]/40'
              }`}
              id="filter-google-btn"
            >
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              Avis Google
            </button>
          </div>
        </div>

        {/* Testimonials Masonry/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {filter === 'google' ? (
            // If only google selected, display in a nice side-by-side or centering grid
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTestimonials.map((testimonial, idx) => (
                <GoogleCard key={idx} review={testimonial as GoogleReview} />
              ))}
            </div>
          ) : filter === 'sms' ? (
            // If only SMS, display side-by-side
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial, idx) => (
                <SMSConversation key={idx} sms={testimonial as SMSTestimonial} />
              ))}
            </div>
          ) : (
            // Mixed Layout for 'all'
            <>
              {/* Left Column: Google Reviews & Outcomes */}
              <div className="space-y-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Avis Google</span>
                </div>
                {filteredTestimonials
                  .filter(t => t.type === 'google')
                  .map((t, idx) => (
                    <GoogleCard key={idx} review={t as GoogleReview} />
                  ))}


              </div>

              {/* Right Column: Authentic Conversations */}
              <div className="space-y-8">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="w-4 h-4 text-[#F47B20]" />
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Suivis SMS avec Hugo</span>
                </div>
                {filteredTestimonials
                  .filter(t => t.type === 'sms')
                  .map((t, idx) => (
                    <SMSConversation key={idx} sms={t as SMSTestimonial} />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// Sub-Component: SMS Conversation Mockup
function SMSConversation({ sms }: { sms: SMSTestimonial; key?: React.Key }) {
  return (
    <div className="rounded-2xl border border-[#17243A]/50 bg-[#070a12] shadow-2xl overflow-hidden font-sans">
      {/* Phone Header Replica */}
      <div className="bg-[#0b101d] px-4 py-3.5 border-b border-[#17243A]/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${sms.avatarBg} flex items-center justify-center text-white font-bold text-xs uppercase tracking-wider shadow-inner`}>
            {sms.clientName[0]}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{sms.clientName}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#17243A] text-gray-400 font-mono">Client</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium truncate max-w-[150px] sm:max-w-[180px]">{sms.clientSubtitle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest font-semibold">{sms.outcomeTag}</span>
          {sms.savingValue && (
            <span className="text-[11px] text-orange-400 font-mono mt-1 font-semibold">{sms.savingValue}</span>
          )}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="p-4 space-y-3.5 max-h-[380px] overflow-y-auto bg-gradient-to-b from-[#070a12] to-[#0c1221] scrollbar-thin scrollbar-thumb-gray-800">
        {sms.messages.map((msg, idx) => {
          const isHugo = msg.sender === 'hugo';
          return (
            <div key={idx} className={`flex flex-col ${isHugo ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-[11px] font-mono text-gray-500">
                  {isHugo ? 'Hugo (HUVI)' : sms.clientName}
                </span>
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                  isHugo
                    ? 'bg-[#F47B20] text-white rounded-br-none font-medium'
                    : 'bg-[#17243A]/60 text-gray-200 border border-[#1f314f]/40 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Phone Footer Input Simulation */}
      <div className="bg-[#0b101d]/60 px-4 py-3 border-t border-[#17243A]/40 flex items-center justify-between text-gray-500">
        <span className="text-[11px] font-mono">Suivi SMS</span>
        <MessageSquare className="w-3.5 h-3.5 text-gray-600" />
      </div>
    </div>
  );
}

// Sub-Component: Google Review Card
function GoogleCard({ review }: { review: GoogleReview; key?: React.Key }) {
  return (
    <div className="rounded-2xl border border-[#17243A]/50 bg-gradient-to-b from-[#0b101d] to-[#070b13] p-6 shadow-xl relative overflow-hidden group hover:border-[#F47B20]/30 transition-all duration-300">
      {/* Decorative Google 'G' icon in background */}
      <div className="absolute right-4 top-4 opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity duration-300">
        <svg className="w-16 h-16 fill-current text-white animate-pulse" viewBox="0 0 24 24">
          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.114 4.114a5.93 5.93 0 0 1-5.93-5.93 5.93 5.93 0 0 1 5.93-5.93c1.614 0 3.12.581 4.3 1.645l3.1-3.1C19.146 2.064 15.897 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.783 0 10.61-4.15 11.24-9.84H12.24z"/>
        </svg>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${review.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
            {review.initial}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              {review.author}
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/10" />
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 font-mono">{review.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 bg-[#4285F4]/10 border border-[#4285F4]/20 rounded-full px-2 py-0.5">
            <span className="text-[11px] font-mono text-[#4285F4] uppercase font-bold tracking-wider">Avis Google</span>
          </div>
          <span className="text-[11px] text-[#F47B20] font-mono mt-1">{review.outcomeTag}</span>
        </div>
      </div>

      <p className="text-xs text-gray-300 mt-4 leading-relaxed font-sans italic">
        "{review.text}"
      </p>

      {/* Trust Seal */}
      <div className="mt-4 pt-3 border-t border-[#17243A]/30 flex items-center justify-between text-[11px] font-mono text-gray-500">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-emerald-500" />
          Avis client 100% vérifié
        </span>
        <span className="text-yellow-500">★ ★ ★ ★ ★</span>
      </div>
    </div>
  );
}
