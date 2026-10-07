import { useState, useEffect } from "react";
import StateBox from "../../components/shared/PageComponents/StateBox";
import RecentActivities from "../../components/shared/PageComponents/RecentActivities";
import QuickAccess from "../../components/shared/PageComponents/QuickAccess";
import { GraduationCap, Presentation, Book, KeyRound } from "lucide-react";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { toast } from "react-toastify";

const TableauDeBord = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const [cours, setCours] = useState([]);
  const [users, setUsers] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php`, {
        credentials: 'include',
      });
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setCours(data);
      return true;
    } catch (error) {
      setCours([]);
      return false;
    }
  };

  const getInscriptions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php`, {
        credentials: 'include',
      });
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions([]);
      return false;
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php`, {
        credentials: 'include',
      });
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setUsers(data);
      return true;
    } catch (error) {
      setUsers([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getCours(),
        getUsers(),
        getInscriptions(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, []);
  
  useEffect(() => {
    const inscriptionActivities = inscriptions
      ? inscriptions.map((i) => ({
          badge: "admin",
          text: `Accès à « ${capitalize(i.cours)} » accordé à ${capitalize(i.etudiant)}`,
          date: i.inscrit_le,
          to: `/admin/acces`,
        }))
      : "";

    const userActivities = users
      ? users.map((c) => ({
          badge: "admin",
          text: `Compte ${c.role.toLowerCase()} créé pour ${capitalize(c.nom) + " " + capitalize(c.prenom)}`,
          date: c.cree_le,
          to: `/admin/utilisateurs`,
        }))
      : "";

    console.log('userActivities', userActivities);
    console.log('inscriptionActivities', inscriptionActivities);
    
    setActivities(
      [...inscriptionActivities, ...userActivities].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ).slice(0, 10))

  }, [users, inscriptions])
      

    const filteredActivities = showAll ? activities : activities.slice(0, 5)

  const students = users
    ? users.filter((user) => user.role === "Etudiant")
    : "";
  const formateur = users
    ? users.filter((user) => user.role === "Formateur")
    : "";


  const numberOfStudents = students.length;
  const numberOfFormateur = formateur.length;
  const numberOfCours = cours.length;
  const numberOfAccess = inscriptions.length;

  const now = new Date();

  const studentsThisMonth = students
    ? students.filter((s) => {
        const d = new Date(s.cree_le);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length
    : "";

  const formateurThisMonth = formateur
    ? formateur.filter((f) => {
        const d = new Date(f.cree_le);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length
    : "";

  const coursThisMonth = cours
    ? cours.filter((c) => {
        const d = new Date(c.cree_le);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length
    : "";

  const accessThisMonth = inscriptions
    ? inscriptions.filter((a) => {
        const d = new Date(a.inscrit_le);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length
    : "";

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
          <div className="flex justify-between p-2 mx-5">
            <StateBox
              icon={GraduationCap}
              titre={numberOfStudents}
              label={"Étudiants"}
              footer={`+${studentsThisMonth} ce mois-ci`}
            />
            <StateBox
              icon={Presentation}
              titre={numberOfFormateur}
              label={"Formateur"}
              footer={`+${formateurThisMonth} ce mois-ci`}
            />
            <StateBox
              icon={Book}
              titre={numberOfCours}
              label={"Cours"}
              footer={`+${coursThisMonth} ce mois-ci`}
            />
            <StateBox
              icon={KeyRound}
              titre={numberOfAccess}
              label={"Accès aux cours"}
              footer={`+${accessThisMonth} ce mois-ci`}
            />
          </div>
          <div className="flex gap-1 mx-6">
            <div className="w-4/5">
              <div className="border-2 border-gris-clair rounded-2xl p-2 mx-5 my-1 flex flex-col">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-1">
                  Activité récente
                </h2>
                {filteredActivities.map((activity, i) => (
                  <div key={i}>
                    <RecentActivities
                      badge={activity.badge}
                      text={activity.text}
                      date={activity.date}
                      to={activity.to}
                    />
                  </div>
                ))}
                <button
                  className="font-semibold text-orange-cuivre text-lg cursor-pointer hover:text-orange-cuivre/75 hover:underline transition duration-300 ease-in-out"
                  onClick={() => setShowAll((activity) => !activity)}
                >
                  {showAll ? "Voir moins" : "Voir plus"}
                </button>
              </div>
            </div>
            <div className="w-1/3">
              <div className="border-2 border-gris-clair rounded-2xl p-3 mx-5 my-1 flex flex-col gap-2">
                <h2 className="font-titres font-semibold text-bleu-principal text-xl">
                  Accès rapide
                </h2>
                <QuickAccess
                  link={"Gérer les utilisateurs"}
                  portail={"admin"}
                  direction={"utilisateurs"}
                />
                <QuickAccess
                  link={"Gérer les cours"}
                  portail={"admin"}
                  direction={"cours"}
                />
                <QuickAccess
                  link={"Gérer les catégories"}
                  portail={"admin"}
                  direction={"categorie"}
                />
                <QuickAccess
                  link={"Accorder un accès"}
                  portail={"admin"}
                  direction={"acces"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableauDeBord;
