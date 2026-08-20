import { LayoutDashboard, UsersRound, NotebookText, LayoutList, KeyRound } from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: UsersRound },
  { to: "/admin/cours", label: "Cours", icon: NotebookText, end: true },
  { to: "/admin/categorie", label: "Catégories", icon: LayoutList },
  { to: "/admin/acces", label: "Accès aux cours", icon: KeyRound },
];

export const formateurNav = [
  { to: "/formateur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/formateur/cours", label: "Mes cours", icon: NotebookText },
  { to: "/formateur/etudiants", label: "Mes étudiants", icon: UsersRound },
  { to: "/formateur/corrections", label: "Corrections", icon: KeyRound },
];

export const etudiantNav = [
  { to: "/etudiant", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/etudiant/mes-cours", label: "Mes cours", icon: NotebookText },
  { to: "/etudiant/mes-exercices", label: "Mes exercices", icon: LayoutList },
  { to: "/etudiant/mes-notes", label: "Mes notes", icon: KeyRound },
];