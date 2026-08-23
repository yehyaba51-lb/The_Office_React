import React from "react";
import { CircleX, Check , Download, File } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "../shared/BreadCrumb";
import { fakeSoumissions, fakeQuestions } from '../../fakeData';

const CorrectionModal = ({ submitFunction, downloadFunction }) => {
  const [searchParams] = useSearchParams()
  const exerciceId = searchParams.get('id')

  const selectedsoumission = fakeSoumissions.find(s => s.id === Number(exerciceId))
  const answersSelected = fakeQuestions.find(q => q.id === selectedsoumission.questionId)
  
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div
        className="fixed inset-0 flex justify-center items-start p-5 z-10"
        onClick={() => navigate(location.pathname)}
      >
        <div
          className="bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
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
          <BreadCrumb cours={ selectedsoumission.cours } exo={ selectedsoumission.exercice } />
          <form action="" method="post" className='flex flex-col mt-4' >
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="titre" className="text-gris-fonce text-sm">
                Texte de la question
              </label>
              <div className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
              >
                {answersSelected.texte}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-2">
              {answersSelected.type === 'Input' ? (
                <>
                  <label htmlFor="titre" className="text-gris-fonce text-sm">
                    Réponse
                  </label>
                  <div className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                  >
                    {selectedsoumission.reponse}
                  </div>
                </>
              ) : answersSelected.type === 'QCM' ? (
                <>
                  <div className="flex items-center justify-between mt-3">
                    <label htmlFor="titre" className="text-gris-fonce text-sm">
                      Les choix
                    </label>
                    <div className="flex items-center gap-5">
                      <div className="flex gap-1 items-center">
                        <div className="w-3 h-3 rounded-full bg-bleu-secondaire"></div>
                        <p className="text-xs text-bleu-secondaire">Sélection de l'étudiant</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <Check size={16} className="text-bleu-secondaire" />
                        <p className="text-xs text-bleu-secondaire">Bonne réponse</p>
                      </div>
                    </div>
                  </div>
                    {answersSelected.choix.map(a => (
                      <div className={`flex flex-col gap-3 border-2 border-gris-clair rounded-lg py-2 px-4 ${a.correct && 'bg-gris-clair'}`}>
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${selectedsoumission.reponseChoixId === a.id ? 'bg-bleu-secondaire' : 'bg-white border-2 border-gris-clair'}`}></div>
                            <p className="font-semibold text-sm text-bleu-principal">{a.texte}</p>
                          </div>
                          {a.correct && <Check size={16} className="text-bleu-secondaire" />}
                        </div>
                        
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <label htmlFor="titre" className="text-gris-fonce text-sm">
                      Fichier
                    </label>
                    <div onClick={() => downloadFunction()} className="cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    >
                      <div className="flex gap-1 items-center">
                        <File size={18} />
                        {selectedsoumission.reponseFichier}
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
                defaultValue={selectedsoumission ? selectedsoumission.note : ''}
                className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="commentaire" className="text-gris-fonce text-sm">
                Commentaire
              </label>
              <textarea
                type="text"
                name="commentaire"
                id="commentaire"
                rows={'6'}
                placeholder="Optionnel"
                defaultValue={selectedsoumission ? selectedsoumission.commentaire : ''}
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
                    submitFunction()
                    navigate(`${location.pathname}`);
                  }}
                  value={`Corriger`}
                  className={`text-sm w-6/7 bg-orange-cuivre border-2 border-orange-cuivre rounded-xl p-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`}
                />
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CorrectionModal;
