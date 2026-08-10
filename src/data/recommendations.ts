import { Industry, Challenge, SystemRecommendation } from '../types';

export const RECOMMENDATIONS_MAP: Record<Industry, Record<Challenge, SystemRecommendation>> = {
  construction: {
    sales: {
      title: "Système d'acquisition et devis HUVI pour la construction",
      description: "Centralisez vos demandes, accélérez l'estimation et automatisez les suivis de devis pour maximiser votre taux de conversion sans surcharger vos estimateurs.",
      modules: [
        "Portail client simple pour qualifier les projets et déposer des plans",
        "CRM connecté avec relances automatiques adaptées aux étapes de soumission",
        "Modèles d'estimations dynamiques intégrés pour calcul de marge en temps réel"
      ],
      aiAgents: [
        "Analyste d'Estimations : Extrait les détails clés des cahiers des charges et compare avec l'historique de vos prix.",
        "Assistant Commercial : Qualifie les prospects par email et automatise les relances polies des devis en attente."
      ],
      impactEstimate: "Réduction de 40% du temps de préparation des soumissions et +18% de taux de signature."
    },
    administration: {
      title: "Système d'automatisation administrative et facturation",
      description: "Éliminez la double saisie entre vos chantiers et la comptabilité. Connectez vos logiciels de gestion de projet à vos outils comptables de manière fluide.",
      modules: [
        "Liaison automatique des fiches de temps d'employés aux feuilles de paie",
        "Générateur automatique de factures progressives et quittances",
        "Centralisation et numérisation simple de vos factures de fournisseurs"
      ],
      aiAgents: [
        "Assistant d'Analyse : Révise les factures de sous-traitants, signale les écarts de prix et les classe par projet.",
        "Assistant Administratif : Classe automatiquement vos reçus de matériaux et vérifie la conformité requise."
      ],
      impactEstimate: "Économie de 15h à 20h par semaine en saisie manuelle et élimination des erreurs de facturation."
    },
    projects: {
      title: "Système de suivi opérationnel et chantiers",
      description: "Assurez-vous que l'information circule instantanément entre le bureau et le chantier pour éviter les retards et les dépassements de coûts.",
      modules: [
        "Tableau de bord de répartition des équipes et des équipements en temps réel",
        "Formulaires de rapports de chantier mobiles simplifiés avec synchronisation immédiate",
        "Module de gestion des avenants (change orders) avec signature client sur tablette"
      ],
      aiAgents: [
        "Coordonnateur de Projet : Analyse les rapports journaliers pour identifier les risques d'échéancier et les surcoûts matériels.",
        "Assistant d'Opérations : Prévoit les angles morts de main-d'œuvre basés sur la météo et la chaîne logistique."
      ],
      impactEstimate: "-12% de pertes matérielles et réduction drastique des conflits liés aux travaux supplémentaires non approuvés."
    },
    communication: {
      title: "Hub de Communication Clients-Chantier-Bureaux",
      description: "Centralisez toutes les communications avec les clients, sous-traitants et architectes dans un fil d'actualité clair et auditable.",
      modules: [
        "Portail client de qualité supérieure avec photos de progression du chantier",
        "Messagerie collaborative simplifiée par projet et par lot",
        "Alertes SMS automatiques pour les modifications d'horaires des sous-traitants"
      ],
      aiAgents: [
        "Assistant Communication : Rédige des comptes-rendus de chantier hebdomadaires professionnels et gère les questions courantes des clients.",
        "Coordonnateur de Projet : Envoie des notifications de coordination aux équipes terrain."
      ],
      impactEstimate: "95% de satisfaction client et élimination complète des appels de suivi répétitifs au gestionnaire."
    },
    data: {
      title: "Tableau de bord de rentabilité de projets",
      description: "Visualisez en temps réel si vos projets sont rentables, comparez vos coûts réels à vos estimations initiales et prenez des décisions basées sur les faits.",
      modules: [
        "Tableau de bord de rentabilité brute par projet (matériaux, main-d'œuvre, sous-traitance)",
        "Suivi des flux de trésorerie (cash-flow) prévisionnels par étape de projet",
        "Indicateurs de performance simples et unifiés pour la direction"
      ],
      aiAgents: [
        "Assistant d'Analyse : Détecte les variations de marges anormales et propose des optimisations d'achats groupés.",
        "Assistant d'Analyse Documentaire : Rapproche automatiquement les bons de livraison avec les factures fournisseurs correspondantes."
      ],
      impactEstimate: "Amélioration de 3.5% de la marge nette globale grâce à une visibilité immédiate sur les dérives."
    }
  },
  services: {
    sales: {
      title: "Pipeline d'acquisition et de qualification de services",
      description: "Automatisez la prise de rendez-vous qualifiés et assurez-vous qu'aucun prospect ne soit oublié grâce à un processus de qualification automatisé.",
      modules: [
        "Formulaire de qualification simple et intelligent",
        "Prise de rendez-vous intégrée synchronisée avec les calendriers de votre équipe",
        "Relances courriels et SMS personnalisées pour réchauffer les prospects"
      ],
      aiAgents: [
        "Assistant Commercial : Qualifie les prospects, pré-analyse leurs besoins et prépare une fiche de synthèse avant le premier appel.",
        "Assistant d'Analyse : Identifie les questions les plus fréquentes des prospects pour améliorer vos propositions."
      ],
      impactEstimate: "Doublement des rendez-vous qualifiés pris et diminution de 60% du temps de qualification manuel."
    },
    administration: {
      title: "Système d'automatisation des contrats et facturation récurrente",
      description: "Structurez la gestion de vos ententes de services, factures récurrentes et renouvellements de contrats de façon simple et autonome.",
      modules: [
        "Générateur automatique de propositions de services personnalisées",
        "Liaison automatique de vos outils de facturation et de comptabilité",
        "Espace client pour la gestion des ententes, des modes de paiement et de l'historique"
      ],
      aiAgents: [
        "Assistant Administratif : Envoie des rappels de paiement automatisés avec un ton professionnel et personnalisé.",
        "Assistant d'Analyse Documentaire : Passe en revue les contrats et met en évidence les clauses importantes ou inhabituelles."
      ],
      impactEstimate: "Réduction des comptes clients en souffrance (DSO) de 14 jours en moyenne."
    },
    projects: {
      title: "Système de planification de capacités et livraison de services",
      description: "Optimisez la charge de travail de vos équipes, évitez le surmenage et assurez une qualité de livraison constante pour chaque client.",
      modules: [
        "Planificateur de ressources visuel avec détection automatique des surcharges",
        "Modèles de projets automatisés pour chaque nouveau contrat signé",
        "Suivi du temps passé par client de manière simple et non intrusive"
      ],
      aiAgents: [
        "Coordonnateur de Projet : Identifie les étapes de livraison en retard et propose des ajustements d'horaires.",
        "Assistant d'Opérations : Prédit la capacité de prise en charge de nouveaux mandats pour les 90 prochains jours."
      ],
      impactEstimate: "+22% d'efficacité de livraison et réduction de 30% des goulets d'étranglement de personnel."
    },
    communication: {
      title: "Hub de suivi clientèle et clavardage",
      description: "Offrez une expérience d'accompagnement haut de gamme avec une centralisation complète de vos canaux d'échange.",
      modules: [
        "Espace client interactif de suivi d'avancement de dossiers",
        "Centralisation des demandes (courriels, formulaires, messages) en un seul endroit",
        "Système de notification automatique pour chaque étape clé franchie"
      ],
      aiAgents: [
        "Assistant Communication : Suggère des réponses adaptées aux questions courantes de vos clients.",
        "Assistant Commercial : Rédige des propositions complémentaires personnalisées selon l'évolution des besoins de vos clients."
      ],
      impactEstimate: "Temps de réponse initial moyen réduit sous la barre des 5 minutes et fidélisation client accrue."
    },
    data: {
      title: "Tableaux de bord de performance et suivi d'entreprise",
      description: "Prenez le contrôle de votre entreprise de services en unifiant vos données d'acquisition, de livraison et de rentabilité.",
      modules: [
        "Tableaux de bord de suivi (heures facturables, marge brute par mandat)",
        "Rapports automatisés simples pour une prise de décision rapide",
        "Rapports automatiques en cas de baisse de productivité ou d'utilisation"
      ],
      aiAgents: [
        "Assistant de Suivi : Rédige un compte-rendu hebdomadaire clair et simple directement envoyé par courriel.",
        "Assistant d'Analyse Documentaire : Synthétise et croise les faits marquants de vos différents départements."
      ],
      impactEstimate: "+15% de rentabilité sur vos comptes clés grâce à une visibilité instantanée sur les chiffres."
    }
  },
  other: {
    sales: {
      title: "Système de suivi acheteurs-vendeurs et devis pour l'immobilier",
      description: "On centralise vos fiches prospects, on automatise le suivi après chaque visite et on connecte vos annonces pour ne plus jamais perdre un lead qualifié.",
      modules: [
        "Gestion centralisée de vos bases de données acheteurs et vendeurs",
        "Relances automatiques par courriel et SMS adaptées après chaque visite",
        "Formulaire d'évaluation en ligne simple pour capter de nouveaux mandats"
      ],
      aiAgents: [
        "Assistant Commercial : Qualifie les nouveaux leads acheteurs et planifie les rendez-vous selon vos disponibilités.",
        "Analyste de Marché : Synthétise les retours de visites et prépare les résumés pour vos clients vendeurs."
      ],
      impactEstimate: "Augmentation de 30% du taux de conversion et économie de 8h par semaine sur les suivis manuels."
    },
    administration: {
      title: "Automatisation administrative et gestion des contrats",
      description: "On élimine la paperasse inutile entre la signature des promesses d'achat et la comptabilité. Vos documents sont classés au bon endroit de façon autonome.",
      modules: [
        "Classement automatique des contrats et annexes dans vos dossiers cloud",
        "Liaison automatique entre vos outils de signature et votre système comptable",
        "Relances polies et automatiques pour les pièces manquantes aux dossiers"
      ],
      aiAgents: [
        "Assistant Administratif : Analyse les promesses d'achat signées, extrait les clauses clés et crée les tâches associées.",
        "Assistant d'Analyse Documentaire : Révise les documents de clôture pour s'assurer qu'aucune signature ne manque."
      ],
      impactEstimate: "Économie de 10h à 15h de secrétariat par semaine et élimination complète des dossiers incomplets."
    },
    projects: {
      title: "Suivi opérationnel des transactions et chantiers",
      description: "On structure les étapes de vos transactions ou projets de développement du début à la fin pour s'assurer que tout le monde respecte les délais.",
      modules: [
        "Tableau de bord de suivi d'étapes (financement, inspection, notaire)",
        "Alertes automatiques de rappels de dates critiques (levée de conditions)",
        "Espace partagé simple pour collaborer avec vos partenaires (courtiers, notaires)"
      ],
      aiAgents: [
        "Coordonnateur de Transaction : Surveille les échéances légales et notifie l'équipe dès qu'une condition approche du délai.",
        "Assistant d'Opérations : Prépare la liste des documents requis pour chaque nouvelle transaction."
      ],
      impactEstimate: "Zéro retard sur les levées de conditions et tranquillité d'esprit totale pour vos clients."
    },
    communication: {
      title: "Hub de coordination clients et visites",
      description: "On centralise toutes les communications avec vos clients pour leur offrir une expérience d'accompagnement impeccable et fluide.",
      modules: [
        "Espace client en ligne pour suivre l'avancement de leur dossier immobilier",
        "Envoi de SMS de confirmation automatique pour planifier les visites de propriétés",
        "Boîte de réception centralisée pour tous vos canaux d'acquisition de leads"
      ],
      aiAgents: [
        "Assistant Communication : Rédige des comptes-rendus de visites chaleureux et professionnels et gère les questions d'horaires.",
        "Coordonnateur de Visites : Coordonne les rendez-vous entre les courtiers, vendeurs et acheteurs."
      ],
      impactEstimate: "Taux de satisfaction client de 98% et élimination de la gestion par courriels éparpillés."
    },
    data: {
      title: "Tableau de bord de performance et volume d'affaires",
      description: "On rassemble vos données réelles de commissions, dépenses publicitaires et rentabilité de portefeuille pour que vous puissiez décider avec les chiffres sous les yeux.",
      modules: [
        "Calcul en temps réel de vos parts de commissions et revenus prévisionnels",
        "Analyse de coût d'acquisition de lead par canal (réseaux sociaux, enseignes)",
        "Indicateurs de performance simples et unifiés pour la direction"
      ],
      aiAgents: [
        "Assistant d'Analyse : Repère les variations anormales dans vos budgets publicitaires et conseille les canaux les plus rentables.",
        "Assistant Financier : Prépare un bilan hebdomadaire simple de vos transactions closes et en cours."
      ],
      impactEstimate: "+12% de marge nette en orientant vos budgets sur les actions qui rapportent réellement."
    }
  }
};
