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
          <Route path='*' element={<NotFoundPage />} handle={{ titre: 'Page introuvable', homeLink: '/' }} />
        </Route>

        <Route path='/' element={<MainLayout role={'Administrateur'} />}>
          <Route path='/admin' element={<TableauDeBord />} handle={{ titre: 'tableauDeBord', sousTitre: "sousTitreDashboard" }} />
          <Route path="/admin/utilisateurs" element={<Utilisateurs />} handle={{ titre: 'utilisateurs', sousTitre: "sousTitreUtilisateurs", addButton:'ajouterCompte'}} />
          <Route path="/admin/cours" element={<Cours />} handle={{ titre: 'cours', sousTitre: "sousTitreCours", addButton:'ajouterCours' }} />
          <Route path="/admin/categorie" element={<Categorie />} handle={{ titre: 'categories', sousTitre: "sousTitreCategories", addButton:'ajouterCategorie' }} />
          <Route path="/admin/acces" element={<AccesPage />} handle={{ titre: 'accesAuxCours', sousTitre: "sousTitreAcces" }} />
          <Route path="/admin/cours/:id" element={<CoursDetails />} handle={{ titre:'coursIntrouvable', sousTitre: "retourAuxCours", backLink: '/admin/cours' }} />
          <Route path='/admin/*' element={<NotFoundPage />} handle={{ titre: 'pageIntrouvable', homeLink: '/admin' }} />
        </Route>
        
        <Route path='/' element={<MainLayout role={'Formateur'} />}>
          <Route path='/formateur' element={<TableauDeBordFormateur />} handle={{ titre: 'tableauDeBord' }} />
          <Route path="/formateur/cours" element={<MesCours />} handle={{ titre: 'mesCours' }} />
          <Route path="/formateur/etudiants" element={<MesEtudiants />} handle={{ titre: 'mesEtudiants' }} />
          <Route path="/formateur/corrections" element={<Corrections />} handle={{ titre: 'corrections' }} />
          <Route path="/formateur/cours/:id" element={<CoursDetailsFormateur />} handle={{ sousTitre: "retourAuxCours", backLink: '/formateur/cours', addButton:'ajouterLecon' }} />
          <Route path="/formateur/cours/:id/exercices/:exerciceId" element={<ExercicePage />} handle={{ sousTitre: "retourAuxCours", backLink: '/formateur/cours/:id', addButton:'ajouterQuestion' }} />
          <Route path="/formateur/cours/:id/lecons/:leconId" element={<LessonDetailsPageFormateur />} handle={{ sousTitre: "retourAuxCours", backLink: '/formateur/cours/:id' }} />
          <Route path='/formateur/*' element={<NotFoundPage />} handle={{ titre: 'pageIntrouvable', homeLink: '/formateur' }} />
        </Route>

        <Route path='/' element={<MainLayout role={'Etudiant'} />}>
          <Route path='/etudiant' element={<TableauDeBordEtudiant />} handle={{ titre: 'tableauDeBord' }} />
          <Route path="/etudiant/cours" element={<MesCoursEtudiant />} handle={{ titre: 'mesCours' }} />
          <Route path="/etudiant/exercices" element={<MesExercices />} handle={{ titre: 'mesExercices' }} />
          <Route path="/etudiant/notes" element={<MesNotes />} handle={{ titre: 'mesNotes' }} />
          <Route path="/etudiant/cours/:id" element={<CoursDetailsEtudiant />} handle={{ titre: 'coursIntrouvable', sousTitre: "retourAuxCours", backLink: '/etudiant/cours' }} />
          <Route path="/etudiant/cours/:id/:leconId" element={<LessonDetailsPage />} handle={{ sousTitre: "retourAuxCours", backLink: '/etudiant/cours/:id' }} />
          <Route path="/etudiant/exercices/:exerciceId" element={<ExerciceDetailsPage />} handle={{ titre: 'exercice', sousTitre: "retourAuxExercice", backLink: '/etudiant/exercices' }} />
          <Route path="/etudiant/notes/:id" element={<NotesDetailsPage />} handle={{ titre: 'note', sousTitre: "retourAuxNotes", backLink: '/etudiant/notes' }} />
          <Route path='/etudiant/*' element={<NotFoundPage />} handle={{ titre: 'pageIntrouvable', homeLink: '/etudiant' }} />
        </Route>
      </>
    )
  )
  return(
    <RouterProvider router={router} />
  );
};

export default App;
