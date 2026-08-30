import React, { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import CourseCardFormateur from "../../components/formateur/CourseCardFormateur";
import { fakeCours, fakeUsers, fakeEtudiantsInscrits } from "../../fakeData";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const MesCours = () => {
  const [cours, setCours] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [hasError, setHasError] = useState(false);

  const getCours = async () => {
    try {
      const response = await fetch("http://localhost:8000/cours");
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
      const response = await fetch("http://localhost:8000/inscriptions");
      const data = await response.json();

      setInscriptions(data);
      return true;
    } catch (error) {
      setInscriptions("");
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getInscriptions(),
        getCours(),
      ]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const coursSelected = cours.filter(
    (c) =>
      c.formateur.toLowerCase() ===
      `${currentUser.prenom.toLowerCase()} ${currentUser.nom.toLowerCase()}`,
  );
  const enrolledStudents = inscriptions.filter((i) =>
    coursSelected.some((c) => c.titre === i.cours),
  ).length;

  return (
    <div className="flex flex-col px-5 mt-8 gap-4 items-center">
      {loading ? (
        <Spinner />
      ) : hasError ? (
        <FetchError />
      ) : (
        <>
          <SearchBar />
          <CourseCardFormateur cours={coursSelected} enrolled={enrolledStudents} />
        </>
      )}
    </div>
  );
};

export default MesCours;
