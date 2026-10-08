import { useState, useEffect} from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Paperclip, FileX, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const ExerciceDetailsPage = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const { exerciceId } = useParams();
  const [questions, setQuestions] = useState([])
  const [choix, setChoix] = useState([])
  const [soumissions, setSoumissions] = useState([])
  const [hasErrors, setHasErrors] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [locked, setLocked] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedChoix, setSelectedChoix] = useState({})
  const [inputs, setInputs] = useState({})
  const [files, setFiles] = useState({});
  const navigate = useNavigate()
  const currentUser = useOutletContext()

    const getQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php?id=${exerciceId}&allExercices=true`, {
          credentials: 'include',
        })
        const data = await response.json();

        if(response.status === 404){
          setNotFound(true)
          return true
        }
  
        if(response.status === 403){
          setAccessDenied(true)
          return 
        } else if(response.status === 423){
          setLocked(true)
          return
        } else if(!response.ok){
          toast.error(data.error)
          return false
        }
  
        setQuestions(data);
        return true
      } catch (error) {
        setQuestions([]);
        return false
      }
    };
  
  
    const getChoix = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/choix.php?id=${exerciceId}&allExercices=true`, {
          credentials: 'include',
        })
        const data = await response.json();

        if(response.status === 404){
          setNotFound(true)
          return true
        }
  
        if(response.status === 403){
          setAccessDenied(true)
          return 
        } else if(!response.ok){
          toast.error(data.error)
          return false
        }
  
        setChoix(data);
        return true
      } catch (error) {
        setChoix([]);
        return false
      }
    }

    const getSoumissions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?id=${currentUser.utilisateur_id}&exerciceId=${exerciceId}&getIds=true`, {
          credentials: 'include'
        })
        const data = await response.json()

        if(response.status === 404){
          setNotFound(true)
          return true
        }

        if(response.status === 403){
          setAccessDenied(true)
          return 
        } else if(!response.ok){
          toast.error(data.error)
          return false
        }
        
        const obj = {}
        const inputObj = {}
        for (let i = 0; i < data.length; i++) {
          obj[data[i].question_id] = Number(data[i].soumission_reponse);
          inputObj[data[i].question_id] = data[i].soumission_reponse
          
        }

        setSelectedChoix(obj)
        setInputs(inputObj)

        setSoumissions(data)
        return true
      } catch (error) {
        setSoumissions([])
        return false
      }
    }
  
    useEffect(() => {
      const loadEverything = async () => {
        const results = await Promise.all([getQuestions(), getChoix(), getSoumissions()])
        setHasErrors(results.includes(false))
  
        setLoading(false)
      }

      loadEverything()
    }, [exerciceId]);


  const exercices = [...new Set(questions.map(q => q.exercice_id))]

  const addSoumissionFile = async (file, etudiant_id, question_id) => {
    const allowedTypes = [
      "application/pdf", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword"
    ];

    
        if(!file){
          toast.error("Pas de fichier uploadé");
          return false;
        }
    
        if(!allowedTypes.includes(file.type)){
          toast.error("Type de fichier invalide");
          return false;
        }
    
        if(file.size > 20 * 1024 * 1024){
          toast.error("Taille de fichier trop grande");
          return false;
        }
    
        const formData = new FormData()
        formData.append('etudiant_id', etudiant_id)
        formData.append('question_id', question_id)
        formData.append('file', file)

        try{
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?questionId=${question_id}&file=true`, {
            credentials: 'include',
            method: 'POST',
            body: formData
          })

          const data = await response.json()
          
          if(!response.ok){
            toast.error(data.error)
            setLoading(false)
            return false
          }
          
          getSoumissions()
          return true
        } catch(error){
          setLoading(false)
          return false
        }
  }

  const addSoumission = async (soumission_data) => {
    if(!soumission_data.soumission || soumission_data.soumission === ""){
      toast.error('Soumission invalide ou pas rempli')
      return false
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?questionId=${soumission_data.question_id}&text=true`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(soumission_data)
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      getSoumissions()
      return true
    } catch (error) {
      toast.error(`Question peut pas etre soumis`);
      return false
    }
  }
  
  
  return (
    <div className={`px-5 py-3 flex flex-col gap-5 my-3 items-center ${loading ? "mt-25" : "my-8"}`}>
      {loading ? <Spinner /> : accessDenied ? <FetchError accessDenied={true} /> : hasErrors ? <FetchError /> : notFound ? (
        <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
          <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
            <FileX className="text-gris-fonce" size={26} />
          </div>
          <h3 className="text-bleu-principal font-titres font-semibold text-lg">
            Exercice introuvable
          </h3>
          <p className="text-gris-fonce text-sm max-w-sm">
            Cet Exercice n'existe pas ou a été supprimé. Vérifiez le lien ou
            retournez à la liste des cours.
          </p>
          <button       
           onClick={() => navigate("/etudiant/cours")}
            className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
          >
            Retour aux cours
          </button>
        </div>
      ) : locked ? (
        <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
          <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
            <LockKeyhole className="text-gris-fonce" size={26} />
          </div>
          <h3 className="text-bleu-principal font-titres font-semibold text-lg">
            Exercice verrouillé
          </h3>
          <p className="text-gris-fonce text-sm max-w-sm">
            Vous devez d'abord terminer la leçon associée à cet exercice pour
            y accéder.
          </p>
          <button
            onClick={() => navigate("/etudiant/exercices")}
            className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
          >
            Retour aux exercices
          </button>
        </div>
      ) : (
        !questions ? (
          <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
            <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
              <FileX className="text-gris-fonce" size={26} />
            </div>
            <h3 className="text-bleu-principal font-titres font-semibold text-lg">
              Exercice introuvable
            </h3>
            <p className="text-gris-fonce text-sm max-w-sm">
              Cet exercice n'existe pas ou a été supprimé. Vérifiez le lien ou
              retournez à la liste des exercices.
            </p>
            <button
              onClick={() => navigate("/etudiant/exercices")}
              className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
            >
              Retour aux exercices
            </button>
          </div>
        ) : (
          exercices.map((e, i) => {
            const selectedQuestions = questions.filter(q => q.exercice_id === e)
            return(
              <div key={i} className="flex flex-col w-full">
                {selectedQuestions.map((q, index) => {
                  const choixForThisQuestion = choix && choix.filter(c => c.question_id === q.question_id)
                  const soumission = soumissions.find(s => s.question_id === q.question_id)
                  const isEditable = !soumission || (soumission.note !== null && soumission.note < 10)
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border-2 border-gris-clair py-3 px-8 flex flex-col gap-3 justify-center w-4/5 mx-auto my-2"
                    >
                      <h4 className="font-titres text-orange-cuivre text-sm">
                        Question {index + 1} —{" "}
                        {q.question_type === "Input"
                          ? "Réponse libre"
                          : q.question_type === "File Upload"
                            ? "Fichier [pdf / docx]"
                            : "QCM"}
                      </h4>
                      <h3 className="font-titres text-bleu-principal text-md font-semibold">
                        {capitalize(q.texte_question)}
                      </h3>
                      {q.question_type === "QCM" ? (
                        <>
                          <div className="grid grid-cols-2 gap-2">
                            {choixForThisQuestion.map((c) => {
                              return(
                                <label
                                  key={c.choix_id}
                                  htmlFor={`choix-${c.choix_id}`}
                                  className={`border-2 border-gris-clair rounded-lg py-2 px-4 ${c.ordre === selectedChoix[q.question_id] ? "bg-bleu-secondaire/30 cursor-default" : !isEditable ? 'cursor-not-allowed' : "text-bleu-principal cursor-pointer hover:bg-gris-clair/70"} transition duration-300 ease-in-out`}
                                >
                                  <input
                                    type="radio"
                                    id={`choix-${c.choix_id}`}
                                    name={`question-${q.question_id}`}
                                    className="hidden"
                                    disabled={!isEditable}
                                    checked={selectedChoix[q.question_id] === c.ordre}
                                    onChange={() => setSelectedChoix({ ...selectedChoix, [q.question_id]: c.ordre })}
                                  />
                                  <p className="font-semibold text-sm text-bleu-principal">
                                    {capitalize(c.texte_choix)}
                                  </p>
                                </label>
                              )
                            })}
                          </div>
                          <form
                            action=""
                            method="post"
                            className="w-full flex justify-end"
                          >
                            <input
                              type="button"
                              onClick={async (e) => {
                                e.stopPropagation();
                                const selectedRadio = selectedChoix[q.question_id]

                                const success = await addSoumission({
                                  'etudiant_id': currentUser.utilisateur_id,
                                  'question_id': q.question_id,
                                  'soumission': selectedRadio
                                });

                                if(success) {
                                  toast.success(`Question soumis`);
                                }
                              }}
                              disabled={!isEditable}
                              value={!isEditable ? 'Deja soumis' : soumission ? 'Soumettre à nouveau' : 'Soumettre'}
                              className={`${!isEditable ? 'w-40 cursor-not-allowed bg-gris-clair text-bleu-secondaire' : soumission ? 'w-50 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out bg-orange-cuivre text-white' : 'w-35 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out bg-orange-cuivre text-white'} font-semibold px-5 py-1 rounded-xl self-end mt-4`}
                            />
                          </form>
                        </>
                      ) : (
                        <form action="" method="post" className="flex flex-col">
                          {q.question_type === "Input" ? (
                            <textarea
                              readOnly={!isEditable}
                              type="text"
                              name="commentaire"
                              id="commentaire"
                              value={inputs[q.question_id] || ''}
                              onChange={(e) => setInputs({ ...inputs, [q.question_id]: e.target.value })}
                              rows={"4"}
                              placeholder="Ecrivez votre réponse ici."
                              className="w-full resize-none border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                            />
                          ) : (
                            <>
                              <label
                                htmlFor="file_upload"
                                className={`${!isEditable ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gris-clair/70 transition duration-300 ease-in-out'}    flex items-center justify-center w-full resize-none border-2 border-gris-clair rounded-lg p-3 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 `}
                              >
                                {files[q.question_id] ? (
                                  files[q.question_id].name
                                ) : soumission ? (
                                    soumission.url_fichier ? soumission.url_fichier.split('soumissions/')[1] : 'Fichier soumis'
                                  ) : (
                                    <>
                                      <Paperclip className="mr-2" size={22} /> Glisser un
                                      fichier ici, ou{" "}
                                      <span className="text-orange-cuivre font-semibold ml-2">
                                        {" "}
                                        parcourir
                                      </span>
                                    
                                    </>
                                  )
                                  }
                                
                              </label>
                              <input
                                type="file"
                                disabled={!isEditable}
                                name="file"
                                onChange={(e) => {
                                  setFiles({ ...files, [q.question_id]: e.target.files[0] })
                                }}
                                id="file_upload"
                                className="hidden"
                              />
                            </>
                          )}
                          <input
                            onClick={async (e) => {
                              e.stopPropagation();
                              if(q.question_type === 'Input'){
                                const reponse = inputs[q.question_id]

                                const success = await addSoumission({
                                  'etudiant_id': currentUser.utilisateur_id,
                                  'question_id': q.question_id,
                                  'soumission': reponse
                                });

                                if(success) {
                                  toast.success(`Question soumis`);
                                }
                              } else {
                                const success = await addSoumissionFile(files[q.question_id], currentUser.utilisateur_id, q.question_id)
                                if(success) {
                                  toast.success(`Question soumis`);
                                }
                              }
                            }}
                            type="button"
                            disabled={!isEditable}
                            value={!isEditable ? 'Déjà soumis' : soumission ? 'Soumettre à nouveau' : 'Soumettre'}
                            className={`${!isEditable ? 'w-40 cursor-not-allowed bg-gris-clair text-bleu-secondaire' : soumission ? 'w-50 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out bg-orange-cuivre text-white' : 'w-35 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out bg-orange-cuivre text-white'} font-semibold px-5 py-1 rounded-xl self-end mt-4`}
                          /> 
                        </form>
                      )}
                    </div>
                  )
                })}
  
              </div>
            )
          })
        )
      )}
    </div>
  );
};

export default ExerciceDetailsPage;
