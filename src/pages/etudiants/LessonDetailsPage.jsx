import { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { File, Download, Check, Play, ListChecks, FileX } from "lucide-react";
import { toast } from "react-toastify";
import NextLesson from "../../components/modals/NextLesson";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";

const LessonDetailsPage = () => {
  const capitalize = (str) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const capitalize2 = (str) => str.charAt(0).toUpperCase() + str.slice(1)  
  const location = useLocation();
  const navigate = useNavigate();
  const { id, leconId } = useParams();
  const [content, setContent] = useState({ lecon: {}, lecon_count: {}, progression_lecon: {}, videos: {}, textes: {}, pdfs: {} })
  const [hasErrors, setHasErrors] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [videoAlmostDone, setVideoAlmostDone] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();
  const showNext = searchParams.get("next") === "true";
  const currentUser = useOutletContext()

  const getLeconContent = async () => {
    setNotFound(false)
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}&lecon=${leconId}&userId=${currentUser.utilisateur_id}&allContent=true`, {
        credentials: 'include',
      })
      const data = await response.json()
      
      if(response.status === 404){
        setNotFound(true)
        return true
      }

      if(response.status === 403){
          setAccessDenied(true)
          return 
        } else if(!response.ok){
          toast.error(data.error)
          return false
        }

      setContent(data)
      return true
    } catch (error) {
      setContent({})
      return false
    }
  }


  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getLeconContent()])
      setHasErrors(results.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [id, leconId])

  const telechargerFunction = () => {
    const link = document.createElement('a');
    link.href = content && `${import.meta.env.VITE_UPLOADS_URL}${content.pdfs[0].url_pdf}`;
    link.download = content && content.pdfs[0].url_pdf.split('pdfs/')[1];
    link.click();
    toast.success("Fichier téléchargé");
  };


  useEffect(() => {
    setIsPlaying(false);
    setVideoAlmostDone(false);
    setVideoDone(false);
  }, [leconId]);

  console.log(content.lecon_count.lecons_count);
  
  return (
    <div className={`flex flex-col px-5 gap-4 items-center ${loading ? "mt-25" : "my-4"}`}>
      {loading ? <Spinner /> : accessDenied ? <FetchError accessDenied={true} /> : hasErrors ? <FetchError /> : (
        notFound ? (
          <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
            <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
              <FileX className="text-gris-fonce" size={26} />
            </div>
            <h3 className="text-bleu-principal font-titres font-semibold text-lg">
              Leçon introuvable
            </h3>
            <p className="text-gris-fonce text-sm max-w-sm">
              Ce Leçon n'existe pas ou a été supprimé. Vérifiez le lien ou
              retournez à la liste des cours.
            </p>
            <button
              onClick={() => navigate("/etudiant/cours")}
              className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
            >
              Retour aux cours
            </button>
          </div>
        ) : <div className="w-full pl-5 flex gap-5 border-2 border-gris-clair rounded-2xl m-5">
          {showNext && (
            <NextLesson
              lecon={capitalize(content.lecon.lecon_titre)}
              coursId={id}
              leconId={leconId}
              leconsCount={content.lecon_count.lecons_count}
              leconOrdre={content.lecon.lecon_ordre}
            />
          )}

          <>
            <div className="w-1/2 p-3 flex flex-col justify-between">
              <h3 className="font-titres text-bleu-secondaire text-sm mb-2">
                Notes de la leçon
              </h3>
              <p className="text-bleu-principal text-md mb-6">
                {content.textes && content.textes.length > 0
                  ? capitalize2(content.textes[0].contenu_texte)
                  : "Pas de contenu"}
              </p>
              <div className="mt-auto flex flex-col gap-2">
                {content.progression_lecon && content.progression_lecon.complete_le && content.pdfs && content.pdfs.length > 0 ? (
                  <div
                    onClick={() => telechargerFunction()}
                    className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                  >
                    <div className="flex gap-1 items-center">
                      <File size={18} />
                      {content.pdfs[0].url_pdf.split('pdfs/')[1]}
                    </div>
                    <Download size={18} />
                  </div>
                ) : content.videos && content.videos.length > 0
                  ? content.pdfs && content.pdfs.length > 0 &&
                    videoAlmostDone && (
                      <div
                        onClick={() => telechargerFunction()}
                        className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                      >
                        <div className="flex gap-1 items-center">
                          <File size={18} />
                          {content.pdfs[0].url_pdf.split('pdfs/')[1]}
                        </div>
                        <Download size={18} />
                      </div>
                    )
                  : content.pdfs && content.pdfs.length > 0 && (
                      <div
                        onClick={() => telechargerFunction()}
                        className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                      >
                        <div className="flex gap-1 items-center">
                          <File size={18} />
                          {content.pdfs[0].url_pdf.split('pdfs/')[1]}
                        </div>
                        <Download size={18} />
                      </div>
                    )}
              </div>
              {content.progression_lecon && content.progression_lecon.complete_le ? (
                <button
                  onClick={() => navigate('/etudiant/exercices')}
                  className={`w-full flex justify-center items-center gap-2 rounded-lg px-5 py-2 bg-orange-cuivre text-white cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out`}
                >
                  <ListChecks className={"text-white font-semibold"} />
                  Voir les exercices
                </button>
              ) : content.videos && content.videos.length > 0 ? (
                <button
                  onClick={() => navigate(`${location.pathname}?next=true`)}
                  className={`w-full flex justify-center items-center gap-2 rounded-lg px-5 py-2 ${videoDone ? "bg-orange-cuivre text-white cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out" : "bg-orange-cuivre/20 text-orange-cuivre/55 cursor-not-allowed"}`}
                  disabled={!videoDone}
                >
                  <Check
                    className={
                      videoDone
                        ? "text-white font-semibold"
                        : "text-orange-cuivre/55 font-semibold"
                    }
                  />{" "}
                  Leçon terminée
                </button>
              ) : (
                <button
                  onClick={() => navigate(`${location.pathname}?next=true`)}
                  className={`w-full flex justify-center items-center gap-2 rounded-lg px-5 py-2 bg-orange-cuivre text-white cursor-pointer hover:bg-orange-cuivre/90 transition duration-500 ease-in-out`}
                >
                  <Check className={"text-white font-semibold"} />
                  Leçon terminée
                </button>
              )}
            </div>
            {content.videos && content.videos.length > 0 && (
              <div className="w-1/2 h-fit relative">
                {!isPlaying && (
                  <div
                    onClick={() => {
                      setIsPlaying(true);
                      videoRef.current.play();
                    }}
                    className={`cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-35 rounded-full flex items-center justify-center bg-orange-cuivre hover:bg-orange-cuivre/90 transition duration-300 ease-in-out ${showNext ? "opacity-20" : ""}`}
                  >
                    <Play size={50} className="text-white" fill={"white"} />
                  </div>
                )}
                <video
                  ref={videoRef}
                  className={`w-full h-80 object-cover rounded-r-2xl ${showNext ? "opacity-20" : ""}`}
                  src={`${import.meta.env.VITE_UPLOADS_URL}/${content.videos[0].url_video}`}
                  onTimeUpdate={(e) => {
                    const percent = e.target.currentTime / e.target.duration;
                    if (percent >= 0.8) setVideoAlmostDone(true);
                    if (percent >= 0.99) setVideoDone(true);
                  }}
                  controls={isPlaying ? true : false}
                ></video>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default LessonDetailsPage;
