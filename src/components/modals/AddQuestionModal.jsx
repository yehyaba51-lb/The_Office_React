import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { CircleX, Languages } from "lucide-react";
import { translations } from "../../translations";

const AddQuestionModal = ({ initialData, editFunction, addFunction, language }) => {
  const formRef = useRef()
  const navigate = useNavigate();
  const location = useLocation();
  const [exerciceType, setExerciceType] = useState("Input");
  const { id, exerciceId } = useParams();

  const newQuestionChoix = [
    { ordre: 1, texte_choix: '', est_correct: 0 },
    { ordre: 2, texte_choix: '', est_correct: 0 },
    { ordre: 3, texte_choix: '', est_correct: 0 },
    { ordre: 4, texte_choix: '', est_correct: 0 }
  ]
  
  const isEditMode = Array.isArray(initialData) && initialData.length > 0

  useEffect(() => {
    if (isEditMode) {
      setExerciceType(initialData[0].question_type);
    }
  }, [initialData]);

  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div
        className="fixed inset-0 flex justify-center items-start p-15 px-5 md:p-22 z-10"
        onClick={() => navigate(location.pathname)}
      >
        <div
          className="bg-white rounded-2xl px-6 py-5 md:px-12 md:py-8 w-160 max-h-[90vh] overflow-y-auto flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full justify-between items-center">
            <h3 className="font-titres text-bleu-primaire text-xl">
              {isEditMode ? 'Modifier une question' : 'Ajouter une question'}
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
                {translations[language]['texteDeLaQuestion']}
              </label>
              <input
                type="text"
                name="texte"
                id="titre"
                defaultValue={isEditMode ? initialData[0].texte_question : ""}
                className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                placeholder={`Entrez le texte de la question...`}
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              {!isEditMode && (
                <>
                  <label htmlFor="reponse" className="text-gris-fonce text-sm">
                    {translations[language]['typeDeReponse']}
                  </label>
                  <div className="flex flex-wrap justify-center gap-3 md:gap-5">
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
                      disabled={exerciceType === "File Upload"}
                      className={`${exerciceType === "File Upload" ? "text-orange-cuivre" : "text-bleu-secondaire"}  font-semibold ${exerciceType === "File Upload" ? " bg-orange-cuivre/20" : "bg-white"} rounded-2xl px-8 py-1  border ${exerciceType === "File Upload" ? "border-orange-cuivre/20" : "border-gris-clair"} ${exerciceType === "File Upload" ? "cursor-default" : "cursor-pointer"} hover:border ${exerciceType === "File Upload" ? "" : "hover:bg-gray-100"} transition duration-300 ease-in-out`}
                      onClick={() => setExerciceType("File Upload")}
                    />
                  </div>
                </>
              )}
            </div>
            {(exerciceType === "QCM" && (
              isEditMode ? initialData[1].map((d, i) => (
                  <div key={i}>
                    <hr
                      className={`w-full border-2 border-gris-clair my-3 self-center ${isEditMode ? "hidden" : ""}`}
                    />
                    <p
                      className={`text-sm text-bleu-secondaire ${isEditMode ? "hidden" : ""}`}
                    >
                      {translations[language]['cochezBonneReponse']}
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center gap-3">
                        <label className="w-fit" htmlFor={`choix_${i + 1}`}>
                          {`${translations[language]['choix']} ${i + 1}`}
                        </label>
                        <input
                          className="border-2 flex-1 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                          type="text"
                          name={`choix_${i + 1}`}
                          id={`choix_${i + 1}`}
                          defaultValue={isEditMode ? d.texte_choix : ''}
                        />
                        <input
                          key={`${d.choix_id}-${d.est_correct}`}
                          value={d.ordre}
                          type="radio"
                          name="bonne_reponse"
                          defaultChecked={isEditMode && d.est_correct === 1}
                          className="accent-orange-cuivre"
                        />
                      </div>
                    </div>
                  </div>

              )) : (
                  <>
                    <hr
                      className={`w-full border-2 border-gris-clair my-3 self-center`}
                    />
                    <p
                      className={`text-sm text-bleu-secondaire`}
                    >
                      {translations[language]['cochezBonneReponse']}
                    </p>
                    <div className="flex flex-col gap-2">
                      {newQuestionChoix.map(choix => (
                        <div key={choix.ordre} className="flex justify-between items-center gap-3">
                          <label className="w-fit" htmlFor={choix.ordre}>
                            {`${translations[language]['choix']} ${choix.ordre}`}
                          </label>
                          <input
                            className="border-2 flex-1 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                            type="text"
                            name={`choix_${choix.ordre}`}
                            id={choix.ordre}
                            defaultValue={choix.texte_choix}
                          />
                          <input
                            value={choix.ordre}
                            type="radio"
                            name="bonne_reponse"
                            defaultChecked={choix.est_correct}
                            className="accent-orange-cuivre"
                          />
                        </div>

                      ))}
                    </div>
                  </>
              ))
            )}
            <div className="flex flex-col-reverse sm:flex-row w-full sm:w-auto gap-3 justify-end mt-4">
              <input
                onClick={() => navigate(location.pathname)}
                type="button"
                value={translations[language]['annuler']}
                className="text-sm w-full sm:w-auto px-6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
              />
              <input
                type="button"
                value={`${isEditMode ? translations[language]['modifierQuestion'] : translations[language]['ajouterQuestionBtn']}`}
                onClick={
                  isEditMode
                      ? async () => {
                          const formData = new FormData(formRef.current);
                          const questionTitre = formData.get('texte');

                          const updatedQuestion = { ...initialData[0], texte_question: questionTitre };

                          if (initialData[0].question_type  === "QCM") {
                            const choixUnInput = formData.get('choix_1');
                            const choixDeuxInput = formData.get('choix_2');
                            const choixTroisInput = formData.get('choix_3');
                            const choixQuatreInput = formData.get('choix_4');
                            const bonneReponseIndex = formData.get('bonne_reponse');

                            updatedQuestion.choix = [
                              { choix_id: initialData[1][0].choix_id, texte: choixUnInput, correct: bonneReponseIndex === '1' },
                              { choix_id: initialData[1][1].choix_id, texte: choixDeuxInput, correct: bonneReponseIndex === '2' },
                              { choix_id: initialData[1][2].choix_id, texte: choixTroisInput, correct: bonneReponseIndex === '3' },
                              { choix_id: initialData[1][3].choix_id, texte: choixQuatreInput, correct: bonneReponseIndex === '4' },
                            ];
                          }
                          
                          const success = await editFunction(updatedQuestion);
                          success && navigate(location.pathname);
                        }
                      : async () => {
                        const formData = new FormData(formRef.current);
                        const questionTitre = formData.get('texte');
                        
                        const newQuestion = {
                          texte_question: questionTitre,
                          question_type: exerciceType,
                          exercice_id: Number(exerciceId),
                        };

                        if(exerciceType === 'QCM'){
                          const choixUnInput = formData.get('choix_1');
                            const choixDeuxInput = formData.get('choix_2');
                            const choixTroisInput = formData.get('choix_3');
                            const choixQuatreInput = formData.get('choix_4');
                          const bonneReponseIndex = formData.get('bonne_reponse');

                          newQuestion.choix = [
                            { texte: choixUnInput, correct: bonneReponseIndex === '1' },
                            { texte: choixDeuxInput, correct: bonneReponseIndex === '2' },
                            { texte: choixTroisInput, correct: bonneReponseIndex === '3' },
                            { texte: choixQuatreInput, correct: bonneReponseIndex === '4' },    
                          ]}
                          

                        const success = await addFunction(newQuestion)
                        success && navigate(`${location.pathname}?success=true`)
                      }
                    }
                className={`text-sm w-full sm:w-auto px-6 bg-orange-cuivre border-2 border-orange-cuivre rounded-xl py-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuestionModal;
