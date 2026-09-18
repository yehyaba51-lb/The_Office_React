import ProgressBar from "../shared/ProgressBar";
import { Link } from "react-router-dom";
import NoImageFound from "../../assets/no-image-found.png";

const CourseCardFormateur = ({ cours, enrolled, etudiant = false }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
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
            key={i}
            to={`${c.cours_id}`}
            className="w-full flex flex-col gap-2 border-2 border-gris-clair rounded-2xl"
          >
            <div className="relative w-full">
              <div className="rounded-xl bg-bleu-principal py-1 px-3 absolute inset-2 w-fit flex items-center justify-center h-10">
                <p className="text-white text-sm font-semibold">
                  {capitalize(c.categorie_nom)}
                </p>
              </div>
              <img
                src={c.url_image ? c.url_image : NoImageFound}
                alt="cours_image"
                className="rounded-t-2xl w-full object-cover h-60"
              />
            </div>
            <div className="flex flex-col gap-1 px-3 py-2">
              <h3 className="font-titres text-xl font-semibold text-bleu-principal">
                {capitalize(c.cours_titre)}
              </h3>
              <p className="text-md text-bleu-secondaire">
                {c.description ? descriptionSlice(capitalize(c.description)) : "Pas de description"}
              </p>
              <div className="flex justify-between items-center">
                {etudiant ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gris-clair flex items-center justify-center text-bleu-secondaire font-semibold">
                      {cours[i].formateur[0]}
                    </div>
                    <p className="font-semibold text-bleu-principal">
                      {cours[i].formateur}
                    </p>
                  </div>
                ) : (
                  c.etudiants > 0 ? (
                    <p className="text-gris-fonce text-md">
                      {c.etudiants} étudiants inscrits
                    </p>
                  ) : (
                    <p className="text-gris-fonce text-md">
                      0 étudiants inscrits
                    </p>

                  )
                )}
                  <p key={i} className="text-gris-fonce text-md">
                    {c.lecons} leçons · {c.exercices} exercices
                  </p>
              </div>
              <div className="flex flex-col gap-2 my-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-titres text-md font-semibold text-bleu-principal">
                    Complétion
                  </h3>
                  {c.etudiants > 0 ? (
                    <p className="text-orange-cuivre font-semibold">{c.number_of_completion}/{c.etudiants}</p>
                  ) : (
                    <p className="text-orange-cuivre font-semibold">{c.number_of_completion}/{c.lecons}</p>
                  )}
                </div>
                <div className="w-full">
                  {c.etudiants > 0 ? (
                    <ProgressBar current={c.number_of_completion} total={c.etudiants} className="w-full" />
                  ) : (
                    <ProgressBar current={c.number_of_completion} total={c.lecons} className="w-full" />
                  )}
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
