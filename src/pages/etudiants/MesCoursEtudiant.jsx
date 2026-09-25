import SearchBar from "../../components/shared/SearchBar";
import CourseCardFormateur from "../../components/formateur/CourseCardFormateur";
import { useEffect, useState } from "react";
import FetchError from "../../components/shared/FetchError";
import Spinner from "../../components/shared/Spinner";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const MesCoursEtudiant = () => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const currentUser = useOutletContext()

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${currentUser.utilisateur_id}&allCoursEtudiant=true`, {
        credentials: 'include'
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

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([
        getCours(),
      ]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, []);
  
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
            cours={cours}
            etudiant={true}
          />
        </>
      )}
    </div>
  );
};

export default MesCoursEtudiant;
