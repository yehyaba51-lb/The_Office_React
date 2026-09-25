import StateBox from "../../components/shared/PageComponents/StateBox";
import RecentActivities from "../../components/shared/PageComponents/RecentActivities";
import QuickAccess from "../../components/shared/PageComponents/QuickAccess";
import { Check, Book } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const TableauDeBordEtudiant = () => {
  const [statistics, setStatistics] = useState(null);
  const [coursTermine, setCoursTermine] = useState([]);
  const [soumissionCorrige, setSoumissionCorrige] = useState([]);
  const [newInscription, setNewInscription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const currentUser = useOutletContext()
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getStatistics = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/progression.php?id=${currentUser.utilisateur_id}`, {
          credentials: 'include'
        }
      );
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setStatistics(data);
      return true;
    } catch (error) {
      setStatistics(null);
      return false;
    }
  };

  const getCoursTermine = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/progression.php?id=${currentUser.utilisateur_id}&cours=true`, {
          credentials: 'include'
        }
      );
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setCoursTermine(data);
      return true;
    } catch (error) {
      setCoursTermine([]);
      return false;
    }
  };

  const getSoumissionsCorrige = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&corrige=true`, {
          credentials: 'include'
        }
      );
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setSoumissionCorrige(data);
      return true;
    } catch (error) {
      setSoumissionCorrige([]);
      return false;
    }
  };
  const getNouveauInscriptions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${currentUser.utilisateur_id}&new=true`, {
          credentials: 'include'
        }
      );
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setNewInscription(data);
      return true;
    } catch (error) {
      setNewInscription([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEveything = async () => {
      const results = await Promise.all([
        getStatistics(),
        getCoursTermine(),
        getSoumissionsCorrige(),
        getNouveauInscriptions()
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEveything();
  }, []);


  useEffect(() => {
    const inscriptionsActivities = newInscription
      ? newInscription.map((i) => ({
          role: "student",
          badge: "cours",
          text: `Inscrit à ${i.cours_titre}`,
          date: i.inscrit_le,
          to: "/etudiant/cours",
        }))
      : [];
  
    const soumissionsActivities = soumissionCorrige
      ? soumissionCorrige.map((s) => ({
          role: "student",
          badge: "corrige",
          text: `Soumission corrigée — "${s.texte_question}"`,
          note: s.note,
          date: s.corrige_le,
          to: "/etudiant/notes",
        }))
      : [];


    const coursTermineActivities = coursTermine
      ? coursTermine.map((c) => ({
          role: "student",
          badge: "soumission",
          text: `Cours terminé — "${c.cours_titre}"`,
          date: c.complete_le,
          to: "/etudiant/cours",
        }))
      : [];
      
  
    setActivities(
      [...soumissionsActivities, ...coursTermineActivities, ...inscriptionsActivities].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ).slice(0, 10)
    );

  }, [coursTermine, soumissionCorrige, newInscription])

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
              titre={statistics.en_cours}
              label={"Cours en cours"}
            />
            <StateBox icon={Check} titre={statistics.terminee} label={"Cours terminés"} />
          </div>
          <div className="flex gap-1 mx-6 w-full px-2">
            <div className="w-full flex gap-5">
              <div className="border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col w-full">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-2">
                  Activité récente
                </h2>
                {filteredActivities.map((a, i) => (
                  <RecentActivities key={i}
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
