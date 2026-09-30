import { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import TableData from "../../components/shared/PageComponents/TableData";
import { mesEtudiantsColumns } from "../../fakeData";
import FetchError from "../../components/shared/FetchError";
import Spinner from "../../components/shared/Spinner";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { Inbox } from "lucide-react";

const MesEtudiants = () => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [cours, setCours] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useOutletContext()
  const [hasError, setHasError] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false)
  const [filter, setFilter] = useState("tous");
  const [search, setSearch] = useState("");

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${currentUser.utilisateur_id}&formateurcours=true`, {
        credentials: 'include',
      })
      const data = await response.json();

      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${currentUser.utilisateur_id}&formateur=true`, {
        credentials: 'include',
      })
      const data = await response.json()
  
      if(response.status === 403){
        setAccessDenied(true)
        return 
      } else if(!response.ok){
        toast.error(data.error)
        return false
      }
        
      setInscriptions(data)
        
      return true
    } catch (error) {
      setInscriptions([])
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getCours(), getInscriptions()]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, [currentUser]);
  

  const filteredEtudiants = inscriptions ? inscriptions.filter((s) => {
    if (filter === "tous") return true;
    return s.cours_titre === filter;
  }) : ''

  const finalizedFilteredEtudiants = filteredEtudiants ? filteredEtudiants.filter(
    (e) =>
      `${e.etudiant}`.toLowerCase().includes(search.toLowerCase()) ||
      `${e.cours_titre}`.toLowerCase().includes(search.toLowerCase()),
  ) : ''

  
  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center ${loading && "mt-25"}`}
    >
      {loading ? <Spinner /> : accessDenied ? <FetchError accessDenied={true} /> : hasError ? <FetchError /> : inscriptions.length === 0 ? (
        <>
            <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center mt-10">
              <Inbox size={28} className="text-bleu-secondaire" />
            </div>
            <p className="text-bleu-principal font-semibold">Aucun étudiant inscrit</p>
          </>
      ) : (
        <>
          <div className="flex px-5 mt-5 gap-4 items-center w-full">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="w-75 p-2 border-2 border-gris-clair outline-none focus:border-orange-cuivre/55 focus:ring-2 focus:ring-orange-cuivre/30 rounded-xl flex text-bleu-secondaire text-md justify-center gap-5"
            >
              <option className="" value="tous">
                Tous les cours
              </option>
              {cours.map((c) => (
                <option key={c.cours_id} className="" value={c.cours_titre}>
                  {capitalize(c.cours_titre)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex px-5 mt-2 gap-4 items-center w-full">
            <TableData
              columns={mesEtudiantsColumns}
              rows={finalizedFilteredEtudiants}
              admin={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MesEtudiants;
