import React, { useState } from "react";
import ProgressBar from "../shared/ProgressBar";
import { Link } from "react-router-dom";
import NoImageFound from "../../assets/no-image-found.png";

const CourseCardFormateur = ({ cours, enrolled, etudiant = false, lecons, exercices, progression }) => {
  const [imageLoadedCount, setImageLoadedCount] = useState(0);
  const allLoaded = imageLoadedCount >= cours.length;

  const descriptionSlice = (description) => {
    return description.slice(0, 150) + "...";
  };

  return (
    <>
      <div
        className={`w-full rounded-2xl h-fit grid grid-cols-2 gap-20 justify-between p-2`}
      >
        {cours.map((c, i) => (
          <Link
            to={`${c.id}`}
            className="w-full flex flex-col gap-2 border-2 border-gris-clair rounded-2xl"
          >
            <div className="relative w-full 4-40">
              <div className="rounded-xl bg-bleu-principal py-1 px-3 absolute inset-2 w-fit flex items-center justify-center h-10">
                <p className="text-white text-sm font-semibold">
                  {c.categorie}
                </p>
              </div>
              <img
                src={c.imageUrl ? c.imageUrl : NoImageFound}
                alt="cours_image"
                className="rounded-t-2xl w-full object-cover h-60"
              />
            </div>
            <div className="flex flex-col gap-1 p-3">
              <h3 className="font-titres text-xl font-semibold text-bleu-principal">
                {c.titre}
              </h3>
              <p className="text-md text-bleu-secondaire">
                {descriptionSlice(c.description)}
              </p>
              <div className="flex justify-between items-center">
                {etudiant ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gris-clair flex items-center justify-center text-bleu-secondaire font-semibold">
                      {cours[0].formateur[0]}
                    </div>
                    <p className="font-semibold text-bleu-principal">
                      {cours[0].formateur}
                    </p>
                  </div>
                ) : (
                  <p className="text-gris-fonce text-md">
                    {enrolled[i]} étudiants inscrits
                  </p>
                )}
                  <p key={i} className="text-gris-fonce text-md">
                    {lecons[i]} leçons · {exercices[i]} exercices
                  </p>
              </div>
              <div className="flex flex-col gap-2 my-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-titres text-md font-semibold text-bleu-principal">
                    Complétion
                  </h3>
                  <p className="text-orange-cuivre font-semibold">{progression[i]}/{enrolled[i]}</p>
                </div>
                <div className="w-full">
                  <ProgressBar current={progression[i]} total={enrolled[i]} className="w-full" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CourseCardFormateur;
