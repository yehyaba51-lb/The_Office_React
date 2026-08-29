import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { File, Download, Check, Play, FileX } from "lucide-react";
import {
  fakeLeconTexteCours4,
  fakeLeconPdfCours4,
  fakeLeconVideoCours4,
  fakeLecons,
} from "../../fakeData";
import { toast } from "react-toastify";
import NextLesson from "../../components/modals/NextLesson";

const LessonDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, leconId } = useParams();
  const [videoAlmostDone, setVideoAlmostDone] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();

  const showNext = searchParams.get("next") === "true";

  const selectedLecons = fakeLecons.filter((l) => l.coursId === Number(id));

  const lecon = selectedLecons.find((l) => l.id === Number(leconId));

  const currentLeconId =
    selectedLecons.length === Number(leconId) ? "" : Number(leconId);

  const selectedLeconTextes = fakeLeconTexteCours4.filter(
    (t) => t.coursId === Number(id),
  );
  const selectedLeconPdfs = fakeLeconPdfCours4.filter(
    (p) => p.coursId === Number(id),
  );
  const selectedLeconVideos = fakeLeconVideoCours4.filter(
    (v) => v.coursId === Number(id),
  );

  const selectedLeconTexte = selectedLeconTextes.filter(
    (t) => t.leconId === Number(leconId),
  );
  const selectedLeconPdf = selectedLeconPdfs.filter(
    (p) => p.leconId === Number(leconId),
  );
  const selectedLeconVideo = selectedLeconVideos.filter(
    (v) => v.leconId === Number(leconId),
  );

  const downloadFunction = () => {
    toast.success("Fichier PDF téléchargé");
  };

  useEffect(() => {
    setIsPlaying(false);
    setVideoAlmostDone(false);
    setVideoDone(false);
  }, [leconId]);

  return (
    <>
      {selectedLecons.length < Number(leconId) ? (
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
        <div className="pl-5 flex gap-5 border-2 border-gris-clair rounded-2xl m-5">
          {showNext && (
            <NextLesson
              lecon={lecon.titre}
              coursId={id}
              leconId={currentLeconId}
            />
          )}

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
                {selectedLeconVideo && selectedLeconVideo.length > 0
                  ? selectedLeconPdf &&
                    selectedLeconPdf.length > 0 &&
                    videoAlmostDone && (
                      <div
                        onClick={() => downloadFunction()}
                        className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                      >
                        <div className="flex gap-1 items-center">
                          <File size={18} />
                          {selectedLeconPdf[0].fileName}
                        </div>
                        <Download size={18} />
                      </div>
                    )
                  : selectedLeconPdf &&
                    selectedLeconPdf.length > 0 && (
                      <div
                        onClick={() => downloadFunction()}
                        className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                      >
                        <div className="flex gap-1 items-center">
                          <File size={18} />
                          {selectedLeconPdf[0].fileName}
                        </div>
                        <Download size={18} />
                      </div>
                    )}
              </div>
              {selectedLeconVideo.length > 0 ? (
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
    </>
  );
};

export default LessonDetailsPage;
