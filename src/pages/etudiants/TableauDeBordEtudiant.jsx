import StateBox from "../../components/shared/PageComponents/StateBox";
import RecentActivities from "../../components/shared/PageComponents/RecentActivities";
import QuickAccess from "../../components/shared/PageComponents/QuickAccess";
import { Check, Book } from "lucide-react";
import { useEffect, useState } from "react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { translations } from "../../translations";

const TableauDeBordEtudiant = () => {
  const [statistics, setStatistics] = useState(null);
  const [coursTermine, setCoursTermine] = useState([]);
  const [soumissionCorrige, setSoumissionCorrige] = useState([]);
  const [newInscription, setNewInscription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const { currentUser, lang } = useOutletContext();
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getStatistics = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/progression.php?id=${currentUser.utilisateur_id}`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
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
        `${import.meta.env.VITE_SERVER_URL}/progression.php?id=${currentUser.utilisateur_id}&cours=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
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
        `${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&corrige=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
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
        `${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${currentUser.utilisateur_id}&new=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
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
        getNouveauInscriptions(),
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
          text: `${translations[lang]['inscritA']} ${i.cours_titre}`,
          date: i.inscrit_le,
          to: "/etudiant/cours",
        }))
      : [];

    const soumissionsActivities = soumissionCorrige
      ? soumissionCorrige.map((s) => ({
          role: "student",
          badge: "corrige",
          text: `${translations[lang]['soumissionCorrigee']} — "${s.texte_question}"`,
          note: s.note,
          date: s.corrige_le,
          to: "/etudiant/notes",
        }))
      : [];

    const coursTermineActivities = coursTermine
      ? coursTermine.map((c) => ({
          role: "student",
          badge: "soumission",
          text: `${translations[lang]['coursTermine']} — "${c.cours_titre}"`,
          date: c.complete_le,
          to: "/etudiant/cours",
        }))
      : [];

    setActivities(
      [
        ...soumissionsActivities,
        ...coursTermineActivities,
        ...inscriptionsActivities,
      ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10),
    );
  }, [coursTermine, soumissionCorrige, newInscription, lang]);

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
        <div className="w-full">
          <div className="flex gap-5 p-2 mx-5">
            <StateBox
              icon={Book}
              titre={statistics.en_cours}
              label={translations[lang]['coursEnCours']}
            />
            <StateBox
              icon={Check}
              titre={statistics.terminee}
              label={translations[lang]['coursTermines']}
            />
          </div>
          <div className="flex gap-1 mx-6">
            <div className="w-full lg:w-2/3">
              <div className="border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-2">
                  {translations[lang]['activiteRecente']}
                </h2>
                {filteredActivities.length > 0 ? (
                  <>
                    {filteredActivities.map((a, i) => (
                      <RecentActivities
                        key={i}
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
                      {showAll ? translations[lang]['voirMoins'] : translations[lang]['voirPlus']}
                    </button>
                  </>
                ) : (
                  <p className="text-center text-bleu-secondaire">
                    {translations[lang]['aucuneActiviteRecente']}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-2 border-gris-clair rounded-xl p-3 mx-5 my-1 flex flex-col gap-2">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl">
                  {translations[lang]['accesRapide']}
                </h2>
                <QuickAccess
                  link={translations[lang]['accederAMesCours']}
                  portail={"etudiant"}
                  direction={"cours"}
                />
                <QuickAccess
                  link={translations[lang]['voirMesExercices']}
                  portail={"etudiant"}
                  direction={"exercices"}
                />
                <QuickAccess
                  link={translations[lang]['mesNotesLabel']}
                  portail={"etudiant"}
                  direction={"notes"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableauDeBordEtudiant;
