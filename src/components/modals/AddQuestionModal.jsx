import React, { useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CircleX } from "lucide-react";

const AddQuestionModal = ({ initialData, editFunction, addFunction }) => {
  const formRef = useRef()
  const navigate = useNavigate();
  const location = useLocation();
  const [exerciceType, setExerciceType] = useState("Input");
  const { id, exerciceId } = useParams();

  const isEditMode = Boolean(initialData);
  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div
        className="fixed inset-0 flex justify-center items-start p-22 z-10"
        onClick={() => navigate(location.pathname)}
      >
        <div
          className="bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full justify-between items-center">
            <h3 className="font-titres text-bleu-primaire text-xl">
              Ajouter une question
            </h3>
            <button
              title="Fermer"
              className="text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out"
              onClick={() => navigate(location.pathname)}
            >
              <CircleX size={22} />
            </button>
          </div>
          <form action="" method="post" className="flex flex-col gap-3" ref={formRef}>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="texte" className="text-gris-fonce text-sm">
                Texte de la question
              </label>
              <input
                type="text"
                name="texte"
                id="titre"
                defaultValue={isEditMode ? initialData[0].texte : ""}
                className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                placeholder={`Entrez le texte de la question...`}
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              {!isEditMode && (
                <>
                  <label htmlFor="reponse" className="text-gris-fonce text-sm">
                    Type de réponse
                  </label>
                  <div className="flex self-center gap-5">
                    <input
                      value="Input"
                      type="button"
                      disabled={exerciceType === "Input"}
                      className={`${exerciceType === "Input" ? "text-orange-cuivre" : "text-bleu-secondaire"}  font-semibold ${exerciceType === "Input" ? " bg-orange-cuivre/20" : "bg-white"} rounded-2xl px-8 py-1  border ${exerciceType === "Input" ? "border-orange-cuivre/20" : "border-gris-clair"} ${exerciceType === "Input" ? "cursor-default" : "cursor-pointer"} hover:border ${exerciceType === "Input" ? "" : "hover:bg-gray-100"} transition duration-300 ease-in-out`}
                      onClick={() => setExerciceType("Input")}
                    />
                    <input
                      value="QCM"
                      type="button"
                      disabled={exerciceType === "QCM"}
                      className={`${exerciceType === "QCM" ? "text-orange-cuivre" : "text-bleu-secondaire"}  font-semibold ${exerciceType === "QCM" ? " bg-orange-cuivre/20" : "bg-white"} rounded-2xl px-8 py-1  border ${exerciceType === "QCM" ? "border-orange-cuivre/20" : "border-gris-clair"} ${exerciceType === "QCM" ? "cursor-default" : "cursor-pointer"} hover:border ${exerciceType === "QCM" ? "" : "hover:bg-gray-100"} transition duration-300 ease-in-out`}
                      onClick={() => setExerciceType("QCM")}
                    />
                    <input
                      value="File Upload"
                      type="button"
                      disabled={exerciceType === "File"}
                      className={`${exerciceType === "File" ? "text-orange-cuivre" : "text-bleu-secondaire"}  font-semibold ${exerciceType === "File" ? " bg-orange-cuivre/20" : "bg-white"} rounded-2xl px-8 py-1  border ${exerciceType === "File" ? "border-orange-cuivre/20" : "border-gris-clair"} ${exerciceType === "File" ? "cursor-default" : "cursor-pointer"} hover:border ${exerciceType === "File" ? "" : "hover:bg-gray-100"} transition duration-300 ease-in-out`}
                      onClick={() => setExerciceType("File")}
                    />
                  </div>
                </>
              )}
            </div>
            {(exerciceType === "QCM" ||
              (isEditMode &&
                initialData &&
                initialData[0] &&
                initialData[0].type === "QCM")) && (
              <>
                <hr
                  className={`w-full border-2 border-gris-clair my-3 self-center ${isEditMode ? "hidden" : ""}`}
                />
                <p
                  className={`text-sm text-bleu-secondaire ${isEditMode ? "hidden" : ""}`}
                >
                  Cochez le bouton à côté de la bonne réponse
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-3">
                    <label className="w-fit" htmlFor="un">
                      Choix 1
                    </label>
                    <input
                      className="border-2 flex-1 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                      type="text"
                      name="choix_un"
                      id="choix_un"
                      defaultValue={isEditMode ? initialData[0].choix[0].texte : ''}
                    />
                    <input
                      value = '0'
                      type="radio"
                      name="bonne_reponse"
                      defaultChecked={isEditMode ? initialData[0].choix[0].correct : ''}
                      className="accent-orange-cuivre"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-3">
                    <label className="w-fit" htmlFor="choix_deux">
                      Choix 2
                    </label>
                    <input
                      className="border-2 flex-1 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                      type="text"
                      name="choix_deux"
                      id="choix_deux"
                      defaultValue={isEditMode ? initialData[0].choix[1].texte : ''}
                    />
                    <input
                      type="radio"
                      value = '1'
                      name="bonne_reponse"
                      defaultChecked={isEditMode ? initialData[0].choix[1].correct : ''}
                      className="accent-orange-cuivre"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-3">
                    <label className="w-fit" htmlFor="choix_trois">
                      Choix 3
                    </label>
                    <input
                      className="border-2 flex-1 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                      type="text"
                      name="choix_trois"
                      id="choix_trois"
                      defaultValue={isEditMode ? initialData[0].choix[2].texte : ''}
                    />
                    <input
                      type="radio"
                      value = '2'
                      name="bonne_reponse"
                      defaultChecked={isEditMode ? initialData[0].choix[2].correct : ''}
                      className="accent-orange-cuivre"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center gap-3">
                    <label className="w-fit" htmlFor="choix_quatre">
                      Choix 4
                    </label>
                    <input
                      className="border-2 flex-1 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                      type="text"
                      name="choix_quatre"
                      id="choix_quatre"
                      defaultValue={isEditMode ? initialData[0].choix[3].texte : ''}
                    />
                    <input
                      type="radio"
                      value = '3'
                      name="bonne_reponse"
                      defaultChecked={isEditMode ? initialData[0].choix[3].correct : ''}
                      className="accent-orange-cuivre"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex w-2/4 gap-3 self-end">
              <input
                onClick={() => navigate(location.pathname)}
                type="button"
                value="Annuler"
                className="text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
              />
              <input
                type="button"
                value={`${isEditMode ? "Modifier question" : "Ajouter question"}`}
                onClick={
                  isEditMode
                      ? () => {
                          const formData = new FormData(formRef.current);
                          const questionTitre = formData.get('texte');

                          const updatedQuestion = { ...initialData[0], texte: questionTitre };

                          if (initialData[0].type === "QCM") {
                            const choixUnInput = formData.get('choix_un');
                            const choixDeuxInput = formData.get('choix_deux');
                            const choixTroisInput = formData.get('choix_trois');
                            const choixQuatreInput = formData.get('choix_quatre');
                            const bonneReponseIndex = formData.get('bonne_reponse');

                            updatedQuestion.choix = [
                              { texte: choixUnInput, correct: bonneReponseIndex === '0' },
                              { texte: choixDeuxInput, correct: bonneReponseIndex === '1' },
                              { texte: choixTroisInput, correct: bonneReponseIndex === '2' },
                              { texte: choixQuatreInput, correct: bonneReponseIndex === '3' },
                            ];
                          }

                          editFunction(updatedQuestion);
                          navigate(location.pathname);
                        }
                      : () => {
                        const formData = new FormData(formRef.current);
                        const questionTitre = formData.get('texte');
                        
                        const newQuestion = {
                          texte: questionTitre,
                          type: exerciceType,
                          exerciceId: Number(exerciceId),
                        };

                        if(exerciceType === 'QCM'){
                          const choixUnInput = formData.get('choix_un');
                          const choixDeuxInput = formData.get('choix_deux');
                          const choixTroisInput = formData.get('choix_trois');
                          const choixQuatreInput = formData.get('choix_quatre');
                          const bonneReponseIndex = formData.get('bonne_reponse');

                          newQuestion.choix = [
                            { texte: choixUnInput, correct: bonneReponseIndex === '0' },
                            { texte: choixDeuxInput, correct: bonneReponseIndex === '1' },
                            { texte: choixTroisInput, correct: bonneReponseIndex === '2' },
                            { texte: choixQuatreInput, correct: bonneReponseIndex === '3' },    
                          ]}
                        

                        addFunction(newQuestion)
                        navigate(`${location.pathname}?success=true`)
                      }
                    }
                className={`text-sm w-7/8 bg-orange-cuivre border-2 border-orange-cuivre rounded-xl px-3 py-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuestionModal;
