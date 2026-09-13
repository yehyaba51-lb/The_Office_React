import { BadgeCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NextLesson = ({ lecon, coursId, leconId }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div className="fixed inset-0 flex justify-center items-start p-22 z-20">
        <div className="bg-white rounded-2xl px-9 py-8 w-200 flex flex-col items-center gap-5">
          <h3 className="font-titres text-bleu-principal text-xl flex items-center gap-3">
            Leçon terminée : « {lecon} »
            <BadgeCheck size={25} className="text-vert-reussite" />
          </h3>
          <div className="flex w-1/2 gap-3 justify-center">
            <input
              onClick={() => navigate(`/etudiant/exercices`)}
              type="button"
              value="Voir les exercices"
              className="text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl px-3 py-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
            />
            <input
              type="button"
              onClick={() => {
                {
                  leconId === ''
                    ? navigate(`/etudiant/cours`)
                    : navigate(
                        `/etudiant/cours/${coursId}/${Number(leconId) + 1}`,
                      );
                }
              }}
              value={leconId === '' ? `Cours terminé` : `Leçon suivante`}
              className={`text-sm w-5/6 bg-orange-cuivre rounded-xl px-5 py-2 cursor-pointer text-white font-semibold hover:bg-orange-cuivre/90 transition duration-300 ease-in-out`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NextLesson;
