import { useEffect, useState } from "react";
import StateBox from "../../components/shared/PageComponents/StateBox";
import RecentActivities from "../../components/shared/PageComponents/RecentActivities";
import QuickAccess from "../../components/shared/PageComponents/QuickAccess";
import { GraduationCap, ChartSpline, Book, NotebookPen } from "lucide-react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { translations } from "../../translations";

const TableauDeBordFormateur = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const [showAll, setshowAll] = useState(false);
  const [soumissions, setSoumissions] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const { currentUser, lang } = useOutletContext();

  const getStatistics = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/cours.php?id=${currentUser.utilisateur_id}&formateur=true`,
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
      setStatistics([]);
      toast.error("Fetch erreur");
      return false;
    }
  };

  const getInscriptions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${currentUser.utilisateur_id}&formateur=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions([]);
      return false;
    }
  };

  const getSoumissions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&formateur=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setSoumissions(data);
      return true;
    } catch (error) {
      setSoumissions([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getInscriptions(),
        getSoumissions(),
        getStatistics(),
      ]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, [currentUser]);

  useEffect(() => {
    const inscriptionActivities = inscriptions
      ? inscriptions.map((i) => ({
          badge: `admin`,
          text: `${translations[lang]['nouvelEtudiantInscrit']} : ${capitalize(i.etudiant)} — « ${capitalize(i.cours_titre)} »`,
          date: i.inscrit_le,
          to: `/formateur/etudiants`,
        }))
      : "";

    const soumissionsActivities = soumissions
      ? soumissions.map((s) => ({
          badge: "admin",
          text: `${translations[lang]['nouvelleSoumissionDe']} ${capitalize(s.etudiant)} — « ${capitalize(s.exercice_titre)} »`,
          date: s.soumis_le,
          to: "/formateur/corrections",
        }))
      : "";

    setActivities(
      [...soumissionsActivities, ...inscriptionActivities]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10),
    );
  }, [soumissions, inscriptions, lang]);

  const filteredActivitesFormateur = showAll
    ? activities
    : activities.slice(0, 5);

  const completionMoyenne =
    statistics?.completion?.total > 0
      ? Math.round(
          (statistics.completion.termines * 100) / statistics.completion.total,
        )
      : 0;
  return (
    <div
      className={`flex flex-col justify-center items-center ${loading && "mt-25"}`}
    >
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError language={lang} />
      ) : (
        <div className="w-full">
          <div className="flex justify-between p-2 mx-0 md:mx-5 flex-wrap gap-1">
            <StateBox
              icon={GraduationCap}
              titre={statistics.etudiants.total}
              label={translations[lang]['etudiants']}
              footer={
                statistics.etudiants.ce_mois
                  ? `+${statistics.etudiants.ce_mois} ${translations[lang]['ceMoisCi']}`
                  : `0  ${translations[lang]['ceMoisCi']}`
              }
            />
            <StateBox
              icon={Book}
              titre={statistics.cours.total}
              label={translations[lang]['cours']}
              footer={
                statistics.cours.ce_mois
                  ? `+${statistics.cours.ce_mois} ${translations[lang]['ceMoisCi']}`
                  : `0  ${translations[lang]['ceMoisCi']}`
              }
            />
            <StateBox
              icon={ChartSpline}
              titre={completionMoyenne !== "" ? `${completionMoyenne}%` : "0%"}
              label={translations[lang]['completionMoyen']}
            />
            <StateBox
              icon={NotebookPen}
              titre={statistics.soumissions.total}
              label={translations[lang]['soumissionsACorriger']}
              footer={
                statistics.soumissions.ce_mois
                  ? `+${statistics.soumissions.ce_mois} ${translations[lang]['ceMoisCi']}`
                  : `0  ${translations[lang]['ceMoisCi']}`
              }
            />
          </div>
          <div className="flex flex-col lg:flex-row mx-0 md:mx-5 mt-5 flex-wrap">
            <div className="w-full lg:w-2/3">
              <div className="border-2 border-gris-clair rounded-2xl px-2 mx-5 my-1 flex flex-col">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 pt-3 mb-1">
                  {translations[lang]['activiteRecente']}
                </h2>
                {filteredActivitesFormateur.length > 0 ? (
                  <>
                    {filteredActivitesFormateur.map((activity, i) => (
                      <RecentActivities
                        key={i}
                        badge={activity.badge}
                        text={activity.text}
                        date={activity.date}
                        to={activity.to}
                      />
                    ))}
                    <button
                      className="font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out"
                      onClick={() => setshowAll((activity) => !activity)}
                    >
                      {showAll ? translations[lang]['voirMoins'] : translations[lang]['voirPlus']}
                    </button>
                  </>
                ) : (
                  <p className="text-center text-bleu-secondaire mt-2 p-1">
                    {translations[lang]['aucuneActiviteRecente']}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-1/3 mb-2">
              <div className="border-2 border-gris-clair rounded-xl p-3 mx-5 my-1 flex flex-col gap-2">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl">
                  {translations[lang]['accesRapide']}
                </h2>
                <QuickAccess
                  link={translations[lang]['gererMesCours']}
                  portail={"formateur"}
                  direction={"cours"}
                />
                <QuickAccess
                  link={translations[lang]['voirMesEtudiants']}
                  portail={"formateur"}
                  direction={"etudiants"}
                />
                <QuickAccess
                  link={translations[lang]['corrigerLesExercices']}
                  portail={"formateur"}
                  direction={"corrections"}
                />
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableauDeBordFormateur;
