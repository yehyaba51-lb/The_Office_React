import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fakeExercices, fakeQuestions } from "../../fakeData";
import { Paperclip, FileX } from "lucide-react";
import { toast } from "react-toastify";

const ExerciceDetailsPage = () => {
  const { coursId, leconId } = useParams();
  const [selectedChoix, setSelectedChoix] = useState("");
  const navigate = useNavigate()

  const selectedExecrice = fakeExercices.find(
    (e) => e.coursId === Number(coursId) && e.leconId === Number(leconId),
  );
  const selectedQuestions = selectedExecrice
    ? fakeQuestions.filter((q) => q.exerciceId === selectedExecrice.id)
    : "";

  const submitFunction = (id) => {
    toast.success(`Question ${id} soumis`);
  };

  return (
    <div className="px-5 py-3 flex flex-col gap-5 my-3">
      {!selectedExecrice ? (
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
        selectedQuestions.map((q, i) => (
          <div
            key={i}
            className="rounded-2xl border-2 border-gris-clair py-3 px-8 flex flex-col gap-3 justify-center w-4/5 mx-auto"
          >
            <h4 className="font-titres text-orange-cuivre text-sm">
              Question {i + 1} —{" "}
              {q.type === "Input"
                ? "Réponse libre"
                : q.type === "File Upload"
                  ? "Fichier"
                  : "QCM"}
            </h4>
            <h3 className="font-titres text-bleu-principal text-md font-semibold">
              {q.texte}
            </h3>
            {q.type === "QCM" ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {q.choix.map((c) => (
                    <>
                      <div
                        key={c.id}
                        className={`border-2 border-gris-clair rounded-lg py-2 px-4 ${c.id === selectedChoix ? "bg-bleu-secondaire/30 text-white cursor-default hover:none" : "text-bleu-principal cursor-pointer hover:bg-gris-clair/70"}  transition duration-300 ease-in-out`}
                        onClick={() => setSelectedChoix(c.id)}
                      >
                        <p className="font-semibold text-sm text-bleu-principal">
                          {c.texte}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
                <form
                  action=""
                  method="post"
                  className="w-full flex justify-end"
                >
                  <input
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      submitFunction(q.id);
                    }}
                    value="Soumis"
                    className="w-35 font-semibold px-5 py-1 bg-orange-cuivre text-white rounded-xl mt-4 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out"
                  />
                </form>
              </>
            ) : (
              <form action="" method="post" className="flex flex-col">
                {q.type === "Input" ? (
                  <textarea
                    type="text"
                    name="commentaire"
                    id="commentaire"
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
                      <Paperclip className="mr-2" size={22} /> Glisser un
                      fichier ici, ou{" "}
                      <span className="text-orange-cuivre font-semibold ml-2">
                        {" "}
                        parcourir
                      </span>
                    </label>
                    <input
                      type="file"
                      name="file"
                      id="file_upload"
                      className="hidden"
                    />
                  </>
                )}
                <input
                  onClick={(e) => {
                    e.stopPropagation();
                    submitFunction(q.id);
                  }}
                  type="button"
                  value="Soumis"
                  className="w-35 font-semibold px-5 py-1 bg-orange-cuivre text-white rounded-xl self-end mt-4 cursor-pointer hover:bg-orange-cuivre/85 transition duration-300 ease-in-out"
                />
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExerciceDetailsPage;
