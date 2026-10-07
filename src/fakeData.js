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