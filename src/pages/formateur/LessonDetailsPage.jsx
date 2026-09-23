import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { File, Download, Play, FileX } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'

const LessonDetailsPage = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
  const [content, setContent] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const { id, leconId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();


  const getLeconContent = async () => {
    setNotFound(false)
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}&lecon=${leconId}&allContent=true`, {
        credentials: 'include',
      })
      const data = await response.json()
      
      if(response.status === 404){
        setNotFound(true)
        return true
      }

      if(!response.ok){
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
  
  
  const showNext = searchParams.get("next") === "true";

  const downloadFunction = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    toast.success("Fichier téléchargé");
  };



  useEffect(() => {
    setIsPlaying(false);
  }, [leconId]);

  return (
    <div className={`flex flex-col w-full gap-4 justify-center items-center p-5 ${loading && "mt-25"}`}>
      {loading ? <Spinner /> : notFound ? (
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
              onClick={() => navigate(`/etudiant/cours/${id}`)}
              className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
            >
              Retour aux leçon
            </button>
          </div>
        ) : hasErrors ? <FetchError /> : (
          <div className="pl-5 flex gap-5 border-2 border-gris-clair rounded-2xl m-5 w-full">
            <>
              <div className="w-1/2 p-3 flex flex-col justify-between">
                <h3 className="font-titres text-bleu-secondaire text-sm mb-2">
                  Notes de la leçon
                </h3>
                <p className="text-bleu-principal text-md mb-6">
                  {content.textes.length
                    ? capitalize(content.textes[0].contenu_texte)
                    : "Pas de contenu"}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  {content.pdfs && content.pdfs.length > 0 && (
                        <div
                          onClick={() => downloadFunction(content.pdfs[0].url_pdf, content.pdfs[0].url_pdf.split('/').pop())}
                          className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                        >
                          <div className="flex gap-1 items-center">
                            <File size={18} />
                            {content.pdfs[0].url_pdf.split('/').pop()}
                          </div>
                          <Download size={18} />
                        </div>
                      )
                    }
                </div>
              </div>
              {content.videos.length !== 0 && (
                <div className="w-1/2 h-fit relative">
                  {!isPlaying && (
                    <div
                      onClick={() => {
                        setIsPlaying(true);
                        videoRef.current.play();
                      }}
                      className={`cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex items-center justify-center bg-orange-cuivre hover:bg-orange-cuivre/90 transition duration-300 ease-in-out ${showNext ? "opacity-20" : ""}`}                    >
                      <Play size={50} className="text-white" fill={"white"} />
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    className={`w-full h-80 object-cover rounded-r-2xl ${showNext ? "opacity-20" : ""}`}
                    src={`${import.meta.env.VITE_UPLOADS_URL}${content.videos[0].url_video}`}
                    controls={isPlaying ? true : false}
                  ></video>
                </div>
              )}
            </>
          </div>
        )
      }
    </div>
  );
};

export default LessonDetailsPage;
