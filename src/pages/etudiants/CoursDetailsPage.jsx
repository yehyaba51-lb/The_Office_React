import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import ProgressBar from "../../components/shared/ProgressBar";
import NoImageFound from "../../assets/no-image-found.png";
import {
  Check,
  LockKeyhole,
  FileText,
  Film,
  FileCode,
  CircleDot,
  FileX
} from "lucide-react";
import FetchError from "../../components/shared/FetchError";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const CoursDetailsPage = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const { id } = useParams()
  const location = useLocation();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false)
  const [cours, setCours] = useState({ cours: {}, lecons: [], progression: [] })
  const currentUser = useOutletContext()

  const getCoursWithLecons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/cours.php?id=${id}&etudiantId=${currentUser.utilisateur_id}`, {
        credentials: 'include'
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        return false
      }
      
      setCours(data)
      return true
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const result = await Promise.all([
        getCoursWithLecons()
      ])
      setHasErrors(result.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [])

  
  const progression = cours ? cours.progression.filter(p => p.statut === 'terminee').length : 0
  const numberOfLecons = cours ? cours.lecons.length : 0 


  const percentageCalcule = (current, total) => {
    return Math.round((current * 100) / total);
  };
  return (
    <div className={`flex flex-col px-5 gap-4 items-center ${loading ? "mt-25" : "my-8"}`}>
      {loading ? <Spinner /> : hasErrors ? <FetchError /> : (
        !cours ? (
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
            <h3 className="w-full font-titres text-bleu-principal font-semibold text-xl">
              Leçons
            </h3>
            <div className="w-full flex gap-3">
              <div className="px-4 py-2 w-5/8 border-2 border-gris-clair rounded-2xl flex flex-col h-fit">
                {cours.lecons.map((l, i) => {
                  const thisProgresion = cours.progression.find(p => p.lecon_id === l.id)
                  return (
                    <Link
                        to={thisProgresion ? `${location.pathname}/${l.id}` : ''}
                        onClick={(e) => { if(!thisProgresion) e.preventDefault() }}
                        key={l.id}
                        className={thisProgresion && thisProgresion.statut === 'terminee' || thisProgresion && thisProgresion.statut === 'en_cours' ? "cursor-pointer" : 'cursor-not-allowed'}
                      >
                        <>
                          {l.lecon_ordre !== 1 && (
                            <hr className="border-2 border-gris-clair" />
                          )}
                          <div className="flex items-start gap-4 p-3">
                            <div
                              className={`flex items-center justify-center w-13 h-13 rounded-xl ${thisProgresion && thisProgresion.statut === "terminee" ? "bg-vert-reussite/25" : thisProgresion && thisProgresion.statut === "en_cours" ? "bg-orange-cuivre/20" : "bg-gris-clair/45"}`}
                            >
                              {thisProgresion && thisProgresion.statut === "terminee" ? (
                                <Check size={38} className="text-vert-reussite" />
                              ) : thisProgresion && thisProgresion.statut === "en_cours" ? (
                                <h3 className="text-orange-cuivre font-semibold text-2xl">
                                  {String(l.lecon_ordre).padStart(2, "0")}
                                </h3>
                              ) : (
                                <LockKeyhole
                                  size={38}
                                  className="text-gris-fonce/40"
                                />
                              )}
                            </div>
                            <div className="flex flex-col w-full">
                              <div className="flex flex-col">
                                <h3 className="font-titres text-bleu-principal text-lg font-bold">
                                  {l.lecon_titre}
                                </h3>
                                <p className="text-sm text-gris-fonce">
                                  Leçon 0{i + 1}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex gap-1 mt-2">
                                  {l.has_video ? (
                                    <div className="mr-5 text-gris-fonce text-sm flex items-center justify-center gap-1">
                                      <Film className="text-gris-fonce" /> Vidéo
                                    </div>
                                  ) : ''}
                                  {l.has_pdf ? (
                                    <div className="mr-5 text-gris-fonce text-sm flex items-center justify-center gap-1">
                                      <FileCode className="text-gris-fonce" /> PDF
                                    </div>
                                  ) : ''}
                                  {l.has_texte ? (
                                    <div className="mr-5 text-gris-fonce text-sm flex items-center justify-center gap-1">
                                      <FileText className="text-gris-fonce" /> Texte
                                    </div>
                                  ) : ''}
                                </div>
                                <div
                                  className={`mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-1 text-sm ${thisProgresion && thisProgresion.statut === "terminee" ? "bg-vert-reussite/25 text-vert-reussite" : thisProgresion && thisProgresion.statut === "en_cours" ? "bg-orange-cuivre/30 text-orange-cuivre" : "bg-gris-clair/45 text-gris-fonce/40"}`}
                                >
                                  {thisProgresion && thisProgresion.statut === "terminee" ? (
                                    <Check
                                      size={20}
                                      className="text-vert-reussite font-semibold"
                                    />
                                  ) : thisProgresion && thisProgresion.statut === "en_cours" ? (
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
                                    {thisProgresion && thisProgresion.statut === "terminee"
                                      ? "Complété"
                                      : thisProgresion && thisProgresion.statut === "en_cours"
                                        ? "En cours"
                                        : "Verrouillé"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                    </Link>
                  )
                })}
              </div>
              <div className="w-3/8 flex flex-col gap-4">
                <div className="px-4 py-2 flex flex-col gap-2 items-center justify-center border-2 border-gris-clair rounded-2xl">
                  <img
                    src={cours.cours.url_image ? `${import.meta.env.VITE_UPLOADS_URL}${cours.cours.url_image}` : NoImageFound}
                    alt="cours_image"
                    className="rounded-xl"
                  />
                  <h3 className="font-titres text-md font-bold text-bleu-principal self-start">{capitalize(cours.cours.cours_titre)}</h3>
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-titres text-md font-semibold text-bleu-principal">
                        Complétion
                      </h3>
                      <p className="text-orange-cuivre font-semibold">
                        {percentageCalcule(
                          progression,
                          numberOfLecons,
                        )}
                        %
                      </p>
                    </div>
                    <div className="w-full">
                      <ProgressBar
                        current={progression}
                        total={numberOfLecons === 0 ? 1 : numberOfLecons}
                        className="w-full"
                      />
                    </div>
                    <p className="text-bleu-secondaire text-sm">{`${progression}/${numberOfLecons} leçons terminées`}</p>
                    <p className="text-md text-bleu-secondaire">
                      {capitalize(cours.cours.description)}
                    </p>
                    <hr className="border-2 border-gris-clair" />
                    <div className="flex justify-start items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gris-clair flex items-center justify-center text-bleu-secondaire font-bold text-lg">{capitalize(cours.cours.formateur[0])}</div>
                      <h3 className="font-titres text-bleu-principal font-semibold">
                        {capitalize(cours.cours.formateur)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 flex flex-col gap-2 items-center justify-center border-2 border-gris-clair rounded-2xl">
                  <h3 className="font-titres text-bleu-principal font-semibold text-md">
                    NOTE FINALE
                  </h3>
                  <p className={cours.cours.note_finale === null
                    ? 'text-bleu-secondaire text-xs'
                    : cours.cours.note_finale >= 10
                      ? 'text-2xl text-vert-reussite'
                      : 'text-rouge-echec text-2xl'}>
                    {cours.cours.note_finale ? cours.cours.note_finale : (
                      `Disponible une fois toutes les leçons terminées et tous les
                      exercices corrigés`
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )

      )}
    </div>
  );
};

export default CoursDetailsPage;
