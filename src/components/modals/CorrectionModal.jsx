import { useEffect, useRef, useState } from "react";
import { CircleX, Check, Download, File, FileX } from "lucide-react";
import { useLocation, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";
import Spinner from "../shared/Spinner";
import FetchError from "../shared/FetchError";

const CorrectionModal = ({ submitFunction, downloadFunction }) => {
  const [questions, setQuestions] = useState([])
  const [soumissions, setSoumissions] = useState([])
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)
  const currentUser = useOutletContext()
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("id");
  const formRef = useRef(null);

  const getCours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php`);
      const data = await response.json();

      setCours(data);
      return true;
    } catch (error) {
      setCours([]);
      return false;
    }
  };

  const getSoumissions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}`)
        const data = await response.json();
  
        if(!response.ok){
          toast.error(data.error)
          return false
        }
  
        setSoumissions(data);
        return true;
      } catch (error) {
        setSoumissions([]);
        return false;
      }
    };

  const getQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php`)
      const data = await response.json()

      setQuestions(data)
      return true
    } catch (error) {
      setQuestions([])
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getSoumissions()])
      setHasErrors(results.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [])


  const selectedCours = cours
    ? cours.filter((c) =>
        currentUser
          ? c.formateur.toLowerCase() ===
            currentUser.prenom.toLowerCase() +
              " " +
              currentUser.nom.toLowerCase()
          : "",
      )
    : "";

  

  const selectedsoumission = soumissions.filter(
    (s) => s.id === Number(questionId)
  );

  const answersSelected =
    selectedsoumission.length > 0
      ? questions.find((q) => Number(q.id) === selectedsoumission[0].questionId)
      : "";

      console.log(answersSelected);
      

    console.log(soumissions);
    
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div
        className="fixed inset-0 flex justify-center items-start p-5 z-10"
        onClick={() => navigate(location.pathname)}
        >
        <div
          className={`bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-2 ${loading && "mt-25 items-center justify-center"}`}
          onClick={(e) => e.stopPropagation()}
          >
          {loading ? <Spinner /> : hasErrors ? <FetchError /> : (
            <>
              {soumissions.length === 0 ? (
                <div className="p-12 flex flex-col items-center gap-3 text-center m-5">
                  <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
                    <FileX className="text-gris-fonce" size={26} />
                  </div>
                  <h3 className="text-bleu-principal font-titres font-semibold text-lg">
                    Soumission introuvable
                  </h3>
                  <p className="text-gris-fonce text-sm max-w-sm">
                    Cette soumission n'existe pas ou a été supprimée. Vérifiez le
                    lien ou retournez à la liste des soumission.
                  </p>
                  <button
                    onClick={() => navigate("/formateur/corrections")}
                    className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
                  >
                    Retour aux soumissions
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex w-full justify-between items-center">
                    <h3 className="font-titres text-bleu-principal text-xl">
                      Corriger une soumission
                    </h3>
                    <button
                      title="Fermer"
                      className="text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out"
                      onClick={() => navigate(location.pathname)}
                    >
                      <CircleX size={22} />
                    </button>
                  </div>
                  <BreadCrumb
                    cours={selectedsoumission.cours_titre}
                    exo={selectedsoumission.texte_question}
                  />
                  <form
                    action=""
                    method="post"
                    className="flex flex-col mt-4"
                    ref={formRef}
                  >
                    <div className="flex flex-col gap-2 mb-2">
                      <label htmlFor="titre" className="text-gris-fonce text-sm">
                        Texte de la question
                      </label>
                      <div className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition">
                        {selectedsoumission.texte_question}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      {answersSelected.type === "Input" ? (
                        <>
                          <label
                            htmlFor="titre"
                            className="text-gris-fonce text-sm"
                          >
                            Réponse
                          </label>
                          <div className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition">
                            {selectedsoumission[0].reponse}
                          </div>
                        </>
                      ) : answersSelected.type === "QCM" ? (
                        <>
                          <div className="flex items-center justify-between mt-3">
                            <label
                              htmlFor="titre"
                              className="text-gris-fonce text-sm"
                            >
                              Les choix
                            </label>
                            <div className="flex items-center gap-5">
                              <div className="flex gap-1 items-center">
                                <div className="w-3 h-3 rounded-full bg-bleu-secondaire"></div>
                                <p className="text-xs text-bleu-secondaire">
                                  Sélection de l'étudiant
                                </p>
                              </div>
                              <div className="flex gap-1 items-center">
                                <Check size={16} className="text-bleu-secondaire" />
                                <p className="text-xs text-bleu-secondaire">
                                  Bonne réponse
                                </p>
                              </div>
                            </div>
                          </div>
                          {answersSelected.choix.map((a) => (
                            <div
                              key={a.id}
                              className={`flex flex-col gap-3 border-2 border-gris-clair rounded-lg py-2 px-4 ${a.correct && "bg-gris-clair"}`}
                            >
                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${selectedsoumission[0].reponseChoixId === a.id ? "bg-bleu-secondaire" : "bg-white border-2 border-gris-clair"}`}
                                  ></div>
                                  <p className="font-semibold text-sm text-bleu-principal">
                                    {a.texte}
                                  </p>
                                </div>
                                {a.correct && (
                                  <Check
                                    size={16}
                                    className="text-bleu-secondaire"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          <label
                            htmlFor="titre"
                            className="text-gris-fonce text-sm"
                          >
                            Fichier
                          </label>
                          <div
                            onClick={() => downloadFunction()}
                            className="cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                          >
                            <div className="flex gap-1 items-center">
                              <File size={18} />
                              {selectedsoumission[0].reponseFichier}
                            </div>
                            <Download size={18} />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      <label htmlFor="note" className="text-gris-fonce text-sm">
                        Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        id="note"
                        defaultValue={
                          selectedsoumission.length > 0
                            ? selectedsoumission[0].note
                            : ""
                        }
                        className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-2">
                      <label
                        htmlFor="commentaire"
                        className="text-gris-fonce text-sm"
                      >
                        Commentaire
                      </label>
                      <textarea
                        type="text"
                        name="commentaire"
                        id="commentaire"
                        rows={"6"}
                        placeholder="Optionnel"
                        defaultValue={
                          selectedsoumission.length > 0
                            ? selectedsoumission[0].commentaire
                            : ""
                        }
                        className="resize-none border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                      />
                    </div>
                    <div className="flex w-2/4 gap-3 self-end">
                      <input
                        onClick={() => navigate(location.pathname)}
                        type="button"
                        value="Annuler"
                        className="text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
                      />
                      <input
                        type="button"
                        onClick={() => {
                          const formData = new FormData(formRef.current);
                          const noteInput = formData.get("note");
                          const commentaireInput = formData.get("commentaire");
                          submitFunction({
                            ...selectedsoumission[0],
                            corrigeLe: new Date().toISOString().split("T")[0],
                            note: noteInput,
                            commentaire: commentaireInput
                          });
                          navigate(`${location.pathname}`);
                        }}
                        value={
                          selectedsoumission[0].corrigeLe === null
                            ? "Corriger"
                            : "Modifier"
                        }
                        className={`text-sm w-6/7 bg-orange-cuivre border-2 border-orange-cuivre rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`}
                      />
                    </div>
                  </form>
                </>
              )}
            
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorrectionModal;
