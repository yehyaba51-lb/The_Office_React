import StateBox from "../../components/shared/PageComponents/StateBox";
import RecentActivities from "../../components/shared/PageComponents/RecentActivities";
import QuickAccess from "../../components/shared/PageComponents/QuickAccess";
import { Check, Book } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'

const TableauDeBordEtudiant = () => {
  const [cours, setCours] = useState([]);
  const [soumissions, setSoumissions] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours`);
      const data = await response.json();

      setCours(data);
      return true;
    } catch (error) {
      setCours([]);
      return false;
    }
  };
  const getSoumissions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/soumissions`,
      );
      const data = await response.json();

      setSoumissions(data);
      return true;
    } catch (error) {
      setSoumissions([]);
      return false;
    }
  };
  const getInscriptions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/inscriptions`,
      );
      const data = await response.json();

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEveything = async () => {
      const results = await Promise.all([
        getCours(),
        getInscriptions(),
        getSoumissions(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEveything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log("User", currentUser);
  console.log("cours", cours);
  console.log("inscriptions", inscriptions);
  console.log("soumissions", soumissions);

  const selectedInscriptions = inscriptions
    ? inscriptions.filter((i) =>
        currentUser
          ? i.etudiant.toLowerCase() ===
            currentUser.nom.toLowerCase() +
              " " +
              currentUser.prenom.toLowerCase()
          : [],
      )
    : [];

  const coursEnCours = selectedInscriptions
  ? selectedInscriptions.filter((i) => i.noteFinale === null).length
  : 0;

const coursDone = selectedInscriptions
  ? selectedInscriptions.filter((i) => i.noteFinale !== null).length
  : 0;

  return (
    <div className={`flex flex-col justify-center items-center ${loading && "mt-25"}`}>
      {loading ? (
        <Spinner />
      ) : hasErrors ? (
        <FetchError />
      ) : (
        <>
          <div className="flex justify-between p-2 mx-5 w-full">
            <StateBox
              icon={Book}
              titre={coursEnCours}
              label={"Cours en cours"}
            />
            <StateBox icon={Check} titre={coursDone} label={"Cours terminés"} />
          </div>
          <div className="flex gap-1 mx-6 w-full px-2">
            <div className="w-full flex gap-5">
              <div className="w-full border-2 border-gris-clair rounded-xl p-2 mx-5 my-1">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-2">
                  Activité récente
                </h2>
                <RecentActivities
                  role={"student"}
                  badge={"corrige"}
                  text={
                    'Soumission corrigée — "Fondations du développement web"'
                  }
                  note={16}
                  date={"2026-08-02"}
                  to={"/etudiant/notes"}
                />
                <RecentActivities
                  role={"student"}
                  badge={"admin"}
                  text={`Réponse soumise — "Qu'est-ce qu'un composant contrôlé ?"`}
                  date={"2026-07-28"}
                  to={"/etudiant/exercices"}
                />
                <RecentActivities
                  role={"student"}
                  badge={"cours"}
                  text={'Cours terminé — "Bases de données"'}
                  date={"2026-07-27"}
                  to={"/etudiant/cours"}
                />
                <RecentActivities
                  role={"student"}
                  badge={"cours"}
                  text={'Inscrit à "Introduction à React" — "Bases de données"'}
                  date={"2026-07-27"}
                  to={"/etudiant/cours"}
                />
                <RecentActivities
                  role={"student"}
                  badge={"corrige"}
                  text={
                    'Soumission corrigée — "Expliquez useEffect en une phrase"'
                  }
                  note={8}
                  date={"2026-07-25"}
                  to={"/etudiant/notes"}
                />
                <RecentActivities
                  role={"student"}
                  badge={"admin"}
                  text={`Réponse soumise — "Qu'est-ce qu'un composant contrôlé ?"`}
                  date={"2026-07-24"}
                  to={"/etudiant/exercices"}
                />
              </div>
            </div>
            <div className="w-2/3">
              <div className="border-2 border-gris-clair rounded-xl p-3 mx-5 my-1 flex flex-col gap-2">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl">
                  Accès rapide
                </h2>
                <QuickAccess
                  link={"Accéder  à mes cours"}
                  portail={"etudiant"}
                  direction={"cours"}
                />
                <QuickAccess
                  link={"Voir mes exercices"}
                  portail={"etudiant"}
                  direction={"exercices"}
                />
                <QuickAccess
                  link={"Mes notes"}
                  portail={"etudiant"}
                  direction={"notes"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableauDeBordEtudiant;
