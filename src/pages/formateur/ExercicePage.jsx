import { useEffect, useState } from "react"
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import AddQuestionModal from "../../components/modals/AddQuestionModal";
import SuccessModal from "../../components/modals/SuccessModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const ExercicePage = () => {
  const [questions, setQuestions] = useState([]);
  const [choix, setChoix] = useState([]);
  const [loading, setLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const { id, exerciceId } = useParams();
  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showDelete = searchParams.get("delete") === "true";
  const questionId = searchParams.get("id");
  

  const getQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php?id=${exerciceId}&allQuestion=true`, {
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/choix.php?id=${exerciceId}&exercice=true`, {
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
  }, [exerciceId]);
  

  const selectedQuestion = questions ? questions.find(
    (q) => q.question_id === Number(questionId)
  ) : []

  const selectedChoix = choix ? choix.filter(
    (ch) => ch.question_id === Number(questionId)
  ) : []

   const selectedFullQuestion = [selectedQuestion, selectedChoix]

  const ajouterQuestion = async (question) => {
    const errors = []
    if(!question.texte_question || question.texte_question === ''){
      errors.push('Texte de la question invalide')
    }

    if(question.question_type === 'QCM'){
      const toutesRemplies = question.choix.every(c => c.texte && c.texte.trim() !== '')

      if (!toutesRemplies) {
        errors.push('Tous les choix doivent être remplis')
      }

      const nbCorrects = question.choix.filter(c => c.correct).length
      if (nbCorrects !== 1) {
        errors.push('Une seule bonne réponse doit être sélectionnée')
      }
    }
    

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }

      getQuestions()
      getChoix()
      toast.success("Question ajouté");
      return true
    } catch (error) {
      toast.error("Question ne peut pas etre ajouté");
      return false
    }
  }


  const modifierQuestion = async (id, data) => {
    const errors = []
    if(!data.texte_question || data.texte_question === ''){
      errors.push('Texte de la question invalide')
    }

    if(data.question_type === 'QCM'){
      const toutesRemplies = data.choix.every(c => c.texte && c.texte.trim() !== '')

      if (!toutesRemplies) {
        errors.push('Tous les choix doivent être remplis')
      }

      const nbCorrects = data.choix.filter(c => c.correct).length
      if (nbCorrects !== 1) {
        errors.push('Une seule bonne réponse doit être sélectionnée')
      }
    }

    if(errors.length > 0){
      errors.forEach(error => toast.error(error))
      return false
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php?id=${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      })
      const responseData = await response.json()

      if(!response.ok){
        toast.error(responseData.error)
        return false
      }
      
      getQuestions()
      getChoix()
      toast.success("Question modifié");
      return true
    } catch (error) {
      toast.error("Question ne peut pas etre modifié");
      return false
    }
  };

  const supprimerQuestion = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions.php?id=${id}`, {
        credentials: 'include',
        method: 'DELETE'
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }
      
      getQuestions()
      getChoix()
      toast.success("Question supprimé");
      return true
    } catch (error) {
      toast.error("Question ne peut pas etre supprimé");
      return false
    }
  };

  return (
    <div className={`flex flex-col gap-4 justify-center items-center ${loading && "mt-25"}`} >
      {showModal && <AddQuestionModal addFunction={ajouterQuestion} />}
      {showSuccess && (
        <SuccessModal type={"Question"} content={"Exercice"} create={true} />
      )}
      {showEdit && selectedQuestion && (
        <AddQuestionModal
        initialData={selectedFullQuestion}
        editFunction={(data) => modifierQuestion(questionId, data)}
        />
      )}
      {showDelete && (
        <ConfirmModal
        type={"Question"}
        deleteFunction={() => supprimerQuestion(questionId)}
        name={"la question"}
        />
      )}
      {loading ? <Spinner /> : hasErrors ? <FetchError /> : (
        <div className={`flex flex-col px-5 gap-5 mt-5 w-full`}>
          {questions.map((question) => {
            const choixForThisQuestion = choix ? choix.filter(c => c.question_id === question.question_id) : []

            return (
            <div key={question.question_id} className="w-full border-2 border-gris-clair rounded-2xl px-5 py-4 flex flex-col gap-2 items-start justify-between mb-5">
              <div className="flex justify-between w-full items-center">
                <h3 className="font-titres block text-bleu-principal font-semibold">
                  {question.texte_question}
                </h3>
                <div className="flex w-1/6 justify-between">
                  <div className="rounded-2xl bg-orange-cuivre/20 text-orange-cuivre flex items-center justify-center py-1 px-5">
                    <p>{question.question_type}</p>
                  </div>
                  <div className="flex justify-between w-1/4 items-center">
                    <button
                      onClick={() =>
                        navigate(`${location.pathname}?edit=true&id=${question.question_id}`)
                      }
                      className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                    >
                      {<Pencil size={18} />}
                    </button>
                    <button
                      onClick={() => navigate(`${location.pathname}?delete=true&id=${question.question_id}`)}
                      className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                    >
                      {<Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              {question.question_type === "QCM" && (
                <div className="flex flex-col gap-5">
                  {choixForThisQuestion.map((c) => (
                    <div key={c.choix_id} className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${c.est_correct === 1 ? "bg-orange-cuivre" : "bg-gris-clair"} `}
                      ></div>
                      <p>{c.texte_choix}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )})}
        
        </div>
      )}
    </div>
  );
};

export default ExercicePage;
