import React from "react";
import { fakeQuestions } from "../../fakeData";
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

const ExercicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, exerciceId } = useParams();
  const selectedQuestions = fakeQuestions.filter(
    (question) => question.exerciceId === Number(exerciceId),
  );

  const [searchParams] = useSearchParams();
  const showModal = searchParams.get("create") === "true";
  const showSuccess = searchParams.get("success") === "true";
  const showEdit = searchParams.get("edit") === "true";
  const showDelete = searchParams.get("delete") === "true";
  const questionId = searchParams.get("id");

  const selectedQuestion = fakeQuestions.filter(
    (q) => q.id === Number(questionId),
  );

  const modifierQuestion = () => {
    toast.success("Question modifié");
  };
  const supprimerQuestion = () => {
    toast.success("Question supprimé");
  };

  return (
    <div className="mt-3">
      {showModal && <AddQuestionModal />}
      {showSuccess && (
        <SuccessModal type={"Question"} content={"Exercice"} create={true} />
      )}
      {showEdit && (
        <AddQuestionModal
          initialData={selectedQuestion}
          editFunction={modifierQuestion}
        />
      )}
      {showDelete && (
        <ConfirmModal
          type={"Question"}
          deleteFunction={supprimerQuestion}
          name={"la question"}
        />
      )}
      {selectedQuestions.map((question) => (
        <div className="m-5  border-2 border-gris-clair rounded-2xl px-5 py-4 flex flex-col gap-2 items-start justify-between">
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
                  onClick={() => navigate(`${location.pathname}?delete=true`)}
                  className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out"
                >
                  {<Trash2 size={18} />}
                </button>
              </div>
            </div>
          </div>
          {question.type === "QCM" && (
            <div className="flex flex-col gap-5">
              {question.choix.map((c) => (
                <div className="flex items-center gap-3">
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
  );
};

export default ExercicePage;
