import { LayoutDashboard, UsersRound, NotebookText, LayoutList, KeyRound, ClipboardList, NotebookPen, FileBadge } from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: UsersRound },
  { to: "/admin/cours", label: "Cours", icon: NotebookText, end: true },
  { to: "/admin/categorie", label: "Catégories", icon: LayoutList },
  { to: "/admin/acces", label: "Accès aux cours", icon: KeyRound },
];

export const formateurNav = [
  { to: "/formateur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/formateur/cours", label: "Mes cours", icon: NotebookText, end: true },
  { to: "/formateur/etudiants", label: "Mes étudiants", icon: UsersRound },
  { to: "/formateur/corrections", label: "Corrections", icon: ClipboardList },
];

export const etudiantNav = [
  { to: "/etudiant", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/etudiant/cours", label: "Mes cours", icon: NotebookText, end: true },
  { to: "/etudiant/exercices", label: "Mes exercices", icon: NotebookPen, end: true },
  { to: "/etudiant/notes", label: "Mes notes", icon: FileBadge, end: true },
];