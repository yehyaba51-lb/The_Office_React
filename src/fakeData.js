import { Pencil, Trash2 } from "lucide-react";
import videoPic from './assets/Video_thumbnail.png';
import videoFile from './assets/Celldweller - Fadeaway.mp4';

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
  { label: 'NOM', key: 'categorie_nom' },
  { label: 'COURS', key: 'cours' },
];

export const etudiantsInscritsColumns = [
  { label: "ÉTUDIANT", key: "etudiant" },
  { label: "INSCRIT LE", key: "inscrit_le" },
  { label: "PROGRESSION", key: "progression" },
  { label: "NOTE FINALE", key: "note_finale" },
];

export const mesEtudiantsColumns = [
  { label: "ÉTUDIANT", key: "etudiant" },
  { label: "COURS", key: "cours_titre" },
  { label: "INSCRIT LE", key: "inscrit_le" },
  { label: "PROGRESSION", key: "progression" },
  { label: "NOTE FINALE", key: "note_finale" },
];

export const correctionsColumns = [
  { label: "ÉTUDIANT", key: "etudiant" },
  { label: "COURS", key: "cours_titre" },
  { label: "QUESTION", key: "texte_question" },
  { label: "SOUMIS LE", key: "soumis_le" },
  { label: "TYPE", key: "question_type" },
  { label: "STATUT", key: "statut" },
];

export const mesNotesColumns = [
  { label: "EXERCICE", key: "exercice" },
  { label: "QUESTION", key: "texte_question" },
  { label: "SOUMIS LE", key: "soumis_le" },
  { label: "NOTE", key: "note" },
];

export const fakeUsers = [
  { id: 0, prenom: "Ikram", nom: "Djeghali", email: "ikram.gjeghali@gmail.com", role: "Administrateur", creeLe: "2026-07-19", edit: Pencil, delete: Trash2 },
  { id: 1, prenom: "Yacine", nom: "Belaïd", email: "yacine.belaid@gmail.com", role: "Etudiant", creeLe: "2026-07-25", edit: Pencil, delete: Trash2 },
  { id: 2, prenom: "Amina", nom: "Kerrouche", email: "amina.kerrouche@gmail.com", role: "Etudiant", creeLe: "2026-08-02", edit: Pencil, delete: Trash2 },
  { id: 3, prenom: "Nadia", nom: "Belkacem", email: "nadia.belkacem@gmail.com", role: "Formateur", creeLe: "2026-07-27", edit: Pencil, delete: Trash2 },
  { id: 4, prenom: "Sofiane", nom: "Ghomari", email: "sofiane.ghomari@gmail.com", role: "Formateur", creeLe: "2026-07-24", edit: Pencil, delete: Trash2 },
  { id: 5, prenom: "Ryma", nom: "Ouahab", email: "ryma.ouahab@gmail.com", role: "Etudiant", creeLe: "2026-08-08", edit: Pencil, delete: Trash2 },
  { id: 6, prenom: "Islam", nom: "Bensalem", email: "islam.bensalem@gmail.com", role: "Formateur", creeLe: "2026-08-15", edit: Pencil, delete: Trash2 },
  { id: 7, prenom: "Nabil", nom: "Taleb", email: "nabil.taleb@gmail.com", role: "Etudiant", creeLe: "2026-08-10", edit: Pencil, delete: Trash2 },
  { id: 8, prenom: "Katia", nom: "Larbi", email: "katia.larbi@gmail.com", role: "Etudiant", creeLe: "2026-08-12", edit: Pencil, delete: Trash2 },
];

export const fakeCours = [
  { id: 1, titre: "Fondations du développement web", formateur: "Nadia Belkacem", description: "Ce cours s'adresse aux débutants souhaitant acquérir les bases du développement web moderne : structure HTML sémantique, mise en forme CSS (Flexbox, Grid, responsive design), et premiers pas en JavaScript pour rendre une page interactive.Les participants apprendront à construire des pages accessibles et bien structurées, à les styliser de manière cohérente, et à manipuler le DOM pour ajouter de l'interactivité de base — tout en suivant les bonnes pratiques de validation de formulaires et d'accessibilité.À l'issue du cours, ils seront capables de construire une page web complète et fonctionnelle à partir de zéro.", categorie: "Informatique", lecons: 4, creeLe: "2026-07-10", imageUrl: "https://picsum.photos/seed/webdev/600/300", edit: Pencil, delete: Trash2 },
  { id: 2, titre: "Anglais des affaires : réunions", formateur: "Sofiane Ghomari", description: "Ce cours s'adresse aux professionnels souhaitant gagner en aisance lors de réunions en anglais, qu'il s'agisse de réunions internes, d'appels clients, ou de présentations à distance.À travers des mises en situation réalistes, les participants apprendront le vocabulaire clé pour ouvrir et clore une réunion, exprimer un désaccord poliment, relancer un point de discussion, et prendre la parole avec assurance face à un auditoire international.À l'issue du cours, les participants seront capables de participer activement à une réunion professionnelle en anglais et d'en assurer l'animation si nécessaire.", categorie: "Soft skills", lecons: 6, creeLe: "2026-07-18", imageUrl: "https://picsum.photos/seed/meeting/600/300", edit: Pencil, delete: Trash2 },
  { id: 3, titre: "Gestion d'équipe et leadership", formateur: "Islam Bensalem", description: "Ce cours s'adresse à toute personne amenée à encadrer une équipe, qu'elle soit déjà manager ou en passe de le devenir.Les participants apprendront à identifier les différents styles de management, à déléguer efficacement sans perdre le contrôle, à donner un feedback constructif, et à gérer les conflits interpersonnels au sein de leur équipe.À l'issue du cours, ils seront capables d'adapter leur style de leadership au contexte et de conduire leur équipe vers des objectifs communs avec plus de confiance.", categorie: "Management", lecons: 5, creeLe: "2026-08-05", imageUrl: "https://picsum.photos/seed/leadership/600/300", edit: Pencil, delete: Trash2 },
  { id: 4, titre: "Bases de données", formateur: "Nadia Belkacem", description: "Ce cours s'adresse aux étudiants souhaitant comprendre comment structurer et interroger efficacement des données relationnelles.Les participants apprendront à modéliser un schéma de base de données cohérent (entités, relations, clés primaires et étrangères), à appliquer les règles de normalisation pour éviter la redondance, et à écrire des requêtes SQL pour créer, lire, modifier et supprimer des données.À l'issue du cours, ils seront capables de concevoir une base de données pour un projet réel et d'en interroger le contenu avec assurance.", categorie: "Informatique", lecons: 7, creeLe: "2026-07-22", imageUrl: "https://picsum.photos/seed/database/600/300", edit: Pencil, delete: Trash2 },
  { id: 5, titre: "Conception architecturale et espaces de travail", formateur: "Yasmine Haddad", description: "Ce cours s'adresse aux personnes intéressées par la conception d'espaces de travail modernes et fonctionnels.Les participants apprendront les principes fondamentaux d'aménagement d'espaces collaboratifs : optimisation de la lumière naturelle, gestion des flux de circulation, acoustique, et équilibre entre espaces ouverts et zones de concentration.À l'issue du cours, ils seront capables de proposer une conception d'espace de travail adaptée aux besoins réels de ses futurs occupants.", categorie: "Architecture", lecons: 3, creeLe: "2026-08-12", imageUrl: "https://picsum.photos/seed/architecture/600/300", edit: Pencil, delete: Trash2 },
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
  { id: 1, userId: 1, etudiant: "Yacine Belaïd", coursId: 1, cours: "Fondations du développement web", inscritLe: "2026-07-18", progression: "4/4", noteFinale: 14, delete: Trash2 },
  { id: 2, userId: 2, etudiant: "Amina Kerrouche", coursId: 1, cours: "Fondations du développement web", inscritLe: "2026-07-20", progression: "2/4", noteFinale: null, delete: Trash2 },
  { id: 3, userId: 5, etudiant: "Ryma Ouahab", coursId: 4, cours: "Bases de données", inscritLe: "2026-07-25", progression: "4/4", noteFinale: 16, delete: Trash2 },
  { id: 4, userId: 7, etudiant: "Nabil Taleb", coursId: 3, cours: "Gestion d'équipe et leadership", inscritLe: "2026-08-01", progression: "1/4", noteFinale: null, delete: Trash2 },
  { id: 5, userId: 8, etudiant: "Katia Larbi", coursId: 2, cours: "Anglais des affaires : réunions", inscritLe: "2026-08-05", progression: "3/4", noteFinale: null, delete: Trash2 },
  { id: 6, userId: 1, etudiant: "Yacine Belaïd", coursId: 4, cours: "Bases de données", inscritLe: "2026-08-01", progression: "2/7", noteFinale: null, delete: Trash2 },
  { id: 7, userId: 1, etudiant: "Yacine Belaïd", coursId: 2, cours: "Anglais des affaires : réunions", inscritLe: "2026-08-10", progression: "1/6", noteFinale: null, delete: Trash2 },
  { id: 8, userId: 2, etudiant: "Amina Kerrouche", coursId: 4, cours: "Bases de données", inscritLe: "2026-08-05", progression: "3/7", noteFinale: null, delete: Trash2 },
  { id: 9, userId: 5, etudiant: "Ryma Ouahab", coursId: 3, cours: "Gestion d'équipe et leadership", inscritLe: "2026-08-08", progression: "5/5", noteFinale: 15, delete: Trash2 },
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
  { id: 1, userId: 1, etudiant: "Yacine Belaïd", questionId: 1, exercice: "Structurer une page HTML", leconId: 1, coursId: 1, cours: "Fondations du développement web", type: "Input", reponse: "C'est la balise <header> qui définit l'en-tête d'une page HTML.", soumisLe: "2026-07-18", corrigeLe: "2026-07-20", note: 16, commentaire: "Ce n'est pas tout à fait exact — la balise <header> ne définit pas l'en-tête d'une page HTML, c'est <head> qui joue ce rôle." },
  { id: 2, userId: 2, etudiant: "Amina Kerrouche", questionId: 5, exercice: "Mettre en page avec CSS - Flexbox", leconId: 2, coursId: 1, cours: "Fondations du développement web", type: "QCM", reponseChoixId: 3, soumisLe: "2026-07-22", corrigeLe: "2026-07-23", note: 18, commentaire: "Parfait." },
  { id: 3, userId: 5, etudiant: "Ryma Ouahab", questionId: 16, exercice: "Introduction aux bases de données", leconId: 1, coursId: 4, cours: "Bases de données", type: "Input", reponse: "Une relation un-à-plusieurs.", soumisLe: "2026-07-25", corrigeLe: "2026-07-27", note: 18, commentaire: "Correct, bien expliqué." },
  { id: 4, userId: 7, etudiant: "Nabil Taleb", questionId: 17, exercice: "Introduction aux bases de données", leconId: 1, coursId: 4, cours: "Bases de données", type: "QCM", reponseChoixId: 2, soumisLe: "2026-08-15", corrigeLe: null, note: null, commentaire: null },
  { id: 5, userId: 8, etudiant: "Katia Larbi", questionId: 3, exercice: "Structurer une page HTML", leconId: 1, coursId: 1, cours: "Fondations du développement web", type: "File Upload", reponseFichier: "vocabulaire_reunion.pdf", soumisLe: "2026-08-16", corrigeLe: null, note: null, commentaire: null },
  { id: 6, userId: 1, etudiant: "Yacine Belaïd", questionId: 6, exercice: "Mettre en page avec CSS - Flexbox", leconId: 2, coursId: 1, cours: "Fondations du développement web", type: "File Upload", reponseFichier: "flexbox_layout.css", soumisLe: "2026-08-17", corrigeLe: null, note: null, commentaire: null },
  { id: 7, userId: 1, etudiant: "Yacine Belaïd", questionId: 16, exercice: "Introduction aux bases de données", leconId: 1, coursId: 4, cours: "Bases de données", type: "Input", reponse: "Une relation où une ligne correspond à plusieurs lignes d'une autre table.", soumisLe: "2026-08-02", corrigeLe: "2026-08-04", note: 14, commentaire: "Bon, un peu imprécis sur le sens de la relation." },
  { id: 8, userId: 1, etudiant: "Yacine Belaïd", questionId: 20, exercice: "Modéliser un schéma", leconId: 2, coursId: 4, cours: "Bases de données", type: "QCM", reponseChoixId: 1, soumisLe: "2026-08-18", corrigeLe: null, note: null, commentaire: null },
  { id: 9, userId: 1, etudiant: "Yacine Belaïd", questionId: 6, exercice: "Mettre en page avec CSS - Flexbox", leconId: 2, coursId: 1, cours: "Fondations du développement web", type: "File Upload", reponseFichier: "vocabulaire_yacine.pdf", soumisLe: "2026-08-19", corrigeLe: null, note: null, commentaire: null },
  { id: 10, userId: 2, etudiant: "Amina Kerrouche", questionId: 16, exercice: "Introduction aux bases de données", leconId: 1, coursId: 4, cours: "Bases de données", type: "Input", reponse: "Un lien entre deux tables via une clé étrangère.", soumisLe: "2026-08-10", corrigeLe: "2026-08-12", note: 17, commentaire: "Très bien." },
  { id: 11, userId: 5, etudiant: "Ryma Ouahab", questionId: 47, exercice: "Identifier son style de management", leconId: 1, coursId: 3, cours: "Gestion d'équipe et leadership", type: "QCM", reponseChoixId: 3, soumisLe: "2026-08-09", corrigeLe: "2026-08-11", note: 15, commentaire: "Bonne analyse." },
  { id: 12, userId: 7, etudiant: "Nabil Taleb", questionId: 11, exercice: "Formulaires et validation", leconId: 4, coursId: 1, cours: "Fondations du développement web", type: "QCM", reponseChoixId: 2, soumisLe: "2026-08-15", corrigeLe: null, note: null, commentaire: null },
  { id: 13, userId: 2, etudiant: "Amina Kerrouche", questionId: 1, exercice: "Structurer une page HTML", leconId: 1, coursId: 1, cours: "Fondations du développement web", type: "Input", reponse: "C'est la balise <head> qui définit l'en-tête d'une page HTML.", soumisLe: "2026-07-19", corrigeLe: "2026-07-20", note: 18, commentaire: "Exact." },
  { id: 14, userId: 2, etudiant: "Amina Kerrouche", questionId: 2, exercice: "Structurer une page HTML", leconId: 1, coursId: 1, cours: "Fondations du développement web", type: "QCM", reponseChoixId: 2, soumisLe: "2026-07-19", corrigeLe: "2026-07-20", note: 20, commentaire: null },
  { id: 15, userId: 2, etudiant: "Amina Kerrouche", questionId: 3, exercice: "Structurer une page HTML", leconId: 1, coursId: 1, cours: "Fondations du développement web", type: "File Upload", reponseFichier: "page_structuree.png", soumisLe: "2026-07-19", corrigeLe: "2026-07-20", note: 16, commentaire: null },
  { id: 16, userId: 2, etudiant: "Amina Kerrouche", questionId: 4, exercice: "Mettre en page avec CSS - Flexbox", leconId: 2, coursId: 1, cours: "Fondations du développement web", type: "Input", reponse: "Elle aligne les enfants sur l'axe principal du conteneur.", soumisLe: "2026-07-22", corrigeLe: "2026-07-23", note: 17, commentaire: null },
  { id: 18, userId: 2, etudiant: "Amina Kerrouche", questionId: 19, exercice: "Modéliser un schéma", leconId: 2, coursId: 4, cours: "Bases de données", type: "Input", reponse: "Elle permet de relier une ligne à une autre table.", soumisLe: "2026-08-10", corrigeLe: "2026-08-12", note: 15, commentaire: null },
  { id: 19, userId: 2, etudiant: "Amina Kerrouche", questionId: 20, exercice: "Modéliser un schéma", leconId: 2, coursId: 4, cours: "Bases de données", type: "QCM", reponseChoixId: 1, soumisLe: "2026-08-10", corrigeLe: "2026-08-12", note: 20, commentaire: null },
  { id: 20, userId: 2, etudiant: "Amina Kerrouche", questionId: 21, exercice: "Modéliser un schéma", leconId: 2, coursId: 4, cours: "Bases de données", type: "File Upload", reponseFichier: "schema_cles.sql", soumisLe: "2026-08-10", corrigeLe: "2026-08-12", note: 16, commentaire: null },
  { id: 21, userId: 2, etudiant: "Amina Kerrouche", questionId: 22, exercice: "Clés primaires et étrangères", leconId: 3, coursId: 4, cours: "Bases de données", type: "Input", reponse: "Réduire la redondance des données.", soumisLe: "2026-08-13", corrigeLe: "2026-08-14", note: 14, commentaire: null },
];

export const fakeLeconProgression = [
  { userId: 1, leconId: 1, coursId: 1, completeLe: "2026-07-19" },
  { userId: 1, leconId: 2, coursId: 1, completeLe: "2026-07-21" },
  { userId: 1, leconId: 3, coursId: 1, completeLe: "2026-07-23" },
  { userId: 1, leconId: 4, coursId: 1, completeLe: "2026-07-25" },
  { userId: 1, leconId: 1, coursId: 4, completeLe: "2026-08-01" },
  { userId: 1, leconId: 2, coursId: 4, completeLe: "2026-08-03" },
  { userId: 1, leconId: 1, coursId: 2, completeLe: "2026-08-11" },
  { userId: 2, leconId: 1, coursId: 1, completeLe: "2026-07-21" },
  { userId: 2, leconId: 2, coursId: 1, completeLe: "2026-07-23" },
  { userId: 2, leconId: 1, coursId: 4, completeLe: "2026-08-06" },
  { userId: 2, leconId: 2, coursId: 4, completeLe: "2026-08-08" },
  { userId: 2, leconId: 3, coursId: 4, completeLe: "2026-08-10" },
  { userId: 5, leconId: 1, coursId: 4, completeLe: "2026-07-26" },
  { userId: 5, leconId: 2, coursId: 4, completeLe: "2026-07-28" },
  { userId: 5, leconId: 3, coursId: 4, completeLe: "2026-07-30" },
  { userId: 5, leconId: 4, coursId: 4, completeLe: "2026-08-01" },
  { userId: 5, leconId: 1, coursId: 3, completeLe: "2026-08-09" },
  { userId: 5, leconId: 2, coursId: 3, completeLe: "2026-08-10" },
  { userId: 5, leconId: 3, coursId: 3, completeLe: "2026-08-11" },
  { userId: 5, leconId: 4, coursId: 3, completeLe: "2026-08-12" },
  { userId: 5, leconId: 5, coursId: 3, completeLe: "2026-08-13" },
  { userId: 7, leconId: 1, coursId: 3, completeLe: "2026-08-02" },
  { userId: 8, leconId: 1, coursId: 2, completeLe: "2026-08-06" },
  { userId: 8, leconId: 2, coursId: 2, completeLe: "2026-08-08" },
  { userId: 8, leconId: 3, coursId: 2, completeLe: "2026-08-10" },
];

export const fakeQuestions = [
  { id: 1, exerciceId: 1, texte: "Quel élément HTML définit l'en-tête d'une page ?", type: "Input" },
  { id: 2, exerciceId: 1, texte: "Quelle balise est utilisée pour du contenu sémantique de navigation ?", type: "QCM", choix: [
    { id: 1, texte: "<div>", correct: false },
    { id: 2, texte: "<nav>", correct: true },
    { id: 3, texte: "<section>", correct: false },
    { id: 4, texte: "<link>", correct: false },
  ]},
  { id: 3, exerciceId: 1, texte: "Envoyez une capture d'écran de votre page structurée", type: "File Upload" },

  { id: 4, exerciceId: 2, texte: "Que fait la propriété justify-content dans un conteneur flex ?", type: "Input" },
  { id: 5, exerciceId: 2, texte: "Quelle valeur de display active Flexbox ?", type: "QCM", choix: [
    { id: 1, texte: "block", correct: false },
    { id: 2, texte: "grid", correct: false },
    { id: 3, texte: "flex", correct: true },
    { id: 4, texte: "inline", correct: false },
  ]},
  { id: 6, exerciceId: 2, texte: "Envoyez le fichier CSS de votre mise en page", type: "File Upload" },

  { id: 7, exerciceId: 3, texte: "Quelle méthode permet de sélectionner un élément par son id ?", type: "Input" },
  { id: 8, exerciceId: 3, texte: "Quelle méthode ajoute un élément enfant au DOM ?", type: "QCM", choix: [
    { id: 1, texte: "innerHTML()", correct: false },
    { id: 2, texte: "getElementById()", correct: false },
    { id: 3, texte: "querySelector()", correct: false },
    { id: 4, texte: "appendChild()", correct: true },
  ]},
  { id: 9, exerciceId: 3, texte: "Envoyez votre script JavaScript", type: "File Upload" },

  { id: 10, exerciceId: 4, texte: "Expliquez en une phrase à quoi sert l'attribut required", type: "Input" },
  { id: 11, exerciceId: 4, texte: "Qu'est-ce qu'un composant contrôlé ?", type: "QCM", choix: [
    { id: 1, texte: "Un composant qui ne peut pas recevoir de props", correct: false },
    { id: 2, texte: "Un composant dont la valeur est gérée par le state de React", correct: true },
    { id: 3, texte: "Un composant qui gère lui-même son propre DOM sans React", correct: false },
    { id: 4, texte: "Un composant utilisé uniquement pour le style", correct: false },
  ]},
  { id: 12, exerciceId: 4, texte: "Envoyez une capture de votre formulaire validé", type: "File Upload" },

  { id: 13, exerciceId: 5, texte: "Comment afficher un message d'erreur conditionnellement en React ?", type: "Input" },
  { id: 14, exerciceId: 5, texte: "Quelle balise regroupe des champs de formulaire liés ?", type: "QCM", choix: [
    { id: 1, texte: "<group>", correct: false },
    { id: 2, texte: "<section>", correct: false },
    { id: 3, texte: "<fieldset>", correct: true },
    { id: 4, texte: "<form>", correct: false },
  ]},
  { id: 15, exerciceId: 5, texte: "Envoyez votre script de classe abstraite", type: "File Upload" },

  { id: 46, exerciceId: 12, texte: "Citez un exemple de style de management directif", type: "Input" },
  { id: 47, exerciceId: 12, texte: "Quel style de management laisse le plus d'autonomie à l'équipe ?", type: "QCM", choix: [
    { id: 1, texte: "Directif", correct: false },
    { id: 2, texte: "Persuasif", correct: false },
    { id: 3, texte: "Délégatif", correct: true },
    { id: 4, texte: "Participatif", correct: false },
  ]},
  { id: 48, exerciceId: 12, texte: "Envoyez votre analyse de style de management", type: "File Upload" },

  { id: 49, exerciceId: 13, texte: "Quelle information doit toujours accompagner une tâche déléguée ?", type: "Input" },
  { id: 50, exerciceId: 13, texte: "Que faut-il éviter en déléguant une tâche ?", type: "QCM", choix: [
    { id: 1, texte: "Donner un délai clair", correct: false },
    { id: 2, texte: "Micro-gérer la personne", correct: true },
    { id: 3, texte: "Vérifier la compréhension", correct: false },
    { id: 4, texte: "Fixer un objectif précis", correct: false },
  ]},
  { id: 51, exerciceId: 13, texte: "Envoyez votre plan de délégation", type: "File Upload" },

  { id: 52, exerciceId: 14, texte: "Quelle est la première règle d'un feedback constructif ?", type: "Input" },
  { id: 53, exerciceId: 14, texte: "Quel modèle structure un feedback en 3 parties ?", type: "QCM", choix: [
    { id: 1, texte: "SWOT", correct: false },
    { id: 2, texte: "SBI (Situation-Comportement-Impact)", correct: true },
    { id: 3, texte: "PDCA", correct: false },
    { id: 4, texte: "RACI", correct: false },
  ]},
  { id: 54, exerciceId: 14, texte: "Envoyez un exemple rédigé de feedback", type: "File Upload" },

  { id: 55, exerciceId: 15, texte: "Quelle est la première étape pour désamorcer un conflit ?", type: "Input" },
  { id: 56, exerciceId: 15, texte: "Quel comportement aggrave généralement un conflit ?", type: "QCM", choix: [
    { id: 1, texte: "Écouter activement", correct: false },
    { id: 2, texte: "Ignorer le problème", correct: true },
    { id: 3, texte: "Reformuler les points de vue", correct: false },
    { id: 4, texte: "Chercher un compromis", correct: false },
  ]},
  { id: 57, exerciceId: 15, texte: "Envoyez votre plan de résolution de conflit", type: "File Upload" },

  { id: 58, exerciceId: 16, texte: "Citez un levier de motivation non financier", type: "Input" },
  { id: 59, exerciceId: 16, texte: "Quel facteur est souvent le plus démotivant pour une équipe ?", type: "QCM", choix: [
    { id: 1, texte: "Reconnaissance du travail", correct: false },
    { id: 2, texte: "Manque de reconnaissance", correct: true },
    { id: 3, texte: "Autonomie", correct: false },
    { id: 4, texte: "Objectifs clairs", correct: false },
  ]},
  { id: 60, exerciceId: 16, texte: "Envoyez votre plan de motivation d'équipe", type: "File Upload" },

  { id: 16, exerciceId: 17, texte: "Quel type de relation existe entre deux tables lorsqu'une ligne d'une table correspond à plusieurs lignes d'une autre ?", type: "Input" },
  { id: 17, exerciceId: 17, texte: "Que représente une clé primaire dans une table ?", type: "QCM", choix: [
    { id: 1, texte: "Un identifiant unique pour chaque ligne", correct: true },
    { id: 2, texte: "Une colonne facultative", correct: false },
    { id: 3, texte: "Une colonne toujours en texte", correct: false },
    { id: 4, texte: "Une colonne dupliquée dans chaque table", correct: false },
  ]},
  { id: 18, exerciceId: 17, texte: "Envoyez votre schéma de base de données", type: "File Upload" },

  { id: 19, exerciceId: 18, texte: "À quoi sert une clé étrangère ?", type: "Input" },
  { id: 20, exerciceId: 18, texte: "Que se passe-t-il avec ON DELETE CASCADE ?", type: "QCM", choix: [
    { id: 1, texte: "Les lignes liées sont aussi supprimées", correct: true },
    { id: 2, texte: "Rien ne se passe", correct: false },
    { id: 3, texte: "La colonne devient NULL", correct: false },
    { id: 4, texte: "Une erreur est levée", correct: false },
  ]},
  { id: 21, exerciceId: 18, texte: "Envoyez votre script SQL de création de table", type: "File Upload" },

  { id: 22, exerciceId: 19, texte: "Expliquez en une phrase le but de la normalisation", type: "Input" },
  { id: 23, exerciceId: 19, texte: "Quelle forme normale élimine les dépendances partielles ?", type: "QCM", choix: [
    { id: 1, texte: "1NF", correct: false },
    { id: 2, texte: "2NF", correct: true },
    { id: 3, texte: "3NF", correct: false },
    { id: 4, texte: "BCNF", correct: false },
  ]},
  { id: 24, exerciceId: 19, texte: "Envoyez votre table normalisée", type: "File Upload" },

  { id: 25, exerciceId: 20, texte: "Quelle clause filtre les résultats d'une requête SELECT ?", type: "Input" },
  { id: 26, exerciceId: 20, texte: "Quelle clause trie les résultats ?", type: "QCM", choix: [
    { id: 1, texte: "GROUP BY", correct: false },
    { id: 2, texte: "ORDER BY", correct: true },
    { id: 3, texte: "HAVING", correct: false },
    { id: 4, texte: "LIMIT", correct: false },
  ]},
  { id: 27, exerciceId: 20, texte: "Envoyez votre requête SELECT", type: "File Upload" },

  { id: 28, exerciceId: 21, texte: "Quelle instruction modifie des lignes existantes ?", type: "Input" },
  { id: 29, exerciceId: 21, texte: "Quelle clause est obligatoire avec UPDATE pour éviter de tout modifier ?", type: "QCM", choix: [
    { id: 1, texte: "SET", correct: false },
    { id: 2, texte: "FROM", correct: false },
    { id: 3, texte: "WHERE", correct: true },
    { id: 4, texte: "VALUES", correct: false },
  ]},
  { id: 30, exerciceId: 21, texte: "Envoyez votre requête UPDATE", type: "File Upload" },

  { id: 31, exerciceId: 22, texte: "Qu'est-ce qu'une jointure interne (INNER JOIN) ?", type: "Input" },
  { id: 32, exerciceId: 22, texte: "Quelle jointure retourne toutes les lignes de la table de gauche ?", type: "QCM", choix: [
    { id: 1, texte: "INNER JOIN", correct: false },
    { id: 2, texte: "RIGHT JOIN", correct: false },
    { id: 3, texte: "LEFT JOIN", correct: true },
    { id: 4, texte: "FULL JOIN", correct: false },
  ]},
  { id: 33, exerciceId: 22, texte: "Envoyez votre requête avec jointure", type: "File Upload" },

  { id: 34, exerciceId: 23, texte: "Combien de tables minimum faut-il pour une jointure ?", type: "Input" },
  { id: 35, exerciceId: 23, texte: "Quel mot-clé combine deux SELECT en supprimant les doublons ?", type: "QCM", choix: [
    { id: 1, texte: "UNION ALL", correct: false },
    { id: 2, texte: "JOIN", correct: false },
    { id: 3, texte: "UNION", correct: true },
    { id: 4, texte: "MERGE", correct: false },
  ]},
  { id: 36, exerciceId: 23, texte: "Envoyez votre requête finale", type: "File Upload" },

  { id: 37, exerciceId: 24, texte: "Quel facteur influence le plus le confort visuel dans un espace de travail ?", type: "Input" },
  { id: 38, exerciceId: 24, texte: "Quelle orientation maximise généralement la lumière naturelle ?", type: "QCM", choix: [
    { id: 1, texte: "Nord", correct: false },
    { id: 2, texte: "Sud", correct: true },
    { id: 3, texte: "Est uniquement", correct: false },
    { id: 4, texte: "Ouest uniquement", correct: false },
  ]},
  { id: 39, exerciceId: 24, texte: "Envoyez votre analyse d'espace", type: "File Upload" },

  { id: 40, exerciceId: 25, texte: "Pourquoi l'éclairage indirect est-il souvent préféré en open space ?", type: "Input" },
  { id: 41, exerciceId: 25, texte: "Quel type d'éclairage réduit le plus l'éblouissement sur écran ?", type: "QCM", choix: [
    { id: 1, texte: "Éclairage direct fort", correct: false },
    { id: 2, texte: "Éclairage indirect diffus", correct: true },
    { id: 3, texte: "Aucun éclairage artificiel", correct: false },
    { id: 4, texte: "Néons apparents", correct: false },
  ]},
  { id: 42, exerciceId: 25, texte: "Envoyez votre plan d'éclairage", type: "File Upload" },

  { id: 43, exerciceId: 26, texte: "Qu'est-ce qu'un flux de circulation dans un espace de travail ?", type: "Input" },
  { id: 44, exerciceId: 26, texte: "Quelle largeur minimale est généralement recommandée pour un couloir principal ?", type: "QCM", choix: [
    { id: 1, texte: "60 cm", correct: false },
    { id: 2, texte: "90 cm", correct: false },
    { id: 3, texte: "120 cm", correct: true },
    { id: 4, texte: "30 cm", correct: false },
  ]},
  { id: 45, exerciceId: 26, texte: "Envoyez votre plan de circulation", type: "File Upload" },
];

export const fakeLeconTexteCours4 = [
  { id: 4, leconId: 2, coursId: 4, contenu: "Une clé primaire identifie de façon unique chaque ligne d'une table. Une clé étrangère référence la clé primaire d'une autre table, créant ainsi une relation entre les deux.", ordre: 1 },
  { id: 5, leconId: 3, coursId: 4, contenu: "La normalisation réduit la redondance des données en découpant les tables selon des règles précises : 1NF, 2NF, 3NF. Chaque forme normale élimine un type de dépendance problématique.", ordre: 1 },
  { id: 6, leconId: 7, coursId: 4, contenu: "Une jointure combine des lignes de deux tables ou plus selon une condition. INNER JOIN ne garde que les correspondances, LEFT JOIN garde toutes les lignes de la table de gauche même sans correspondance.", ordre: 1 },
];

export const fakeLeconPdfCours4 = [
  { id: 5, leconId: 1, coursId: 4, fileName: "intro_bases_donnees.pdf", ordre: 1 },
  { id: 6, leconId: 2, coursId: 4, fileName: "cles_primaires_etrangeres.pdf", ordre: 1 },
  { id: 11, leconId: 3, coursId: 4, fileName: "cles_primaires_schema.pdf", ordre: 1 },
  { id: 7, leconId: 4, coursId: 4, fileName: "normalisation_formes.pdf", ordre: 1 },
  { id: 8, leconId: 5, coursId: 4, fileName: "select_syntaxe.pdf", ordre: 1 },
  { id: 9, leconId: 6, coursId: 4, fileName: "update_insert_delete.pdf", ordre: 1 },
  { id: 10, leconId: 7, coursId: 4, fileName: "jointures_types.pdf", ordre: 1 },
];

export const fakeLeconVideoCours4 = [
  { id: 4, leconId: 1, coursId: 4, fileName: "intro_bases_donnees.mp4", url: videoFile, thumbnail: videoPic, duree: 480, ordre: 1 },
  { id: 5, leconId: 3, coursId: 4, fileName: "normalisation_exemple.mp4", url: videoFile, thumbnail: videoPic, duree: 540, ordre: 1 },
  { id: 6, leconId: 5, coursId: 4, fileName: "requetes_select.mp4", url: videoFile, thumbnail: videoPic, duree: 390, ordre: 1 },
  { id: 7, leconId: 6, coursId: 4, fileName: "requetes_modification.mp4", url: videoFile, thumbnail: videoPic, duree: 420, ordre: 1 },
];