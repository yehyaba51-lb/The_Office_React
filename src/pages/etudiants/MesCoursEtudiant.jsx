import SearchBar from "../../components/shared/SearchBar";
import CourseCardFormateur from "../../components/formateur/CourseCardFormateur";
import { useEffect, useState } from "react";
import FetchError from "../../components/shared/FetchError";
import Spinner from "../../components/shared/Spinner";

const MesCoursEtudiant = () => {
  const [cours, setCours] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [exercices, setExercices] = useState([]);
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

  const getExercices = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/exercices`,
      );
      const data = await response.json();

      setExercices(data);
      return true;
    } catch (error) {
      setExercices([]);
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getInscriptions(),
        getExercices(),
        getCours(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const selectedInscriptions = inscriptions
    ? inscriptions.filter(
        (i) =>
          i.etudiant.toLowerCase() ===
          currentUser.prenom.toLowerCase() +
            " " +
            currentUser.nom.toLowerCase(),
      )
    : [];

  const selectedInscriptionsIds = selectedInscriptions
    ? selectedInscriptions.map((i) => i.coursId)
    : [];

  const selectedCours = cours
    ? cours.filter((c) => {
        return selectedInscriptionsIds
          ? selectedInscriptionsIds.includes(Number(c.id))
          : [];
      })
    : [];

  console.log('selectedCours', selectedCours);
  

  const numberOfLecons = selectedCours
    ? selectedCours.map((c) => c.lecons)
    : [];

  const numberOfExos = selectedInscriptionsIds
    ? selectedInscriptionsIds.map(
        (e) => exercices.filter((i) => i.coursId === e).length,
      )
    : [];

  const progressions = selectedInscriptions
    ? selectedInscriptions.map((i) => Number(i.progression.split("/")[0]))
    : [];


  return (
    <div
      className={`flex flex-col px-5 gap-4 items-center ${loading ? "mt-25" : "my-8"}`}
    >
      {loading ? (
        <Spinner />
      ) : hasErrors ? (
        <FetchError />
      ) : (
        <>
          <SearchBar />
          <CourseCardFormateur
            cours={selectedCours}
            etudiant={true}
            lecons={numberOfLecons}
            exercices={numberOfExos}
            progression={ progressions }
          />
        </>
      )}
    </div>
  );
};

export default MesCoursEtudiant;
