export const userFields = [
  { label: "Prénom", name: "prenom", type: "text", placeholder: "Entrer votre prénom..." },
  { label: "Nom", name: "nom", type: "text", placeholder: "Entrer votre nom..." },
  { label: "Email", name: "email", type: "text", placeholder: "Entrer votre email..." },
  { 
    label: "Rôle", 
    name: "role", 
    type: "select", 
    options: ["Formateur", "Étudiant"],
    lockedOn: true,
    placeholder: "Choisir un rôle..."
  },
];

export const coursFields = [
  { label: "Titre", name: "cours_titre", type: "text", placeholder: "Entrer le titre du cours..." },
  { 
    label: "Formateur", 
    name: "formateur_id", 
    type: "select", 
    placeholder: "Choisir un formateur",
  },
  { 
    label: "Catégorie", 
    name: "categorie_id", 
    type: "select", 
    placeholder: "Choisir une catégorie",
  }
]

export const categorieFields = [
  { label: "Nom", name: "categorie_nom", type: "text", placeholder: "Entrez le nom de la catégorie" },
];

export const exerciceFields = [
  { label: "Titre", name: "exercice_titre", type: "text" },
];