import React from "react";
import { fakeSoumissions } from "../../fakeData";
import { useNavigate, useParams } from "react-router-dom";
import { FileX } from "lucide-react";

const NotesDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const selectedSoumission = fakeSoumissions.find((s) => s.id === Number(id));

  return (
    <div className="flex flex-col gap-5 px-5 py-3 mt-5">
      {!selectedSoumission ? (
        <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
          <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
            <FileX className="text-gris-fonce" size={26} />
          </div>
          <h3 className="text-bleu-principal font-titres font-semibold text-lg">
            Note introuvable
          </h3>
          <p className="text-gris-fonce text-sm max-w-sm">
            Cette note n'existe pas. Vérifiez le lien ou
            retournez à la liste des notes.
          </p>
          <button
            onClick={() => navigate("/etudiant/notes")}
            className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
          >
            Retour aux notes
          </button>
        </div>
      ): (
      <div className="px-8 py-5 mx-auto w-5/8 border-2 border-gris-clair rounded-2xl flex flex-col h-fit gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 justify-start">
              <h3 className="text-bleu-principal font-titres font-bold text-xl">
                EXERCICE
              </h3>
              <p className="text-sm text-bleu-secondaire">
                {selectedSoumission.exercice}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <h3 className="text-bleu-principal font-titres font-bold text-xl">
                COURS
              </h3>
              <p className="text-sm text-bleu-secondaire">
                {selectedSoumission.cours}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <h3 className="text-bleu-principal font-titres font-bold text-xl">
                SOUMIS LE
              </h3>
              <p className="text-sm text-bleu-secondaire">
                {selectedSoumission.soumisLe}
              </p>
            </div>
          </div>
          <div className="border-2 gap-3 border-gris-clair rounded-2xl flex flex-col h-40 w-40 p-5 items-center justify-center">
            <h3 className="font-titres text-xl font-semibold">Note</h3>
            <h1
              className={`font-titres text-4xl font-semibold ${selectedSoumission.note >= 10 ? "text-vert-reussite" : "text-rouge-echec"}`}
            >
              {selectedSoumission.note}/20
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 justify-start">
            <h3 className="text-bleu-principal font-titres font-bold text-xl">
              CORRIGÉ LE
            </h3>
            <p className="text-sm text-bleu-secondaire">
              {selectedSoumission.corrigeLe}
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <h3 className="text-bleu-principal font-titres font-bold text-xl">
              COMMENTAIRE
            </h3>
            <p className="text-sm text-bleu-secondaire">
              {selectedSoumission.commentaire}
            </p>
          </div>
        </div>
      </div>

      )}
    </div>
  );
};

export default NotesDetailsPage;
