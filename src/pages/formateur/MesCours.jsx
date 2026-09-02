import { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import CourseCardFormateur from "../../components/formateur/CourseCardFormateur";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const MesCours = () => {
  const [cours, setCours] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [exercices, setExercices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState("");

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours`);
      const data = await response.json();

      setCours(data);
      return true;
    } catch (error) {
      setCours("");
      return false;
    }
  };

  const getInscriptions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions`);
      const data = await response.json();

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions("");
      return false;
    }
  };

  const getExercices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/exercices`);
      const data = await response.json();

      setExercices(data);
      return true;
    } catch (error) {
      setExercices("");
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getInscriptions(),
        getCours(),
        getExercices(),
      ]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const coursSelected = cours
    ? cours.filter(
        (c) =>
          c.formateur.toLowerCase() ===
          `${currentUser && currentUser.prenom.toLowerCase()} ${currentUser && currentUser.nom.toLowerCase()}`,
      )
    : "";

  const searchCours = coursSelected ? coursSelected.filter(
    (c) =>
      `${c.titre}`.toLowerCase().includes(search.toLowerCase())
  ) : ''

  const numberOfExercises = searchCours
    ? searchCours.map(
        (c) => exercices.filter((e) => e.coursId === Number(c.id)).length,
      )
    : "";

  const enrolledStudents = searchCours
    ? searchCours.map(
        (c) =>
          inscriptions.filter(
            (i) => i.cours.toLowerCase() === c.titre.toLowerCase(),
          ).length,
      )
    : "";

  const progression = searchCours
    ? searchCours.map(
        (c) =>
          inscriptions.filter(
            (i) =>
              i.cours.toLowerCase() === c.titre.toLowerCase() &&
              i.noteFinale !== null,
          ).length,
      )
    : "";

  return (
    <div
      className={`flex flex-col px-5 mt-8 gap-4 items-center ${loading && "mt-25"}`}
    >
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError />
      ) : (
        <>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CourseCardFormateur
            cours={searchCours}
            enrolled={enrolledStudents}
            lecons={searchCours.map((c) => c.lecons)}
            exercices={numberOfExercises}
            progression={progression}
          />
        </>
      )}
    </div>
  );
};

export default MesCours;
