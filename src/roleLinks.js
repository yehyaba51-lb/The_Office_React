import { LayoutDashboard, UsersRound, NotebookText, LayoutList, KeyRound, ClipboardList, NotebookPen, FileBadge } from "lucide-react";

export const adminNav = [
  { to: "/admin", labelKey: "tableauDeBord", icon: LayoutDashboard, end: true },
  { to: "/admin/utilisateurs", labelKey: "utilisateurs", icon: UsersRound },
  { to: "/admin/cours", labelKey: "cours", icon: NotebookText, end: true },
  { to: "/admin/categorie", labelKey: "categories", icon: LayoutList },
  { to: "/admin/acces", labelKey: "accesAuxCours", icon: KeyRound },
];

export const formateurNav = [
  { to: "/formateur", labelKey: "tableauDeBord", icon: LayoutDashboard, end: true },
  { to: "/formateur/cours", labelKey: "mesCours", icon: NotebookText, end: true },
  { to: "/formateur/etudiants", labelKey: "mesEtudiants", icon: UsersRound },
  { to: "/formateur/corrections", labelKey: "corrections", icon: ClipboardList },
];

export const etudiantNav = [
  { to: "/etudiant", labelKey: "tableauDeBord", icon: LayoutDashboard, end: true },
  { to: "/etudiant/cours", labelKey: "mesCours", icon: NotebookText, end: true },
  { to: "/etudiant/exercices", labelKey: "mesExercices", icon: NotebookPen, end: true },
  { to: "/etudiant/notes", labelKey: "mesNotes", icon: FileBadge, end: true },
];