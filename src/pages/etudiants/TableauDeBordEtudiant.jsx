import StateBox from "../../components/shared/PageComponents/StateBox";
import RecentActivities from "../../components/shared/PageComponents/RecentActivities";
import QuickAccess from "../../components/shared/PageComponents/QuickAccess";
import { Check, Book } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const TableauDeBordEtudiant = () => {
  const [soumissions, setSoumissions] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

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
        getInscriptions(),
        getSoumissions(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEveything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log("currentUser", currentUser);

  const selectedInscriptions = inscriptions
    ? inscriptions.filter((i) =>
        currentUser
          ? i.etudiant.toLowerCase() ===
            currentUser.prenom.toLowerCase() +
              " " +
              currentUser.nom.toLowerCase()
          : [],
      )
    : [];

  console.log("selectedInscriptions", selectedInscriptions);

  const selectedSoumissions = soumissions
    ? soumissions.filter((s) =>
        currentUser
          ? s.etudiant.toLowerCase() ===
            currentUser.prenom.toLowerCase() +
              " " +
              currentUser.nom.toLowerCase()
          : [],
      )
    : [];


  const coursEnCours = selectedInscriptions
    ? selectedInscriptions.filter((i) => i.noteFinale === null).length
    : 0;

  const coursDone = selectedInscriptions
    ? selectedInscriptions.filter((i) => i.noteFinale !== null).length
    : 0;

  useEffect(() => {
    const inscriptionsActivities = selectedInscriptions
      ? selectedInscriptions.map((i) => ({
          role: "student",
          badge: "cours",
          text: `Inscrit à ${i.cours}`,
          date: i.inscritLe,
          to: "/etudiant/cours",
        }))
      : [];
  
    const correctedSelectedSoumissions = selectedSoumissions.filter(
      (s) => s.note !== null,
    );
    const soumissionsActivities = correctedSelectedSoumissions
      ? correctedSelectedSoumissions.map((s) => ({
          role: "student",
          badge: "corrige",
          text: `Soumission corrigée — "${s.question}"`,
          note: s.note,
          date: s.corrigeLe,
          to: "/etudiant/notes",
        }))
      : [];

    const completedInscriptions = selectedInscriptions ? selectedInscriptions.filter(i => i.completeLe !== null) : []
    const coursActivities = completedInscriptions
      ? completedInscriptions.map((c) => ({
          role: "student",
          badge: "soumission",
          text: `Cours terminé — "${c.cours}"`,
          date: c.completeLe,
          to: "/etudiant/cours",
        }))
      : []
      
  
    setActivities(
      [...soumissionsActivities, ...coursActivities, ...inscriptionsActivities].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ).slice(0, 10)
    );

  }, [inscriptions, soumissions])

  const filteredActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <div
      className={`flex flex-col justify-center items-center ${loading && "mt-25"}`}
    >
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
              <div className="border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col w-full">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-2">
                  Activité récente
                </h2>
                {filteredActivities.map((a) => (
                  <RecentActivities
                    role={a.role}
                    badge={a.badge}
                    text={a.text}
                    note={a.note}
                    date={a.date}
                    to={a.to}
                  />
                ))}
                <button
                  className="mt-4 font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out"
                  onClick={() => setShowAll((activity) => !activity)}
                >
                  {showAll ? "Voir moins" : "Voir plus"}
                </button>
              </div>
            </div>
            <div className="w-1/3">
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
