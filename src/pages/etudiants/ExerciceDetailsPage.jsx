import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { fakeExercices, fakeQuestions } from "../../fakeData";
import { Paperclip, FileX } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const ExerciceDetailsPage = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const { coursId, leconId } = useParams();
  const [questions, setQuestions] = useState([])
  const [choix, setChoix] = useState([])
  const [hasErrors, setHasErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedChoix, setSelectedChoix] = useState({})
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const currentUser = useOutletContext()

    const getQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php?id=${coursId}&leconId=${leconId}&allExercices=true`, {
          credentials: 'include',
        })
        const data = await response.json();
  
        if(!response.ok){
          toast.error(data.error)
          return false
        }
  
        setQuestions(data);
        return true
      } catch (error) {
        setQuestions([]);
        setHasErrors(true)
        return false
      }
    };
  
  
    const getChoix = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/choix.php?id=${coursId}&leconId=${leconId}&allExercices=true`, {
          credentials: 'include',
        })
        const data = await response.json();
  
        if(!response.ok){
          toast.error(data.error)
          return false
        }
  
        setChoix(data);
        return true
      } catch (error) {
        setChoix([]);
        setHasErrors(true)
        return false
      }
    };
  
    useEffect(() => {
      const loadEverything = async () => {
        const results = await Promise.all([getQuestions(), getChoix()])
        setHasErrors(results.includes(false))
  
        setLoading(false)
      }
      loadEverything()
    }, [coursId, leconId]);


  const submitFunction = (id) => {
    toast.success(`Question ${id} soumis`);
  };

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

        for (let [k, v] of formData.entries()) console.log(k, v)

        try{
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?file=true`, {
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
          
  
          return true
        } catch(error){
          setLoading(false)
          return false
        }
  }

  const addSoumission = async (soumission_data) => {
    const textRegex = /^[a-zA-ZÀ-ÿ0-9' :\-]+$/
    if(!soumission_data.soumission || soumission_data.soumission === "" || !textRegex.test(soumission_data.soumission)){
      toast.error('Soumission invalide ou pas rempli')
      return false
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/soumissions.php?text=true`, {
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

      return true
    } catch (error) {
      toast.error(`Question peut pas etre soumis`);
      return false
    }
  }
  
  return (
    <div className={`px-5 py-3 flex flex-col gap-5 my-3 items-center ${loading ? "mt-25" : "my-8"}`}>
      {loading ? <Spinner /> : hasErrors ? <FetchError /> : (
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
                <h3 className="py-3 w-4/5 mx-auto text-xl text-bleu-secondaire font-semibold">Exercice {i + 1} - {selectedQuestions[0].exercice_titre}</h3>
                {selectedQuestions.map((q, index) => {
                  const choixForThisQuestion = choix.filter(c => c.question_id === q.question_id)
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
                            ? "Fichier"
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
                                  className={`border-2 border-gris-clair rounded-lg py-2 px-4 ${c.choix_id === selectedChoix[q.question_id] ? "bg-bleu-secondaire/30 cursor-default" : "text-bleu-principal cursor-pointer hover:bg-gris-clair/70"} transition duration-300 ease-in-out`}
                                >
                                  <input
                                    type="radio"
                                    id={`choix-${c.choix_id}`}
                                    name={`question-${q.question_id}`}
                                    className="hidden"
                                    checked={selectedChoix[q.question_id] === c.choix_id}
                                    onChange={() => setSelectedChoix({ ...selectedChoix, [q.question_id]: c.choix_id })}
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
                              value="Soumis"
                              className="w-35 font-semibold px-5 py-1 bg-orange-cuivre text-white rounded-xl mt-4 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out"
                            />
                          </form>
                        </>
                      ) : (
                        <form action="" method="post" className="flex flex-col">
                          {q.question_type === "Input" ? (
                            <textarea
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
                                className="cursor-pointer hover:bg-gris-clair/70 transition duration-300 ease-in-out  flex items-center justify-center w-full resize-none border-2 border-gris-clair rounded-lg p-3 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 "
                              >
                                {file? (
                                  file.name
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
                                name="file"
                                onChange={(e) => {
                                  setFile(e.target.files[0])
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
                                const success = await addSoumissionFile(file, currentUser.utilisateur_id, q.question_id)
                                if(success) {
                                  toast.success(`Question soumis`);
                                }
                              }
                            }}
                            type="button"
                            value="Soumis"
                            className="w-35 font-semibold px-5 py-1 bg-orange-cuivre text-white rounded-xl self-end mt-4 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out"
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
