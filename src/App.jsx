import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import TableauDeBord from './pages/admin/TableauDeBord'
import Utilisateurs from './pages/admin/Utilisateurs'
import Cours from './pages/admin/Cours'
import AccesPage from './pages/admin/AccesPage'
import Categorie from './pages/admin/Categorie'
import CoursDetails from './pages/admin/CoursDetails'
import CoursDetailsFormateur from './pages/formateur/CoursDetails'
import ExercicePage from './pages/formateur/ExercicePage'
import TableauDeBordFormateur from "./pages/formateur/TableauDeBordFormateur";
import MesCours from "./pages/formateur/MesCours";
import MesEtudiants from "./pages/formateur/MesEtudiants";
import Corrections from "./pages/formateur/Corrections";
import TableauDeBordEtudiant from "./pages/etudiants/TableauDeBordEtudiant";
import MesCoursEtudiant from "./pages/etudiants/MesCoursEtudiant";
import MesExercices from "./pages/etudiants/MesExercices";
import MesNotes from "./pages/etudiants/MesNotes";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from './pages/authentication/Login'
import ChangerMotDePasse from './pages/authentication/ChangerMotDePasse'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/changer-mot-de-passe' element={<ChangerMotDePasse />} />
        </Route>

        <Route path='/' element={<MainLayout role={'admin'} />}>
          <Route path='/admin' element={<TableauDeBord />} handle={{ titre: 'Tableau de bord', sousTitre: "L'état de l'école en un coup d'œil" }} />
          <Route path="/admin/utilisateurs" element={<Utilisateurs />} handle={{ titre: 'Utilisateurs', sousTitre: "Comptes étudiants, formateurs et administrateurs", addButton:'Créer un compte'}} />
          <Route path="/admin/cours" element={<Cours />} handle={{ titre: 'Cours', sousTitre: "Catalogue complet", addButton:'Créer un cours' }} />
          <Route path="/admin/categorie" element={<Categorie />} handle={{ titre: 'Catégories', sousTitre: "Organiser les cours par domaine", addButton:'Créer une catégorie' }} />
          <Route path="/admin/acces" element={<AccesPage />} handle={{ titre: 'Accès aux cours', sousTitre: "Un étudiant ne voit que les cours qui lui ont été accordés" }} />
          <Route path="/admin/cours/:id" element={<CoursDetails />} handle={{ sousTitre: "Retour aux cours", backLink: '/admin/cours' }} />
        </Route>
        
        <Route path='/' element={<MainLayout role={'formateur'} />}>
          <Route path='/formateur' element={<TableauDeBordFormateur />} handle={{ titre: 'Tableau de bord', sousTitre: "Belkacem Nadia" }} />
          <Route path="/formateur/cours" element={<MesCours />} handle={{ titre: 'Mes cours', sousTitre: "Belkacem Nadia" }} />
          <Route path="/formateur/etudiants" element={<MesEtudiants />} handle={{ titre: 'Mes étudiants', sousTitre: "Belkacem Nadia" }} />
          <Route path="/formateur/corrections" element={<Corrections />} handle={{ titre: 'Corrections', sousTitre: "Belkacem Nadia" }} />
          <Route path="/formateur/cours/:id" element={<CoursDetailsFormateur />} handle={{ titre: 'Prise de parole en public', sousTitre: "Retour aux cours", backLink: '/formateur/cours', addButton:'Ajouter leçon' }} />
          <Route path="/formateur/cours/:id/:exerciceId" element={<ExercicePage />} handle={{ titre: 'Prise de parole en public', sousTitre: "Retour aux cours", backLink: '/formateur/cours/:id', addButton:'Ajouter question' }} />
        </Route>

        <Route path='/' element={<MainLayout role={'etudiant'} />}>
          <Route path='/etudiant' element={<TableauDeBordEtudiant />} handle={{ titre: 'Tableau de bord', sousTitre: "Bonjour User1" }} />
          <Route path="/etudiant/mes-cours" element={<MesCoursEtudiant />} handle={{ titre: 'Mes cours', sousTitre: "User1" }} />
          <Route path="/etudiant/mes-exercices" element={<MesExercices />} handle={{ titre: 'Mes étudiants', sousTitre: "User1" }} />
          <Route path="/etudiant/mes-notes" element={<MesNotes />} handle={{ titre: 'Corrections', sousTitre: "User1" }} />
          <Route path="/formateur/cours/:id" element={<CoursDetails />} handle={{ titre: 'Prise de parole en public', sousTitre: "Retour aux cours", backLink: '/admin/cours' }} />
        </Route>
      </>
    )
  )
  return(
    <RouterProvider router={router} />
  );
};

export default App;
