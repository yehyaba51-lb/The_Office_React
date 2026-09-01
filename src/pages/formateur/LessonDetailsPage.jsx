import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { File, Download, Play, FileX } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from '../../components/shared/Spinner'
import FetchError from '../../components/shared/FetchError'

const LessonDetailsPage = () => {
  const [textes, setTextes] = useState([])
  const [pdfs, setPdfs] = useState([])
  const [videos, setVideos] = useState([])
  const [lecons, setLecons] = useState([])
  const [hasErrors, setHasErrors] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const navigate = useNavigate();
  const { id, leconId } = useParams();
  const [videoAlmostDone, setVideoAlmostDone] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();

  const getLecons = async () => {
    try {
      const response = await fetch('http://localhost:8000/lecons')
      const data = await response.json()

      setLecons(data)
      return true
    } catch (error) {
      setLecons([])
      return false
    }
  }


  const getLeconTextes = async () => {
    try {
      const response = await fetch('http://localhost:8000/leconTextes')
      const data = await response.json()

      setTextes(data)
      return true
    } catch (error) {
      setTextes([])
      return false
    }
  }

  const getLeconPdfs = async () => {
    try {
      const response = await fetch('http://localhost:8000/leconPdfs')
      const data = await response.json()

      setPdfs(data)
      return true
    } catch (error) {
      setPdfs([])
      return false
    }
  }

  const getLeconVideos = async () => {
    try {
      const response = await fetch('http://localhost:8000/leconVideos')
      const data = await response.json()

      setVideos(data)
      return true
    } catch (error) {
      setVideos([])
      return false
    }
  }

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getLecons(), getLeconTextes(), getLeconPdfs(), getLeconVideos()])
      setHasErrors(results.includes(false))

      setLoading(false)
    }

    loadEverything()
  }, [])


  const showNext = searchParams.get("next") === "true";

  const selectedLecons = lecons.filter((l) => l.coursId === Number(id));

  const lecon = selectedLecons.find((l) => l.id === Number(leconId));


  const selectedLeconTexte = textes ? textes.filter(
    (t) => t.coursId === Number(id) && t.leconId === Number(leconId)
  ) : []

  const selectedLeconPdf = pdfs ? pdfs.filter(
    (p) => p.coursId === Number(id) && p.leconId === Number(leconId)
  ) : []
  const selectedLeconVideo = videos ? videos.filter(
    (v) => v.coursId === Number(id) && v.leconId === Number(leconId)
  ) : []
  
  const downloadFunction = (url, fileName) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    toast.success("Fichier PDF  téléchargé");
  };



  useEffect(() => {
    setIsPlaying(false);
    setVideoAlmostDone(false);
    setVideoDone(false);
  }, [leconId]);

  return (
    <div className={`flex flex-col w-full gap-4 justify-center items-center p-5 ${loading && "mt-25"}`}>
      {loading ? <Spinner /> : hasErrors ? <FetchError /> : (
        selectedLecons.length < Number(leconId) ? (
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
        ) : (
          <div className="pl-5 flex gap-5 border-2 border-gris-clair rounded-2xl m-5 w-full">
            <>
              <div className="w-1/2 p-3 flex flex-col justify-between">
                <h3 className="font-titres text-bleu-secondaire text-sm mb-2">
                  Notes de la leçon
                </h3>
                <p className="text-bleu-principal text-md mb-6">
                  {selectedLeconTexte.length
                    ? selectedLeconTexte[0].contenu
                    : "Pas de contenu"}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  {selectedLeconPdf && selectedLeconPdf.length > 0 && (
                        <div
                          onClick={() => downloadFunction(selectedLeconPdf[0].url, selectedLeconPdf[0].fileName)}
                          className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                        >
                          <div className="flex gap-1 items-center">
                            <File size={18} />
                            {selectedLeconPdf[0].fileName}
                          </div>
                          <Download size={18} />
                        </div>
                      )
                    }
                </div>
              </div>
              {selectedLeconVideo.length !== 0 && (
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
                    poster={selectedLeconVideo[0].thumbnail}
                    src={selectedLeconVideo[0].url}
                    controls={isPlaying ? true : false}
                  ></video>
                </div>
              )}
            </>
          </div>
        )

      )}
    </div>
  );
};

export default LessonDetailsPage;
