import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from './pages/authentication/Login'
import ChangerMotDePasse from './pages/authentication/ChangerMotDePasse'
import MainLayout from "./components/layouts/MainLayout";
import TableauDeBord from './pages/admin/TableauDeBord'
import Utilisateurs from './pages/admin/Utilisateurs'
import Cours from './pages/admin/Cours'
import AccesPage from './pages/admin/AccesPage'
import Categorie from './pages/admin/Categorie'
import CoursDetails from './pages/admin/CoursDetails'
import TableauDeBordFormateur from "./pages/formateur/TableauDeBordFormateur";
import MesCours from "./pages/formateur/MesCours";
import MesEtudiants from "./pages/formateur/MesEtudiants";
import Corrections from "./pages/formateur/Corrections";
import CoursDetailsFormateur from './pages/formateur/CoursDetails'
import ExercicePage from './pages/formateur/ExercicePage'
import LessonDetailsPageFormateur from './pages/formateur/LessonDetailsPage'
import TableauDeBordEtudiant from "./pages/etudiants/TableauDeBordEtudiant";
import MesCoursEtudiant from "./pages/etudiants/MesCoursEtudiant";
import MesExercices from "./pages/etudiants/MesExercices";
import MesNotes from "./pages/etudiants/MesNotes";
import CoursDetailsEtudiant from './pages/etudiants/CoursDetailsPage'
import ExerciceDetailsPage from './pages/etudiants/ExerciceDetailsPage'
import NotesDetailsPage from './pages/etudiants/NotesDetailsPage'
import LessonDetailsPage from "./pages/etudiants/LessonDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/changer-mot-de-passe' element={<ChangerMotDePasse />} />
          <Route path='*' element={<NotFoundPage />} handle={{ titre: 'Page introuvable' }} />
        </Route>

        <Route path='/' element={<MainLayout role={'Administrateur'} />}>
          <Route path='/admin' element={<TableauDeBord />} handle={{ titre: 'Tableau de bord', sousTitre: "L'état de l'école en un coup d'œil" }} />
          <Route path="/admin/utilisateurs" element={<Utilisateurs />} handle={{ titre: 'Utilisateurs', sousTitre: "Comptes étudiants, formateurs et administrateurs", addButton:'Créer un compte'}} />
          <Route path="/admin/cours" element={<Cours />} handle={{ titre: 'Cours', sousTitre: "Catalogue complet", addButton:'Créer un cours' }} />
          <Route path="/admin/categorie" element={<Categorie />} handle={{ titre: 'Catégories', sousTitre: "Organiser les cours par domaine", addButton:'Créer une catégorie' }} />
          <Route path="/admin/acces" element={<AccesPage />} handle={{ titre: 'Accès aux cours', sousTitre: "Un étudiant ne voit que les cours qui lui ont été accordés" }} />
          <Route path="/admin/cours/:id" element={<CoursDetails />} handle={{ titre:'Cours introuvable', sousTitre: "Retour aux cours", backLink: '/admin/cours' }} />
          <Route path='/admin/*' element={<NotFoundPage />} handle={{ titre: 'Page introuvable', homeLink: '/admin' }} />
        </Route>
        
        <Route path='/' element={<MainLayout role={'Formateur'} />}>
          <Route path='/formateur' element={<TableauDeBordFormateur />} handle={{ titre: 'Tableau de bord' }} />
          <Route path="/formateur/cours" element={<MesCours />} handle={{ titre: 'Mes cours' }} />
          <Route path="/formateur/etudiants" element={<MesEtudiants />} handle={{ titre: 'Mes étudiants' }} />
          <Route path="/formateur/corrections" element={<Corrections />} handle={{ titre: 'Corrections' }} />
          <Route path="/formateur/cours/:id" element={<CoursDetailsFormateur />} handle={{ titre:'', sousTitre: "Retour aux cours", backLink: '/formateur/cours', addButton:'Ajouter leçon' }} />
          <Route path="/formateur/cours/:id/exercices/:exerciceId" element={<ExercicePage />} handle={{ sousTitre: "Retour aux cours", backLink: '/formateur/cours/:id', addButton:'Ajouter question' }} />
          <Route path="/formateur/cours/:id/lecons/:leconId" element={<LessonDetailsPageFormateur />} handle={{ sousTitre: "Retour aux cours", backLink: '/formateur/cours/:id' }} />
          <Route path='/formateur/*' element={<NotFoundPage />} handle={{ titre: 'Page introuvable', homeLink: '/formateur' }} />
        </Route>

        <Route path='/' element={<MainLayout role={'Etudiant'} />}>
          <Route path='/etudiant' element={<TableauDeBordEtudiant />} handle={{ titre: 'Tableau de bord' }} />
          <Route path="/etudiant/cours" element={<MesCoursEtudiant />} handle={{ titre: 'Mes cours' }} />
          <Route path="/etudiant/exercices" element={<MesExercices />} handle={{ titre: 'Mes exercices' }} />
          <Route path="/etudiant/notes" element={<MesNotes />} handle={{ titre: 'Mes Notes' }} />
          <Route path="/etudiant/cours/:id" element={<CoursDetailsEtudiant />} handle={{ titre: 'Cours introuvable', sousTitre: "Retour aux cours", backLink: '/etudiant/cours' }} />
          <Route path="/etudiant/cours/:id/:leconId" element={<LessonDetailsPage />} handle={{ titre: 'Page introuvable', sousTitre: "Retour aux cours", backLink: '/etudiant/cours/:id' }} />
          <Route path="/etudiant/exercices/:coursId/:leconId" element={<ExerciceDetailsPage />} handle={{ titre: 'Exercice', sousTitre: "Retour aux exercices", backLink: '/etudiant/exercices' }} />
          <Route path="/etudiant/notes/:id" element={<NotesDetailsPage />} handle={{ titre: 'Note', sousTitre: "Retour aux notes", backLink: '/etudiant/notes' }} />
          <Route path='/etudiant/*' element={<NotFoundPage />} handle={{ titre: 'Page introuvable', homeLink: '/etudiant' }} />
        </Route>
      </>
    )
  )
  return(
    <RouterProvider router={router} />
  );
};

export default App;
