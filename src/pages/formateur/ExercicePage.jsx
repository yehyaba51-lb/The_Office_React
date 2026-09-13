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
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const { id, exerciceId } = useParams();

  const getQuestions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/questions`)
      const data = await response.json();

      setQuestions(data);
      setLoading(false)
    } catch (error) {
      setQuestions([]);
      setLoading(false)
      setHasError(true)
    }
  };

  useEffect(() => {
    getQuestions();
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);


  const selectedQuestions = questions
    ? questions.filter((question) => question.exerciceId === Number(exerciceId))
    : [];


  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showDelete = searchParams.get("delete") === "true";
  const questionId = searchParams.get("id");

  const selectedQuestion = selectedQuestions ? selectedQuestions.filter(
    (q) => q.id === questionId,
  ) : []

  const ajouterQuestion = async (question) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(question)
      })

      
      toast.success("Question ajouté");
    } catch (error) {
      toast.error("Question ne peut pas etre qjouté");
    }
    
    getQuestions()
  }


  const modifierQuestion = async (id, data) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/questions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      })
      toast.success("Question modifié");
    } catch (error) {
      toast.error("Question ne peut pas etre modifié");
    }

    getQuestions()
  };

  const supprimerQuestion = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/questions/${id}`, {
        method: 'DELETE'
      })
      toast.success("Question supprimé");
    } catch (error) {
      toast.error("Question ne peut pas etre supprimé");
    }

    getQuestions()
  };

  return (
    <div className={`flex flex-col gap-4 justify-center items-center ${loading && "mt-25"}`} >
      {showModal && <AddQuestionModal addFunction={ajouterQuestion} />}
      {showSuccess && (
        <SuccessModal type={"Question"} content={"Exercice"} create={true} />
      )}
      {showEdit && (
        <AddQuestionModal
        initialData={selectedQuestion}
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
      {loading ? <Spinner /> : hasError ? <FetchError /> : (
        <div className={`flex flex-col px-5 gap-5 mt-5 w-full`}>
          {selectedQuestions.map((question) => (
            <div key={question.id} className="w-full border-2 border-gris-clair rounded-2xl px-5 py-4 flex flex-col gap-2 items-start justify-between">
              <div className="flex justify-between w-full items-center">
                <h3 className="font-titres block text-bleu-principal font-semibold">
                  {question.texte}
                </h3>
                <div className="flex w-1/6 justify-between">
                  <div className="rounded-2xl bg-orange-cuivre/20 text-orange-cuivre flex items-center justify-center py-1 px-5">
                    <p>{question.type}</p>
                  </div>
                  <div className="flex justify-between w-1/4 items-center">
                    <button
                      onClick={() =>
                        navigate(`${location.pathname}?edit=true&id=${question.id}`)
                      }
                      className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                    >
                      {<Pencil size={18} />}
                    </button>
                    <button
                      onClick={() => navigate(`${location.pathname}?delete=true&id=${question.id}`)}
                      className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                    >
                      {<Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              {question.type === "QCM" && (
                <div className="flex flex-col gap-5">
                  {question.choix.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${c.correct ? "bg-orange-cuivre" : "bg-gris-clair"} `}
                      ></div>
                      <p>{c.texte}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        
        </div>
      )}
    </div>
  );
};

export default ExercicePage;
