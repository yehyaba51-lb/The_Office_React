import { useEffect, useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import { Check, LockKeyhole } from "lucide-react";
import { useLocation, Link, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'


const MesExercices = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const [listOfExercices, setListOfExercices] = useState({ cours: [], lecons: [], exercices: [] });
  const currentUser = useOutletContext()
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const location = useLocation();
  const [filter, setFilter] = useState("all");

  const getListOfExercices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/exercices.php?id=${currentUser.utilisateur_id}&exosEtudiant=true`, {
        credentials: 'include'
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setListOfExercices(data)
      return true
    } catch (error) {
      setListOfExercices({ cours: [], lecons: [], exercices: [] })
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getListOfExercices()])
      setHasErrors(results.includes(false))

      setLoading(false)
    }
    
    loadEverything()
  }, []);
  
  const filteredExercices = listOfExercices.exercices ? listOfExercices.exercices.filter(e => {
    if (filter === "all") return true;
      return e.statut === filter;
  }) : []

  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre"}`;

  return (
    <div className={`flex flex-col px-5 gap-4 mb-5 items-center ${loading ? "mt-25" : "my-2"}`}>
      {loading ? <Spinner /> : hasErrors ? <FetchError /> : (
        <>
          <div className="w-full flex mt-5 gap-4 items-center">
            <SearchBar />
            <div className="w-80 p-1 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
              <button
                className={activeClass(filter === "all")}
                onClick={() => setFilter("all")}
              >
                Tous les exercices
              </button>
              <button
                className={activeClass(filter === "a_faire")}
                onClick={() => setFilter("a_faire")}
              >
                À faire
              </button>
              <button
                className={activeClass(filter === "termine")}
                onClick={() => setFilter("termine")}
              >
                Corrigées
              </button>
            </div>
          </div>
          {listOfExercices.cours.map((cours) => (
              <div
                key={cours.cours_id}
                className="mt-5 w-full border-2 border-gris-clair rounded-2xl py-3 flex flex-col gap-2 justify-between"
              >
                <h3 className="px-5 font-titres text-bleu-principal text-xl">
                  {capitalize(cours.cours_titre)}
                </h3>
    
                {listOfExercices.lecons.filter((lecon) => lecon.cours_id === cours.cours_id).map((lecon) => (
                  filteredExercices.filter((exercice) => exercice.lecon_id === lecon.id && exercice.cours_id === cours.cours_id).map(exercice => (
                  <div key={exercice.exercice_id}>
                    {lecon.id !== '1' && (
                      <hr className="border-2 border-gris-clair w-full mb-2" />
                    )}
                    <Link
                      to={
                        exercice.statut === 'a_faire'
                          ? `${location.pathname}/${exercice.exercice_id}`
                          : ""
                      }
                      className={`${exercice.statut === null ? "cursor-not-allowed" : exercice.statut === 'a_faire' ? 'cursor-pointer' : 'cursor-default'} flex items-center justify-between mx-5`}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 flex items-center justify-center">
                          {exercice.statut === "termine" ? (
                            <Check className="text-vert-reussite" size={30} />
                          ) : exercice.statut === null ? (
                            <LockKeyhole className="text-gris-fonce/30" size={30} />
                          ) : (
                            <p className="bg-orange-cuivre/20 p-2 rounded-lg font-semibold text-orange-cuivre">
                              {String(lecon.lecon_ordre).padStart(2, "0")}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <h3
                            className={`${exercice.statut === null && "text-gris-fonce/40"} font-titres text-bleu-principal font-semibold text-md`}
                          >
                            {lecon.titre}
                          </h3>
                          <p
                            className={`${exercice.statut === null && "text-gris-fonce/40"} text-bleu-secondaire text-lg font-semibold`}
                          >
                            Leçon 0{lecon.lecon_ordre} - {capitalize(exercice.exercice_titre)}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/12">
                        {exercice.statut === "termine" ? (
                          <p className="text-vert-reussite font-medium text-md bg-vert-reussite/20 py-1 px-5 rounded-xl">
                            {exercice.note}
                          </p>
                        ) : exercice.statut === "soumis" ? (
                          <p className="text-bleu-secondaire font-medium text-md bg-bleu-secondaire/20 py-1 px-5 rounded-xl">
                            Soumis
                          </p>
                        ) : exercice.statut === null ? (
                          <p className="text-gris-fonce/40 font-medium text-md bg-gris-clair py-1 px-5 rounded-xl">
                            Verrouillé
                          </p>
                        ) : (
                          <p className="text-orange-cuivre font-medium text-md bg-orange-cuivre/20 py-1 px-5 rounded-xl">
                            À faire
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                ))))}
              </div>
            ))
          }
        </>

      )}
    </div>
  );
};

export default MesExercices;
