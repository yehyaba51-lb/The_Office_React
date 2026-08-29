import React, { useState } from "react";
import SearchBar from "../../components/shared/SearchBar";
import { Check, LockKeyhole } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const fakeCoursExercices = [
  {
    coursId: 1,
    cours: "Fondations du développement web",
    lecons: [
      { id: 1, titre: "Structurer une page HTML", ordre: 1, statut: "corrigée", note: 18 },
      { id: 2, titre: "Mettre en page avec CSS", ordre: 2, statut: "soumis" },
      { id: 3, titre: "Les bases de JavaScript", ordre: 3, statut: "a_faire" },
      { id: 4, titre: "Formulaires et validation", ordre: 4, statut: "verrouille" },
    ],
  },
  {
    coursId: 4,
    cours: "Bases de données",
    lecons: [
      { id: 1, titre: "Introduction aux bases de données", ordre: 1, statut: "corrigée", note: 15 },
      { id: 2, titre: "Modéliser un schéma", ordre: 2, statut: "corrigée", note: 17 },
      { id: 3, titre: "Clés primaires et étrangères", ordre: 3, statut: "a_faire" },
      { id: 4, titre: "Normalisation", ordre: 4, statut: "verrouille" },
    ],
  },
];

const MesExercices = () => {
  const location = useLocation();
  const [filter, setFilter] = useState("all");

  const activeClass = (isActive) =>
    `${isActive ? "bg-orange-cuivre text-sm rounded px-3 py-1 flex justify-center items-center text-white font-semibold" : "flex justify-center items-center text-sm text-bleu-secondaire font-m cursor-pointer hover:underline hover:text-orange-cuivre"}`;

  return (
    <div className="px-5 mb-5">
      <div className="flex mt-5 gap-4 items-center">
        <SearchBar />
        <div className="w-80 p-1 border-2 border-gris-clair rounded-xl flex text-md justify-center gap-5">
          <button className={activeClass(filter === "all")} onClick={() => setFilter("all")}>
            Tous les exercices
          </button>
          <button className={activeClass(filter === "a_faire")} onClick={() => setFilter("a_faire")}>
            À faire
          </button>
          <button className={activeClass(filter === "corrigée")} onClick={() => setFilter("corrigée")}>
            Corrigées
          </button>
        </div>
      </div>

      {fakeCoursExercices.map((cours) => {
        const filteredLecons = cours.lecons.filter((l) =>
          filter === "all" ? true : l.statut === filter
        );

        return (
          <div
            key={cours.coursId}
            className="mt-5 w-full border-2 border-gris-clair rounded-2xl py-3 flex flex-col gap-2 justify-between"
          >
            <h3 className="px-5 font-titres text-bleu-principal text-xl">{cours.cours}</h3>
            <hr className="border-2 border-gris-clair w-full mb-2" />

            {filteredLecons.map((lecon) => (
              <div key={lecon.id}>
                {lecon.id !== 1 && <hr className="border-2 border-gris-clair w-full mb-2" />}
                <Link
                  to={
                    lecon.statut !== "verrouille"
                      ? `${location.pathname}/${cours.coursId}/${lecon.id}`
                      : ""
                  }
                  className={`${lecon.statut === "verrouille" && "cursor-not-allowed"} flex items-center justify-between mx-5`}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 flex items-center justify-center">
                      {lecon.statut === "corrigée" ? (
                        <Check className="text-vert-reussite" size={30} />
                      ) : lecon.statut === "verrouille" ? (
                        <LockKeyhole className="text-gris-fonce/30" size={30} />
                      ) : (
                        <p className="font-semibold text-orange-cuivre">
                          {String(lecon.ordre).padStart(2, "0")}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <h3
                        className={`${lecon.statut === "verrouille" && "text-gris-fonce/40"} font-titres text-bleu-principal font-semibold text-md`}
                      >
                        {lecon.titre}
                      </h3>
                      <p className={`${lecon.statut === "verrouille" && "text-gris-fonce/40"} text-bleu-secondaire text-xs`}>
                        Leçon 0{lecon.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/12">
                    {lecon.statut === "corrigée" ? (
                      <p className="text-vert-reussite font-medium text-md bg-vert-reussite/20 py-1 px-5 rounded-xl">
                        {lecon.note}
                      </p>
                    ) : lecon.statut === "soumis" ? (
                      <p className="text-bleu-secondaire font-medium text-md bg-bleu-secondaire/20 py-1 px-5 rounded-xl">
                        Soumis
                      </p>
                    ) : lecon.statut === "verrouille" ? (
                      <p className="text-gris-fonce/40 font-medium text-md bg-gris-clair py-1 px-5 rounded-xl">
                        Verrouillé
                      </p>
                    ) : (
                      <p className="text-orange-cuivre font-medium text-md bg-orange-cuivre/20 py-1 px-5 rounded-xl">
                        À faire
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MesExercices;