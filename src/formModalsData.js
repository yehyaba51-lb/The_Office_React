export const userFields = [
  { label: "Prénom", name: "prenom", type: "text", placeholder: "Entrer votre prénom..." },
  { label: "Nom", name: "nom", type: "text", placeholder: "Entrer votre nom..." },
  { label: "Email", name: "email", type: "text", placeholder: "Entrer votre email..." },
  { 
    label: "Rôle", 
    name: "role", 
    type: "select", 
    options: ["Formateur", "Étudiant"],
    lockedOn: true
  },
];

export const coursFields = [
  { label: "Titre", name: "titre", type: "text" },
  { 
    label: "Formateur", 
    name: "formateur", 
    type: "select", 
    options: ["Nadia Belkacem", "Sofiane Ghomari", "Islam Bensalem", "Yasmine Haddad"]
  },
  { 
    label: "Catégorie", 
    name: "categorie", 
    type: "select", 
    options: ["Informatique", "Soft skills", "Management", "Architecture"] 
  },
];

export const categorieFields = [
  { label: "Nom", name: "categorie_nom", type: "text", placeholder: "Entrez le nom de la catégorie" },
];

export const exerciceFields = [
  { label: "Titre", name: "titre", type: "text" },
];