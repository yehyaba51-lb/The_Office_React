export const userFields = [
  { labelKey: "fieldPrenom", name: "prenom", type: "text", placeholderKey: "placeholderPrenom" },
  { labelKey: "fieldNom", name: "nom", type: "text", placeholderKey: "placeholderNom" },
  { labelKey: "email", name: "email", type: "text", placeholderKey: "placeholderEmail" },
  { 
    labelKey: "fieldRole", 
    name: "role", 
    type: "select", 
    options: [
      { value: "Formateur", labelKey: "singleFormateurLabel" },
      { value: "Etudiant", labelKey: "etudiant" }
    ],
    lockedOn: true,
    placeholderKey: "placeholderRole"
  },
];

export const coursFields = [
  { labelKey: "fieldTitre", name: "cours_titre", type: "text", placeholderKey: "placeholderTitreCours" },
  { 
    labelKey: "fieldFormateur", 
    name: "formateur_id", 
    type: "select", 
    placeholderKey: "placeholderFormateur",
  },
  { 
    labelKey: "fieldCategorie", 
    name: "categorie_id", 
    type: "select", 
    placeholderKey: "placeholderCategorie",
  }
]

export const categorieFields = [
  { labelKey: "fieldNom", name: "categorie_nom", type: "text", placeholderKey: "placeholderNomCategorie" },
];

export const exerciceFields = [
  { labelKey: "fieldTitre", name: "exercice_titre", type: "text", placeholderKey: "placeholderTitreExercice" },
];