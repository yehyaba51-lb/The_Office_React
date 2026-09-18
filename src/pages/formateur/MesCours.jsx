import { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import CourseCardFormateur from "../../components/formateur/CourseCardFormateur";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const MesCours = () => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState("");
  const currentUser = useOutletContext()

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${currentUser.utilisateur_id}&formateurcours=true`)
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


  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getCours()
      ]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    if(currentUser === null) {
      return false
    }
    
    loadEverything();
  }, [currentUser]);

  

  const searchCours = cours ? cours.filter(
    (c) =>
      `${c.cours_titre}`.toLowerCase().includes(search.toLowerCase())
  ) : ''

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
          />
        </>
      )}
    </div>
  );
};

export default MesCours;
