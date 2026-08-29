import React, { useState } from "react";
import { fakeLecons, fakeCours } from "../../fakeData";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../../components/shared/ProgressBar";
import {
  Check,
  LockKeyhole,
  FileText,
  Film,
  FileCode,
  CircleDot,
  FileX
} from "lucide-react";

const CoursDetailsPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const fakeLeconsEtudiant = [
    {
      id: 1,
      coursId: 4,
      titre: "Introduction aux bases de données",
      description: "Concepts fondamentaux et vocabulaire relationnel",
      ordre: 1,
      types: ["Vidéo", "PDF"],
      statut: "complete",
    },
    {
      id: 2,
      coursId: 4,
      titre: "Modéliser un schéma",
      description: "Entités, relations et cardinalités",
      ordre: 2,
      types: ["Texte", "PDF"],
      statut: "complete",
    },
    {
      id: 3,
      coursId: 4,
      titre: "Clés primaires et étrangères",
      description: "Garantir l'intégrité référentielle entre les tables",
      ordre: 3,
      types: ["Texte", "Vidéo", "PDF"],
      statut: "complete",
    },
    {
      id: 4,
      coursId: 4,
      titre: "Normalisation",
      description: "Éviter la redondance grâce aux formes normales",
      ordre: 4,
      types: ["PDF"],
      statut: "complete",
    },
    {
      id: 5,
      coursId: 4,
      titre: "Requêtes SQL — SELECT",
      description: "Interroger et filtrer les données efficacement",
      ordre: 5,
      types: ["Vidéo", "PDF"],
      statut: "en_cours",
    },
    {
      id: 6,
      coursId: 4,
      titre: "Requêtes SQL — INSERT, UPDATE, DELETE",
      description: "Modifier les données d'une base existante",
      ordre: 6,
      types: ["Vidéo", "PDF"],
      statut: "verrouille",
    },
    {
      id: 7,
      coursId: 4,
      titre: "Jointures",
      description: "Combiner des données provenant de plusieurs tables",
      ordre: 7,
      types: ["Texte", "PDF"],
      statut: "verrouille",
    },
  ];
  const { id } = useParams();

  const location = useLocation();

  const selectedCours = fakeCours.find((c) => c.id === Number(id));

  const selectedLecons = selectedCours
    ? fakeLecons.filter((l) => l.coursId === Number(id))
    : "";

  const numberOfCompletedLecons = fakeLeconsEtudiant.filter(
    (l) => l.statut === "complete",
  ).length;

  const percentageCalcule = (current, total) => {
    return Math.round((current * 100) / total);
  };
  return (
    <div className="flex flex-col gap-5 px-5 py-3">
      {!selectedCours ? (
        <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
          <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
            <FileX className="text-gris-fonce" size={26} />
          </div>
          <h3 className="text-bleu-principal font-titres font-semibold text-lg">
            Cours introuvable
          </h3>
          <p className="text-gris-fonce text-sm max-w-sm">
            Ce cours n'existe pas ou a été supprimé. Vérifiez le lien ou
            retournez à la liste des cours.
          </p>
          <button
            onClick={() => navigate("/etudiant/cours")}
            className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
          >
            Retour aux cours
          </button>
        </div>
      ) : (
        <>
          <h3 className="font-titres text-bleu-principal font-semibold text-xl">
            Leçons
          </h3>
          <div className="w-full flex gap-3">
            <div className="px-4 py-2 w-5/8 border-2 border-gris-clair rounded-2xl flex flex-col h-fit">
              {fakeLeconsEtudiant.map((l) => {
                const isLocked = l.statut === "verrouille" ? true : false;
                return (
                  <Link
                    to={isLocked ? "" : `${location.pathname}/${l.id}`}
                    onClick={(e) => isLocked && e.preventDefault()}
                    key={l.id}
                    className={isLocked ? `cursor-default` : "cursor-pointer"}
                  >
                    <>
                      {l.id !== 1 && (
                        <hr className="border-2 border-gris-clair" />
                      )}
                      <div className="flex items-start gap-4 p-3">
                        <div
                          className={`flex items-center justify-center w-13 h-13 rounded-xl ${l.statut === "complete" ? "bg-vert-reussite/25" : l.statut === "en_cours" ? "bg-orange-cuivre/20" : "bg-gris-clair/45"}`}
                        >
                          {l.statut === "complete" ? (
                            <Check size={38} className="text-vert-reussite" />
                          ) : l.statut === "en_cours" ? (
                            <h3 className="text-orange-cuivre font-semibold text-2xl">
                              {String(l.ordre).padStart(2, "0")}
                            </h3>
                          ) : (
                            <LockKeyhole
                              size={38}
                              className="text-gris-fonce/40"
                            />
                          )}
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-titres text-bleu-principal text-lg font-bold">
                              {l.titre}
                            </h3>
                            <p className="text-bleu-secondaire text-sm">
                              {l.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1 mt-2">
                              {l.types.map((t) => (
                                <div
                                  key={t}
                                  className="flex items-center gap-1"
                                >
                                  {t === "Vidéo" ? (
                                    <Film className="text-gris-fonce" />
                                  ) : t === "PDF" ? (
                                    <FileCode className="text-gris-fonce" />
                                  ) : (
                                    <FileText className="text-gris-fonce" />
                                  )}
                                  <p className="mr-5 text-gris-fonce text-sm">
                                    {t}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div
                              className={`mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-1 text-sm ${l.statut === "complete" ? "bg-vert-reussite/25 text-vert-reussite" : l.statut === "en_cours" ? "bg-orange-cuivre/30 text-orange-cuivre" : "bg-gris-clair/45 text-gris-fonce/40"}`}
                            >
                              {l.statut === "complete" ? (
                                <Check
                                  size={20}
                                  className="text-vert-reussite font-semibold"
                                />
                              ) : l.statut === "en_cours" ? (
                                <CircleDot
                                  size={20}
                                  className="text-orange-cuivre font-semibold text-2xl"
                                />
                              ) : (
                                <LockKeyhole
                                  size={20}
                                  className="text-gris-fonce/40 font-semibold"
                                />
                              )}
                              <p>
                                {l.statut === "complete"
                                  ? "Complété"
                                  : l.statut === "en_cours"
                                    ? "En cours"
                                    : "Verrouillé"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </Link>
                );
              })}
            </div>
            <div className="w-3/8 flex flex-col gap-4">
              <div className="px-4 py-2 flex flex-col gap-2 items-center justify-center border-2 border-gris-clair rounded-2xl">
                <img
                  src={selectedCours.imageUrl}
                  alt="cours_image"
                  className="rounded-xl"
                />
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-titres text-md font-semibold text-bleu-principal">
                      Complétion
                    </h3>
                    <p className="text-orange-cuivre font-semibold">
                      {percentageCalcule(
                        numberOfCompletedLecons,
                        fakeLeconsEtudiant.length,
                      )}
                      %
                    </p>
                  </div>
                  <div className="w-full">
                    <ProgressBar
                      current={numberOfCompletedLecons}
                      total={fakeLeconsEtudiant.length}
                      className="w-full"
                    />
                  </div>
                  <p className="text-bleu-secondaire text-sm">{`${numberOfCompletedLecons}/${fakeLeconsEtudiant.length} leçons terminées`}</p>
                  <p className="text-md text-bleu-secondaire">
                    {selectedCours.description}
                  </p>
                  <hr className="border-2 border-gris-clair" />
                  <div className="flex justify-start items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gris-clair"></div>
                    <h3 className="font-titres text-bleu-principal font-semibold">
                      {selectedCours.formateur}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 flex flex-col gap-2 items-center justify-center border-2 border-gris-clair rounded-2xl">
                <h3 className="font-titres text-bleu-principal font-semibold text-md">
                  NOTE FINALE
                </h3>
                <p className="text-bleu-secondaire text-xs">
                  Disponible une fois toutes les leçons terminées et tous les
                  exercices corrigés
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursDetailsPage;
