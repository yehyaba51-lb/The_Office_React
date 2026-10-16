import ProgressBar from "../shared/ProgressBar";
import { Link, useOutletContext } from "react-router-dom";
import NoImageFound from "../../assets/no-image-found.png";
import { UserX } from "lucide-react";
import { translations } from "../../translations";

const CourseCardFormateur = ({ cours, etudiant = false }) => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const { currentUser, lang } = useOutletContext()
  const descriptionSlice = (description) => {
    return description.slice(0, 50) + "...";
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
                  {c.categorie_nom ? capitalize(c.categorie_nom) : translations[lang]['aucuneCategorie']}
                </p>
              </div>
              <img
                src={c.url_image ? `${import.meta.env.VITE_UPLOADS_URL}${c.url_image}` : NoImageFound}
                alt="cours_image"
                className="rounded-t-2xl w-full object-cover h-60"
              />
            </div>
            <div className="flex flex-col gap-1 px-3 py-2">
              <h3 className="font-titres text-xl font-semibold text-bleu-principal">
                {capitalize(c.cours_titre)}
              </h3>
              <p className="text-md text-bleu-secondaire">
                {c.description ? descriptionSlice(capitalize(c.description)) : translations[lang]['pasDeDescription']}
              </p>
              <div className="flex justify-between items-center">
                {etudiant ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gris-clair flex items-center justify-center text-bleu-secondaire font-semibold">
                      {cours[i].formateur ? capitalize(cours[i].formateur[0]) : <UserX size={20} />}
                    </div>
                    <p className="font-semibold text-bleu-principal">
                      {cours[i].formateur ? capitalize(cours[i].formateur) : translations[lang]['aucunFormateurAssigne']}
                    </p>
                  </div>
                ) : (
                  c.etudiants > 0 ? (
                    <p className="text-gris-fonce text-md">
                      {c.etudiants} {translations[lang]['etudiantsInscrits']}
                    </p>
                  ) : (
                    <p className="text-gris-fonce text-md">
                      0 {translations[lang]['etudiantsInscrits']}
                    </p>

                  )
                )}
                  <p key={i} className="text-gris-fonce text-md">
                    {c.lecons} {translations[lang]['lecons']} · {c.exercices} {translations[lang]['exercices']}
                  </p>
              </div>
              <div className="flex flex-col gap-2 my-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-titres text-md font-semibold text-bleu-principal">
                    {translations[lang]['completion']}
                  </h3>
                  {c.etudiants && c.etudiants > 0 ? (
                    <p className="text-orange-cuivre font-semibold">{c.number_of_completion}/{c.etudiants}</p>
                  ) : (
                    <p className="text-orange-cuivre font-semibold">{c.number_of_completion}/{c.lecons}</p>
                  )}
                </div>
                <div className="w-full">
                  {c.etudiants && c.etudiants > 0 ? (
                    <ProgressBar current={c.number_of_completion} total={c.etudiants} className="w-full" />
                  ) : c.lecons > 0 ? (
                    <ProgressBar current={c.number_of_completion} total={c.lecons} className="w-full" />
                  ) : (
                    <ProgressBar current={0} total={1} className="w-full" />
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
