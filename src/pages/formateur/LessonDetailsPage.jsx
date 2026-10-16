import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { File, Download, Play, FileX } from "lucide-react";
import { toast } from "react-toastify";
import Spinner from "../../components/shared/Spinner";
import FetchError from "../../components/shared/FetchError";
import { translations } from "../../translations";

const LessonDetailsPage = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const [content, setContent] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id, leconId } = useParams();
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { currentUser, lang } = useOutletContext();

  const getLeconContent = async () => {
    setNotFound(false);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}&lecon=${leconId}&userId=${currentUser.utilisateur_id}&allContent=true`,
        {
          credentials: "include",
        },
      );
      const data = await response.json();

      if (response.status === 404) {
        setNotFound(true);
        return true;
      }

      if (response.status === 403) {
        setAccessDenied(true);
        return;
      } else if (!response.ok) {
        toast.error(data.error);
        return false;
      }

      setContent(data);
      return true;
    } catch (error) {
      setContent({});
      return false;
    }
  };

  useEffect(() => {
    const loadEverything = async () => {
      const results = await Promise.all([getLeconContent()]);
      setHasErrors(results.includes(false));

      setLoading(false);
    };

    loadEverything();
  }, [id, leconId]);

  const showNext = searchParams.get("next") === "true";

  const telechargerFunction = () => {
    const link = document.createElement("a");
    link.href =
      content &&
      `${import.meta.env.VITE_UPLOADS_URL}${content.pdfs[0].url_pdf}`;
    link.download = content && content.pdfs[0].url_pdf.split("pdfs/")[1];
    link.click();
    toast.success("Fichier téléchargé");
  };

  useEffect(() => {
    setIsPlaying(false);
  }, [leconId]);

  return (
    <div
      className={`flex flex-col w-full gap-4 justify-center items-center p-5 ${loading && "mt-25"}`}
    >
      {loading ? (
        <Spinner />
      ) : accessDenied ? (
        <FetchError accessDenied={true} />
      ) : notFound ? (
        <div className="border-2 border-gris-clair rounded-2xl p-12 flex flex-col items-center gap-3 text-center m-5">
          <div className="w-14 h-14 rounded-full bg-gris-fonce/10 flex items-center justify-center mb-2">
            <FileX className="text-gris-fonce" size={26} />
          </div>
          <h3 className="text-bleu-principal font-titres font-semibold text-lg">
            {translations[lang]['coursIntrouvable']}
          </h3>
          <p className="text-gris-fonce text-sm max-w-sm">
            {translations[lang]['coursIntrouvableTexte']}
          </p>
          <button
            onClick={() => navigate(`/formateur/cours/${id}`)}
            className="mt-3 bg-bleu-secondaire text-white rounded-xl px-5 py-2 text-sm font-semibold hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out cursor-pointer"
          >
            {translations[lang]['retourAuxLecons']}
          </button>
        </div>
      ) : hasErrors ? (
        <FetchError />
      ) : (
        <div className="pl-5 flex gap-5 border-2 border-gris-clair rounded-2xl m-5 w-full">
          <>
            <div className="w-1/2 p-3 flex flex-col justify-between">
              <h3 className="font-titres text-bleu-secondaire text-sm mb-2">
                {translations[lang]['notesDeLaLecon']}
              </h3>
              <p className="text-bleu-principal text-md mb-6">
                {content.textes.length
                  ? capitalize(content.textes[0].contenu_texte)
                  : translations[lang]['pasDeContenu']}
              </p>
              <div className="mt-auto flex flex-col gap-2">
                {content.pdfs && content.pdfs.length > 0 && (
                  <div
                    onClick={() => telechargerFunction()}
                    className="w-full mb-2 px-5 py-2 cursor-pointer flex justify-between items-center border-2 border-gris-clair rounded-lg text-sm text-bleu-secondaire hover:text-bleu-principal hover:bg-gris-clair transition duration-300 ease-in-out"
                  >
                    <div className="flex gap-1 items-center">
                      <File size={18} />
                      {content.pdfs[0].url_pdf.split("/").pop()}
                    </div>
                    <Download size={18} />
                  </div>
                )}
              </div>
            </div>
            {content.videos.length !== 0 && (
              <div className="w-1/2 h-fit relative">
                {isBuffering ? (
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center`}
                  >
                    <Spinner size={20} />
                    <p className="text-center text-sm text-bleu-secondaire">
                      {translations[lang]['patientez']}
                    </p>
                  </div>
                ) : (
                  !isPlaying && (
                    <div
                      onClick={() => {
                        videoRef.current.play();
                      }}
                      className={`cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex items-center justify-center bg-orange-cuivre hover:bg-orange-cuivre/90 transition duration-300 ease-in-out ${showNext ? "opacity-20" : ""}`}
                    >
                      <Play size={50} className="text-white" fill={"white"} />
                    </div>
                  )
                )}
                <video
                  ref={videoRef}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => {
                    setIsBuffering(false);
                    setIsPlaying(true);
                  }}
                  className={`w-full h-80 object-cover rounded-r-2xl ${showNext ? "opacity-20" : ""}`}
                  src={`${import.meta.env.VITE_UPLOADS_URL}${content.videos[0].url_video}`}
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
