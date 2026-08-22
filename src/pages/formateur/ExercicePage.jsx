import React from "react";
import { fakeQuestions } from "../../fakeData";
import { useParams, useSearchParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import AddQuestionModal from "../../components/modals/AddQuestionModal";

const ExercicePage = () => {
  const { id, exerciceId } = useParams();
  const selectedQuestions = fakeQuestions.filter(
    (question) => question.exerciceId === Number(exerciceId),
  );

  const [searchParams] = useSearchParams()
  const showModal = searchParams.get("create") === "true"

  return (
    <div className="mt-3">
      {showModal && <AddQuestionModal />}
      {selectedQuestions.map((question) => (
        <div className="m-5  border-2 border-gris-clair rounded-2xl px-5 py-4 flex flex-col gap-2 items-start justify-between">
          <div className="flex justify-between w-full items-center">
            <h3 className="block text-bleu-principal font-semibold">
              {question.texte}
            </h3>
            <div className="flex w-1/6 justify-between">
              <div className="rounded-2xl bg-orange-cuivre/20 text-orange-cuivre flex items-center justify-center py-1 px-5">
                <p>{question.type}</p>
              </div>
              <div className="flex justify-between w-1/4 items-center">
                <button className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out">
                  {<Pencil size={18} />}
                </button>
                <button className="cursor-pointer text-gris-fonce/50 hover:text-orange-cuivre/80 transition duration-300 ease-in-out">
                  {<Trash2 size={18} />}
                </button>
              </div>
            </div>
          </div>
          {question.type === "QCM" && (
            <div className="flex flex-col gap-5">
              {question.choix.map(c => (
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${c.correct ? 'bg-orange-cuivre' : 'bg-gris-clair'} `}></div>
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
