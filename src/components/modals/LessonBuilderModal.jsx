import { useRef, useState } from "react";
import { CircleX } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../shared/Spinner";

const LessonBuilderModal = ({ lecon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef()
  const [steps, setSteps] = useState(1);
  const [pdf, setPdf] = useState({ file: null, ordre: "1" });
  const [video, setVideo] = useState({ file: null, ordre: "1", duree: null });
  const [titre, setTitre] = useState("");
  const [ordre, setOrdre] = useState("");
  const [contenu, setContenu] = useState("");
  const [leconId, setLeconId] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const canProceed =
    steps === 1
      ? titre !== "" && ordre !== ""
      : steps === 2
        ? contenu !== ""
        : steps === 3
          ? pdf.file !== null && pdf.ordre !== ""
          : steps === 4
            ? video.file !== null && video.ordre !== ""
            : true;

  const createLecon = async (newLecon) => {
    const errors = []
    const titleRegex = /^[a-zA-ZÀ-ÿ0-9' :\-]+$/
    if(!newLecon.titre || !titleRegex.test(newLecon.titre)) {
      errors.push('Nom de leçon invalide')
    }

    if(!newLecon.ordre || newLecon.ordre === ''){
      errors.push('Ordre de leçon pas séléctioné')
    }

    if(errors.length > 0){
      errors.forEach(er => {
        toast.error(er)
      })
      setLoading(false)
      return false
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecons.php?id=${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLecon)
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        setLoading(false)
        return false
      }

      setLeconId(data)
      setLoading(false)
      return true
    } catch (error) {
      setLeconId(null)
      setLoading(false)
      return false
    }
  }

  const addContenu = async (newContenu) => {
    if(!newContenu.contenu || newContenu.contenu.trim() === '') {
      toast.error('Contenu de leçon invalide')
      setLoading(false)
      return false
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecon_textes.php?id=${id}&leconId=${leconId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContenu)
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        setLoading(false)
        return false
      }

      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const addPdfs = async (pdf) => {
    const allowedTypes = ["application/pdf"];

    if(!pdf.file){
      toast.error("Pas de pdf uploadé");
      setLoading(false)
      return false;
    }

    if(!allowedTypes.includes(pdf.file.type)){
      toast.error("Type de fichier invalide");
      setLoading(false)
      return false;
    }

    if(pdf.file.size > 20 * 1024 * 1024){
      toast.error("Taille de fichier trop grande");
      setLoading(false)
      return false;
    }

    const formData = new FormData()
    formData.append('pdf', pdf.file)
    formData.append('ordre', pdf.ordre)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecon_pdfs.php?id=${id}&leconId=${leconId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        setLoading(false)
        return false
      }

      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }
  const addVideos = async (video) => {
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-m4v"];

    if(!video.file){
      toast.error("Pas de video uploadé");
      setLoading(false)
      return false;
    }

    if(!allowedVideoTypes.includes(video.file.type)){
      toast.error("Type de fichier invalide");
      setLoading(false)
      return false;
    }

    if(video.file.size > 500 * 1024 * 1024){
      toast.error("Taille de fichier trop grande");
      setLoading(false)
      return false;
    }

    const formData = new FormData()
    formData.append('video', video.file)
    formData.append('video_ordre', video.ordre)
    formData.append('duree', video.duree)

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/lecon_videos.php?id=${id}&leconId=${leconId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      })
      const data = await response.json()

      if(!response.ok){
        toast.error(data.error)
        setLoading(false)
        return false
      }

      setLoading(false)
      return true
    } catch (error) {
      setLoading(false)
      return false
    }
  }

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(file)
      video.onloadedmetadata = () => {
        resolve(video.duration)
      }
    })
  }
  return (
    <>
      <div className="fixed bg-bleu-secondaire/20 backdrop-blur-xs inset-0"></div>
      <div
        className="fixed inset-0 flex justify-center items-start p-22 z-10"
        onClick={() => navigate(location.pathname)}
      >
        <div
          className="bg-white rounded-2xl px-12 py-8 w-160 flex flex-col gap-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex w-full justify-between items-center">
            <h3 className="font-titres text-bleu-primaire text-xl">
              {steps === 1
                ? "Créer un leçon"
                : steps === 2
                  ? "Ajouter leçon contenu"
                  : steps === 3
                    ? "Ajouter un PDF"
                    : "Ajouter un Video"}
            </h3>
            <button
              title="Fermer"
              className="text-gris-fonce cursor-pointer hover:text-gris-fonce/50 transition duration-300 ease-in-out"
              onClick={() => navigate(location.pathname)}
            >
              <CircleX size={22} />
            </button>
          </div>
          <form action="" method="post" className="flex flex-col" ref={formRef}>
            {steps === 1 && (
              <>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="titre" className="text-gris-fonce text-sm">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="titre"
                    id="titre"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder={`Entrez titre de la leçon...`}
                  />
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="ordre" className="text-gris-fonce text-sm">
                    Ordre
                  </label>
                  <select
                    type="text"
                    name="ordre"
                    id="ordre"
                    value={ordre}
                    onChange={(e) => setOrdre(e.target.value)}
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder={`Entrez titre de la leçon...`}
                  >
                    <option value="">Choisissez un ordre</option>
                    {[...Array(lecon.length + 1)].map((_, i) => (
                      <option
                        key={i + 1}
                        className="text-bleu-principal"
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {steps === 2 && (
              <>
                <div className="flex flex-col gap-1 mb-2">
                  <label htmlFor="contenu" className="text-gris-fonce text-sm">
                    Contenu
                  </label>
                  <textarea
                    type="text"
                    name="contenu"
                    id="contenu"
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    rows="6"
                    className="border-2 border-gris-clair rounded-lg p-1.5 text-sm text-bleu-secondaire resize-none outline-none focus:border-orange-cuivre/75 focus:ring-2 focus:ring-orange-cuivre/30 transition"
                    placeholder={`Entrez titre de la leçon...`}
                  ></textarea>
                </div>
              </>
            )}
            {steps === 3 && (
              <>
                    <div
                      className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2"
                    >
                      <p className="text-sm text-bleu-secondaire">
                        {pdf.file ? pdf.file.name : "Choisir un fichier PDF"}
                      </p>
                      <input
                        type="file"
                        onChange={(e) => {
                          setPdf({ ...pdf, file: e.target.files[0] || null });
                          }}
                        className="hidden"
                        id="thumbnail-upload-pdf"
                      />
                      <label
                        htmlFor="thumbnail-upload-pdf"
                        className="bg-bleu-secondaire text-white rounded-xl px-10 py-1.5 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                      >
                        Parcourir
                      </label>
                    </div>
              </>
            )}
            {steps === 4 && (
              <>
                      <div
                        className="border-2 border-gris-clair rounded-xl flex justify-between items-center px-4 py-2"
                      >
                        <p className="text-sm text-bleu-secondaire">
                          {video.file ? video.file.name : "Choisir un video"}
                        </p>
                        <input
                          type="file"
                          onChange={async (e) => {
                            const duree = await getVideoDuration(e.target.files[0])
                            setVideo({ ...video, file: e.target.files[0] || null, duree })
                          }}
                          className="hidden"
                          id="thumbnail-upload-video"
                        />
                        <label
                          htmlFor="thumbnail-upload-video"
                          className="bg-bleu-secondaire text-white rounded-xl px-10 py-1.5 cursor-pointer hover:bg-bleu-secondaire/90 transition duration-300 ease-in-out"
                        >
                          Parcourir
                        </label>
                      </div>
              </>
            )}
            <div className="flex items-center justify-between mt-5">
              <input
                onClick={() => setSteps((prev) => prev - 1)}
                type="button"
                value={`${steps !== 1 ? "Retour" : ""}`}
                className="text-bleu-secondaire cursor-pointer hover:text-bleu-secondaire/75 transition duration-300 ease-in-out"
              />
              <div className={`w-1/2 gap-3 flex`}>
                <input
                  onClick={
                    steps === 1
                      ? () => {
                          navigate(location.pathname);
                        }
                      : steps !== 4
                        ? () => setSteps((prev) => prev + 1)
                        : () => navigate(`${location.pathname}?success=true`)
                  }
                  type="button"
                  value={steps === 1 ? "Annule" : `Passer`}
                  className="text-sm w-5/6 bg-white border-2 border-gris-clair rounded-xl p-2 cursor-pointer text-bleu-secondaire font-semibold hover:bg-gray-100 transition duration-300 ease-in-out"
                />
                <button
                  type="button"
                  onClick={
                    steps === 1 ? (
                      async () => {
                        setLoading(true)
                        const success = await createLecon({titre, ordre})
                        
                        if(success) setSteps((prev) => prev + 1)
                      }
                    ) : steps === 2 ? (
                      async () => {
                        setLoading(true)
                        const success = await addContenu({contenu})
                        if(success) setSteps((prev) => prev + 1)
                      }
                    ) : steps === 3 ? (
                      async () => {
                        setLoading(true)
                        const success = await addPdfs(pdf)
                        if(success) setSteps((prev) => prev + 1)
                      }
                    ) : (
                      async () => {
                        setLoading(true)
                        const success = await addVideos(video)
                        if(success) {
                          setSteps((prev) => prev + 1)
                          navigate(`${location.pathname}?success=true`)
                        }
                      }
                    )
                  }
                  className={`text-sm w-5/6 ${canProceed ? "bg-orange-cuivre" : "bg-orange-cuivre/20"} rounded-xl p-2 text-white font-semibold ${canProceed ? "cursor-pointer hover:bg-orange-cuivre/90 transition duration-300 ease-in-out" : "cursor-not-allowed"} `}
                  disabled={!canProceed}
                >
                  {loading ? <Spinner login={true} /> : steps === 4 ? `Terminer` : "Suivant"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LessonBuilderModal;
