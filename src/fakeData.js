import { Pencil, Trash2 } from "lucide-react";

export const fakeUsers = [
  { id: 0, prenom: "Ikram", nom: "Djeghali", email: "ikram.gjeghali@gmail.com", role: "Administrateur", creeLe: "2026-07-19", edit: Pencil, delete: Trash2 },
  { id: 1, prenom: "Yacine", nom: "Belaïd", email: "yacine.belaid@gmail.com", role: "Etudiant", creeLe: "2026-07-25", edit: Pencil, delete: Trash2 },
  { id: 2, prenom: "Amina", nom: "Kerrouche", email: "amina.kerrouche@gmail.com", role: "Etudiant", creeLe: "2026-08-02", edit: Pencil, delete: Trash2 },
  { id: 3, prenom: "Nadia", nom: "Belkacem", email: "nadia.belkacem@gmail.com", role: "Formateur", creeLe: "2026-07-27", edit: Pencil, delete: Trash2 },
  { id: 4, prenom: "Sofiane", nom: "Ghomari", email: "sofiane.ghomari@gmail.com", role: "Formateur", creeLe: "2026-07-24", edit: Pencil, delete: Trash2 },
  { id: 5, prenom: "Ryma", nom: "Ouahab", email: "ryma.ouahab@gmail.com", role: "Etudiant", creeLe: "2026-08-08", edit: Pencil, delete: Trash2 },
  { id: 6, prenom: "Islam", nom: "Bensalem", email: "islam.bensalem@gmail.com", role: "Formateur", creeLe: "2026-08-15", edit: Pencil, delete: Trash2 },
];

export const fakeCours = [
  { id: 1, titre: "Fondations du développement web", formateur: "Nadia Belkacem", description: "HTML sémantique, CSS moderne et premiers pas en JavaScript.", categorie: "Informatique", lecons: 4, creeLe: "2026-07-10", imageUrl: "https://picsum.photos/seed/webdev/600/300", edit: Pencil, delete: Trash2 },
  { id: 2, titre: "Anglais des affaires : réunions", formateur: "Sofiane Ghomari", description: "Animer, participer et conclure une réunion professionnelle en anglais.", categorie: "Soft skills", lecons: 6, creeLe: "2026-07-18", imageUrl: "https://picsum.photos/seed/meeting/600/300", edit: Pencil, delete: Trash2 },
  { id: 3, titre: "Gestion d'équipe et leadership", formateur: "Islam Bensalem", description: "Motiver, déléguer et gérer les conflits au sein d'une équipe.", categorie: "Management", lecons: 5, creeLe: "2026-08-05", imageUrl: "https://picsum.photos/seed/leadership/600/300", edit: Pencil, delete: Trash2 },
  { id: 4, titre: "Bases de données", formateur: "Nadia Belkacem", description: "Modélisation relationnelle, SQL et normalisation.", categorie: "Informatique", lecons: 7, creeLe: "2026-07-22", imageUrl: "https://picsum.photos/seed/database/600/300", edit: Pencil, delete: Trash2 },
  { id: 5, titre: "Conception architecturale et espaces de travail", formateur: "Yasmine Haddad", description: "Principes de conception d'espaces collaboratifs modernes.", categorie: "Architecture", lecons: 3, creeLe: "2026-08-12", imageUrl: "https://picsum.photos/seed/architecture/600/300", edit: Pencil, delete: Trash2 },
  { id: 6, titre: "Cours sans contenu", formateur: "Sofiane Ghomari", description: "", categorie: "Informatique", lecons: 0, creeLe: "2026-08-18", imageUrl: null, edit: Pencil, delete: Trash2 },
];

export const fakeCategories = [
  { id: 1, nom: "Informatique", coursCount: 2, edit:Pencil, delete:Trash2 },
  { id: 2, nom: "Soft skills", coursCount: 1, edit:Pencil, delete:Trash2 },
  { id: 3, nom: "Management", coursCount: 1, edit:Pencil, delete:Trash2 },
  { id: 4, nom: "Architecture", coursCount: 1, edit:Pencil, delete:Trash2 },
];

export const fakeAcces = [
  { id: 1, etudiant: "Yacine Belaïd", cours: "Fondations du développement web", date: "2026-07-25" },
  { id: 2, etudiant: "Amina Kerrouche", cours: "Anglais des affaires : réunions", date: "2026-07-28" },
  { id: 3, etudiant: "Ryma Ouahab", cours: "Fondations du développement web", date: "2026-08-02" },
  { id: 4, etudiant: "Nabil Taleb", cours: "Bases de données", date: "2026-08-05" },
  { id: 5, etudiant: "Katia Larbi", cours: "Gestion d'équipe et leadership", date: "2026-08-10" },
];

export const userColumns = [
  { label: 'PRENOM', key: 'prenom' },
  { label: 'NOM', key: 'nom' },
  { label: 'EMAIL', key: 'email' },
  { label: 'ROLE', key: 'role' },
];

export const coursColumns = [
  { label: 'TITRE', key: 'titre' },
  { label: 'FORMATEUR', key: 'formateur' },
  { label: 'DESCRIPTION', key: 'description' },
  { label: 'CATÉGORIE', key: 'categorie' },
  { label: 'LEÇONS', key: 'lecons' },
];

export const categorieColumns = [
  { label: 'NOM', key: 'nom' },
  { label: 'COURS', key: 'coursCount' },
];

export const etudiantsInscritsColumns = [
  { label: "ÉTUDIANT", key: "etudiant" },
  { label: "INSCRIT LE", key: "inscritLe" },
  { label: "PROGRESSION", key: "progression" },
  { label: "NOTE FINALE", key: "noteFinale" },
];

export const fakeCoursDetail = [
  { 
    id: 1, 
    titre: "Fondations du développement web", 
    formateur: "Nadia Belkacem", 
    description: "Ce cours s'adresse aux débutants souhaitant acquérir les bases du développement web moderne : structure HTML sémantique, mise en forme CSS (Flexbox, Grid, responsive design), et premiers pas en JavaScript pour rendre une page interactive.Les participants apprendront à construire des pages accessibles et bien structurées, à les styliser de manière cohérente, et à manipuler le DOM pour ajouter de l'interactivité de base — tout en suivant les bonnes pratiques de validation de formulaires et d'accessibilité.À l'issue du cours, ils seront capables de construire une page web complète et fonctionnelle à partir de zéro.", 
    categorie: "Informatique", lecons: 4, etudiantsInscrits: 12, exercices: 5, edit: Pencil, delete: Trash2 
  },
  { 
    id: 2, 
    titre: "Anglais des affaires : réunions", 
    formateur: "Sofiane Ghomari", 
    description: "Ce cours s'adresse aux professionnels souhaitant gagner en aisance lors de réunions en anglais, qu'il s'agisse de réunions internes, d'appels clients, ou de présentations à distance.À travers des mises en situation réalistes, les participants apprendront le vocabulaire clé pour ouvrir et clore une réunion, exprimer un désaccord poliment, relancer un point de discussion, et prendre la parole avec assurance face à un auditoire international.À l'issue du cours, les participants seront capables de participer activement à une réunion professionnelle en anglais et d'en assurer l'animation si nécessaire.", 
    categorie: "Soft skills", lecons: 6, etudiantsInscrits: 9, exercices: 3, edit: Pencil, delete: Trash2 
  },
  { 
    id: 3, 
    titre: "Gestion d'équipe et leadership", 
    formateur: "Islam Bensalem", 
    description: "Ce cours s'adresse à toute personne amenée à encadrer une équipe, qu'elle soit déjà manager ou en passe de le devenir.Les participants apprendront à identifier les différents styles de management, à déléguer efficacement sans perdre le contrôle, à donner un feedback constructif, et à gérer les conflits interpersonnels au sein de leur équipe.À l'issue du cours, ils seront capables d'adapter leur style de leadership au contexte et de conduire leur équipe vers des objectifs communs avec plus de confiance.", 
    categorie: "Management", lecons: 5, etudiantsInscrits: 15, exercices: 4, edit: Pencil, delete: Trash2 
  },
  { 
    id: 4, 
    titre: "Bases de données", 
    formateur: "Nadia Belkacem", 
    description: "Ce cours s'adresse aux étudiants souhaitant comprendre comment structurer et interroger efficacement des données relationnelles.Les participants apprendront à modéliser un schéma de base de données cohérent (entités, relations, clés primaires et étrangères), à appliquer les règles de normalisation pour éviter la redondance, et à écrire des requêtes SQL pour créer, lire, modifier et supprimer des données.À l'issue du cours, ils seront capables de concevoir une base de données pour un projet réel et d'en interroger le contenu avec assurance.", 
    categorie: "Informatique", lecons: 7, etudiantsInscrits: 18, exercices: 7, edit: Pencil, delete: Trash2 
  },
  { 
    id: 5, 
    titre: "Conception architecturale et espaces de travail", 
    formateur: "Yasmine Haddad", 
    description: "Ce cours s'adresse aux personnes intéressées par la conception d'espaces de travail modernes et fonctionnels.Les participants apprendront les principes fondamentaux d'aménagement d'espaces collaboratifs : optimisation de la lumière naturelle, gestion des flux de circulation, acoustique, et équilibre entre espaces ouverts et zones de concentration.À l'issue du cours, ils seront capables de proposer une conception d'espace de travail adaptée aux besoins réels de ses futurs occupants.", 
    categorie: "Architecture", lecons: 3, etudiantsInscrits: 6, exercices: 2, edit: Pencil, delete: Trash2 
  },
  { 
    id: 6, 
    titre: "Cours sans contenu", 
    formateur: "Sofiane Ghomari", 
    description: "", 
    categorie: "Informatique", lecons: 0, etudiantsInscrits: 0, exercices: 0, edit: Pencil, delete: Trash2 
  },
];

export const fakeLecons = [
  { id: 1, coursId: 1, titre: "Structurer une page HTML", description: "Balises sémantiques, hiérarchie de contenu et bonnes pratiques d'accessibilité", ordre: 1, types: ["Vidéo", "PDF"] },
  { id: 2, coursId: 1, titre: "Mettre en page avec CSS", description: "Flexbox, Grid et responsive design pour des mises en page modernes", ordre: 2, types: ["Texte", "PDF"] },
  { id: 3, coursId: 1, titre: "Les bases de JavaScript", description: "Variables, fonctions et manipulation du DOM", ordre: 3, types: ["Texte", "Vidéo", "PDF"] },
  { id: 4, coursId: 1, titre: "Formulaires et validation", description: "Créer et valider des formulaires côté client", ordre: 4, types: ["Vidéo", "PDF"] },

  { id: 1, coursId: 2, titre: "Ouvrir une réunion", description: "Vocabulaire et formules pour démarrer une réunion en anglais", ordre: 1, types: ["Vidéo"] },
  { id: 2, coursId: 2, titre: "Exprimer son opinion", description: "S'exprimer et argumenter poliment en anglais professionnel", ordre: 2, types: ["Texte", "Vidéo"] },
  { id: 3, coursId: 2, titre: "Gérer un désaccord", description: "Exprimer un désaccord avec diplomatie et proposer des alternatives", ordre: 3, types: ["Texte", "PDF"] },
  { id: 4, coursId: 2, titre: "Prendre la parole avec assurance", description: "Techniques pour capter l'attention et structurer son intervention", ordre: 4, types: ["Vidéo"] },
  { id: 5, coursId: 2, titre: "Clore une réunion", description: "Résumer les points clés et définir les prochaines étapes", ordre: 5, types: ["Texte", "Vidéo"] },
  { id: 6, coursId: 2, titre: "Réunions à distance", description: "Bonnes pratiques et vocabulaire spécifique aux visioconférences", ordre: 6, types: ["Vidéo", "PDF"] },

  { id: 1, coursId: 3, titre: "Styles de management", description: "Identifier et adapter son style de management selon le contexte", ordre: 1, types: ["Texte", "PDF"] },
  { id: 2, coursId: 3, titre: "Déléguer efficacement", description: "Répartir les responsabilités sans perdre le contrôle", ordre: 2, types: ["Vidéo"] },
  { id: 3, coursId: 3, titre: "Donner un feedback constructif", description: "Techniques pour formuler un retour utile et bien reçu", ordre: 3, types: ["Texte", "Vidéo"] },
  { id: 4, coursId: 3, titre: "Gérer les conflits", description: "Désamorcer les tensions et trouver des solutions durables", ordre: 4, types: ["Texte", "PDF"] },
  { id: 5, coursId: 3, titre: "Motiver son équipe", description: "Leviers de motivation individuels et collectifs", ordre: 5, types: ["Vidéo", "PDF"] },

  { id: 1, coursId: 4, titre: "Introduction aux bases de données", description: "Concepts fondamentaux et vocabulaire relationnel", ordre: 1, types: ["Vidéo"] },
  { id: 2, coursId: 4, titre: "Modéliser un schéma", description: "Entités, relations et cardinalités", ordre: 2, types: ["Texte", "PDF"] },
  { id: 3, coursId: 4, titre: "Clés primaires et étrangères", description: "Garantir l'intégrité référentielle entre les tables", ordre: 3, types: ["Texte", "Vidéo"] },
  { id: 4, coursId: 4, titre: "Normalisation", description: "Éviter la redondance grâce aux formes normales", ordre: 4, types: ["PDF"] },
  { id: 5, coursId: 4, titre: "Requêtes SQL — SELECT", description: "Interroger et filtrer les données efficacement", ordre: 5, types: ["Vidéo", "PDF"] },
  { id: 6, coursId: 4, titre: "Requêtes SQL — INSERT, UPDATE, DELETE", description: "Modifier les données d'une base existante", ordre: 6, types: ["Texte", "Vidéo"] },
  { id: 7, coursId: 4, titre: "Jointures", description: "Combiner des données provenant de plusieurs tables", ordre: 7, types: ["Vidéo", "PDF"] },

  { id: 1, coursId: 5, titre: "Analyser un espace existant", description: "Bases de la conception d'espaces collaboratifs", ordre: 1, types: ["Texte", "PDF"] },
  { id: 2, coursId: 5, titre: "Lumière et acoustique", description: "Optimiser le confort visuel et sonore d'un espace", ordre: 2, types: ["Vidéo"] },
  { id: 3, coursId: 5, titre: "Flux de circulation", description: "Organiser les déplacements et zones de concentration", ordre: 3, types: ["Texte", "Vidéo", "PDF"] },
];

export const fakeExercices = [

  { id: 1, coursId: 1, leconId: 1, titre: "Exercice 01" },
  { id: 2, coursId: 1, leconId: 2, titre: "Exercice 02" },
  { id: 3, coursId: 1, leconId: 3, titre: "Exercice 03" },
  { id: 4, coursId: 1, leconId: 4, titre: "Exercice 04" },
  { id: 5, coursId: 1, leconId: 4, titre: "Exercice 05" },

  { id: 6, coursId: 2, leconId: 1, titre: "Exercice 01" },
  { id: 7, coursId: 2, leconId: 2, titre: "Exercice 02" },
  { id: 8, coursId: 2, leconId: 3, titre: "Exercice 03" },
  { id: 9, coursId: 2, leconId: 4, titre: "Exercice 04" },
  { id: 10, coursId: 2, leconId: 5, titre: "Exercice 05" },
  { id: 11, coursId: 2, leconId: 6, titre: "Exercice 06" },

  { id: 12, coursId: 3, leconId: 1, titre: "Exercice 01" },
  { id: 13, coursId: 3, leconId: 2, titre: "Exercice 02" },
  { id: 14, coursId: 3, leconId: 3, titre: "Exercice 03" },
  { id: 15, coursId: 3, leconId: 4, titre: "Exercice 04" },
  { id: 16, coursId: 3, leconId: 5, titre: "Exercice 05" },

  { id: 17, coursId: 4, leconId: 1, titre: "Exercice 01" },
  { id: 18, coursId: 4, leconId: 2, titre: "Exercice 02" },
  { id: 19, coursId: 4, leconId: 3, titre: "Exercice 03" },
  { id: 20, coursId: 4, leconId: 4, titre: "Exercice 04" },
  { id: 21, coursId: 4, leconId: 5, titre: "Exercice 05" },
  { id: 22, coursId: 4, leconId: 6, titre: "Exercice 06" },
  { id: 23, coursId: 4, leconId: 7, titre: "Exercice 07" },

  { id: 24, coursId: 5, leconId: 1, titre: "Exercice 01" },
  { id: 25, coursId: 5, leconId: 2, titre: "Exercice 02" },
  { id: 26, coursId: 5, leconId: 3, titre: "Exercice 03" },
];

export const fakeEtudiantsInscrits = [
  { id: 1, etudiant: "Yacine Belaïd", cours: "Fondations du développement web", inscritLe: "2026-07-18", progression: "4/4", noteFinale: 14, delete: Trash2 },
  { id: 2, etudiant: "Amina Kerrouche", cours: "Fondations du développement web", inscritLe: "2026-07-20", progression: "2/4", noteFinale: null, delete: Trash2 },
  { id: 3, etudiant: "Ryma Ouahab", cours: "Bases de données", inscritLe: "2026-07-25", progression: "4/4", noteFinale: 16, delete: Trash2 },
  { id: 4, etudiant: "Nabil Taleb", cours: "Gestion d'équipe et leadership", inscritLe: "2026-08-01", progression: "1/4", noteFinale: null, delete: Trash2 },
  { id: 5, etudiant: "Katia Larbi", cours: "Anglais des affaires : réunions", inscritLe: "2026-08-05", progression: "3/4", noteFinale: null, delete: Trash2 },
];

export const fakeActivites = [
  { id: 1, badge: 'admin', text: 'Accès à « Design system et composants » accordé à Anaïs Fournier', date: '2026-08-02', to: '/admin/acces' },
  { id: 2, badge: 'admin', text: 'Accès à « Data Science » accordé à Amine Rahmani', date: '2026-07-28', to: '/admin/acces' },
  { id: 3, badge: 'admin', text: 'Compte formateur créé pour Nadia Belkacem', date: '2026-07-27', to: '/admin/utilisateurs?edit=true&id=3' },
  { id: 4, badge: 'admin', text: 'Compte étudiant créé pour Yacine Belaïd', date: '2026-07-25', to: '/admin/utilisateurs?edit=true&id=1' },
  { id: 5, badge: 'admin', text: 'Compte formateur créé pour Sofiane Ghomari', date: '2026-07-24', to: '/admin/utilisateurs?edit=true&id=4' },
  { id: 6, badge: 'admin', text: 'Cours créé : « Bases de données »', date: '2026-07-22', to: '/admin/cours/4' },
  { id: 7, badge: 'admin', text: "Accès à « Gestion d'équipe et leadership » accordé à Amira Zouaoui", date: '2026-07-20', to: '/admin/acces' },
  { id: 8, badge: 'admin', text: 'Compte étudiant créé pour Ryma Ouahab', date: '2026-07-19', to: '/admin/utilisateurs?edit=true&id=5' },
  { id: 9, badge: 'admin', text: 'Cours créé : « Anglais des affaires : réunions »', date: '2026-07-18', to: '/admin/cours/2' },
  { id: 10, badge: 'admin', text: 'Compte formateur créé pour Islam Bensalem', date: '2026-07-17', to: '/admin/utilisateurs?edit=true&id=6' },
];

export const fakeActivitesFormateur = [
  { id: 1, badge: 'corrige', text: 'Soumission corrigée pour Yacine Belaïd — « Structurer une page HTML »', date: '2026-08-02', to: '/formateur/corrections' },
  { id: 2, badge: 'corrige', text: "Soumission corrigée pour Amina Kerrouche — « Mettre en page avec CSS »", date: '2026-07-30', to: '/formateur/corrections' },
  { id: 3, badge: 'admin', text: 'Nouvel étudiant inscrit : Ryma Ouahab — « Bases de données »', date: '2026-07-28', to: '/formateur/etudiants' },
  { id: 4, badge: 'admin', text: 'Nouvel étudiant inscrit : Nabil Taleb — « Bases de données »', date: '2026-07-26', to: '/formateur/etudiants' },
  { id: 5, badge: 'corrige', text: 'Soumission corrigée pour Katia Larbi — « Les bases de JavaScript »', date: '2026-07-24', to: '/formateur/corrections' },
  { id: 6, badge: 'admin', text: "Leçon ajoutée : « Formulaires et validation »", date: '2026-07-22', to: '/formateur/cours/1' },
  { id: 7, badge: 'corrige', text: 'Soumission corrigée pour Yacine Belaïd — « Formulaires et validation »', date: '2026-07-20', to: '/formateur/corrections' },
  { id: 8, badge: 'admin', text: 'Nouvel étudiant inscrit : Katia Larbi — « Bases de données »', date: '2026-07-19', to: '/formateur/etudiants' },
  { id: 9, badge: 'corrige', text: 'Soumission corrigée pour Amina Kerrouche — « Les bases de JavaScript »', date: '2026-07-18', to: '/formateur/corrections' },
  { id: 10, badge: 'admin', text: "Leçon ajoutée : « Les bases de JavaScript »", date: '2026-07-17', to: '/formateur/cours/1' },
];

export const fakeActivitesEtudiant = [
  { id: 1, badge: 'corrige', text: 'Soumission corrigée — « Fondations du développement web »', note: 16, date: '2026-08-02', to: '/etudiant/mes-notes/1' },
  { id: 2, badge: 'soumis', text: "Réponse soumise — « Qu'est-ce qu'un composant contrôlé ? »", date: '2026-07-28', to: '/etudiant/mes-exercices' },
  { id: 3, badge: 'cours', text: 'Cours terminé — « Bases de données »', date: '2026-07-27', to: '/etudiant/mes-cours/4' },
  { id: 4, badge: 'cours', text: 'Inscrit à « Introduction à React »', date: '2026-07-25', to: '/etudiant/mes-cours' },
  { id: 5, badge: 'corrige', text: 'Soumission corrigée — « Expliquez useEffect en une phrase »', note: 8, date: '2026-07-24', to: '/etudiant/mes-notes/2' },
  { id: 6, badge: 'soumis', text: 'Réponse soumise — « Structurer une page HTML »', date: '2026-07-22', to: '/etudiant/mes-exercices' },
  { id: 7, badge: 'corrige', text: 'Soumission corrigée — « Mettre en page avec CSS »', note: 14, date: '2026-07-20', to: '/etudiant/mes-notes/3' },
  { id: 8, badge: 'cours', text: 'Inscrit à « Bases de données »', date: '2026-07-19', to: '/etudiant/mes-cours' },
  { id: 9, badge: 'soumis', text: 'Réponse soumise — « Ouvrir une réunion »', date: '2026-07-18', to: '/etudiant/mes-exercices' },
  { id: 10, badge: 'cours', text: 'Cours terminé — « Anglais des affaires : réunions »', date: '2026-07-17', to: '/etudiant/mes-cours/2' },
];

export const fakeSoumissions = [
  { id: 1, etudiant: "Yacine Belaïd", exercice: "Structurer une page HTML", cours: "Fondations du développement web", soumisLe: "2026-07-18", corrigeLe: "2026-07-20", note: 16 },
  { id: 2, etudiant: "Amina Kerrouche", exercice: "Mettre en page avec CSS - Flexbox", cours: "Fondations du développement web", soumisLe: "2026-08-14", corrigeLe: null, note: null },
  { id: 3, etudiant: "Ryma Ouahab", exercice: "Introduction aux bases de données", cours: "Bases de données", soumisLe: "2026-07-25", corrigeLe: "2026-07-27", note: 18 },
  { id: 4, etudiant: "Nabil Taleb", exercice: "Modéliser un schéma", cours: "Bases de données", soumisLe: "2026-08-15", corrigeLe: null, note: null },
  { id: 5, etudiant: "Katia Larbi", exercice: "Vocabulaire de réunion", cours: "Anglais des affaires : réunions", soumisLe: "2026-08-16", corrigeLe: null, note: null },
  { id: 6, etudiant: "Yacine Belaïd", exercice: "Mettre en page avec CSS - Flexbox", cours: "Fondations du développement web", soumisLe: "2026-08-17", corrigeLe: null, note: null },
];
export const fakeQuestions = [
  { id: 1, exerciceId: 1, texte: "Quel élément HTML définit l'en-tête d'une page ?", type: "Input" },
  { id: 2, exerciceId: 1, texte: "Quelle balise est utilisée pour du contenu sémantique de navigation ?", type: "QCM", choix: [
    { id: 1, texte: "<nav>", correct: true },
    { id: 2, texte: "<div>", correct: false },
    { id: 3, texte: "<section>", correct: false },
    { id: 4, texte: "<link>", correct: false },
  ]},
  { id: 3, exerciceId: 1, texte: "Envoyez une capture d'écran de votre page structurée", type: "File Upload" },


  { id: 4, exerciceId: 2, texte: "Que fait la propriété justify-content dans un conteneur flex ?", type: "Input" },
  { id: 5, exerciceId: 2, texte: "Quelle valeur de display active Flexbox ?", type: "QCM", choix: [
    { id: 1, texte: "flex", correct: true },
    { id: 2, texte: "block", correct: false },
    { id: 3, texte: "grid", correct: false },
    { id: 4, texte: "inline", correct: false },
  ]},
  { id: 6, exerciceId: 2, texte: "Envoyez le fichier CSS de votre mise en page", type: "File Upload" },


  { id: 7, exerciceId: 3, texte: "Quelle méthode permet de sélectionner un élément par son id ?", type: "Input" },
  { id: 8, exerciceId: 3, texte: "Quelle méthode ajoute un élément enfant au DOM ?", type: "QCM", choix: [
    { id: 1, texte: "appendChild()", correct: true },
    { id: 2, texte: "innerHTML()", correct: false },
    { id: 3, texte: "getElementById()", correct: false },
    { id: 4, texte: "querySelector()", correct: false },
  ]},
  { id: 9, exerciceId: 3, texte: "Envoyez votre script JavaScript", type: "File Upload" },

  
  { id: 10, exerciceId: 4, texte: "Expliquez en une phrase à quoi sert l'attribut required", type: "Input" },
  { id: 11, exerciceId: 4, texte: "Qu'est-ce qu'un composant contrôlé ?", type: "QCM", choix: [
    { id: 1, texte: "Un composant dont la valeur est gérée par le state de React", correct: true },
    { id: 2, texte: "Un composant qui ne peut pas recevoir de props", correct: false },
    { id: 3, texte: "Un composant qui gère lui-même son propre DOM sans React", correct: false },
    { id: 4, texte: "Un composant utilisé uniquement pour le style", correct: false },
  ]},
  { id: 12, exerciceId: 4, texte: "Envoyez une capture de votre formulaire validé", type: "File Upload" },

  
  { id: 13, exerciceId: 5, texte: "Comment afficher un message d'erreur conditionnellement en React ?", type: "Input" },
  { id: 14, exerciceId: 5, texte: "Quelle balise regroupe des champs de formulaire liés ?", type: "QCM", choix: [
    { id: 1, texte: "<fieldset>", correct: true },
    { id: 2, texte: "<group>", correct: false },
    { id: 3, texte: "<section>", correct: false },
    { id: 4, texte: "<form>", correct: false },
  ]},
  { id: 15, exerciceId: 5, texte: "Envoyez votre script de classe abstraite", type: "File Upload" },
];