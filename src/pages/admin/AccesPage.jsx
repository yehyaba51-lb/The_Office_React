import { useEffect, useRef, useState } from "react";
import { CircleX, KeyRound } from "lucide-react";
import ConfirmModal from "../../components/modals/ConfirmModal";
import SuccessModal from "../../components/modals/SuccessModal";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import SearchBar from "../../components/shared/SearchBar";
import { Inbox } from "lucide-react";

const AccesPage = () => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const [access, setAccess] = useState([]);
  const [users, setUsers] = useState([]);
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState('')
  const [newAccessCours, setNewAccessCours] = useState("");
  const [newAccessEtudiant, setNewAccessEtudiant] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const formRef = useRef();

  const showModal = searchParams.get("success") === "true";
  const showDelete = searchParams.get("delete") === "true";

  const getInscription = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php`, {
        credentials: 'include'
      });
      const data = await response.json();

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      setAccess(data);
      return true;
    } catch (error) {
      setAccess([]);
      return false;
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/utilisateurs.php`, {
        credentials: 'include'
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

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php`, {
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
        getInscription(),
        getUsers(),
        getCours(),
      ]);
      setHasError(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, []);

  const etudiants = users ? users.filter((u) => u.role === "Etudiant") : "";

  const deleteId = searchParams.get("id");
  const selectedInscription = access ? access.find(
    (inscription) => inscription.id === deleteId,
  ) : ''

  const supprimerInscription = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php?id=${id}`, {
        method: "DELETE",
        credentials: 'include'
      });

      if(!response.ok){
        return false
      }
      
      toast.success(`Inscription de ${selectedInscription.etudiant} supprimer`);
      getInscription();
      return true
    } catch (error) {
      toast.error("Impossible de supprimer l'inscription");
      return false
    }
  };

  const addAccess = async (a) => {
    if(a.cours_id === '' || a.cours_id.length === 0){
      toast.error('Aucun cours séléctionner')
      return false
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/inscriptions.php`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(a),
      });

      if(!response.ok){
        return false
      }

      getInscription();
      return true
    } catch (error) {
      toast.error("Impossible de donner l'accès");
      return false
    }
  };

  const filtersEtudiants = etudiants ? etudiants.filter(e => `${e.nom} ${e.prenom}`.toLowerCase().includes(search.toLowerCase())) : ""
  const appliableCours = cours ? cours.filter(c => c.lecons > 0) : []
  
  return (
    <div className="flex flex-col justify-start">
      {showModal && (
        <SuccessModal
          type={"Accès"}
          content={`« ${newAccessCours} »`}
          accord={`« ${newAccessEtudiant} »`}
        />
      )}
      {showDelete && selectedInscription && (
        <ConfirmModal
          type={"l'inscription"}
          name={selectedInscription.cours}
          deleteFunction={() => supprimerInscription(deleteId)}
          inscriptionEtudiant={selectedInscription.etudiant}
          irreversible={false}
        />
      )}
      <div
        className={`flex items-start justify-center p-2 mx-5 gap-7 ${loading && "mt-25"}`}
      >
        {loading ? (
          <Spinner />
        ) : hasError ? (
          <FetchError />
        ) : (
          <>
            <div className="h-fit gap-2 border-2 justify-start border-gris-clair w-2/5 rounded-2xl py-6 px-4 mt-5 flex flex-col items-start">
              <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-1">
                Accorder un accès
              </h2>
              <form
                action=""
                method="post"
                className="flex flex-col w-full"
                ref={formRef}
              >
                <div className="flex flex-col gap-1 mt-1 w-full">
                  <label
                    htmlFor="rechercher"
                    className="text-gris-fonce text-md"
                  >
                    Rechercher
                  </label>
                  <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} noPlaceholder={true} />
                </div>
                <div className="flex flex-col gap-1 mt-3 w-full">
                  <label htmlFor="etudiant" className="text-gris-fonce text-md">
                    Étudiant
                  </label>
                  <select
                    type="text"
                    name="etudiant"
                    id="etudiant"
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                  >
                    {filtersEtudiants.length > 0 ? filtersEtudiants.map((e) => (
                      <option value={Number(e.id)} key={e.id}>
                        {capitalize(e.prenom) + " " + capitalize(e.nom)}
                      </option>
                    )) : (
                      <option value="">Aucun étudiant crée</option>
                    )}
                  </select>
                </div>
                <div className="flex flex-col gap-1 mt-3 w-full">
                  <label htmlFor="cours" className="text-gris-fonce text-md">
                    Cours
                  </label>
                  <select
                    type="text"
                    name="cours"
                    id="cours"
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder="Entrer votre email"
                  >
                    {appliableCours.length > 0 ? appliableCours.map((cours) => (
                      <option value={Number(cours.id)} key={cours.id}>
                        {capitalize(cours.titre)}
                      </option>
                    )) : (
                      <option value="">
                        Aucun cours avec leçons
                      </option>
                    )}
                  </select>
                </div>
              </form>
              <button
                onClick={async () => {
                  const formData = new FormData(formRef.current);
                  const etudiantInput = formData.get("etudiant");
                  const coursInput = formData.get("cours");

                  const etudiant = filtersEtudiants ? filtersEtudiants.find(e => Number(e.id) === Number(etudiantInput)) : ''
                  const cours = appliableCours ? appliableCours.find(c => Number(c.id) === Number(coursInput)) : ''
                  
                  cours && setNewAccessCours(capitalize(cours.titre));
                  etudiant && setNewAccessEtudiant(`${capitalize(etudiant.prenom)} ${capitalize(etudiant.nom)}`);
                  
                  const success = await addAccess({
                    etudiant_id: etudiantInput,
                    cours_id: coursInput
                  });
                  if(success) navigate(`${location.pathname}?success=true`);
                }}
                className="text-white font-semibold mt-3 flex items-center rounded bg-orange-cuivre px-4 py-1 gap-1 hover:bg-orange-cuivre/90 transition duration-300 ease-in-out cursor-pointer"
              >
                <KeyRound className="text-white" size={16} /> Donner l'accès
              </button>
            </div>
            <div className="border-2 border-gris-clair w-3/5 rounded-2xl py-6 px-4 mt-5 flex flex-col gap-3 justify-center items-start">
              <h2 className="font-titres font-semibold text-bleu-principal text-xl px-3 mb-2">
                Accès déjà accordés
              </h2>
              {access.length === 0 ? (
                <div className="self-center">
                  <div className="rounded-full bg-gris-clair w-16 h-16 flex items-center justify-center mx-auto">
                    <Inbox size={28} className="text-bleu-secondaire" />
                  </div>
                  <p className="mt-4 text-bleu-principal font-semibold">Aucune Inscription créé</p>
                </div>
              ) : (
                <>
                  {access.map((access) => (
                    <div
                      key={access.id}
                      className="w-full text-bleu-secondaire text-md flex px-2 py-1 justify-between items-center border-2 border-gris-clair rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gris-clair w-10 h-10 rounded-full flex justify-center items-center font-semibold text-bleu-principal">
                          {access.etudiant[0]}
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-bleu-secondaire font-semibold">
                            {capitalize(access.etudiant)}
                          </h3>
                          <p className="text-gris-fonce text-sm">{capitalize(access.cours)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <h4 className="font-titres text-md text-gris-fonce">
                          {access.inscrit_le.split(' ')[0]}
                        </h4>
                        <CircleX
                          size={18}
                          className="cursor-pointer hover:text-gris-fonce/40 transition duration-300 ease-in-out"
                          onClick={() =>
                            navigate(
                              `${location.pathname}?delete=true&id=${access.id}`,
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                
                </>

              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccesPage;
